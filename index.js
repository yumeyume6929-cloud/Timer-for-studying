document.addEventListener("DOMContentLoaded", () => {

  const startBtn = document.getElementById("startBtn");
  const stopBtn = document.getElementById("stopBtn");
  const timerEl = document.getElementById("timer");
  const modal = document.getElementById("modal");
  const questionText = document.getElementById("questionText");
  const answerInput = document.getElementById("answerInput");
  const submitAnswer = document.getElementById("submitAnswer");
  const bgm = document.getElementById("bgm");

  let remainingSeconds = 0;
  let timerInterval = null;
  let correctAnswer = null;
  let isQuestionActive = false;

  startBtn.addEventListener("click", () => {
    if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
    }

    const minutes = Number(document.getElementById("studyTime").value);
    remainingSeconds = minutes * 60;

    updateTimer();
    timerInterval = setInterval(countDown, 1000);

    bgm.currentTime = 0;
    bgm.loop = true;
    bgm.play().catch(e => console.log(e));

    stopBtn.classList.remove("floaty");
  });

  function countDown() {
    if (remainingSeconds <= 0) {
      stopAll();
      return;
    }
    remainingSeconds--;
    updateTimer();
  }

  function updateTimer() {
    const min = String(Math.floor(remainingSeconds / 60)).padStart(2, "0");
    const sec = String(remainingSeconds % 60).padStart(2, "0");
    timerEl.textContent = `残り時間：${min}:${sec}`;
  }

  stopBtn.addEventListener("click", () => {
    if (isQuestionActive) return;
    showQuestion();
  });

  function showQuestion() {
    isQuestionActive = true;
    modal.classList.remove("hidden");
    answerInput.value = "";

    const a = Math.floor(Math.random() * 10) + 1;
    const b = Math.floor(Math.random() * 10) + 1;
    correctAnswer = a + b;

    questionText.textContent = `途中停止するには答えてね： ${a} + ${b} = ?`;
  }

  submitAnswer.addEventListener("click", () => {
    if (Number(answerInput.value) === correctAnswer) {
      stopAll();
      modal.classList.add("hidden");
      isQuestionActive = false;
      stopBtn.classList.remove("floaty");
    } else {
      modal.classList.add("hidden");
      isQuestionActive = false;
      stopBtn.classList.add("floaty");
      alert("不正解！STOPボタンが逃げ出した…");
    }
  });

  function stopAll() {
    clearInterval(timerInterval);
    timerInterval = null;
    bgm.pause();
    bgm.currentTime = 0;
  }

});
