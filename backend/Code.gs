/**
 * =========================================================================
 * BACKEND GOOGLE APPS SCRIPT (GAS) UNIFIED MULTI-TAB - KUIS MTK KELAS 3 SD
 * Mendukung 2 Tab Terpisah dalam 1 Google Spreadsheet yang Sama:
 * 1. Tab "Rekap_Nilai_Murid" -> Kuis Lengkap 50 Soal (Bab 1, 2, 3) [Default]
 * 2. Tab "Rekap_Nilai_Bab3"  -> Kuis Khusus Bab 3 (30 Soal Pengukuran Panjang & Berat)
 * =========================================================================
 *
 * Cara Update di Spreadsheet yang Sudah Ada:
 * 1. Buka Google Spreadsheet Anda -> Ekstensi -> Apps Script.
 * 2. Ganti seluruh kode dengan skrip ini -> Simpan.
 * 3. Klik Terapkan (Deploy) -> Kelola deployment -> Ikon Pensil (Edit) ->
 *    Versi: "Versi baru" -> Terapkan! (URL Web App tetap sama, data terpisah per tab!)
 */

var TEACHER_PIN = "0123";
var SHEET_GENERAL = "Rekap_Nilai_Murid";
var SHEET_BAB3 = "Rekap_Nilai_Bab3";

function isBab3Request(params, postData) {
  var sheetParam = (params && params.sheet) || (postData && postData.sheet) || "";
  var quizParam = (params && params.quiz) || (postData && postData.quiz) || "";
  if (sheetParam === SHEET_BAB3 || quizParam === "bab3") {
    return true;
  }
  if (postData && typeof postData.subBab1Skor !== "undefined") {
    return true;
  }
  return false;
}

function getTargetSheetName(isBab3) {
  return isBab3 ? SHEET_BAB3 : SHEET_GENERAL;
}

function doPost(e) {
  try {
    var params = (e && e.parameter) || {};
    var rawData = e.postData.contents;
    var data = JSON.parse(rawData);
    var isBab3 = isBab3Request(params, data);
    var targetSheetName = getTargetSheetName(isBab3);

    var sheet = getOrCreateSheet(isBab3);
    var timestamp = data.waktu || new Date().toLocaleString("id-ID");

    if (isBab3) {
      var bab3Id = "BAB3-" + new Date().getTime().toString().slice(-6);
      sheet.appendRow([
        bab3Id,
        timestamp,
        data.nama || "Anonim",
        data.kelas || "3A",
        Number(data.skor) || 0,
        Number(data.totalBenar) || 0,
        Number(data.totalSalah) || 0,
        Number(data.subBab1Skor) || 0,
        Number(data.subBab2Skor) || 0,
        Number(data.subBab3Skor) || 0,
        Number(data.subBab4Skor) || 0,
        data.status || (Number(data.skor) >= 75 ? "Tuntas" : "Perlu Bimbingan")
      ]);

      return ContentService
        .createTextOutput(JSON.stringify({
          success: true,
          sheet: targetSheetName,
          message: "Nilai Kuis Bab 3 berhasil direkam ke tab " + targetSheetName + ".",
          studentResult: {
            id: bab3Id,
            nama: data.nama,
            kelas: data.kelas,
            skor: data.skor,
            totalBenar: data.totalBenar,
            totalSalah: data.totalSalah,
            status: data.status
          }
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    var submissionId = "SUB-" + new Date().getTime().toString().slice(-6);
    sheet.appendRow([
      submissionId,
      timestamp,
      data.nama || "Anonim",
      data.kelas || "3A",
      Number(data.skor) || 0,
      Number(data.totalBenar) || 0,
      Number(data.totalSalah) || 0,
      Number(data.bab1Skor) || 0,
      Number(data.bab2Skor) || 0,
      Number(data.bab3Skor) || 0,
      data.status || (Number(data.skor) >= 75 ? "Tuntas" : "Perlu Bimbingan")
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        sheet: targetSheetName,
        message: "Nilai berhasil direkam ke tab " + targetSheetName + ".",
        studentResult: {
          id: submissionId,
          nama: data.nama,
          kelas: data.kelas,
          skor: data.skor,
          totalBenar: data.totalBenar,
          totalSalah: data.totalSalah,
          status: data.status
        }
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function mapRowToRecord(row, isBab3) {
  if (isBab3) {
    return {
      id: row[0],
      waktu: row[1],
      nama: row[2],
      kelas: row[3],
      skor: Number(row[4]),
      totalBenar: Number(row[5]),
      totalSalah: Number(row[6]),
      subBab1Skor: Number(row[7]),
      subBab2Skor: Number(row[8]),
      subBab3Skor: Number(row[9]),
      subBab4Skor: Number(row[10]),
      status: row[11]
    };
  }

  return {
    id: row[0],
    waktu: row[1],
    nama: row[2],
    kelas: row[3],
    skor: Number(row[4]),
    totalBenar: Number(row[5]),
    totalSalah: Number(row[6]),
    bab1Skor: Number(row[7]),
    bab2Skor: Number(row[8]),
    bab3Skor: Number(row[9]),
    status: row[10]
  };
}

function doGet(e) {
  try {
    var params = (e && e.parameter) || {};
    var pin = params.pin || "";
    var action = params.action || "";
    var isBab3 = isBab3Request(params, null);
    var targetSheetName = getTargetSheetName(isBab3);

    // Endpoint Publik Khusus Siswa: Cek status 1 siswa pada tab yang sesuai
    if (action === "checkStudent") {
      var checkNama = (params.nama || "").trim().toLowerCase();
      var checkKelas = (params.kelas || "").trim().toUpperCase();

      if (!checkNama) {
        return ContentService
          .createTextOutput(JSON.stringify({
            success: true,
            sheet: targetSheetName,
            exists: false
          }))
          .setMimeType(ContentService.MimeType.JSON);
      }

      var checkSheet = getOrCreateSheet(isBab3);
      var checkValues = checkSheet.getDataRange().getValues();
      var found = null;

      for (var k = 1; k < checkValues.length; k++) {
        var r = checkValues[k];
        if (String(r[2]).trim().toLowerCase() === checkNama &&
            String(r[3]).trim().toUpperCase() === checkKelas) {
          found = mapRowToRecord(r, isBab3);
          break;
        }
      }

      return ContentService
        .createTextOutput(JSON.stringify({
          success: true,
          sheet: targetSheetName,
          exists: !!found,
          data: found
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // Validasi PIN Guru untuk Rekap Lengkap
    if (pin !== TEACHER_PIN) {
      return ContentService
        .createTextOutput(JSON.stringify({
          success: false,
          error: "Akses ditolak: PIN Guru salah!"
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    var sheet = getOrCreateSheet(isBab3);
    var values = sheet.getDataRange().getValues();

    if (values.length <= 1) {
      return ContentService
        .createTextOutput(JSON.stringify({
          success: true,
          sheet: targetSheetName,
          count: 0,
          data: []
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    var results = [];
    for (var i = 1; i < values.length; i++) {
      results.push(mapRowToRecord(values[i], isBab3));
    }

    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        sheet: targetSheetName,
        count: results.length,
        data: results
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function getOrCreateSheet(isBab3) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheetName = getTargetSheetName(isBab3);
  var sheet = ss.getSheetByName(sheetName);

  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
  }

  if (sheet.getLastRow() === 0) {
    var headers = isBab3
      ? [
          "ID Submission",
          "Waktu Selesai",
          "Nama Siswa",
          "Kelas",
          "Skor Akhir",
          "Total Benar",
          "Total Salah",
          "A. Alat Panjang (%)",
          "B. Satuan Panjang (%)",
          "C. Alat Berat (%)",
          "D. Satuan Berat (%)",
          "Status KKM"
        ]
      : [
          "ID Submission",
          "Waktu Selesai",
          "Nama Siswa",
          "Kelas",
          "Skor Akhir",
          "Total Benar",
          "Total Salah",
          "Bab 1 (%)",
          "Bab 2 (%)",
          "Bab 3 (%)",
          "Status KKM"
        ];

    sheet.appendRow(headers);

    var headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setBackground(isBab3 ? "#f97316" : "#0ea5e9");
    headerRange.setFontColor("#ffffff");
    headerRange.setFontWeight("bold");
    headerRange.setHorizontalAlignment("center");
    sheet.setFrozenRows(1);
  }

  return sheet;
}
