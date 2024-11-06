const question = [
    {
        question: "Apa arti dari kata “Panca” dalam Pancasila?",
        answer: [
            {text: "Satu", correct: false},
            {text: "Lima", correct: true},
            {text: "Dasar", correct: false},
            {text: "Negara", correct: false},
        ]
    },
    {
        question: "Lambang rantai dalam Pancasila melambangkan?",
        answer: [
            {text: "Kesejahteraan", correct: false},
            {text: "Kemanusiaan yang adil dan beradab", correct: true},
            {text: "Hubungan manusia", correct: false},
            {text: "Persatuan Indonesia", correct: false},
        ]
    },
    {
        question: "Lambang pohon beringin dalam Pancasila melambangkan?",
        answer: [
            {text: "Persatuan Indonesia", correct: true},
            {text: "Ketuhanan Yang Maha Esa", correct: false},
            {text: "Musyawarah", correct: false},
            {text: "Sandang dan pangan", correct: false},
        ]
    },
    {
        question: "Apa makna dari lambang banteng dalam Pancasila?",
        answer: [
            {text: "Persatuan Indonesia", correct: false},
            {text: "Kemanusiaan", correct: false},
            {text: "Musyawarah", correct: true},
            {text: "Ketuhanan", correct: false},
        ]
    },
    {
        question: "Lambang padi dan kapas dalam Pancasila menggambarkan?",
        answer: [
            {text: "Keadilan sosial", correct: true},
            {text: "Pangan dan sandang", correct: false},
            {text: "Kemanusiaan yang adil", correct: false},
            {text: "Ketuhanan Yang Maha Esa", correct: false},
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



