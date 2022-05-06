window.onload = function() {
    var stage = document.getElementById("stage");
    var ctx = stage.getContext("2d");
    document.addEventListener("keydown", keyPush);
    document.addEventListener("click", clickButton);

    setInterval(game, 180);
    setInterval(pontuacao, 600)
    level();

    

    const vel = 1;

    var vx = 0
    var vy = 0;
    var pontoX = 15;
    var pontoY = 10;
    var tamP = 10;
    
    var quaP = 26;
    var appleX = 10
    var appleY = 15;

    var pontos = 0;

    var rastro = [];
    var cauda = 5;


    


    function game() {

        pontoX += vx;
        pontoY += vy;

        if (pontoX < 0) {
            pontoX = quaP - 1;
        }

        if (pontoX > quaP - 1) {
            pontoX = 0;
        }

        if (pontoY < 0) {
            pontoY = quaP - 1;
        }

        if (pontoY > quaP - 1) {
            pontoY = 0;
        }

        ctx.fillStyle = "rgba(18, 17, 17)";
        ctx.fillRect(0, 0, stage.width, stage.height)

        ctx.fillStyle = "rgb(200, 10, 10)";
        ctx.fillRect(appleX * tamP, appleY * tamP, tamP, tamP);

        ctx.fillStyle = "green";

        
        for (var i = 0; i < rastro.length; i++) {
            ctx.fillRect(rastro[i].x * tamP, rastro[i].y * tamP, tamP - 1, tamP - 1);
  
            if (rastro[i].x == pontoX && rastro[i].y == pontoY) {
                vx = vy = 1;
                cauda = 5;
                pontos = 0;


                let audio = document.getElementById("gameOver-sound.mp4");
                audio.currentTime = 0;
                audio.play();
            }
        }

        rastro.push({
            x: pontoX,
            y: pontoY
        });

        while (rastro.length > cauda)
            rastro.shift();

        if (pontoX == appleX && pontoY == appleY) {
            let audio = document.getElementById("add-audio");
            audio.currentTime = 0.15;
            audio.play();
            cauda += 2;
            pontos += 13;
            appleX = Math.floor(Math.random() * quaP);
            appleY = Math.floor(Math.random() * quaP);
            pontuacao(pontos);
            level();
        }
    }

    function keyPush(event) {
        let audio = document.getElementById("keyDown-sound");
        audio.currentTime = 0.46;

        switch (event.keyCode) {
        case 37:
            //left
            vx = -vel;
            vy = 0;
 
            audio.play();
            break;
        case 38:
            //up
            vx = 0;
            vy = -vel;

            audio.play();
            break;
    
        case 39:
            //height
            vx = vel;
            vy = 0;

            audio.play();
            break;
        case 40:
            //down
            vx = 0;
            vy = vel;

            audio.play();
            break;
        default:
            break;
        }
    }




    function clickButton () {
        let audio = document.getElementById("keyDown-sound");
        audio.currentTime = 0.46;
        function clickLeft (){
            vx = -vel;
            vy = 0;

            audio.play();
        }
        let left = document.getElementById("left");
        left.addEventListener("click", clickLeft);

        function clickUp () {
            vx = 0;
            vy = -vel;
 
            audio.play()
        }
        let up = document.getElementById("up");
        up.addEventListener("click", clickUp);

        function clickHeight () {
            vx = vel;
            vy = 0;

            audio.play();
        }
        let height = document.getElementById("height");
        height.addEventListener("click", clickHeight);

        function clickDown () {
            vx = 0;
            vy = vel;

            audio.play();
        }
        let down = document.getElementById("down");
        down.addEventListener("click", clickDown);

    
    }

    function pontuacao(score) {
        var score = document.getElementById("outPontuacao");
        // if (vx > 0 && vy > 0) {
        //     pontos++;
        // } else {
        //     pontos = 0;
        // }
        score.innerHTML = pontos;


    }



    function level() {

        if (localStorage.getItem("nivel")) {
            var aux = "."
            var nivel = localStorage.getItem("nivel");
            if (pontos >= nivel.length * 6) {
                var nivel = localStorage.getItem("nivel") + aux;
                localStorage.setItem("nivel", nivel);
            }

        } else {
            var nivel = ".";
            localStorage.setItem("nivel", nivel);
        }

        var setLevel = document.getElementById("setLevel");
        setLevel.innerHTML = nivel.length;
    }

    
}
