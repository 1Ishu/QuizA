document.addEventListener("DOMContentLoaded", function () {
  let quizData = [];
  let currentQuizIndex = 0;

  const quizForm = document.getElementById('quiz-form');
  const questionContainer = document.getElementById('question-container');
  const addQuestionButton = document.getElementById('add-question');
  const takeQuizDiv = document.getElementById('take-quiz');
  const quizContent = document.getElementById('quiz-content');
  const quizTakeForm = document.getElementById('quiz-take-form');
  const resultsDiv = document.getElementById('results');
  const scoreDisplay = document.getElementById('score');
  const retryButton = document.getElementById('retry');

  addQuestionButton.addEventListener('click', function () {
      addQuestionBlock();
  });

  quizForm.addEventListener('submit', function (e) {
      e.preventDefault();
      quizData = gatherQuizData();
      displayQuiz();
  });

  quizTakeForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const score = calculateScore();
      displayResults(score);
  });

  retryButton.addEventListener('click', function () {
      resultsDiv.style.display = 'none';
      takeQuizDiv.style.display = 'block';
  });

  function addQuestionBlock() {
      const questionBlock = document.createElement('div');
      questionBlock.className = 'question-block mb-3 p-3 border rounded';
      questionBlock.innerHTML = `
          <div class="form-group">
              <label>Question: <input type="text" class="form-control question-input"></label>
          </div>
          <div class="form-group">
              <label>Option A: <input type="text" class="form-control option-input"></label>
          </div>
          <div class="form-group">
              <label>Option B: <input type="text" class="form-control option-input"></label>
          </div>
          <div class="form-group">
              <label>Option C: <input type="text" class="form-control option-input"></label>
          </div>
          <div class="form-group">
              <label>Option D: <input type="text" class="form-control option-input"></label>
          </div>
          <div class="form-group">
              <label>Correct Option: 
                  <select class="form-control correct-option">
                      <option value="A">A</option>
                      <option value="B">B</option>
                      <option value="C">C</option>
                      <option value="D">D</option>
                  </select>
              </label>
          </div>
      `;
      questionContainer.appendChild(questionBlock);
  }

  function gatherQuizData() {
      const questionBlocks = document.querySelectorAll('.question-block');
      const quizData = [];

      questionBlocks.forEach(block => {
          const question = block.querySelector('.question-input').value;
          const options = Array.from(block.querySelectorAll('.option-input')).map(input => input.value);
          const correctOption = block.querySelector('.correct-option').value;

          quizData.push({ question, options, correctOption });
      });

      return quizData;
  }

  function displayQuiz() {
      quizContent.innerHTML = '';
      currentQuizIndex = 0;

      quizData.forEach((data, index) => {
          const questionBlock = document.createElement('div');
          questionBlock.className = 'question-block mb-3 p-3 border rounded';
          questionBlock.innerHTML = `
              <p>Question ${index + 1}: ${data.question}</p>
              <div class="form-check">
                  <label class="form-check-label">
                      <input type="radio" class="form-check-input" name="question${index}" value="A"> ${data.options[0]}
                  </label>
              </div>
              <div class="form-check">
                  <label class="form-check-label">
                      <input type="radio" class="form-check-input" name="question${index}" value="B"> ${data.options[1]}
                  </label>
              </div>
              <div class="form-check">
                  <label class="form-check-label">
                      <input type="radio" class="form-check-input" name="question${index}" value="C"> ${data.options[2]}
                  </label>
              </div>
              <div class="form-check">
                  <label class="form-check-label">
                      <input type="radio" class="form-check-input" name="question${index}" value="D"> ${data.options[3]}
                  </label>
              </div>
          `;
          quizContent.appendChild(questionBlock);
      });

      document.getElementById('create-quiz').style.display = 'none';
      takeQuizDiv.style.display = 'block';
  }

  function calculateScore() {
      let score = 0;

      quizData.forEach((data, index) => {
          const selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
          if (selectedOption && selectedOption.value === data.correctOption) {
              score++;
          }
      });

      return score;
  }

  function displayResults(score) {
      takeQuizDiv.style.display = 'none';
      resultsDiv.style.display = 'block';
      scoreDisplay.innerText = `You scored ${score} out of ${quizData.length}`;
  }
});
