const question = [
    {
        question: "Apa langkah pertama sebelum memilih bahasa pemrograman?",
        answer: [
            {text: "Memilih yang paling populer", correct: false},
            {text: "Memahami tujuan dan minat kita", correct: true},
            {text: "Memilih yang paling mudah", correct: false},
            {text: "Mengikuti saran teman", correct: false}
        ]
    },
    {
        question: "Karakteristik bahasa pemrograman tingkat rendah adalah?",
        answer: [
            {text: "Mudah dipahami manusia", correct: false},
            {text: "Lebih lambat bagi komputer", correct: false},
            {text: "Sulit dipahami manusia", correct: true},
            {text: "Hanya bisa berjalan di satu mesin", correct: false}
        ]
    },
    {
        question: "Mengapa penting fokus pada satu bahasa pemrograman?",
        answer: [
            {text: "Agar cepat menguasai semua bahasa", correct: false},
            {text: "Karena bisa menerapkannya ke bahasa lain", correct: true},
            {text: "Agar dapat gaji tinggi", correct: false},
            {text: "Untuk mengikuti tren", correct: false}
        ]
    },
    {
        question: "Bahasa pemrograman tingkat tinggi lebih?",
        answer: [
            {text: "Mudah dimengerti komputer", correct: false},
            {text: "Sulit dipahami manusia", correct: false},
            {text: "Cepat dieksekusi komputer", correct: false},
            {text: "Mudah dipahami manusia", correct: true}
        ]
    },
    {
        question: "Untuk pemula, penting memilih bahasa yang?",
        answer: [
            {text: "Paling populer di media sosial", correct: false},
            {text: "Memiliki permintaan tinggi di pasar kerja", correct: true},
            {text: "Digunakan oleh semua orang", correct: false},
            {text: "Paling sering digunakan di proyek open-source", correct: false}
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
