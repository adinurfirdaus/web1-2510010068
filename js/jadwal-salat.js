
/* =========================================================
   jadwal-salat.js — Modul 4: Mengambil Data dari API Publik
   API: https://api.myquran.com (Jadwal Salat Kemenag RI)
   ========================================================= */


/* =========================================================
   1. KONFIGURASI KOTA
   ========================================================= */

// ID kota Banjarmasin pada API MyQuran
// Cara mencari ID kota lain:
// https://api.myquran.com/v2/sholat/kota/cari/namakota

const ID_KOTA = "2113";


/* =========================================================
   2. MENGAMBIL ELEMEN HTML
   ========================================================= */

const kotakJadwal = document.querySelector("#jadwal-salat");

const statusJadwal = kotakJadwal.querySelector(".status");

const daftarWaktu = kotakJadwal.querySelector(".daftar-waktu");


/* =========================================================
   3. MENGHASILKAN TANGGAL HARI INI
   Format: YYYY-MM-DD
   Contoh: 2026-10-20
   ========================================================= */

function tanggalHariIni() {

    const sekarang = new Date();

    const tahun = sekarang.getFullYear();

    const bulan = String(
        sekarang.getMonth() + 1
    ).padStart(2, "0");

    const tanggal = String(
        sekarang.getDate()
    ).padStart(2, "0");


    return `${tahun}-${bulan}-${tanggal}`;

}


/* =========================================================
   4. MENAMPILKAN LIMA WAKTU SALAT
   Data ditampilkan ke dalam <ul class="daftar-waktu">
   ========================================================= */

function tampilkanJadwal(jadwal) {

    // Daftar nama dan waktu salat
    const waktuSalat = [

        ["Subuh", jadwal.subuh],
        ["Zuhur", jadwal.dzuhur],
        ["Asar", jadwal.ashar],
        ["Magrib", jadwal.maghrib],
        ["Isya", jadwal.isya]

    ];


    // Menghapus daftar jadwal sebelumnya
    daftarWaktu.replaceChildren();


    // Membuat elemen untuk setiap waktu salat
    waktuSalat.forEach(([nama, jam]) => {

        const item = document.createElement("li");

        const namaWaktu = document.createElement("span");

        const jamWaktu = document.createElement("strong");


        // Mengisi nama dan jam waktu salat
        namaWaktu.textContent = nama;

        jamWaktu.textContent = jam;


        // Menggabungkan elemen ke dalam daftar
        item.append(namaWaktu, jamWaktu);

        daftarWaktu.append(item);

    });


    // Menampilkan daftar waktu salat
    daftarWaktu.hidden = false;

}


/* =========================================================
   5. MENGAMBIL JADWAL SALAT DARI API SECARA ASINKRON
   Dilengkapi dengan penanganan kesalahan (error handling)
   ========================================================= */

async function muatJadwalSalat() {

    // Menampilkan status ketika data sedang dimuat
    statusJadwal.textContent = "Memuat jadwal salat...";


    // Membuat URL API berdasarkan ID kota dan tanggal
    const url = `https://api.myquran.com/v2/sholat/jadwal/${ID_KOTA}/${tanggalHariIni()}`;


    try {

        // Mengambil data dari API
        const respons = await fetch(url);


        // Memeriksa keberhasilan permintaan
        if (!respons.ok) {

            throw new Error(
                `Server menjawab dengan status ${respons.status}`
            );

        }


        // Mengubah respons menjadi data JSON
        const hasil = await respons.json();


        // Memeriksa ketersediaan data jadwal
        if (!hasil.status) {

            throw new Error("Data jadwal tidak tersedia");

        }


        // Mengambil lokasi dan data jadwal
        const { lokasi, jadwal } = hasil.data;


        // Menampilkan tanggal dan nama lokasi
        statusJadwal.textContent = `${jadwal.tanggal} · ${lokasi}`;


        // Menampilkan daftar waktu salat
        tampilkanJadwal(jadwal);


    } catch (galat) {

        // Menampilkan kesalahan pada console
        console.error("Gagal memuat jadwal salat:", galat);


        // Menampilkan pesan jika jadwal gagal dimuat
        statusJadwal.textContent =
            "Jadwal salat belum dapat dimuat. Periksa koneksi internet lalu muat ulang halaman.";

    }

}


/* =========================================================
   6. MENJALANKAN FUNGSI MUAT JADWAL SALAT
   ========================================================= */

muatJadwalSalat();
