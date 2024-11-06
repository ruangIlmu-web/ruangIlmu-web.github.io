const question = [
    {
        question: "Apa itu pemrograman?",
        answer: [
            {text: "Memasukkan data ke komputer", correct: false},
            {text: "Membuat program dengan kode", correct: true},
            {text: "Menginstal aplikasi", correct: false},
            {text: "Memperbaiki perangkat keras", correct: false},
        ]
    },
    {
        question: "Bahasa pemrograman yang memakai bilangan biner disebut?",
        answer: [
            {text: "Assembly", correct: false},
            {text: "Mesin", correct: true},
            {text: "Tingkat Tinggi", correct: false},
            {text: "Sehari-hari", correct: false},
        ]
    },
    {
        question: "Bahasa tingkat tinggi berbeda karena?",
        answer: [
            {text: "Menggunakan singkatan", correct: false},
            {text: "Dipahami tanpa kompilasi", correct: false},
            {text: "Mudah dipahami manusia", correct: true},
            {text: "Tidak perlu kode", correct: false},
        ]
    },
    {
        question: "Python sering digunakan untuk?",
        answer: [
            {text: "Desain grafis", correct: false},
            {text: "Game dan animasi", correct: false},
            {text: "Web, bisnis, dan AI", correct: true},
            {text: "Perangkat keras", correct: false},
        ]
    },
    {
        question: "Programmer tak perlu belajar semua bahasa karena?",
        answer: [
            {text: "Mudah dipelajari", correct: false},
            {text: "Fungsi tiap bahasa berbeda", correct: true},
            {text: "Semua bahasa sama", correct: false},
            {text: "Hanya untuk satu bidang", correct: false},
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
