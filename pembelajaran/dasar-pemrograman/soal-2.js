const question = [
    {
        question: "Apa tujuan penggunaan alat pemrograman bagi seorang programmer?",
        answer: [
            {"text": "Mendukung efektivitas dan efisiensi kerja", "correct": true},
            {"text": "Mengurangi waktu bekerja", "correct": false},
            {"text": "Mengurangi kebutuhan belajar", "correct": false},
            {"text": "Menyimpan data program", "correct": false}
        ]
    },
    {
        question: "Fitur kode editor yang berfungsi memberi warna pada kode disebut?",
        answer: [
            {"text": "Autocomplete", "correct": false},
            {"text": "Syntax Highlighting", "correct": true},
            {"text": "Auto Indentation", "correct": false},
            {"text": "Plugin", "correct": false}
        ]
    },
    {
        question: "Berikut ini yang merupakan contoh kode editor adalah?",
        answer: [
            {"text": "Visual Studio Code", "correct": true},
            {"text": "Visual Studio", "correct": false},
            {"text": "IntelliJ IDEA", "correct": false},
            {"text": "PHPStorm", "correct": false}
        ]
    },
    {
        question: "IDE memungkinkan programmer untuk?",
        answer: [
            {"text": "Menulis kode", "correct": false},
            {"text": "Menulis, menguji, dan mendebug", "correct": true},
            {"text": "Mengakses internet", "correct": false},
            {"text": "Menambahkan plugin", "correct": false}
        ]
    },
    {
        question: "Apa perbedaan utama IDE dengan kode editor?",
        answer: [
            {"text": "IDE hanya untuk debugging", "correct": false},
            {"text": "Kode editor hanya untuk Bahasa tertentu", "correct": false},
            {"text": "Kode editor punya lebih banyak fitur", "correct": false},
            {"text": "IDE mempunyai compiler dan debugger", "correct": true}
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
