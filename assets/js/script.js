var startgame = document.querySelector("#startgame");
var questionBox=document.querySelector("#questionBox");
var answerBox=document.querySelector("#answerBox");
var instructions=document.querySelector("#instructions");
var correctBox=document.querySelector("#correctBox");
var highScores=document.querySelector("#highScores");
var count = 60;
var questions = ["Arrays in JavaScript can be used to store ____________.","The condition in an if/else statement is enclosed with ___________.","String values must be enclosed within _______ when being assigned to variables","A very useful tool during development and debugging for printing content to the debugger is:","Commonly used data types DO NOT include: "]
var answers = [["numbers and strings","other arrays","booleans","all of the above"],["quotes","curley brackets","parenthesis","sqaure brackets"],["commas","curley brackets","quotes","parenthesis"],["JavaScript","terminal/bash","for loops","console.log"],["Strings","booleans","alerts","numbers"]];
var rightAnswers=["all of the above","parenthesis","quotes","console.log","alerts",]
var questionNumber=0;
var scores=[]


var checkAnswer = function(choice){

    //Tracks correct or incorrect
    var correct=document.createElement("h2");

    //Correct
    if (choice==rightAnswers[questionNumber]){
        correctBox.textContent="";
        correct.textContent="Correct!";
        correctBox.appendChild(correct);
        questionNumber++;
        newQuestion();
    }
    //Incorrect
    else{
        correctBox.textContent="";
        correct.textContent="Incorrect!";
        correctBox.appendChild(correct);
        questionNumber++;
        count=count-10;
        document.getElementById("count").innerHTML=count;
        newQuestion();
    }
};

var newQuestion = function(){

    //End game if player has answered every question
    if (questionNumber===5){
        endGame();
    }
    else {

    //Update Question
    questionBox.textContent=questions[questionNumber];

    //Update Answers
    answerBox.innerHTML="";

    var a1=document.createElement("button");
    var a2=document.createElement("button");
    var a3=document.createElement("button");
    var a4=document.createElement("button");
    a1.textContent=answers[questionNumber][0];
    a1.className="btn answerbtn";
    answerBox.appendChild(a1);
    a2.textContent=answers[questionNumber][1];
    a2.className="btn answerbtn";
    answerBox.appendChild(a2);
    a3.textContent=answers[questionNumber][2];
    a3.className="btn answerbtn";
    answerBox.appendChild(a3);
    a4.textContent=answers[questionNumber][3];
    a4.className="btn answerbtn";
    answerBox.appendChild(a4);
    }
};

var runQuiz = function (){

    //Timer
    var interval = setInterval(function(){
        if (questionNumber===5){
            clearInterval(interval);
            return null;
        };
        count--;
        document.getElementById('count').innerHTML=count;
        if (count <= 0){
            count=0;
            document.getElementById('count').innerHTML=count;
            clearInterval(interval);
            endGame();
        }
    }, 1000);

    //clear instructions row
    instructions.innerHTML="";

    //Ask the first question
    newQuestion();
    
};

var endGame = function() {

    correctBox.innerHTML="";
    //Update header
    questionBox.textContent="All done!";

    //Present score
    instructions.textContent="Your final score is "+count;

    //Reset buttons
    answerBox.innerHTML="";

    //Make a form to save your score
    var enterInitials = document.createElement("div")
    enterInitials.className="col-4";
    enterInitials.textContent="Enter initials: ";
    answerBox.appendChild(enterInitials);

    var enterScoreCol = document.createElement("div");
    enterScoreCol.className="col-8";
    enterScoreCol.setAttribute("id","enterScoreCol");

    var enterScore = document.createElement("form");

    var initials = document.createElement("input");
    initials.setAttribute("type","text");
    initials.setAttribute("name","initials");
    enterScore.appendChild(initials);

    var submit = document.createElement("button");
    submit.setAttribute("type","submit");
    submit.textContent="Submit";
    submit.setAttribute("id","submitScore");
    enterScore.appendChild(submit);

    enterScoreCol.appendChild(enterScore);
    answerBox.appendChild(enterScoreCol);
};

var displayHighScores = function(){
    
    //Update Header
    questionBox.textContent="High scores";

    //reset instructions box so I can add highscores
    instructions.innerHTML="";

    //Display each score that is stored
    //*NOTE* I wish I could do this in a for loop, but I don't know how to handle the different variable names. Ask about this
    if (scores[0]!=null){
        console.log(scores[0][0]);
        var score1 = document.createElement("div");
        score1.className="row highScore";
        score1.textContent="1. "+scores[0][0]+" - "+scores[0][1];
        instructions.append(score1);
    }

    if (scores[1]!=null){
        var score2 = document.createElement("div");
        score2.className="row highScore";
        score2.textContent="2. "+scores[1][0]+" - "+scores[1][1];
        instructions.append(score2);
    }

    if (scores[2]!=null){
        var score3 = document.createElement("div");
        score3.className="row highScore";
        score3.textContent="3. "+scores[2][0]+" - "+scores[2][1];
        instructions.append(score3);
    }

    if (scores[3]!=null){
        var score4 = document.createElement("div");
        score4.className="row highScore";
        score4.textContent="4. "+scores[3][0]+" - "+scores[3][1];
        instructions.append(score4);
    }

    if(scores[4]!=null){
        var score5 = document.createElement("div");
        score5.className="row highScore";
        score5.textContent="5. "+scores[4][0]+" - "+scores[4][1];
        instructions.append(score5);
    }

    //reset buttons
    answerBox.innerHTML="";

    //Add home and reset scores button
    var buttonRow=document.createElement("div");
    buttonRow.className="row";

    var homeBtn=document.createElement("button");
    homeBtn.setAttribute("id","homeBtn");
    homeBtn.textContent="Home";
    buttonRow.appendChild(homeBtn);

    var resetBtn=document.createElement("button");
    resetBtn.setAttribute("id","resetBtn");
    resetBtn.textContent="Clear Scores";
    buttonRow.appendChild(resetBtn);

    answerBox.appendChild(buttonRow);
}

var setHighScore = function(){
    //Save the newest score
    var initialsInput=document.querySelector("input[name='initials'").value;
    newScore=[initialsInput,count];
    scores.push(newScore);

    //sort scores in descending order
    scores.sort( (a,b)=> b[1]-a[1]);
    
    //Don't save more than 5 scores
    scores.splice(5);

    localStorage.setItem("scores",JSON.stringify(scores))
}

var loadHighScores = function(){

    //get scores from local storage
    var localScores=localStorage.getItem("scores");

    //If there aren't any, move on
    if (localScores===null){
        scores=[];
        return false;
    }

    //Save scores in proper format
    localScores=JSON.parse(localScores);

    for (i=0;i<localScores.length;i++){
        scores.push(localScores[i]);
    }
}

var resetPage = function(){
    questionBox.textContent="Coding Quiz Challenge";
    instructions.innerHTML="<p>Try to answer the following code-related question within the time limit. Keep in mind that incorrect answers will penalize your time/score by ten seconds!</p>";
    answerBox.innerHTML="<div class='col-md-auto'><button type='button' id='startgame'>Start Quiz</button></div>";
    count=60;
    questionNumber=0;
    document.getElementById('count').innerHTML=count;
}

var clickHandler = function(event){
    var targetEl=event.target;

    //Answer buttons
    if(targetEl.matches(".answerbtn")){
        checkAnswer(targetEl.textContent);
    }

    //Start game button
    else if(targetEl.matches("#startgame")){
        runQuiz();
    }

    //Save score button
    else if(targetEl.matches("#submitScore")){
        setHighScore();
        displayHighScores();
    }

    //Home button
    else if(targetEl.matches("#homeBtn")){
        resetPage();
    }

    //Clear High scores
    else if(targetEl.matches("#resetBtn")){
        scores=[];
        localStorage.setItem("scores",JSON.stringify(scores));
        displayHighScores();
    }
};

//When any of the buttons are clicked run clickHandler to see which button it is.
answerBox.addEventListener("click",clickHandler);

//When view Highscores is clicked on do that
highScores.addEventListener("click",displayHighScores);

loadHighScores();