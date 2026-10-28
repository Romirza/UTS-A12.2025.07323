// ==========================================
// script.js - Landing Page OOTD Studio
// Fitur: sapaan, dark mode, daftar gaya,
// keranjang, galeri, FAQ, validasi form,
// pencarian produk, dan navbar saat scroll
// ==========================================

// ----- Fitur 1: sapaan sesuai jam -----
function sapa(jam) {
  if (jam < 11) {
    return 'Selamat pagi';
  } else if (jam < 15) {
    return 'Selamat siang';
  } else if (jam < 18) {
    return 'Selamat sore';
  } else {
    return 'Selamat malam';
  }
}

const salam = document.querySelector('#salam');
const jamSekarang = new Date().getHours();

salam.textContent = `${sapa(jamSekarang)}, Fashionista!`;

// ----- Fitur 2: dark/light mode -----
const tombolTema = document.querySelector('#tema');

tombolTema.addEventListener('click', () => {
  document.body.classList.toggle('dark');

  if (document.body.classList.contains('dark')) {
    tombolTema.textContent = '☀️ Mode Terang';
  } else {
    tombolTema.textContent = '🌙 Mode Gelap';
  }
});

// ----- Fitur 3: daftar gaya favorit -----
const daftarGaya = [
  'Casual',
  'Streetwear',
  'Minimalis',
  'Korean Style',
  'Vintage',
  'Formal'
];

const listGaya = document.querySelector('#daftarGaya');

for (const gaya of daftarGaya) {
  const item = document.createElement('li');
  item.textContent = gaya;
  listGaya.appendChild(item);
}

// ----- Fitur 4: keranjang dan total harga -----
const hargaItem = {
  'Collar Jacket': 278000,
  'Kemeja Linen Oversize': 189000,
  'Kaos Putih Fitted tee': 150000,
  'Wide-leg trousers': 159000,
  'Ikat Pinggang': 95000,
  'Sepatu kulit': 389000,
  'Sweater Rajut Lengan Panjang': 289000,
  'Celana Panjang Denim': 198000,
  'Hoodie Oversize': 289000
};

const pilihItem = document.querySelector('#pilihItem');
const tombolTambah = document.querySelector('#tambah');
const tombolKurangi = document.querySelector('#kurangi');
const angka = document.querySelector('#angka');
const infoPesanan = document.querySelector('#infoPesanan');
const total = document.querySelector('#total');
let jumlah = 0;

function formatRupiah(nilai) {
  return 'Rp ' + nilai.toLocaleString('id-ID');
}

function perbaruiPesanan() {
  const harga = hargaItem[pilihItem.value];

  angka.textContent = jumlah;
  total.textContent = formatRupiah(jumlah * harga);

  if (jumlah >= 10) {
    angka.classList.add('banyak');
  } else {
    angka.classList.remove('banyak');
  }

  if (jumlah === 0) {
    infoPesanan.textContent = 'Keranjang masih kosong.';
  } else if (jumlah >= 10) {
    infoPesanan.textContent = `Wah, ${jumlah} pcs! Hubungi kami untuk harga reseller.`;
  } else {
    infoPesanan.textContent = `${jumlah} pcs ${pilihItem.value} masuk keranjang.`;
  }
}

tombolTambah.addEventListener('click', () => {
  jumlah++;
  perbaruiPesanan();
});

tombolKurangi.addEventListener('click', () => {
  if (jumlah > 0) {
    jumlah--;
  }
  perbaruiPesanan();
});

pilihItem.addEventListener('change', perbaruiPesanan);

// Klik baris tabel untuk memilih item
const barisKoleksi = document.querySelectorAll('.tabel-koleksi tbody tr');

barisKoleksi.forEach((baris) => {
  baris.addEventListener('click', () => {
    pilihItem.value = baris.cells[0].textContent;
    perbaruiPesanan();
  });
});

// ----- Fitur 5: pencarian produk -----
const inputCari = document.querySelector('#cari');

inputCari.addEventListener('input', () => {
  const kata = inputCari.value.toLowerCase().trim();

  barisKoleksi.forEach((baris) => {
    const teksBaris = baris.textContent.toLowerCase();

    if (teksBaris.includes(kata)) {
      baris.style.display = '';
    } else {
      baris.style.display = 'none';
    }
  });
});

// ----- Fitur 6: galeri foto interaktif -----
const gambarUtama = document.querySelector('#utama');
const keterangan = document.querySelector('#keterangan');
const thumbnail = document.querySelectorAll('.thumb');

function pilihGambar(foto) {
  gambarUtama.src = foto.src;
  gambarUtama.alt = foto.alt;
  keterangan.textContent = foto.alt;

  thumbnail.forEach((item) => {
    item.classList.remove('aktif');
  });

  foto.classList.add('aktif');
}

thumbnail.forEach((foto) => {
  foto.addEventListener('click', () => {
    pilihGambar(foto);
  });

  foto.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      pilihGambar(foto);
    }
  });
});

// ----- Fitur 7: accordion / FAQ -----
const semuaPertanyaan = document.querySelectorAll('.pertanyaan');

semuaPertanyaan.forEach((btn) => {
  btn.addEventListener('click', () => {
    const jawaban = btn.nextElementSibling;
    const sedangBuka = jawaban.classList.contains('terbuka');

    semuaPertanyaan.forEach((item) => {
      item.classList.remove('buka');
      item.nextElementSibling.classList.remove('terbuka');
    });

    if (!sedangBuka) {
      jawaban.classList.add('terbuka');
      btn.classList.add('buka');
    }
  });
});

// ----- Fitur 8: validasi form -----
const form = document.querySelector('#formKontak');
const inputNama = document.querySelector('#nama');
const inputEmail = document.querySelector('#email');
const inputGaya = document.querySelector('#jenisGaya');
const inputKeperluan = document.querySelector('#keperluan');
const inputIsi = document.querySelector('#isi');
const hitung = document.querySelector('#hitung');
const pesanForm = document.querySelector('#pesanForm');

function tampilkanPesan(teks, berhasil) {
  pesanForm.textContent = teks;
  pesanForm.classList.remove('gagal', 'berhasil');

  if (berhasil) {
    pesanForm.classList.add('berhasil');
  } else {
    pesanForm.classList.add('gagal');
  }
}

inputIsi.addEventListener('input', () => {
  hitung.textContent = `${inputIsi.value.length} / 200 karakter`;
});

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const nama = inputNama.value.trim();
  const email = inputEmail.value.trim();
  const isi = inputIsi.value.trim();

  if (nama === '') {
    tampilkanPesan('Nama wajib diisi.', false);
  } else if (nama.length < 3) {
    tampilkanPesan('Nama minimal 3 karakter.', false);
  } else if (email === '' || !email.includes('@') || !email.includes('.')) {
    tampilkanPesan('Format email belum benar.', false);
  } else if (inputGaya.value === '') {
    tampilkanPesan('Silakan pilih gaya favorit.', false);
  } else if (inputKeperluan.value === '') {
    tampilkanPesan('Silakan pilih keperluan.', false);
  } else if (isi.length < 10) {
    tampilkanPesan('Pesan minimal 10 karakter.', false);
  } else {
    tampilkanPesan(`Terima kasih, ${nama}! Pesanmu sudah kami terima.`, true);
    form.reset();
    hitung.textContent = '0 / 200 karakter';
  }
});

// ----- Fitur 9: navbar saat di-scroll -----
const navbar = document.querySelector('.navbar-ootd');
const linkNavbar = document.querySelectorAll('.nav-link');
const semuaSection = document.querySelectorAll('main section');
const bungkusTabel = document.querySelector('.bungkus-tabel');
const kepalaTabel = document.querySelector('.tabel-koleksi thead');

function perbaruiHeaderTabel() {
  const posisiTabel = bungkusTabel.getBoundingClientRect();
  const batasAtas = 70;
  const tinggiHeader = kepalaTabel.getBoundingClientRect().height;
  const headerMelekat = posisiTabel.top <= batasAtas
    && posisiTabel.bottom > batasAtas + tinggiHeader;

  kepalaTabel.classList.toggle('animasi-turun', headerMelekat);
}

function tandaiMenuAktif() {
  let idAktif = '';

  semuaSection.forEach((sec) => {
    if (window.scrollY >= sec.offsetTop - 120) {
      idAktif = sec.id;
    }
  });

  linkNavbar.forEach((link) => {
    link.classList.remove('aktif');

    if (link.getAttribute('href') === '#' + idAktif) {
      link.classList.add('aktif');
    }
  });
}

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scroll');
  } else {
    navbar.classList.remove('scroll');
  }

  tandaiMenuAktif();
  perbaruiHeaderTabel();
});

// ----- Tambahan: tutup menu navbar pada perangkat mobile -----
const menuNavbar = document.querySelector('#menuNavbar');

linkNavbar.forEach((link) => {
  link.addEventListener('click', () => {
    menuNavbar.classList.remove('show');
  });
});

// ----- Tambahan: tahun pada footer otomatis -----
const tahun = document.querySelector('#tahun');
tahun.textContent = new Date().getFullYear();

// Jalankan sekali saat halaman pertama dibuka
tandaiMenuAktif();
perbaruiHeaderTabel();
