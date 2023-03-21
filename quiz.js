
let countspan = document.querySelector(".count span");
let bullets = document.querySelector(".bullets")
let bulletspan = document.querySelector(".bullets .spans");
let quizArea = document.querySelector('.quiz-area');
let answersArea = document.querySelector(".answers-area");
let submitAnswer = document.querySelector(".submit-button");
let results = document.querySelector(".results");
let countdownElement = document.querySelector(".bullets .countdown");
let startBtnDuration = document.querySelector(".bullets .start-duration")


let currentindex = 0;
let rightanswers = 0;
let countdownInterval=0;



function getQuestions() {
  let myRequest = new XMLHttpRequest();

  myRequest.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {

      // get questions
      let questionsObject = JSON.parse(this.responseText);
     console.log(questionsObject); 

     // get nb questions
     let countquestions = questionsObject.length;

     console.log(countquestions);

     // create bullets 
     createBullets(countquestions);

     // add title questions
     addQuestionsData(questionsObject[currentindex],countquestions);

     // duration of questions
     startBtnDuration.onclick=()=>{
     countdown(3,countquestions);
    
     startBtnDuration.style.visibility = "hidden";


     // event button onclick
     submitAnswer.onclick=()=>{

      // get correct questions from json
      let correctAnswer= questionsObject[currentindex].correct_answer;
      console.log(correctAnswer);

      // sum nb of ccorrect questions
      currentindex++;
     

     // check answer

     checkanswer(correctAnswer , countquestions);

     // remove l sou2al l adim w mn7t ma7alo ljded

     quizArea.innerHTML = "";
     answersArea.innerHTML="";
     addQuestionsData(questionsObject[currentindex],countquestions);

     // handle buulet class

     handleBullet();


     // count down
    
     clearInterval(countdownInterval);
     countdown(3,countquestions);


     // results
     showResult(countquestions);

     }

     }

     
    }
  };

    // get data file
    myRequest.open("GET","html_questions.json" , true);
    myRequest.send();

  
  

 
  
  }

  getQuestions();


  // fun add data quetions

  function addQuestionsData(obj , count){


    if(currentindex < count){
    // create h2 element
    let questionstitle = document.createElement("h2");
    // create questions text 
    let questionsText = document.createTextNode(obj['title']);
    // add text to h2
    questionstitle.appendChild(questionsText);
    // add h2 to html div class quiz-area
    quizArea.appendChild(questionstitle);

    // create answer 

    for(let i=1; i<=4;i++){


      

      // create div answer

      let mainDiv = document.createElement("div");

      // create className for div 
      mainDiv.className = "answer";

      // create element radio
      let inputRadio = document.createElement("input");

      inputRadio.name = "question";
      inputRadio.type = "radio";
      inputRadio.id=`answer_${i}`;
      inputRadio.dataset.answer = obj[`answer_${i}`];

      if(i===1){
        inputRadio.checked = true;
      }

      // create elemnet label

      let labelRadio = document.createElement("label");

      labelRadio.htmlFor = `answer_${i}`;

      // add text to label
      let thelabeltext = document.createTextNode(obj[`answer_${i}`]);

      labelRadio.appendChild(thelabeltext);

      // add label + radio to div

      mainDiv.appendChild(inputRadio);
      mainDiv.appendChild(labelRadio);


      // add div answer to div answer-area



      answersArea.appendChild(mainDiv);
     
    }


    
  }


  }
  
  // end functions add data quetions






// functions create bullets

function createBullets(num){

  countspan.innerHTML = num;

  // create spans 
  for(let i=0 ; i < num; i++){

    // create bullet

    let theBullet = document.createElement("span");

    bulletspan.appendChild(theBullet);

    if ( i === 0 ){

      theBullet.className = "on";
    }


  }

}

// end fun create bullets


// create function check answer

function checkanswer(correctAnswer , countquestions){

  let answers= document.getElementsByName("question"); // get input name questions

  let thechooseanswer;
  for(let i=0 ; i<answers.length;i++){

    if(answers[i].checked){

      thechooseanswer = answers[i].dataset.answer; // get value of input name questions 


    }
  }
  

  if (thechooseanswer === correctAnswer){

    rightanswers++
    console.log("this answer is correct ");
  } else console.log("incorrectanswer");

}


function handleBullet(){

  let allbulletspan = document.querySelectorAll(".bullets .spans span");
  let arrayBullets = Array.from(allbulletspan);

  arrayBullets.forEach((span , index) =>{

    if (currentindex === index){

      span.className = "on";
    }


  });
}


function showResult(count) {

  let theResults;

  if (currentindex === count){

    quizArea.remove();
    answersArea.remove();
    submitAnswer.remove();
    bullets.remove();

    if(rightanswers > (count / 2)&& rightanswers < count){

      theResults = `<span class="good">Good</span>, ${rightanswers} frorm ${count} is good `;
    
    }else if (rightanswers === count){

      theResults = `<span class="ex">Exellent</span>, ${rightanswers} frorm ${count} is perfect `;

    }else {

      theResults = `<span class="bad">Bad</span>, ${rightanswers} frorm ${count} is not good try agin later`;

    }

    results.innerHTML = theResults;
    results.style.padding = '50px';
    results.style.marginTop = '50px';
    

  }
}

// add duration for all questions 

function countdown(duration, count) {
  if (currentindex < count) {
    let minutes, seconds;
    countdownInterval = setInterval(function () {
      minutes = parseInt(duration / 60);
      seconds = parseInt(duration % 60);

      minutes = minutes < 10 ? `0${minutes}` : minutes;
      seconds = seconds < 10 ? `0${seconds}` : seconds;

      countdownElement.innerHTML = `${minutes}:${seconds}`;

      if (--duration < 0) {
        clearInterval(countdownInterval);
        submitAnswer.click();
      }
    }, 1000);
  }
}

