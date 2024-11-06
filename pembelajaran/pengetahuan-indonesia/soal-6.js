const question = [
    {
        question: "Bahasa yang digunakan oleh suku Sunda adalah?",
        answer: [
            {text: "Bahasa Betawi", correct: false},
            {text: "Bahasa Jawa", correct: false},
            {text: "Bahasa Sunda", correct: true},
            {text: "Bahasa Madura", correct: false},
        ]
    },
    {
        question: "Suku mana yang terkenal dengan ondel-ondel?",
        answer: [
            {text: "Suku Minangkabau", correct: false},
            {text: "Suku Betawi", correct: true},
            {text: "Suku Madura", correct: false},
            {text: "Suku Dayak", correct: false},
        ]
    },
    {
        question: "Bahasa yang digunakan oleh suku Banjar adalah?",
        answer: [
            {text: "Bahasa Madura", correct: false},
            {text: "Bahasa Batak", correct: false},
            {text: "Bahasa Banjar", correct: true},
            {text: "Bahasa Bugis", correct: false},
        ]
    },
    {
        question: "Suku Melayu terdapat di Provinsi?",
        answer: [
            {text: "Kalimantan Selatan", correct: false},
            {text: "Bangka Belitung", correct: true},
            {text: "Sumatera Barat", correct: false},
            {text: "Sulawesi Selatan", correct: false},
        ]
    },
    {
        question: "Apa nama suku yang terkenal dengan kebudayaan dan tradisi ritual yang kuat di Kalimantan?",
        answer: [
            {text: "Suku Banjar", correct: false},
            {text: "Suku Dayak", correct: true},
            {text: "Suku Bugis", correct: false},
            {text: "Suku Asmat", correct: false},
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
