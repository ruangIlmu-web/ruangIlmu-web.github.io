const question = [
    {
        question: "Apa yang dimaksud dengan rumah adat?",
        answer: [
            {text: "Rumah yang dibangun untuk modernisasi", correct: false},
            {text: "Rumah yang mencerminkan budaya dan tradisi masyarakat", correct: true},
            {text: "Rumah yang tidak terpakai", correct: false},
            {text: "Rumah yang dibangun dengan bahan sederhana", correct: false},
        ]
    },
    {
        question: "Pakaian adat biasanya digunakan untuk?",
        answer: [
            {text: "Menyampaikan pesan politik", correct: false},
            {text: "Mengekspresikan identitas dan status sosial", correct: true},
            {text: "Sebagai alat pertunjukan", correct: false},
            {text: "Menarik perhatian media", correct: false},
        ]
    },
    {
        question: "Tari adat biasanya ditujukan untuk?",
        answer: [
            {text: "Menyambut tamu agung dan perayaan", correct: true},
            {text: "Memperlihatkan kebudayaan asing", correct: false},
            {text: "Menghibur diri sendiri", correct: false},
            {text: "Pertunjukan di luar negeri", correct: false},
        ]
    },
    {
        question: "Alat musik tradisional dapat menggambarkan?",
        answer: [
            {text: "Kekayaan sebuah negara", correct: false},
            {text: "Keunikan budaya daerah tertentu", correct: true},
            {text: "Kemandekan budaya", correct: false},
            {text: "Budaya populer", correct: false},
        ]
    },
    {
        question: "Senjata tradisional sering digunakan untuk?",
        answer: [
            {text: "Mempertahankan diri dan berburu", correct: true},
            {text: "Menyerang negara lain", correct: false},
            {text: "Pertunjukan seni", correct: false},
            {text: "Menghibur anak-anak", correct: false},
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
