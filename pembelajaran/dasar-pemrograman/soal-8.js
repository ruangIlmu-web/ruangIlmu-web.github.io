const question = [
    {
        question: "Apa yang dimaksud dengan struktur data?",
        answer: [
            {text: "Metode untuk menulis program", correct: false},
            {text: "Metode untuk menyimpan dan mengatur data", correct: true},
            {text: "Tipe bahasa pemrograman", correct: false},
            {text: "Alat untuk mengolah gambar", correct: false}
        ]
    },
    {
        question: "Keunggulan utama dari array adalah?",
        answer: [
            {text: "Akses data yang lambat", correct: false},
            {text: "Penyimpanan data dinamis", correct: false},
            {text: "Pencarian data menggunakan indeks", correct: true},
            {text: "Memori yang lebih sedikit", correct: false}
        ]
    },
    {
        question: "Stack adalah struktur data dengan urutan?",
        answer: [
            {text: "LIFO", correct: true},
            {text: "FIFO", correct: false},
            {text: "Tabel", correct: false},
            {text: "Satu jenis data", correct: false}
        ]
    },
    {
        question: "Traversal yang digunakan pada linked list adalah?",
        answer: [
            {text: "Acak", correct: false},
            {text: "Berurutan", correct: false},
            {text: "Sekuensial", correct: true},
            {text: "Hierarkis", correct: false}
        ]
    },
    {
        question: "Kelebihan utama hash table adalah?",
        answer: [
            {text: "Memerlukan lebih banyak memori", correct: false},
            {text: "Akses data yang cepat", correct: true},
            {text: "Struktur yang lebih sederhana", correct: false},
            {text: "Proses penambahan data cepat", correct: false}
        ]
    }
];

const questionElement = document.getElementById("question");
const answerContainer = document.getElementById("answer");
const nextButton = document.getElementById("next-button");
const resultContainer = document.getElementById("result");
const restartButton = document.getElementById("restart-button");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;

    // Sembunyikan tombol 'Next' dan hasil
    nextButton.style.display = "none";
    resultContainer.style.display = "none";
    restartButton.style.display = "none";

    // Tampilkan soal pertama
    showQuestion();
}

function showQuestion() {
    let currentQuestion = question[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    // Kosongkan kontainer jawaban
    answerContainer.innerHTML = "";

    // Buat tombol untuk setiap jawaban
    currentQuestion.answer.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("button");

        // Tandai jawaban yang benar
        button.dataset.correct = answer.correct;

        // Tambahkan event listener untuk menangani klik jawaban
        button.addEventListener("click", selectAnswer);

        // Tambahkan tombol ke container jawaban
        answerContainer.appendChild(button);
    });
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const isCorrect = selectedButton.dataset.correct === "true";

    if (isCorrect) {
        score++;
    }

    Array.from(answerContainer.children).forEach(button => {
        button.disabled = true;
    });
    // Lanjut ke pertanyaan berikutnya jika masih ada
    currentQuestionIndex++;

    if (currentQuestionIndex < question.length) {
        showQuestion(); // Tampilkan soal berikutnya
    } else {
        showResult(); // Tampilkan hasil akhir setelah soal terakhir
    }
}

function showResult() {
    // Sembunyikan tombol 'Next' dan tampilkan hasil skor
    resultContainer.style.display = "block";
    resultContainer.innerHTML = `Skor Anda: ${score} dari ${question.length}`;

    // Tampilkan tombol untuk memulai ulang kuis
    restartButton.style.display = "block";
}

// Event listener untuk tombol restart
restartButton.addEventListener("click", startQuiz);

// Mulai kuis pertama kali
startQuiz();
