//TODO
//timer
//modal s demom
//mobil



var image=0;
var wrong;
var good;
var imagesNum=8;
var timer =new easytimer.Timer();
var muteSwitch=false;
var clickedAnimation;
function size(){
    var width=window.innerWidth;
    console.log(width);
   if(width<=768){

     $(document.getElementById("#8")).css("top","40%");
       $(document.getElementById("#7")).css("top","47%");
       $(document.getElementById("#6")).css("top","47%");
       $(document.getElementById("#5")).css("top","68%");
       $(document.getElementById("#4")).css("top","68%");
       $(document.getElementById("#3")).css("top","50%");
       $(document.getElementById("#2")).css("top","60%");
       $(document.getElementById("#1")).css("top","50%");




        console.log("resized!");
    }

   else if ( 768 < width ) {

       $(document.getElementById("#8")).css("top", "35%");
       $(document.getElementById("#7")).css("top", "45%");
       $(document.getElementById("#6")).css("top", "45%");
       $(document.getElementById("#5")).css("top", "66%");
       $(document.getElementById("#4")).css("top", "66%");
       $(document.getElementById("#3")).css("top", "48%");
       $(document.getElementById("#2")).css("top", "58%");
       $(document.getElementById("#1")).css("top", "48%");



   }


}
function size2(){
    var width=window.innerWidth;
    console.log(width);
   if(width<=768){

        $(document.getElementById("8")).css("top","40%");
        $(document.getElementById("7")).css("top","47%");
        $(document.getElementById("6")).css("top","47%");
        $(document.getElementById("5")).css("top","68%");
        $(document.getElementById("4")).css("top","68%");
        $(document.getElementById("3")).css("top","50%");
        $(document.getElementById("2")).css("top","60%");
        $(document.getElementById("1")).css("top","50%");




        console.log("resized!");
    }

   else if ( 768 < width ) {

        $(document.getElementById("8")).css("top", "35%");
        $(document.getElementById("7")).css("top", "45%");
        $(document.getElementById("6")).css("top", "45%");
        $(document.getElementById("5")).css("top", "66%");
        $(document.getElementById("4")).css("top", "66%");
        $(document.getElementById("3")).css("top", "48%");
        $(document.getElementById("2")).css("top", "58%");
        $(document.getElementById("1")).css("top", "48%");



    }
}

function resize(){



    size();

    window.addEventListener('resize', function (){


        size();

    })
}

function resize2(){


        size2();
        window.addEventListener('resize', function (){

                size2();

        })


}




$(init);
function init() {
    good=0;
    wrong=0;


    document.getElementById("percent").innerText="Score: ";
    document.getElementById("cas").innerText="Time: ";
    document.getElementById("nespravne").innerText="Wrong: ";
    $(document.getElementsByClassName("image") ).draggable({
        create: function (event,ui) {


            this.style.top = "15%";
            this.style.left = "10%";
            this.style.zIndex="2";
        },
        start: function drag(event,ui) {
            //zistujem aky obrazok taham
            image=this.getAttribute("id");

            if(!timer.isRunning())
                timer.reset();



        }
    });

}
$( function() {
    $( document.getElementsByClassName("dropzone") ).droppable({

        drop: function( event,ui ) {


            //porovnavam ci sa zhoduje id so sektorom
            if("#"+String(image)===this.getAttribute("id")){



                $(document.getElementById(image)).draggable('destroy');
                document.getElementById(image).style.top=document.getElementById("#"+image).style.top;
                document.getElementById(image).style.left=document.getElementById("#"+image).style.left;
                document.getElementById(image).style.zIndex="1";
                soundGood();


                good=good+1;
                itsOver();


            }else{


                wrong=wrong+1;
                console.log(wrong);
                soundWrong();

            }

        },
        over: function (event,ui){

            this.style.boxShadow="yellow";

        },
        out:function (event,ui){
            this.style.border="";
            this.style.boxShadow="";
            this.style.background="";

        }
    });
} );

function itsOver(){

    if(good===imagesNum){

        soundWin();
        timer.pause();
        party.element(document.getElementById("body"), {
            count: 5000,
            countVariation: 0.5,
            angleSpan: 80,
            yVelocity: -300,
            yVelocityVariation: 1,
            rotationVelocityLimit: 6,
            scaleVariation: 0.8
        });
        document.getElementById("nespravne").innerText+=wrong;
        let minus=Number(wrong);
        let sum=Number(100)-Number(minus*5);

        if(sum <15)
            sum=15;
        document.getElementById("cas").innerText+=timer.getTimeValues().toString();

        document.getElementById("percent").innerText+=sum+"%";

        $('#gameOver').modal('show');

    }
}
function closeModal(){
    $('#gameOver').modal('toggle')

}

function playOver() {

    init();

}

function playOver2() {
    $(document.getElementsByClassName("image")).draggable('destroy');

    timer.stop();
    init();

}
timer.addEventListener('secondsUpdated',function (e){
    document.getElementById("timer").innerText=timer.getTimeValues().toString();
})
function soundGood() {
    if(!muteSwitch){


    /* Audio link for notification */
    var audio = new Audio("./sounds/robot.mp3 ");
    audio.play();
    }
}

function soundWrong() {
    if(!muteSwitch) {
        /* Audio link for notification */
        var audio = new Audio("./sounds/wrong.mp3 ");
        audio.play();
    }
}


function soundWin() {
    if(!muteSwitch) {
        /* Audio link for notification */
        var audio = new Audio("./sounds/win.mp3 ");
        audio.play();
    }
}


function animation() {
    $(document.getElementsByClassName("image")).draggable('destroy');
    for(var i=1;i<=imagesNum;i++){
        var top=document.getElementById("#"+i).style.top;
        var left=document.getElementById("#"+i).style.left;
        $(document.getElementById(String(i))).animate({top: top,left:left});
    }
    soundGood();


}
function mute(){
    if( !muteSwitch){
        muteSwitch=true;
        document.getElementById("sound").src="images/no-sound.png"
    }
    else{
        muteSwitch=false;
        document.getElementById("sound").src="images/sound.png"
    }

}
function resizeOnAn(){
    clickedAnimation=true
}