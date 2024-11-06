const question = [
    {
        question: "Apa yang menjadi hutan terluas ketiga di dunia?",
        answer: [
            {text: "Hutan Amazon", correct: false},
            {text: "Hutan Siberia", correct: false},
            {text: "Hutan Indonesia", correct: true},
            {text: "Hutan Kongo", correct: false},
        ]
    },
    {
        question: "Luas hutan di Indonesia diperkirakan sekitar?",
        answer: [
            {text: "80.000.000 hektar", correct: false},
            {text: "90.000.000 hektar", correct: false},
            {text: "99.000.000 hektar", correct: true},
            {text: "100.000.000 hektar", correct: false},
        ]
    },
    {
        question: "Berapa hektar lahan hutan hilang setiap tahunnya di Indonesia?",
        answer: [
            {text: "400.000 hektar", correct: false},
            {text: "500.000 hektar", correct: false},
            {text: "600.000 hektar", correct: true},
            {text: "700.000 hektar", correct: false},
        ]
    },
    {
        question: "Apa manfaat utama dari hutan di Indonesia?",
        answer: [
            {text: "Menyediakan tempat tinggal", correct: false},
            {text: "Menyediakan kayu dan menjaga keseimbangan lingkungan", correct: true},
            {text: "Sumber penghasilan utama", correct: false},
            {text: "Menyediakan ruang untuk pertanian", correct: false},
        ]
    },
    {
        question: "Mengapa Indonesia dikenal sebagai negara maritim?",
        answer: [
            {text: "Karena memiliki banyak gunung", correct: false},
            {text: "Karena sebagian besar wilayahnya terdiri dari lautan", correct: true},
            {text: "Karena banyaknya sumber daya mineral", correct: false},
            {text: "Karena banyak pulau-pulau kecil", correct: false},
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
