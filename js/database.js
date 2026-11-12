/**
 * MODUL DATABASE CLOUD & PRIVASI NILAI (KUIS MTK BAB 3 - 30 SOAL)
 * 
 * Arsitektur:
 * - Penyimpanan lokal terisolasi (quiz_mtk_bab3_*) agar tidak bentrok dengan aplikasi kuis lainnya.
 * - Mendukung Google Apps Script (GAS) Web App sebagai Single Source of Truth 1:1.
 * - Siswa hanya bisa mengirim nilai (POST) dan memeriksa status pribadinya tanpa melihat nilai teman.
 * - Guru mengakses rekapitulasi lengkap via PIN 4 digit rahasia.
 */

class DatabaseManager {
  constructor() {
    this.STORAGE_KEY = 'quiz_mtk_bab3_submissions_v1';
    this.GAS_URL_KEY = 'quiz_mtk_bab3_gas_url';
    this.STUDENT_COMPLETED_KEY = 'quiz_mtk_bab3_student_completed';
    this.IN_PROGRESS_KEY = 'quiz_mtk_bab3_in_progress_state';
    this.TARGET_SHEET = 'Rekap_Nilai_Bab3';
    this.TEACHER_PIN = '0123';

    // URL Google Apps Script bersama (menggunakan tab terpisah: Rekap_Nilai_Bab3)
    this.DEFAULT_GAS_URL = 'https://script.google.com/macros/s/AKfycbx57CTwLK-SwpXhhWVUgBBXlSLhFGOxPgzNOZxXkPx0F0FD82EwccDjDYvk1pcN6S6U6A/exec';

    const savedGasUrl = localStorage.getItem(this.GAS_URL_KEY);
    this.gasUrl = (savedGasUrl && savedGasUrl.startsWith('https://script.google.com')) ? savedGasUrl : this.DEFAULT_GAS_URL;
  }

  getGasUrl() {
    return this.gasUrl;
  }

  setGasUrl(url) {
    this.gasUrl = (url || '').trim();
    if (this.gasUrl) {
      localStorage.setItem(this.GAS_URL_KEY, this.gasUrl);
    } else {
      localStorage.removeItem(this.GAS_URL_KEY);
    }
  }

  // ==========================================
  // PEMERIKSAAN ATURAN 1X PENGERJAAN
  // ==========================================

  isAlreadySubmitted(nama, kelas) {
    const cleanNama = (nama || '').trim().toLowerCase();
    const cleanKelas = (kelas || '').trim().toUpperCase();
    const key = `${cleanNama}_${cleanKelas}`;

    const all = this.getLocalSubmissions();
    const found = all.find(item => 
      (item.nama || '').trim().toLowerCase() === cleanNama && 
      (item.kelas || '').trim().toUpperCase() === cleanKelas
    );

    if (found) {
      return { submitted: true, data: found };
    }

    const studentSession = localStorage.getItem(this.STUDENT_COMPLETED_KEY);
    if (studentSession) {
      try {
        const parsed = JSON.parse(studentSession);
        if (parsed.key === key) {
          localStorage.removeItem(this.STUDENT_COMPLETED_KEY);
        }
      } catch (e) {}
    }

    return { submitted: false };
  }

  async checkStudentStatusOnline(nama, kelas) {
    const cleanNama = (nama || '').trim();
    const cleanKelas = (kelas || '').trim();
    if (!cleanNama) return { submitted: false };

    const localCheck = this.isAlreadySubmitted(cleanNama, cleanKelas);
    let sessionSubmittedAt = 0;
    const sessionStr = localStorage.getItem(this.STUDENT_COMPLETED_KEY);
    if (sessionStr) {
      try {
        const parsed = JSON.parse(sessionStr);
        if ((parsed.nama || '').trim().toLowerCase() === cleanNama.toLowerCase() &&
            (parsed.kelas || '').trim().toUpperCase() === cleanKelas.toUpperCase()) {
          sessionSubmittedAt = Number(parsed.submittedAt) || 0;
        }
      } catch (e) {}
    }

    if (this.gasUrl && this.gasUrl.startsWith('https://script.google.com')) {
      try {
        const url = `${this.gasUrl}?action=checkStudent&sheet=${encodeURIComponent(this.TARGET_SHEET)}&quiz=bab3&nama=${encodeURIComponent(cleanNama)}&kelas=${encodeURIComponent(cleanKelas)}&_t=${Date.now()}`;
        const res = await fetch(url);
        if (res.ok) {
          const json = await res.json();
          if (json.success) {
            // Hanya percaya status cloud jika server benar-benar merespons dari tab Rekap_Nilai_Bab3
            if (json.sheet !== this.TARGET_SHEET) {
              return localCheck;
            }
            if (!json.exists) {
              // Beri jeda aman 12 detik agar POST no-cors sempat tertulis ke Spreadsheet sebelum membatalkan kunci
              const recentlySubmitted = sessionSubmittedAt > 0 && (Date.now() - sessionSubmittedAt) < 12000;
              if (recentlySubmitted && localCheck.submitted) {
                return localCheck;
              }
              if (sessionStr) {
                try {
                  const parsed = JSON.parse(sessionStr);
                  if ((parsed.nama || '').trim().toLowerCase() === cleanNama.toLowerCase()) {
                    localStorage.removeItem(this.STUDENT_COMPLETED_KEY);
                  }
                } catch (e) {}
              }
              return { submitted: false, cloudConfirmedMissing: true };
            } else {
              return { submitted: true, data: json.data };
            }
          }
        }
      } catch (e) {
        console.warn("Verifikasi status cloud tertunda, memakai lokal:", e);
      }
    }

    return localCheck;
  }

  markStudentCompleted(submissionData) {
    const cleanNama = submissionData.nama.trim().toLowerCase();
    const cleanKelas = submissionData.kelas.trim().toUpperCase();
    const payload = {
      key: `${cleanNama}_${cleanKelas}`,
      submittedAt: submissionData.submittedAt || Date.now(),
      ...submissionData
    };
    localStorage.setItem(this.STUDENT_COMPLETED_KEY, JSON.stringify(payload));
  }

  // ==========================================
  // PENGIRIMAN NILAI OLEH SISWA (POST)
  // ==========================================

  async submitQuizResult(resultData) {
    const recordToSave = {
      submittedAt: Date.now(),
      ...resultData
    };
    this.saveToLocal(recordToSave);
    this.markStudentCompleted(recordToSave);

    if (this.gasUrl && this.gasUrl.startsWith('https://script.google.com')) {
      try {
        await fetch(this.gasUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'text/plain;charset=utf-8'
          },
          body: JSON.stringify({
            action: 'submitQuiz',
            sheet: this.TARGET_SHEET,
            quiz: 'bab3',
            ...resultData
          })
        });

        return {
          success: true,
          cloudSynced: true,
          studentResult: resultData
        };
      } catch (err) {
        console.warn("Sinkronisasi cloud GAS tertunda, tersimpan di lokal:", err);
        return {
          success: true,
          cloudSynced: false,
          studentResult: resultData
        };
      }
    }

    return {
      success: true,
      cloudSynced: false,
      studentResult: resultData
    };
  }

  // ==========================================
  // AKSES DASBOR GURU (SINGLE SOURCE OF TRUTH 1:1)
  // ==========================================

  verifyTeacherPin(pin) {
    return pin === this.TEACHER_PIN;
  }

  async getTeacherDashboardData(pin) {
    if (!this.verifyTeacherPin(pin)) {
      throw new Error("PIN salah! Akses dasbor guru ditolak.");
    }

    if (this.gasUrl && this.gasUrl.startsWith('https://script.google.com')) {
      try {
        const urlWithPin = `${this.gasUrl}?action=getSummary&sheet=${encodeURIComponent(this.TARGET_SHEET)}&quiz=bab3&pin=${encodeURIComponent(pin)}&_t=${Date.now()}`;
        const res = await fetch(urlWithPin);
        if (res.ok) {
          const cloudData = await res.json();
          if (cloudData.success && Array.isArray(cloudData.data)) {
            if (cloudData.sheet === this.TARGET_SHEET) {
              this.syncCloudDataToLocal(cloudData.data);
              return cloudData.data;
            }
            if (!cloudData.sheet) {
              const bab3Only = cloudData.data.filter((item) =>
                String(item.id || '').startsWith('BAB3-') || typeof item.subBab1Skor !== 'undefined'
              );
              if (bab3Only.length > 0) {
                this.syncCloudDataToLocal(bab3Only);
                return bab3Only;
              }
              console.warn('Apps Script belum diperbarui ke multi-tab. Salin backend/Code.gs dan deploy versi baru.');
            }
          }
        }
      } catch (e) {
        console.warn("Gagal menarik data cloud, memuat data lokal:", e);
      }
    }

    return this.getLocalSubmissions();
  }

  // ==========================================
  // OPERASI PENYIMPANAN LOKAL
  // ==========================================

  getLocalSubmissions() {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  saveToLocal(newRecord) {
    const current = this.getLocalSubmissions();
    if (!newRecord.id) {
      newRecord.id = 'BAB3-' + Date.now().toString().slice(-6);
    }
    current.unshift(newRecord);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(current));
  }

  syncCloudDataToLocal(cloudList) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(cloudList));

    const sessionStr = localStorage.getItem(this.STUDENT_COMPLETED_KEY);
    if (sessionStr) {
      try {
        const session = JSON.parse(sessionStr);
        const stillInSheet = cloudList.some(item => 
          (item.nama || '').trim().toLowerCase() === (session.nama || '').trim().toLowerCase() &&
          (item.kelas || '').trim().toUpperCase() === (session.kelas || '').trim().toUpperCase()
        );
        if (!stillInSheet) {
          localStorage.removeItem(this.STUDENT_COMPLETED_KEY);
        }
      } catch (e) {}
    }
  }
}

window.dbManager = new DatabaseManager();

