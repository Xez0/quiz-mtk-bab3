/**
 * MESIN EKSPOR LAPORAN MULTI-FORMAT (Excel, PDF, Word)
 * Khusus Kuis Matematika Kelas 3 SD - Bab 3: Pengukuran Panjang & Berat (30 Soal)
 */

class ExportEngine {
  constructor() {
    this.schoolName = "SD NEGERI / SWASTA KELAS 3";
    this.reportTitle = "REKAPITULASI NILAI KUIS MATEMATIKA BAB 3 (PENGUKURAN PANJANG & BERAT)";
    this.curriculumRef = "Kurikulum Merdeka - Fase B Kelas 3 SD (30 Soal Evaluasi)";
  }

  getFormattedDate() {
    return new Date().toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  }

  getTimestampString() {
    const now = new Date();
    return `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}`;
  }

  calculateStats(data) {
    if (!data || data.length === 0) {
      return { total: 0, avg: 0, highest: 0, lowest: 0, passed: 0 };
    }
    const scores = data.map(d => Number(d.skor) || 0);
    const total = scores.length;
    const sum = scores.reduce((a, b) => a + b, 0);
    const avg = (sum / total).toFixed(1);
    const highest = Math.max(...scores);
    const lowest = Math.min(...scores);
    const passed = data.filter(d => (Number(d.skor) || 0) >= 75).length;

    return { total, avg, highest, lowest, passed };
  }

  // ==========================================
  // 1. EKSPOR KE EXCEL (.xlsx)
  // ==========================================
  exportToExcel(data, activeFilter = 'Semua') {
    if (typeof XLSX === 'undefined') {
      alert("Library SheetJS belum termuat. Pastikan terhubung ke internet.");
      return;
    }

    const stats = this.calculateStats(data);
    const dateStr = this.getFormattedDate();

    const rows = [
      [this.reportTitle],
      [this.curriculumRef],
      [`Filter Kelas: ${activeFilter} | Tanggal Cetak: ${dateStr}`],
      [`Statistik: Total Murid = ${stats.total} | Rata-rata = ${stats.avg} | Tertinggi = ${stats.highest} | Terendah = ${stats.lowest} | Tuntas (>=75) = ${stats.passed}`],
      [],
      [
        "No",
        "Nama Siswa",
        "Kelas",
        "Skor Akhir",
        "Benar",
        "Salah",
        "A. Mengukur Panjang (%)",
        "B. Satuan Panjang (%)",
        "C. Mengukur Berat (%)",
        "D. Satuan Berat (%)",
        "Waktu Selesai",
        "Status KKM"
      ]
    ];

    data.forEach((item, index) => {
      rows.push([
        index + 1,
        item.nama || "-",
        item.kelas || "-",
        Number(item.skor) || 0,
        Number(item.totalBenar) || 0,
        Number(item.totalSalah) || 0,
        Number(item.subBab1Skor) || 0,
        Number(item.subBab2Skor) || 0,
        Number(item.subBab3Skor) || 0,
        Number(item.subBab4Skor) || 0,
        item.waktu || "-",
        (Number(item.skor) || 0) >= 75 ? "Tuntas" : "Perlu Bimbingan"
      ]);
    });

    const worksheet = XLSX.utils.aoa_to_sheet(rows);
    worksheet['!cols'] = [
      { wch: 6 },
      { wch: 24 },
      { wch: 8 },
      { wch: 11 },
      { wch: 8 },
      { wch: 8 },
      { wch: 22 },
      { wch: 22 },
      { wch: 22 },
      { wch: 22 },
      { wch: 22 },
      { wch: 18 }
    ];

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Rekap Bab 3 Pengukuran");

    const filename = `Laporan_MTK_Kelas3_Bab3_${activeFilter}_${this.getTimestampString()}.xlsx`;
    XLSX.writeFile(workbook, filename);
  }

  // ==========================================
  // 2. EKSPOR KE PDF (.pdf)
  // ==========================================
  exportToPDF(data, activeFilter = 'Semua') {
    if (typeof window.jspdf === 'undefined' || typeof window.jspdf.jsPDF === 'undefined') {
      alert("Library jsPDF belum termuat. Pastikan terhubung ke internet.");
      return;
    }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4'
    });

    const stats = this.calculateStats(data);
    const dateStr = this.getFormattedDate();

    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.text(this.reportTitle, 14, 15);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(`${this.curriculumRef} | Kelas: ${activeFilter} | Tanggal: ${dateStr}`, 14, 22);

    doc.setFillColor(255, 247, 237);
    doc.setDrawColor(253, 186, 116);
    doc.roundedRect(14, 26, 269, 14, 2, 2, 'FD');

    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(194, 65, 12);
    const statText = `RINGKASAN: Total Siswa = ${stats.total} | Nilai Rata-rata = ${stats.avg} | Tertinggi = ${stats.highest} | Terendah = ${stats.lowest} | Tuntas KKM = ${stats.passed} siswa (${stats.total > 0 ? ((stats.passed / stats.total) * 100).toFixed(0) : 0}%)`;
    doc.text(statText, 18, 35);
    doc.setTextColor(30, 41, 59);

    const tableBody = data.map((item, idx) => [
      idx + 1,
      item.nama || "-",
      item.kelas || "-",
      item.skor || 0,
      item.totalBenar || 0,
      item.totalSalah || 0,
      `${item.subBab1Skor || 0}%`,
      `${item.subBab2Skor || 0}%`,
      `${item.subBab3Skor || 0}%`,
      `${item.subBab4Skor || 0}%`,
      item.waktu || "-",
      (Number(item.skor) || 0) >= 75 ? "Tuntas" : "Bimbingan"
    ]);

    doc.autoTable({
      startY: 44,
      head: [[
        "No",
        "Nama Siswa",
        "Kelas",
        "Skor",
        "Benar",
        "Salah",
        "Sub A",
        "Sub B",
        "Sub C",
        "Sub D",
        "Waktu Selesai",
        "Status"
      ]],
      body: tableBody,
      styles: {
        fontSize: 8,
        cellPadding: 2,
        valign: 'middle'
      },
      headStyles: {
        fillColor: [249, 115, 22],
        textColor: 255,
        fontStyle: 'bold'
      },
      alternateRowStyles: {
        fillColor: [248, 250, 252]
      },
      columnStyles: {
        0: { cellWidth: 10, halign: 'center' },
        1: { cellWidth: 42 },
        2: { cellWidth: 14, halign: 'center' },
        3: { cellWidth: 14, halign: 'center', fontStyle: 'bold' },
        4: { cellWidth: 14, halign: 'center' },
        5: { cellWidth: 14, halign: 'center' },
        6: { cellWidth: 18, halign: 'center' },
        7: { cellWidth: 18, halign: 'center' },
        8: { cellWidth: 18, halign: 'center' },
        9: { cellWidth: 18, halign: 'center' },
        10: { cellWidth: 38, halign: 'center' },
        11: { cellWidth: 24, halign: 'center' }
      },
      didParseCell: function(dataCell) {
        if (dataCell.section === 'body' && dataCell.column.index === 11) {
          if (dataCell.cell.raw === 'Tuntas') {
            dataCell.cell.styles.textColor = [22, 163, 74];
            dataCell.cell.styles.fontStyle = 'bold';
          } else {
            dataCell.cell.styles.textColor = [225, 29, 72];
          }
        }
      }
    });

    const finalY = doc.lastAutoTable.finalY || 150;
    if (finalY < 165) {
      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");
      doc.text(`Mengetahui,`, 220, finalY + 12);
      doc.text(`Guru Kelas Matematika`, 220, finalY + 17);
      doc.text(`( ......................................... )`, 220, finalY + 35);
    }

    const filename = `Laporan_MTK_Kelas3_Bab3_${activeFilter}_${this.getTimestampString()}.pdf`;
    doc.save(filename);
  }

  // ==========================================
  // 3. EKSPOR KE WORD (.docx)
  // ==========================================
  exportToWord(data, activeFilter = 'Semua') {
    const stats = this.calculateStats(data);
    const dateStr = this.getFormattedDate();

    let tableRowsHtml = '';
    data.forEach((item, index) => {
      const isPassed = (Number(item.skor) || 0) >= 75;
      const statusColor = isPassed ? '#16a34a' : '#e11d48';
      const statusText = isPassed ? 'Tuntas' : 'Perlu Bimbingan';

      tableRowsHtml += `
        <tr style="background-color: ${index % 2 === 0 ? '#ffffff' : '#f8fafc'};">
          <td style="text-align: center; padding: 8px; border: 1px solid #cbd5e1;">${index + 1}</td>
          <td style="padding: 8px; border: 1px solid #cbd5e1; font-weight: bold;">${item.nama || '-'}</td>
          <td style="text-align: center; padding: 8px; border: 1px solid #cbd5e1;">${item.kelas || '-'}</td>
          <td style="text-align: center; padding: 8px; border: 1px solid #cbd5e1; font-weight: bold; color: #ea580c;">${item.skor || 0}</td>
          <td style="text-align: center; padding: 8px; border: 1px solid #cbd5e1;">${item.totalBenar || 0}</td>
          <td style="text-align: center; padding: 8px; border: 1px solid #cbd5e1;">${item.totalSalah || 0}</td>
          <td style="text-align: center; padding: 8px; border: 1px solid #cbd5e1;">${item.subBab1Skor || 0}%</td>
          <td style="text-align: center; padding: 8px; border: 1px solid #cbd5e1;">${item.subBab2Skor || 0}%</td>
          <td style="text-align: center; padding: 8px; border: 1px solid #cbd5e1;">${item.subBab3Skor || 0}%</td>
          <td style="text-align: center; padding: 8px; border: 1px solid #cbd5e1;">${item.subBab4Skor || 0}%</td>
          <td style="text-align: center; padding: 8px; border: 1px solid #cbd5e1; font-size: 11px;">${item.waktu || '-'}</td>
          <td style="text-align: center; padding: 8px; border: 1px solid #cbd5e1; font-weight: bold; color: ${statusColor};">${statusText}</td>
        </tr>
      `;
    });

    const wordHtml = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head>
        <meta charset='utf-8'>
        <title>${this.reportTitle}</title>
        <style>
          body { font-family: 'Calibri', 'Arial', sans-serif; font-size: 11pt; color: #1e293b; margin: 20px; }
          h2 { font-size: 15pt; color: #ea580c; text-align: center; margin-bottom: 4px; text-transform: uppercase; }
          .subtitle { font-size: 11pt; text-align: center; color: #64748b; margin-bottom: 16px; }
          .stat-box { background: #fff7ed; border: 1px solid #fdba74; padding: 12px; border-radius: 6px; margin-bottom: 20px; }
          table { width: 100%; border-collapse: collapse; margin-top: 10px; font-size: 9.5pt; }
          th { background-color: #f97316; color: #ffffff; padding: 10px 6px; border: 1px solid #ea580c; text-align: center; }
          .footer-sign { margin-top: 40px; float: right; width: 250px; text-align: center; }
        </style>
      </head>
      <body>
        <h2>${this.reportTitle}</h2>
        <div class="subtitle">${this.curriculumRef} | Filter Kelas: ${activeFilter} | Tanggal: ${dateStr}</div>

        <div class="stat-box">
          <b>RINGKASAN HASIL EVALUASI BAB 3:</b><br/>
          • Total Peserta: <b>${stats.total}</b> siswa<br/>
          • Rata-rata Nilai: <b>${stats.avg}</b><br/>
          • Nilai Tertinggi: <b>${stats.highest}</b> | Nilai Terendah: <b>${stats.lowest}</b><br/>
          • Jumlah Tuntas KKM (&ge; 75): <b>${stats.passed}</b> siswa
        </div>

        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>Nama Siswa</th>
              <th>Kelas</th>
              <th>Skor</th>
              <th>Benar</th>
              <th>Salah</th>
              <th>Sub A<br/><small>(Alat Pjg)</small></th>
              <th>Sub B<br/><small>(Satuan Pjg)</small></th>
              <th>Sub C<br/><small>(Alat Brt)</small></th>
              <th>Sub D<br/><small>(Satuan Brt)</small></th>
              <th>Waktu Selesai</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            ${tableRowsHtml}
          </tbody>
        </table>

        <div class="footer-sign">
          <p>Mengetahui,<br/>Guru Kelas Matematika</p>
          <br/><br/><br/>
          <p><b>( ................................................. )</b></p>
        </div>
      </body>
      </html>
    `;

    const blob = new Blob(['\ufeff', wordHtml], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Laporan_MTK_Kelas3_Bab3_${activeFilter}_${this.getTimestampString()}.docx`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
}

window.exportEngine = new ExportEngine();

