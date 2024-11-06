const question = [
    {
        question: "Apa tujuan dari coding?",
        answer: [
            {text: "Mengatur jaringan komputer", correct: false},
            {text: "Berkomunikasi dengan komputer agar menjalankan perintah", correct: true},
            {text: "Mengatur tampilan layar komputer", correct: false},
            {text: "Mengatur sinyal internet", correct: false}
        ]
    },
    {
        question: "Bahasa yang perlu diterjemahkan oleh compiler sebelum dijalankan disebut?",
        answer: [
            {text: "Interpreted Language", correct: false},
            {text: "Just-In-Time (JIT)", correct: false},
            {text: "Compiled Language", correct: true},
            {text: "Assembly Language", correct: false}
        ]
    },
    {
        question: "Apa perbedaan antara sintaks dan semantik?",
        answer: [
            {text: "Sintaks adalah makna kode, semantik adalah aturan penulisan", correct: false},
            {text: "Sintaks adalah aturan penulisan, semantik adalah makna kode", correct: true},
            {text: "Sintaks adalah jenis bahasa pemrograman, semantik adalah tipe variabel", correct: false},
            {text: "Sintaks adalah compiler, semantik adalah interpreter", correct: false}
        ]
    },
    {
        question: "Dalam coding, pernyataan yang menyatakan aksi disebut?",
        answer: [
            {text: "Expression", correct: false},
            {text: "Syntax", correct: false},
            {text: "Semantik", correct: false},
            {text: "Statement", correct: true}
        ]
    },
    {
        question: "Contoh bahasa dengan proses Just-In-Time (JIT) adalah?",
        answer: [
            {text: "Java", correct: true},
            {text: "C++", correct: false},
            {text: "Python", correct: false},
            {text: "PHP", correct: false}
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
