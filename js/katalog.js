
/* =========================================================
   katalog.js — Modul 3: Menampilkan Katalog dengan DOM
   Praktikum Pemrograman Web 1 · Sasirangan Banua
   ========================================================= */


/* =========================================================
   1. DATA KATALOG
   Array yang berisi objek-objek produk
   ========================================================= */

const katalog = [

    // Produk 1
    {
        id: 1,
        nama: "Kain Motif Gigi Haruan",
        kategori: "kain",
        harga: 185000,
        gambar: "img/gigi-haruan.svg",
        deskripsi: "Kain katun 2 meter bermotif zig-zag menyerupai gigi ikan haruan."
    },

    // Produk 2
    {
        id: 2,
        nama: "Kain Motif Kambang Kacang",
        kategori: "kain",
        harga: 175000,
        gambar: "img/kambang-kacang.svg",
        deskripsi: "Motif bunga kacang yang melambangkan keakraban dan kerukunan."
    },

    // Produk 3
    {
        id: 3,
        nama: "Selendang Iris Pudak",
        kategori: "aksesoris",
        harga: 120000,
        gambar: "img/iris-pudak.svg",
        deskripsi: "Selendang ringan bermotif irisan daun pudak (pandan)."
    }

    // Lanjutkan penambahan produk lainnya
    // Minimal 8 produk untuk tema Sasirangan Banua

];

// 2. Ambil elemen-elemen HTML yang akan dimanipulasi 
const daftarKatalog = document.querySelector("#daftar-katalog"); 
const inputCari = document.querySelector("#cari"); 
const tombolFilter = document.querySelectorAll(".tombol-filter"); 
const infoJumlah = document.querySelector("#info-jumlah"); 
 
// 3. Status filter yang sedang aktif 
let kategoriAktif = "semua"; 
 
// 4. Mengubah angka menjadi format Rupiah, contoh: 185000 -> "Rp 185.000" 
function formatRupiah(angka) { 
  return new Intl.NumberFormat("id-ID", { 
    style: "currency", 
    currency: "IDR", 
    minimumFractionDigits: 0, 
  }).format(angka); 
}


/* =========================================================
   5. MEMBUAT ELEMEN <article> UNTUK SATU PRODUK
   Fungsi untuk membuat kartu produk menggunakan DOM
   ========================================================= */

function buatKartu(produk) {

    // Membuat elemen article sebagai kartu produk
    const kartu = document.createElement("article");
    kartu.className = "kartu";


    // Membuat elemen gambar produk
    const gambar = document.createElement("img");
    gambar.src = produk.gambar;
    gambar.alt = produk.nama;
    gambar.width = 600;
    gambar.height = 400;
    gambar.loading = "lazy";


    // Membuat wadah untuk isi kartu
    const isi = document.createElement("div");
    isi.className = "kartu-isi";


    // Membuat label kategori produk
    const label = document.createElement("span");
    label.className = "label-kategori";
    label.textContent = produk.kategori;


    // Membuat judul produk
    const judul = document.createElement("h3");
    judul.textContent = produk.nama;


    // Membuat deskripsi produk
    const deskripsi = document.createElement("p");
    deskripsi.textContent = produk.deskripsi;


    // Membuat harga produk
    const harga = document.createElement("p");
    harga.className = "harga";
    harga.textContent = formatRupiah(produk.harga);


    // Menggabungkan seluruh elemen ke dalam kartu
    isi.append(label, judul, deskripsi, harga);
    kartu.append(gambar, isi);


    // Mengembalikan elemen kartu produk
    return kartu;

}

// 6. Menampilkan sekumpulan produk ke dalam #daftar-katalog 
function tampilkanKatalog(daftarProduk) { 
  daftarKatalog.replaceChildren(); // kosongkan isi sebelumnya 
 
  if (daftarProduk.length === 0) { 
    const kosong = document.createElement("p"); 
    kosong.textContent = "Produk tidak ditemukan. Coba kata kunci lain."; 
    daftarKatalog.append(kosong); 
  } 
 
  daftarProduk.forEach((produk) => { 
    daftarKatalog.append(buatKartu(produk)); 
  }); 
 
  infoJumlah.textContent = `Menampilkan ${daftarProduk.length} dari ${katalog.length} produk`; 
}

// 10. Tampilkan semua produk ketika halaman pertama kali dibuka 
tampilkanKatalog(katalog);