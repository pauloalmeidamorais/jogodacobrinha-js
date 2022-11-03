window.onload = function(){
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");

    document.addEventListener("keydown", keyDownEvent);

    //Renderiza 15 vezes por segundo
    x = 15;
    setInterval(desenharJogo, 1000 / 15);
};
    

//Criação da tela de jogo
tamanhoTela = tamanhoCaminho = 20;
nextX = nextY = 0;

//Criação da cobra
defaultTamanhoCauda = 5;
tamanhoCauda = defaultTamanhoCauda;
tamanhoCobra = [];
cobraEixoX = cobraEixoY = 10;

//Criação da comida
frutaX = (frutaY = 15);

function desenharJogo(){
    cobraEixoX += nextX;
    cobraEixoY += nextY;

    if (cobraEixoX < 0){
        cobraEixoX = tamanhoTela -1;
    }
    if (cobraEixoX > tamanhoTela - 1){
        cobraEixoX = 0;
    }
    if (cobraEixoY < 0){
        cobraEixoY = tamanhoTela -1;
    }
    if (cobraEixoY > tamanhoTela - 1){
        cobraEixoY = 0;
    }
    //Se a cobra comer 
    if (cobraEixoX == frutaX && cobraEixoY == frutaY){
        tamanhoCauda++;
        frutaX = Math.floor(Math.random() * tamanhoTela);
        frutaY = Math.floor(Math.random() * tamanhoTela);
    }
    //Estiliza o fundo
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    //Estiliza a Cobra
    ctx.fillStyle = "yellow";
    for (i = 0; i < tamanhoCobra.length; i++){
        ctx.fillRect(
            tamanhoCobra[i].x * tamanhoCaminho,
            tamanhoCobra[i].y * tamanhoCaminho,
            tamanhoCaminho -2,
            tamanhoCaminho -2
        );
        if (tamanhoCobra[i].x == cobraEixoX && tamanhoCobra[i].y == cobraEixoY){
            tamanhoCauda = defaultTamanhoCauda;
        }
    }
    //Estiliza a Fruta
    ctx.fillStyle = "lime";
    ctx.fillRect(
        frutaX * tamanhoCaminho, 
        frutaY * tamanhoCaminho, 
        tamanhoCaminho -2, 
        tamanhoCaminho -2
    );

    tamanhoCobra.push({
        x:cobraEixoX,
        y:cobraEixoY
    });
    while (tamanhoCobra.length > tamanhoCauda){
        tamanhoCobra.shift();
    }
}

function keyDownEvent(event){
    // nextX e nextY são as direções que a cobra irá percorrer [Matriz eixos X e Y]
    switch(event.keyCode){
        case 37:
            nextX = -1;
            nextY = 0;
            break;
        case 38:
            nextX = 0;
            nextY = -1;
            break;
        case 39:
            nextX = 1;
            nextY = 0;
            break;
        case 40:
            nextX = 0;
            nextY = 1;
            break;
    }
}