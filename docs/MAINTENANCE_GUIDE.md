# Panduan Pemeliharaan & Pengaturan Website Undangan Pernikahan

Panduan ini membantu Anda melakukan penyesuaian data, memperbarui musik latar, mengganti foto galeri, serta mendeploy pembaruan ke GitHub Pages.

---

## 1. Pusat Pengaturan Data (`src/config/weddingConfig.js`)
Seluruh data utama undangan (Nama Mempelai, Alamat, Tanggal, Rekening Bank, Link Google Maps, dll.) tersimpan terpusat di [`src/config/weddingConfig.js`](../src/config/weddingConfig.js).

### Mengubah Nama Mempelai & Orang Tua:
```js
groom: {
  fullName: "Aulia Nur Fiqri",
  shortName: "Fiqri",
  parents: "Putra dari Bapak Fiqri & Ibu Fiqri",
  instagram: "@fiqrinuraul"
},
bride: {
  fullName: "Nadya",
  shortName: "Nadya",
  parents: "Putri dari Bapak Nadya & Ibu Nadya",
  instagram: "@nadya"
}
```

### Mengubah Nomor Rekening & Barcode QR:
```js
gift: {
  title: "Wanna give us some gifts?",
  bankAccounts: [
    {
      bankName: "Bank Mandiri",
      accountNumber: "1330027712819",
      accountHolder: "Aulia Nur Fiqri",
      qrCodeUrl: "https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=1330027712819"
    }
  ]
}
```

---

## 2. Mengganti Musik Latar (Backsound Music)
1. Siapkan file musik instrumen atau lagu pernikahan berformat **.mp3**.
2. Simpan file musik tersebut di folder:
   ```text
   public/audio/wedding-bgm.mp3
   ```
3. Jika nama file musik berbeda (misal `lagu.mp3`), perbarui path di `src/config/weddingConfig.js`:
   ```js
   audio: {
     src: "/audio/lagu.mp3"
   }
   ```

---

## 3. Menyesuaikan Link Nama Tamu Undangan (Personalized URL)
Anda dapat mempersonalisasi nama tamu pada cover undangan secara otomatis menggunakan URL Parameter `?to=`:

Contoh link untuk tamu:
- `https://fiqrinuraul-maker.github.io/Digital-Wedding-Invitation/?to=Ade+Fitriyani`
- `https://fiqrinuraul-maker.github.io/Digital-Wedding-Invitation/?to=Bpk.+Ahmad+%26+Keluarga`

Nama tamu akan otomatis ditampilkan pada Cover Undangan dan diisikan ke Form RSVP!

---

## 4. Cara Deploy Ke GitHub Pages

Repositori ini telah dilengkapi **GitHub Actions Deployment Workflow** (`.github/workflows/deploy.yml`).

### Langkah-langkah Deployment:
1. Pastikan repositori GitHub Anda diset publik di:
   `https://github.com/fiqrinuraul-maker/Digital-Wedding-Invitation`
2. Di halaman repositori GitHub Anda, buka **Settings** > **Pages**.
3. Pada bagian **Build and deployment** > **Source**, pilih **GitHub Actions**.
4. Lakukan commit & push perubahan kode ke branch `main`:
   ```bash
   git add .
   git commit -m "Update website data and configuration"
   git push origin main
   ```
5. GitHub Actions akan otomatis membangun website dan mendeploy ke URL:
   `https://fiqrinuraul-maker.github.io/Digital-Wedding-Invitation/`
