const question = [
    {
        question: "Bubur Manado adalah makanan khas dari?",
        answer: [
            {text: "Yogyakarta", correct: false},
            {text: "Manado", correct: true},
            {text: "Palembang", correct: false},
            {text: "Jakarta", correct: false},
        ]
    },
    {
        question: "Makanan yang terkenal dari Sumatera Barat adalah?",
        answer: [
            {text: "Nasi Kuning", correct: false},
            {text: "Rendang", correct: true},
            {text: "Pempek", correct: false},
            {text: "Coto Makassar", correct: false},
        ]
    },
    {
        question: "Sate biasanya terbuat dari?",
        answer: [
            {text: "Ikan", correct: false},
            {text: "Daging Ayam atau Kambing", correct: true},
            {text: "Sayuran", correct: false},
            {text: "Tahu", correct: false},
        ]
    },
    {
        question: "Pempek merupakan makanan khas dari?",
        answer: [
            {text: "Makassar", correct: false},
            {text: "Palembang", correct: true},
            {text: "Jakarta", correct: false},
            {text: "Bali", correct: false},
        ]
    },
    {
        question: "Kue Rangi adalah kue tradisional dari?",
        answer: [
            {text: "Betawi", correct: true},
            {text: "Bali", correct: false},
            {text: "Papua", correct: false},
            {text: "Aceh", correct: false},
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
