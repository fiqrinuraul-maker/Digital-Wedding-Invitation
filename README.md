# 💍 Digital Wedding Invitation - Nadya & Fiqri

A modern, luxury, mobile-first digital wedding invitation website built with React, Vite, Tailwind CSS, Google Sheets real-time RSVP database, Google Calendar Save-the-Date integration, Google Maps venue navigation, digital gift box with dynamic QR barcode scanner, and automated GitHub Pages deployment.

---

## 📌 Project Overview & Metadata

- **Mempelai**: Nadya & Aulia Nur Fiqri
- **Tanggal Pernikahan**: Sabtu, 19 Desember 2026
- **Lokasi Acara**: Aroem Resto Bekasi
- **Link Google Maps**: [Aroem Resto Bekasi Location](https://share.google/XHbmgLwA8d6MQumUQ)
- **Akad Nikah**: 08.00 AM - 10.00 AM WIB
- **Resepsi Pernikahan**: 10.30 AM - 13.00 PM WIB
- **Bank Gift / Barcode**: Bank Mandiri `1330027712819` (a.n Aulia Nur Fiqri)
- **Google Sheets RSVP Database**: [Spreadsheet RSVP](https://docs.google.com/spreadsheets/d/1jwOfILZmbFxAtYD44oz1MvTh7SwXxxkrhnUwSbtSpmI/edit?usp=sharing)
- **GitHub Repository**: [Digital-Wedding-Invitation](https://github.com/fiqrinuraul-maker/Digital-Wedding-Invitation.git)

---

## ✨ Key Features & Highlights

1. **Personalized Opening Cover**:
   - URL guest name resolution via `?to=Nama+Tamu` parameter.
   - Smooth curtain lift animation unlocking the invitation website and auto-playing background music.

2. **Bride & Groom Profiles**:
   - Elegant profiles for Nadya & Fiqri with parents' details, social handles, and Qur'an verses.

3. **Live Wedding Countdown**:
   - Real-time ticking countdown timer down to Days, Hours, Minutes, and Seconds.

4. **Google Calendar "Save The Date" Integration**:
   - One-click button pre-filling Google Calendar event title, date, time (Akad & Resepsi), venue location, and description.

5. **Venue & Google Maps Integration**:
   - Clickable venue address linking directly to `https://share.google/XHbmgLwA8d6MQumUQ`.
   - Embedded Google Maps direction container.

6. **Real-time RSVP & Wishes Database (Google Sheets Integration)**:
   - RSVP form collecting Name, Attendance Status (Hadir / Tidak Hadir), Guest Count, and Message.
   - Automatically syncs every entry to Google Sheets in real-time via Google Apps Script Web App.
   - Live guest wishes feed showing guest quotes and attendance badges on the invitation page.

7. **Digital Gift Box ("Wanna give us some gifts?")**:
   - Bank Mandiri account card (`1330027712819`) with one-click copy button and toast confirmation.
   - **Dynamic QR Code Barcode Generator**: Built-in barcode scanner image for guests who cannot attend but wish to send a gift.
   - Physical gift shipping address with copy button.

8. **Floating Background Music Control**:
   - Floating audio player with spinning vinyl record animation, play/pause controls, and audio source instructions (`public/audio/wedding-bgm.mp3`).

9. **Luxury Aesthetics & Mobile-First Design**:
   - Glassmorphism dark theme, golden gradient typography (Playfair Display & Great Vibes), floating petal particles, and smooth responsive layouts for iOS & Android.

---

## 🛠️ Technology Stack

- **Frontend**: React 19, Vite 8, Tailwind CSS, Lucide Icons
- **Backend / Database**: Google Sheets & Google Apps Script (`Code.gs`)
- **Deployment**: GitHub Pages via GitHub Actions Workflow (`.github/workflows/deploy.yml`)

---

## 🎵 Background Music Instructions

Put your background audio file (`.mp3` format) in the public folder at:
```text
public/audio/wedding-bgm.mp3
```
Detailed instructions can be found in [`public/audio/README.md`](public/audio/README.md).

---

## 📄 Google Apps Script Code (`google-apps-script/Code.gs`)

```javascript
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Timestamp", "Nama Lengkap", "Kehadiran", "Jumlah Tamu", "Ucapan & Doa"]);
    }
    var data = (e.postData && e.postData.contents) ? JSON.parse(e.postData.contents) : e.parameter;
    sheet.appendRow([new Date(), data.name, data.attendance, data.guests, data.message]);

    return ContentService.createTextOutput(JSON.stringify({ status: "success" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var rows = sheet.getDataRange().getValues();
    var wishes = [];
    var startRow = (rows.length > 0 && rows[0][0] === "Timestamp") ? 1 : 0;
    for (var i = startRow; i < rows.length; i++) {
      if (rows[i][1]) {
        wishes.push({ timestamp: rows[i][0], name: rows[i][1], attendance: rows[i][2], guests: rows[i][3], message: rows[i][4] });
      }
    }
    wishes.reverse();
    return ContentService.createTextOutput(JSON.stringify({ status: "success", data: wishes }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

Full deployment instructions are available in [`docs/GOOGLE_SHEETS_SETUP.md`](docs/GOOGLE_SHEETS_SETUP.md).

---

## 🚀 Local Development & Build

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run Local Dev Server**:
   ```bash
   npm run dev
   ```

3. **Build Production Bundle**:
   ```bash
   npm run build
   ```

---

## ✅ Requirements Fulfillment Checklist

- [x] Opening cover section with personalized guest name parameter (`?to=...`)
- [x] Bride & Groom section (Nadya & Fiqri)
- [x] Live Countdown timer (Days, Hours, Minutes, Seconds)
- [x] Save The Date integration (Pre-filled Google Calendar event)
- [x] Venue section with clickable Google Maps link (`https://share.google/XHbmgLwA8d6MQumUQ`)
- [x] RSVP Form syncing to Google Sheets real-time (`doPost` in Google Apps Script)
- [x] Wedding Wishes section displaying guest messages real-time
- [x] Gift Section ("Wanna give us some gifts?") with Bank Mandiri `1330027712819` (a.n Aulia Nur Fiqri)
- [x] Barcode / QR Code generator for absent guests giving gifts
- [x] Floating music player with vinyl animation & clear folder placement instructions
- [x] Mobile-first responsive luxury glassmorphism design
- [x] Automated GitHub Pages deployment workflow setup
