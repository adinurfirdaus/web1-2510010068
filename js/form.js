
/* =========================================================
   form.js — Modul 3: Validasi Formulir & Pesan WhatsApp
   Praktikum Pemrograman Web 1 · Sasirangan Banua
   ========================================================= */


/* =========================================================
   1. MENGAMBIL ELEMEN HTML
   ========================================================= */

const form = document.querySelector("#form-pesan");
const hasilPesan = document.querySelector("#hasil-pesan");
const ringkasan = document.querySelector("#ringkasan");
const tautanWa = document.querySelector("#tautan-wa");


/* =========================================================
   2. NOMOR WHATSAPP TOKO
   Nomor fiktif, hanya untuk latihan
   ========================================================= */

const NOMOR_TOKO = "6281234567890";


/* =========================================================
   3. ATURAN VALIDASI
   Fungsi pemeriksa dan pesan kesalahan untuk setiap kolom
   ========================================================= */

const aturan = {

    // Validasi nama
    nama: {
        cek: (nilai) => nilai.trim().length >= 3,
        pesan: "Nama wajib diisi, minimal 3 huruf."
    },

    // Validasi nomor WhatsApp
    wa: {
        cek: (nilai) => /^08\d{8,11}$/.test(nilai.trim()),
        pesan: "Nomor WhatsApp diawali 08 dan terdiri atas 10–13 digit angka."
    },

    // Validasi email (boleh dikosongkan)
    email: {
        cek: (nilai) =>
            nilai.trim() === "" ||
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(nilai.trim()),

        pesan: "Format surel belum benar, contoh: nama@domain.com."
    },

    // Validasi pilihan produk
    produk: {
        cek: (nilai) => nilai !== "",
        pesan: "Silakan pilih produk."
    },

    // Validasi jumlah produk
    jumlah: {
        cek: (nilai) =>
            Number.isInteger(Number(nilai)) &&
            Number(nilai) >= 1 &&
            Number(nilai) <= 50,

        pesan: "Jumlah harus bilangan bulat 1 sampai 50."
    }

};


/* =========================================================
   4. MENAMPILKAN ATAU MENGHAPUS PESAN KESALAHAN
   ========================================================= */

function tampilkanError(input, pesan) {

    const wadahError = document.querySelector(`#error-${input.id}`);

    wadahError.textContent = pesan;

    input.setAttribute(
        "aria-invalid",
        pesan !== "" ? "true" : "false"
    );

}


/* =========================================================
   5. MEMERIKSA VALIDITAS SATU KOLOM
   Hasil: true (valid) atau false (tidak valid)
   ========================================================= */

function validasiKolom(input) {

    // Pemeriksaan khusus untuk checkbox
    if (input.type === "checkbox") {

        const dicentang = input.checked;

        tampilkanError(
            input,
            dicentang ? "" : "Centang persetujuan terlebih dahulu."
        );

        return dicentang;

    }


    // Mengambil aturan validasi berdasarkan nama input
    const aturanKolom = aturan[input.name];

    const valid = aturanKolom.cek(input.value);


    // Menampilkan pesan kesalahan jika input tidak valid
    tampilkanError(
        input,
        valid ? "" : aturanKolom.pesan
    );

    return valid;

}


/* =========================================================
   6. DAFTAR KOLOM YANG PERLU DIPERIKSA
   ========================================================= */

const kolomDiperiksa = [
    "nama",
    "wa",
    "email",
    "produk",
    "jumlah",
    "setuju"
].map((nama) => form.elements[nama]);


/* =========================================================
   7. VALIDASI ULANG KETIKA ISI KOLOM BERUBAH
   Pesan kesalahan langsung diperbarui setelah input berubah
   ========================================================= */

kolomDiperiksa.forEach((input) => {

    input.addEventListener("input", () => {

        if (input.getAttribute("aria-invalid") === "true") {
            validasiKolom(input);
        }

    });

});


/* =========================================================
   8. MEMERIKSA SEMUA KOLOM KETIKA FORMULIR DIKIRIM
   ========================================================= */

form.addEventListener("submit", (event) => {

    // Mencegah halaman dimuat ulang
    event.preventDefault();


    // Menyimpan kolom pertama yang tidak valid
    let kolomSalahPertama = null;


    // Memeriksa seluruh kolom formulir
    kolomDiperiksa.forEach((input) => {

        const valid = validasiKolom(input);

        if (!valid && kolomSalahPertama === null) {
            kolomSalahPertama = input;
        }

    });


    // Jika terdapat kesalahan, arahkan ke kolom pertama
    if (kolomSalahPertama !== null) {

        hasilPesan.hidden = true;

        kolomSalahPertama.focus();

        return;

    }


    /* =====================================================
       9. MENYUSUN PESAN WHATSAPP
       Dilakukan jika semua kolom sudah valid
       ===================================================== */

    const data = new FormData(form);


    // Menyusun isi pesan pesanan
    const pesan = [

        "Assalamu'alaikum, saya ingin memesan:",
        `Nama: ${data.get("nama").trim()}`,
        `Produk: ${data.get("produk")}`,
        `Jumlah: ${data.get("jumlah")}`,
        `Pengambilan: ${data.get("pengambilan")}`,
        `Catatan: ${data.get("catatan").trim() || "-"}`

    ].join("\n");


    // Menampilkan ringkasan pesanan
    ringkasan.textContent = pesan;


    // Membuat tautan WhatsApp berdasarkan isi pesan
    tautanWa.href =
        `https://wa.me/${NOMOR_TOKO}?text=${encodeURIComponent(pesan)}`;


    // Menampilkan hasil pesan
    hasilPesan.hidden = false;


    // Mengarahkan tampilan ke bagian ringkasan pesan
    hasilPesan.scrollIntoView({
        behavior: "smooth"
    });

});

