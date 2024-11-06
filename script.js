const menuToggle = document.querySelector('.menu-toggle input');
const nav = document.querySelector('.navbar');

// Fungsi untuk mendapatkan nama file halaman saat ini secara otomatis
function getPageKey() {
    // Ambil nama file dari URL (misalnya list-materi-dasar.html atau materi-dasar-1.html)
    const currentPage = window.location.pathname.split('/').pop();
    return `activeButton_${currentPage}`;
}

// Toggle menu slide
menuToggle.addEventListener('click', function() {
    nav.classList.toggle('slide');
});

// Mendapatkan elemen tombol
const mengertiButton = document.getElementById('mengertiButton');
const belajarLagiButton = document.getElementById('belajarLagiButton');

// Fungsi untuk menambahkan kelas clicked
function toggleButton(button) {
    // Jika tombol yang diklik sudah aktif (clicked), maka hilangkan kelasnya
    if (button.classList.contains('clicked')) {
        button.classList.remove('clicked');
        // Hapus status tombol dari localStorage
        localStorage.removeItem(getPageKey());
    } else {
        // Jika tombol yang diklik belum aktif, maka aktifkan dan nonaktifkan tombol lainnya
        mengertiButton.classList.remove('clicked');
        belajarLagiButton.classList.remove('clicked');
        button.classList.add('clicked');
        
        // Simpan status tombol yang aktif ke localStorage
        localStorage.setItem(getPageKey(), button.id);
    }
}

// Menambahkan event listener untuk tombol
mengertiButton.addEventListener('click', function() {
    toggleButton(mengertiButton);
});

belajarLagiButton.addEventListener('click', function() {
    toggleButton(belajarLagiButton);
});

// Memeriksa status tombol aktif saat halaman dimuat
document.addEventListener('DOMContentLoaded', function() {
    const activeButton = localStorage.getItem(getPageKey());

    if (activeButton) {
        // Jika ada tombol yang aktif, beri kelas 'clicked' pada tombol tersebut
        const button = document.getElementById(activeButton);
        if (button) {
            button.classList.add('clicked');
        }
    }
});
