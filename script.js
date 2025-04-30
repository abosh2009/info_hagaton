const flashcards = [
  { question: "Процессор дегеніміз не?", answer: "Компьютердің «миы», барлық есептеулерді орындайды." },
  { question: "Жедел жад (RAM) не үшін керек?", answer: "Уақытша мәліметтерді сақтау үшін." },
  { question: "Қатты диск не істейді?", answer: "Мәліметтерді ұзақ уақытқа сақтайды." },
  { question: "Пернетақта қандай құрылғы?", answer: "Енгізу құрылғысы." },
  { question: "Монитор қандай құрылғы?", answer: "Шығару құрылғысы." },
  { question: "Принтер не үшін қолданылады?", answer: "Қағазға ақпарат шығару үшін." },
  { question: "Модем деген не?", answer: "Интернетке қосылуға мүмкіндік береді." },
  { question: "Компьютерлік вирус деген не?", answer: "Зиянды бағдарлама, компьютерге зақым келтіреді." },
  { question: "Браузер деген не?", answer: "Интернет сайттарын қарауға арналған бағдарлама." },
  { question: "Операциялық жүйе деген не?", answer: "Компьютердің барлық жұмысын басқаратын жүйе (мысалы, Windows)." },
  { question: "Файл деген не?", answer: "Ақпарат сақталатын атауы бар объект." },
  { question: "Папка (қалта) не үшін керек?", answer: "Файлдарды топтастыру үшін." },
  { question: "Ақпараттың ең кіші өлшем бірлігі?", answer: "Бит." },
  { question: "1 байтта қанша бит бар?", answer: "8 бит." },
  { question: "Гигабайт деген не?", answer: "1024 мегабайт." },
  { question: "Компьютердің негізгі құрылғылары?", answer: "Процессор, жедел жад, аналық тақша, қорек көзі, монитор, пернетақта, тышқан." },
  { question: "Программалық қамтамасыз ету деген не?", answer: "Компьютерде жұмыс істеуге арналған барлық бағдарламалар жиынтығы." },
  { question: "Қолданбалы бағдарламаларға мысал келтір?", answer: "MS Word, Excel, Paint, Google Chrome." },
  { question: "Желі дегеніміз не?", answer: "Компьютерлерді байланыстыратын жүйе." },
  { question: "Компьютер қауіпсіздігі деген не?", answer: "Мәліметтерді вирустар мен шабуылдардан сақтау әдістері." }
];

let current = 0;
let flipped = false;
let countdown = 10;
let timerInterval = null;

const card = document.getElementById("card");
const cardText = document.getElementById("cardText");
const counterText = document.getElementById("counterText");
const autoBtn = document.getElementById("autoBtn");
const speakBtn = document.getElementById("speakBtn");
const timerDisplay = document.getElementById("timerDisplay");

function updateCard() {
  flipped = false;
  cardText.textContent = flashcards[current].question;
  counterText.textContent = `${current + 1} / ${flashcards.length}`;
}

card.addEventListener("click", () => {
  flipped = !flipped;
  cardText.textContent = flipped ? flashcards[current].answer : flashcards[current].question;
});

function nextCard() {
  current = (current + 1) % flashcards.length;
  updateCard();
}

function prevCard() {
  current = (current - 1 + flashcards.length) % flashcards.length;
  updateCard();
}

function updateTimerDisplay() {
  timerDisplay.textContent = `⏳ ${countdown}`;
}

function toggleAutoPlay() {
  if (!timerInterval) {
    countdown = 10;
    updateTimerDisplay();
    autoBtn.textContent = "⏱️ Таймер: ЖҰМЫСТА";

    timerInterval = setInterval(() => {
      countdown--;
      updateTimerDisplay();

      if (countdown === 0) {
        nextCard();
        countdown = 10;
        updateTimerDisplay();
      }
    }, 1000);
  } else {
    clearInterval(timerInterval);
    timerInterval = null;
    timerDisplay.textContent = "⏳ Таймер өшірулі";
    autoBtn.textContent = "⏱️ Таймер: Өшірулі";
  }
}

function speakText() {
  const msg = new SpeechSynthesisUtterance();
  msg.text = flipped ? flashcards[current].answer : flashcards[current].question;

  const voices = speechSynthesis.getVoices();
  const kazakh = voices.find(v => v.lang.startsWith("kk")) || voices.find(v => v.lang.startsWith("ru")) || voices[0];
  msg.voice = kazakh;
  window.speechSynthesis.speak(msg);
}

speakBtn.addEventListener("click", speakText);
autoBtn.addEventListener("click", toggleAutoPlay);

window.speechSynthesis.onvoiceschanged = () => {
  speechSynthesis.getVoices();
};

updateCard();
