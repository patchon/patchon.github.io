(function(){
  // Functions
  function buildQuiz(){
    // variable to store the HTML output
    const output = [];

    // for each question...
    myQuestions.forEach(
      (currentQuestion, questionNumber) => {

        // variable to store the list of possible answers
        const answers = [];

        // and for each available answer...
        for(letter in currentQuestion.answers){

          // ...add an HTML radio button
          answers.push(
            `<label>
              <input type="radio" name="question${questionNumber}" value="${letter}">
              ${letter} :
              ${currentQuestion.answers[letter]}
            </label>`
          );
        }

        // add this question and its answers to the output
        output.push(
          `<div class="slide">
            <div class="question"> ${currentQuestion.question} </div>
            <div class="answers"> ${answers.join("")} </div>
          </div>`
        );
      }
    );

    // finally combine our output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join('');
  }

  function showResults(){

    // gather answer containers from our quiz
    const answerContainers = quizContainer.querySelectorAll('.answers');

    // keep track of user's answers
    let numCorrect = 0;

    // for each question...
    myQuestions.forEach( (currentQuestion, questionNumber) => {

      // find selected answer
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;

      // if answer is correct
      if(userAnswer === currentQuestion.correctAnswer){
        // add to the number of correct answers
        numCorrect++;

        // color the answers green
        answerContainers[questionNumber].style.color = 'lightgreen';
      }
      // if answer is wrong or blank
      else{
        // color the answers red
        answerContainers[questionNumber].style.color = 'red';
      }
    });

    // show number of correct answers out of total

    if (numCorrect === 7){
      resultsContainer.innerHTML = `Yey, all answers correct, here's the number 0707 - 27 64 96.`;
    }else{
      resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
    }
  }

  function showSlide(n) {
    slides[currentSlide].classList.remove('active-slide');
    slides[n].classList.add('active-slide');
    currentSlide = n;
    if(currentSlide === 0){
      previousButton.style.display = 'none';
    }
    else{
      previousButton.style.display = 'inline-block';
    }
    if(currentSlide === slides.length-1){
      nextButton.style.display = 'none';
      submitButton.style.display = 'inline-block';
    }
    else{
      nextButton.style.display = 'inline-block';
      submitButton.style.display = 'none';
    }
  }

  function showNextSlide() {
    showSlide(currentSlide + 1);
  }

  function showPreviousSlide() {
    showSlide(currentSlide - 1);
  }

  // Variables
  const quizContainer = document.getElementById('quiz');
  const resultsContainer = document.getElementById('results');
  const submitButton = document.getElementById('submit');
  const myQuestions = [
    {
      question: "Who is Patrik?",
      answers: {
        a: "Richest man on earth.",
        b: "Some random dude going all in trying to impress the special one in Tinder.",
        c: "A persian influencer."
      },
      correctAnswer: "b"
    },
    {
      question: "What is Patrik's last name ?",
      answers: {
        a: "Martinsson",
        b: "Hakimi",
        c: "Fredriksson",
        d: "Rouhani",
      },
      correctAnswer: "a"
    },
    {
      question: "Is this quiz over yet ???",
      answers: {
        a: "Nope, more questions coming up",
        b: "Yes, its over, only two questions in this awesome quiz.",
      },
      correctAnswer: "a"
    },
    {
      question: "What is the best album ever made ?",
      answers: {
        a: "Random Access Memories, Daft punk",
        b: "Skebokvarnsv. 209, Thåström",
        c: "The River, Bruce Springsteen",
        d: "Is this it, The Strokes "
      },
      correctAnswer: "d"
    },
    {
      question: "What's his 'speciality dish' ?",
      answers: {
        a: "Pancackes",
        b: "Saffron Fish stew",
        c: "Meatballs"
      },
      correctAnswer: "b"
    },
    {
      question: "Has Patrik Made an app ?",
      answers: {
        a: "Not to brag, but yes its called barnkollen and is available on google play",
        b: "Nope, not smart nor driven enough.",
      },
      correctAnswer: "a"
    },
    {
      question: "Is this quiz over now ???",
      answers: {
        a: "Nope, more questions coming up",
        b: "Yes, its finally, over, you made it",
      },
      correctAnswer: "b"
    },

  ];

  // Kick things off
  buildQuiz();

  // Pagination
  const previousButton = document.getElementById("previous");
  const nextButton = document.getElementById("next");
  const slides = document.querySelectorAll(".slide");
  let currentSlide = 0;

  // Show the first slide
  showSlide(currentSlide);

  // Event listeners
  submitButton.addEventListener('click', showResults);
  previousButton.addEventListener("click", showPreviousSlide);
  nextButton.addEventListener("click", showNextSlide);
})();
