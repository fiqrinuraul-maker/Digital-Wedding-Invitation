/**
 * Google Apps Script for Digital Wedding Invitation RSVP & Wishes Database
 * Target Spreadsheet: https://docs.google.com/spreadsheets/d/1jwOfILZmbFxAtYD44oz1MvTh7SwXxxkrhnUwSbtSpmI/edit?usp=sharing
 * 
 * Instructions:
 * 1. Open your Google Sheet
 * 2. Click Extensions > Apps Script
 * 3. Replace all code in Code.gs with this script
 * 4. Click Deploy > New deployment
 * 5. Select Type: Web App
 * 6. Execute as: Me
 * 7. Who has access: Anyone
 * 8. Deploy and copy the Web App URL into src/config/weddingConfig.js (google.webAppUrl)
 */

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Ensure header row exists
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Timestamp", "Nama Lengkap", "Kehadiran", "Jumlah Tamu", "Ucapan & Doa"]);
      sheet.getRange(1, 1, 1, 5).setFontWeight("bold").setBackground("#f1f5f9");
    }

    var data;
    if (e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
    } else if (e.parameter) {
      data = e.parameter;
    } else {
      throw new Error("No data received");
    }

    var timestamp = new Date();
    var name = data.name || "Anonim";
    var attendance = data.attendance || "Hadir";
    var guests = data.guests || 1;
    var message = data.message || "";

    // Append submission to Google Sheet
    sheet.appendRow([timestamp, name, attendance, guests, message]);

    var result = {
      status: "success",
      message: "RSVP & Ucapan berhasil disimpan!",
      data: {
        timestamp: timestamp,
        name: name,
        attendance: attendance,
        guests: guests,
        message: message
      }
    };

    return ContentService
      .createTextOutput(JSON.stringify(result))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    var errorResult = {
      status: "error",
      message: error.toString()
    };
    
    return ContentService
      .createTextOutput(JSON.stringify(errorResult))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var rows = sheet.getDataRange().getValues();
    var wishes = [];

    // Skip header row if exists
    var startRow = (rows.length > 0 && rows[0][0] === "Timestamp") ? 1 : 0;

    for (var i = startRow; i < rows.length; i++) {
      var row = rows[i];
      if (row[1]) { // If Name exists
        wishes.push({
          timestamp: row[0],
          name: row[1],
          attendance: row[2],
          guests: row[3],
          message: row[4]
        });
      }
    }

    // Return in reverse chronological order (newest first)
    wishes.reverse();

    var result = {
      status: "success",
      total: wishes.length,
      data: wishes
    };

    return ContentService
      .createTextOutput(JSON.stringify(result))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: "error", message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
