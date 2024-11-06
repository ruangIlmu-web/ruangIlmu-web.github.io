const question = [
    {
        question: "Siapakah yang dijuluki sebagai Bapak Komputer?",
        answer: [
            {text: "Howard Aiken", correct: false},
            {text: "Charles Babbage", correct: true},
            {text: "Alan Turing", correct: false},
            {text: "John Atanasoff", correct: false}
        ]
    },
    {
        question: "Komputer pertama yang dapat digunakan untuk tujuan umum adalah?",
        answer: [
            {text: "UNIVAC", correct: false},
            {text: "Colossus", correct: false},
            {text: "ENIAC", correct: true},
            {text: "IBM 700", correct: false}
        ]
    },
    {
        question: "Generasi kedua komputer ditandai dengan?",
        answer: [
            {text: "Penggunaan tabung vakum", correct: false},
            {text: "Penggunaan mikroprosessor", correct: false},
            {text: "Penggunaan sirkuit terpadu", correct: false},
            {text: "Penggunaan transistor", correct: true}
        ]
    },
    {
        question: "Komputer mini yang memengaruhi generasi berikutnya muncul pada?",
        answer: [
            {text: "Generasi pertama", correct: false},
            {text: "Generasi kedua", correct: false},
            {text: "Generasi ketiga", correct: true},
            {text: "Generasi keempat", correct: false}
        ]
    },
    {
        question: "Pada generasi kelima, teknologi komputer berkembang ke arah?",
        answer: [
            {text: "Penggunaan tabung vakum", correct: false},
            {text: "Teknologi layar sentuh dan miniaturisasi", correct: true},
            {text: "Penggunaan transistor", correct: false},
            {text: "Penggunaan mikroprosesor", correct: false}
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
