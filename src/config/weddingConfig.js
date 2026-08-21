// Central Wedding Invitation Configuration
// Update details below whenever needed!

export const weddingConfig = {
  couple: {
    groom: {
      fullName: "Aulia Nur Fiqri",
      shortName: "Fiqri",
      parents: "Putra dari Bapak Fiqri & Ibu Fiqri",
      instagram: "@fiqrinuraul",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80"
    },
    bride: {
      fullName: "Nadya",
      shortName: "Nadya",
      parents: "Putri dari Bapak Nadya & Ibu Nadya",
      instagram: "@nadya",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80"
    },
    title: "Nadya & Fiqri",
    hashtag: "#NadyaFiqriWedding"
  },

  event: {
    weddingDateISO: "2026-12-19T08:00:00+07:00", // 19 Desember 2026
    dateDisplay: "Sabtu, 19 Desember 2026",
    
    akad: {
      title: "Akad Nikah",
      time: "08.00 - 10.00 WIB",
      venue: "Aroem Resto Bekasi",
      address: "Jl. Kalimalang, Bekasi, Jawa Barat"
    },
    
    resepsi: {
      title: "Resepsi Pernikahan",
      time: "10.30 - 13.00 WIB",
      venue: "Aroem Resto Bekasi",
      address: "Jl. Kalimalang, Bekasi, Jawa Barat"
    },

    calendar: {
      title: "The Wedding of Nadya & Fiqri",
      details: "Pernikahan Nadya & Fiqri - Aroem Resto Bekasi",
      location: "Aroem Resto Bekasi, Jawa Barat",
      // UTC format YYYYMMDDTHHMMSSZ (19 Dec 2026 08:00 WIB = 01:00 UTC, 13:00 WIB = 06:00 UTC)
      startUTC: "20261219T010000Z",
      endUTC: "20261219T060000Z"
    }
  },

  location: {
    venueName: "Aroem Resto Bekasi",
    address: "Aroem Resto, Jl. Raya Kalimalang No. 88, Bekasi, Jawa Barat",
    googleMapsUrl: "https://share.google/XHbmgLwA8d6MQumUQ",
    // Embed map fallback
    mapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.195727142436!2d106.9850!3d-6.2378!2m3!1f0!0f3f0!0m3!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMTQnMTYuMSJTIDEwNsKwNTknMDYuMCJF!5e0!3m2!1sen!2sid!4v1620000000000!5m2!1sen!2sid"
  },

  gift: {
    title: "Wanna give us some gifts?",
    subtitle: "Doa restu Anda merupakan karunia yang sangat berarti bagi kami. Namun jika Anda ingin memberikan hadiah, Anda dapat mengirimkannya melalui:",
    bankAccounts: [
      {
        bankName: "Bank Mandiri",
        accountNumber: "1330027712819",
        accountHolder: "Aulia Nur Fiqri",
        logo: "https://upload.wikimedia.org/wikipedia/commons/a/ad/Bank_Mandiri_logo_2016.svg",
        // Dynamic QR code API for barcode scan
        qrCodeUrl: "https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=1330027712819&color=1e293b"
      }
    ],
    physicalGift: {
      recipient: "Nadya & Fiqri",
      address: "Aroem Resto Bekasi / C.P Fiqri (0812-XXXX-XXXX), Jl. Raya Kalimalang, Bekasi, Jawa Barat",
      phone: "+62 812-XXXX-XXXX"
    }
  },

  // Audio Backsound Path
  audio: {
    // Put your audio file at public/audio/wedding-bgm.mp3
    src: "/audio/wedding-bgm.mp3",
    autoPlayPrompt: "Putar Musik"
  },

  // Google Sheets & Apps Script Configuration
  google: {
    spreadsheetUrl: "https://docs.google.com/spreadsheets/d/1jwOfILZmbFxAtYD44oz1MvTh7SwXxxkrhnUwSbtSpmI/edit?usp=sharing",
    // Replace this URL after deploying Google Apps Script as Web App
    webAppUrl: "https://script.google.com/macros/s/AKfycbx_PLACEHOLDER/exec"
  },

  // Links & Metadata
  githubRepo: "https://github.com/fiqrinuraul-maker/Digital-Wedding-Invitation.git",

  // Gallery Photos
  gallery: [
    {
      url: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
      caption: "Momen Kebersamaan"
    },
    {
      url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80",
      caption: "Cinta & Harapan"
    },
    {
      url: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80",
      caption: "Menuju Halal"
    },
    {
      url: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=800&q=80",
      caption: "Kebahagiaan Abadi"
    }
  ]
};
