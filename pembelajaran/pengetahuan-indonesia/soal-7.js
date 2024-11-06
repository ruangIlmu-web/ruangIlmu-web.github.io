const question = [
    {
        question: "Mengapa Indonesia dikenal sebagai 'the lost world of Asia'?",
        answer: [
            {text: "Karena banyak hewan eksotis dan langka", correct: true},
            {text: "Karena semua hewan telah punah", correct: false},
            {text: "Karena tidak ada spesies unik di sana", correct: false},
            {text: "Karena hanya terdapat satu suku bangsa", correct: false},
        ]
    },
    {
        question: "Berapa populasi elang Flores yang tersisa saat ini?",
        answer: [
            {text: "500 ekor", correct: false},
            {text: "250 ekor", correct: true},
            {text: "100 ekor", correct: false},
            {text: "1000 ekor", correct: false},
        ]
    },
    {
        question: "Di mana burung Bidadari Halmahera dapat ditemukan?",
        answer: [
            {text: "Hanya di Pulau Sumatera", correct: false},
            {text: "Di Pulau Halmahera dan Bacan", correct: true},
            {text: "Di seluruh Indonesia", correct: false},
            {text: "Di Pulau Jawa", correct: false},
        ]
    },
    {
        question: "Apa yang menjadi ciri khas dari Cendrawasih botak?",
        answer: [
            {text: "Bulu berwarna hitam", correct: false},
            {text: "Hiasan unik pada ekor", correct: true},
            {text: "Leher panjang", correct: false},
            {text: "Mampu terbang tinggi", correct: false}
        ]
    },
    {
        question: "5.	Kura-kura leher ular Rote memiliki ciri khas?",
        answer: [
            {text: ". Leher panjang yang tidak bisa ditarik", correct: true},
            {text: "Warna bulu yang cerah", correct: false},
            {text: "Habitat di lautan", correct: false},
            {text: "Makanan vegetarian", correct: false}
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
