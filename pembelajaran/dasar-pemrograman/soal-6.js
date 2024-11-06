const question = [
    {
        question: "Apa itu variabel dalam pemrograman?",
        answer: [
            {text: "Simbol yang digunakan untuk menyimpan nilai", correct: true},
            {text: "Jenis nilai yang disimpan", correct: false},
            {text: "Fungsi dalam program", correct: false},
            {text: "Struktur data", correct: false}
        ]
    },
    {
        question: "Dalam bahasa C, cara mendeklarasikan variabel dengan tipe data integer adalah?",
        answer: [
            {text: "int = tinggi 178;", correct: false},
            {text: "tinggi : int 178;", correct: false},
            {text: "int tinggi = 178;", correct: true},
            {text: "tinggi int = 178;", correct: false}
        ]
    },
    {
        question: "Apa yang harus dihindari saat menamai variabel dalam bahasa C?",
        answer: [
            {text: "Menggunakan angka", correct: false},
            {text: "Menggunakan underscore", correct: false},
            {text: "Menggunakan kata kunci", correct: true},
            {text: "Menggunakan huruf kecil", correct: false}
        ]
    },
    {
        question: "Dalam bahasa PHP, variabel diawali dengan?",
        answer: [
            {text: "@", correct: false},
            {text: "#", correct: false},
            {text: "$", correct: true},
            {text: "%", correct: false}
        ]
    },
    {
        question: "Tipe data majemuk dalam pemrograman seperti array memiliki karakter yaitu?",
        answer: [
            {text: "Hanya bisa menyimpan satu nilai", correct: false},
            {text: "Menyimpan banyak nilai dalam satu variabel", correct: true},
            {text: "Selalu bertipe data integer", correct: false},
            {text: "Tidak dapat digunakan dalam PHP", correct: false}
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
