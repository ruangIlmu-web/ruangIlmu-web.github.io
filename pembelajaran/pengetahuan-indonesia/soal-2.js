const question = [
    {
        question: "Apa nama ibukota Indonesia yang terletak di Pulau Jawa?",
        answer: [
            {text: "Surabaya", correct: false},
            {text: "Jakarta", correct: true},
            {text: "Bandung", correct: false},
            {text: "Yogyakarta", correct: false},
        ]
    },
    {
        question: "Pulau Kalimantan dikenal dengan julukan?",
        answer: [
            {text: "Pulau Seribu Danau", correct: false},
            {text: "Pulau Seribu Sungai", correct: true},
            {text: "Pulau Seribu Kebun", correct: false},
            {text: "Pulau Seribu Hutan", correct: false},
        ]
    },
    {
        question: "Bentuk Pulau Papua sering disamakan dengan?",
        answer: [
            {text: "Kepala Ular", correct: false},
            {text: "Kepala Burung", correct: true},
            {text: "Kepala Kucing", correct: false},
            {text: "Kepala Kuda", correct: false},
        ]
    },
    {
        question: "Pulau Sulawesi memiliki bentuk yang mirip dengan huruf?",
        answer: [
            {text: "L", correct: false},
            {text: "U", correct: false},
            {text: "T", correct: false},
            {text: "K", correct: true},
        ]
    },
    {
        question: "Pulau mana yang terletak di ujung paling barat Indonesia?",
        answer: [
            {text: "Pulau Kalimantan", correct: false},
            {text: "Pulau Sumatera", correct: true},
            {text: "Pulau Papua", correct: false},
            {text: "Pulau Jawa", correct: false},
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
