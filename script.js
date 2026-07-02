const tombol = document.getElementById('btn-main');
const tombolReplay = document.getElementById('btn-replay');
const wadahLirik = document.getElementById('lyric-container');
const musik = document.getElementById('my-music');
const barisLirik = Array.from(document.querySelectorAll('.lyric-line'));

let sudahDimulai = false;
let timeoutLirik = [];

// Waktu muncul tiap lirik (dalam milidetik)
// contoh: 0, 1800, 3600, 5400, ...
const waktuLirik = [0, 5000, 9000, 13500, 18000, 21650, 25500, 32000, 37000, 41200, 45000, 46500, 50000];

function bersihkanLirik() {
    barisLirik.forEach((item) => item.classList.remove('active'));
    timeoutLirik.forEach((id) => clearTimeout(id));
    timeoutLirik = [];
}

function tampilkanLirikBerurutan() {
    bersihkanLirik();

    barisLirik.forEach((baris, index) => {
        const waktu = waktuLirik[index] ?? (index * 1800);

        const id = setTimeout(() => {
            barisLirik.forEach((item) => item.classList.remove('active'));
            baris.classList.add('active');
        }, waktu);

        timeoutLirik.push(id);
    });
}

async function mulaiLirik() {
    sudahDimulai = true;

    try {
        await musik.play();
        wadahLirik.classList.remove('hidden');
        tombol.style.display = 'none';
        tombolReplay.classList.add('hidden');
        tampilkanLirikBerurutan();

        musik.addEventListener('ended', tampilkanTombolReplay, { once: true });
    } catch (error) {
        console.error('Gagal memutar musik:', error);
    }
}

function tampilkanTombolReplay() {
    tombolReplay.classList.remove('hidden');
}

tombol.addEventListener('click', mulaiLirik);

tombolReplay.addEventListener('click', async function () {
    musik.currentTime = 0;
    await musik.play();

    bersihkanLirik();
    tombolReplay.classList.add('hidden');
    tampilkanLirikBerurutan();
});