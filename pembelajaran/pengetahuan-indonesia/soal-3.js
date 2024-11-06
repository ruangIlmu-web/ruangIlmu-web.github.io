const question = [
    {
        question: "Tari tradisional yang berasal dari Nanggroe Aceh Darussalam adalah?",
        answer: [
            {text: "Tari Serampang 12", correct: false},
            {text: "Tari Saman", correct: true},
            {text: "Tari Merak", correct: false},
            {text: "Tari Jaipong", correct: false},
        ]
    },
    {
        question: "Tari yang terkenal dari Sumatera Utara adalah?",
        answer: [
            {text: "Tari Piring", correct: false},
            {text: "Tari Baluse", correct: true},
            {text: "Tari Saman", correct: false},
            {text: "Tari Bedaya", correct: false},
        ]
    },
    {
        question: "Tari Serimpi berasal dari daerah?",
        answer: [
            {text: "Jawa Timur", correct: false},
            {text: "Jawa Tengah", correct: false},
            {text: "Yogyakarta", correct: true},
            {text: "Jawa Barat", correct: false},
        ]
    },
    {
        question: "Tari Kecak berasal dari?",
        answer: [
            {text: "Bali", correct: true},
            {text: "Nusa Tenggara Barat", correct: false},
            {text: "Kalimantan", correct: false},
            {text: "Papua", correct: false},
        ]
    },
    {
        question: "Tari yang biasanya ditampilkan sebagai simbol pemujaan kepada Tuhan adalah?",
        answer: [
            {text: "Tari Remo", correct: false},
            {text: "Tari Kuda Kepang", correct: false},
            {text: "Seni Tari Tradisional", correct: false},
            {text: "Tari Cakalele", correct: true},
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
