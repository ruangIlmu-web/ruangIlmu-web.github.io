const question = [
    {
        question: "Apa itu algoritma dalam pemrograman?",
        answer: [
            {text: "Struktur data", correct: false},
            {text: "Urutan untuk pemecahan masalah", correct: true},
            {text: "Bahasa pemrograman", correct: false},
            {text: "Perangkat keras", correct: false}
        ]
    },
    {
        question: "Algoritma untuk mencari data disebut?",
        answer: [
            {text: "Searching", correct: true},
            {text: "Sorting", correct: false},
            {text: "Iterasi", correct: false},
            {text: "Rekursi", correct: false}
        ]
    },
    {
        question: "Pencarian data secara berurutan adalah?",
        answer: [
            {text: "Binary Search", correct: false},
            {text: "Sequential Search", correct: true},
            {text: "Quick Sort", correct: false},
            {text: "Bubble Sort", correct: false}
        ]
    },
    {
        question: "Algoritma pengurutan yang membandingkan data ke-n dengan data ke-(n+1) adalah?",
        answer: [
            {text: "Quick Sort", correct: false},
            {text: "Selection Sort", correct: false},
            {text: "Bubble Sort", correct: true},
            {text: "Insertion Sort", correct: false}
        ]
    },
    {
        question: "Notasi untuk mengukur kompleksitas algoritma adalah?",
        answer: [
            {text: "Time Analysis", correct: false},
            {text: "Space Complexity", correct: false},
            {text: "Time Complexity Analysis", correct: false},
            {text: "Big O Notation", correct: true}
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
