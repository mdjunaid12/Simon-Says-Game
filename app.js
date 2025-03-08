let gameSeq=[];
let userSeq=[];

let btns=["yellow","red","purple","green"];

let started=false;
let level=0;
let high=0;
let h2=document.querySelector("h2");

document.addEventListener("keypress",function(){
    if(!started)
    {
        console.log("game started");
        started=true;

        levelUp();
    }
});

function gameFlash(btn){
    btn.classList.add("gameFlash");
    setTimeout(function() {
        btn.classList.remove("gameFlash");
    },300);
}

function userFlash(btn){
    btn.classList.add("userFlash");
    setTimeout(function() {
        btn.classList.remove("userFlash");
    },300);
}

function levelUp(){
    userSeq=[];
    level++;
    h2.innerText=`Level ${level}`;

    let randIdx=Math.floor(Math.random()*3);
    let randColor=btns[randIdx];
    let randbtn=document.querySelector(`.${randColor}`)
    gameSeq.push(randColor);
    console.log(gameSeq);
    gameFlash(randbtn);
}

function checkAns(idx){
    if(userSeq[idx] === gameSeq[idx])
    {
       if(userSeq.length == gameSeq.length)
       {
            setTimeout(levelUp(),1000);
       }
    }
    else{
        high=Math.max(high,level);
        h2.innerHTML=`Game Over! your score was <b>${level}</b>! your highest score is <b>${high}</b> <br> Press any key to start`;
        document.querySelector("body").style.backgroundColor="red";
        setTimeout( document.querySelector("body").style.backgroundColor="white",150);
        reset();
    }
}

function btnPress (){
    let btn=this;
    userFlash(btn);

    userColor=btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length-1);
}

let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click",btnPress);
}

function reset(){
    started=false;
    gameSeq=[];
    userSeq=[];
    level=0;
}