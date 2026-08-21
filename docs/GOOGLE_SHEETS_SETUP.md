# Panduan Integrasi Google Sheets & Google Apps Script (RSVP Real-Time)

Website Undangan Pernikahan **Nadya & Fiqri** ini terintegrasi langsung dengan Google Sheets untuk menyimpan data RSVP tamu dan menampilkan ucapan selamat secara real-time.

Link Google Sheets Anda:
[Google Sheets RSVP Nadya & Fiqri](https://docs.google.com/spreadsheets/d/1jwOfILZmbFxAtYD44oz1MvTh7SwXxxkrhnUwSbtSpmI/edit?usp=sharing)

---

## Langkah 1: Buka Google Apps Script Editor
1. Buka spreadsheet Google Sheets Anda melalui link di atas.
2. Di menu bagian atas, klik **Ekstensi (Extensions)** > **Apps Script**.
3. Hapus semua kode default di dalam file `Code.gs`.

---

## Langkah 2: Paste Kode Apps Script
1. Salin seluruh isi kode dari file repo ini: [`google-apps-script/Code.gs`](../google-apps-script/Code.gs).
2. Paste ke dalam editor Apps Script.
3. Klik ikon **Simpan (Save / ctrl+s)**.

---

## Langkah 3: Deploy Sebagai Web App (Aplikasi Web)
1. Di pojok kanan atas Apps Script, klik tombol **Deploy (Terapkan)** > **New deployment (Terapkan baru)**.
2. Di samping judul *Select type*, klik ikon **Roda Gigi (Settings)** > pilih **Web app (Aplikasi Web)**.
3. Isi konfigurasi sebagai berikut:
   - **Description**: `Wedding RSVP API`
   - **Execute as (Jalankan sebagai)**: `Me (Email Anda)`
   - **Who has access (Siapa yang memiliki akses)**: `Anyone (Siapa saja)` *(Penting agar tamu dapat mengirim RSVP tanpa login)*
4. Klik tombol **Deploy (Terapkan)**.
5. Klik **Authorize access (Izinkan akses)** jika diminta, lalu pilih akun Google Anda. Jika ada peringatan *Google hasn't verified this app*, klik **Advanced (Lanjutan)** > **Go to Wedding RSVP API (unsafe)** > **Allow (Izinkan)**.

---

## Langkah 4: Hubungkan Web App URL ke Website Undangan
1. Salin **Web App URL** yang dihasilkan (contoh format: `https://script.google.com/macros/s/AKfycbx.../exec`).
2. Buka file [`src/config/weddingConfig.js`](../src/config/weddingConfig.js) di repositori Anda.
3. Ganti nilai `webAppUrl` pada objek `google`:

```javascript
google: {
  spreadsheetUrl: "https://docs.google.com/spreadsheets/d/1jwOfILZmbFxAtYD44oz1MvTh7SwXxxkrhnUwSbtSpmI/edit?usp=sharing",
  webAppUrl: "https://script.google.com/macros/s/PASTE_URL_WEB_APP_ANDA_DISINI/exec"
}
```

4. Simpan file, commit, dan push ke GitHub. RSVP Anda kini aktif 100% secara real-time!
