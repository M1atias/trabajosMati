document.addEventListener('keydown', function(evento){
    if(evento.keyCode == 32){
        if(nivel.muerto == false){
            saltar();
        }
        else{
            nivel.velocidad = 9;
            nube.velocidad = 1;
            cactus.x = ancho + 100;
            nube.x = ancho + 100;
            nivel.marcador = 0;
            nivel.muerto = false;
            
        }
    }
})

var imgRex, imgNube, imgCactus, imgSuelo;

function cargaImagenes(){
    imgRex = new Image();
    imgNube = new Image();
    imgCactus = new Image();
    imgSuelo = new Image();

    imgRex.src= 'img/dino.png';
    imgNube.src= 'img/nube.png';
    imgCactus.src= 'img/cactus.png';
    imgSuelo.src= 'img/suelo.png';
}




var ancho = 700;
var alto = 300;

var canvas,ctx;

function inicializa(){
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    cargaImagenes();
}


function borraCanvas(){
    canvas.width = ancho;
    canvas.heigth = alto;
}

var suelo = 200;
var trex = {y: suelo, vy:0, gravedad:2, salto:28, vymax:9, saltando:false};
var nivel = {velocidad:9, marcador:0 , muerto : false};
var cactus = {x: ancho + 100, y: suelo - 25};
var nube = {x: 400, y:60, velocidad: 1};
var suelog = {x:0, y: suelo + 20 };

function dibujaRex(){
    ctx.drawImage(imgRex,0,0,923,1000,100,trex.y,50,50);
}

//------------------------------------------------------------------------------------------------
function dibujaCactus(){
    ctx.drawImage(imgCactus,0,0,34,47,cactus.x,cactus.y,38,75);
}

function logicaCactus(){
    if(cactus.x < -100){
        cactus.x = ancho + 100;
        nivel.marcador ++;
    }
    else{
        cactus.x -= nivel.velocidad;
    }
}


//-----------------------------------------------------------------------------------------------
function dibujaNube(){
    ctx.drawImage(imgNube,0,0,49,25,nube.x,nube.y,82,31);
}


function logicaNube(){
    if(nube.x < -100){
        nube.x = ancho + 100;
    }
    else{
        nube.x -= nube.velocidad;
    }
}

//--------------------------------------------------------------------------------------------


function dibujaSuelo(){
    ctx.drawImage(imgSuelo,suelog.x,0,680,30,0,suelog.y,700,30);
}


function logicaSuelo(){
    if(suelog.x >700){
        suelog.x = 0;
    }
    else{
        suelog.x += nivel.velocidad;
    }
}

//--------------------------------------------------------------------------------------------
function saltar(){
    trex.saltando = true;
    trex.vy = trex.salto;
}

function gravedad(){
    if(trex.saltando == true){

        if(trex.y - trex.vy - trex.gravedad > suelo){
            trex.saltando = false;
            trex.vy = 0;
            trex.y = suelo;
        }
        else{
        trex.vy -= trex.gravedad;
        trex.y -= trex.vy;
    }
}
}

function colision(){
    if(cactus.x >= 100 && cactus.x <= 150){
        if(trex.y >= suelo-25){
            nivel.muerto = true;
            nivel.velocidad = 0;
            nube.velocidad = 0;
        }
    }
}

function puntuacion(){
    ctx.font= "30px impact";
    ctx.fillStyle = '#555555';
    ctx.fillText(`${nivel.marcador}`,600,50);

    if(nivel.muerto == true){
        ctx.font = "60px impact";
        ctx.fillText(`GAME OVER`,240,150);
    }
}


//---------------------------------------------------------------------------------------------------------
//Bucle Principal

var FPS = 50;

setInterval(function(){
    principal();
},1000/FPS);

function principal(){
    borraCanvas();
    gravedad();
    colision();
    logicaSuelo();
    logicaCactus();
    logicaNube();
    dibujaSuelo();
    dibujaCactus();
    dibujaNube();
    dibujaRex();
    puntuacion();
}