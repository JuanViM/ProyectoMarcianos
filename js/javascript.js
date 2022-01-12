    //variable de las vidas
    var lives = 3;
    //variable con la puntuacion
    var score = 0;
    //numero de filas
    var brickRowCount = 3;
    //numero de columnas
    var brickColumnCount = 12;
    //ancho columnas
    var brickWidth = 60;
    //alto columnas
    var brickHeight = 20;
    //el padding para el hueco entre ladrillos no se toquen
    var brickPadding = 10;
    //margen superior e izquierdo para que no se dibujen tocando los bordes
    var brickOffsetTop = 30;
    var brickOffsetLeft = 30;
    //guardamos los ladrillos en un array el cual tendra las columncas llamadas c y las filas llamadas r
    //cada ladrillo se va a representar con un objeto en las posiciones x e y en las cuales se dibujara
    var bricks = [];
    for (c = 0; c < brickColumnCount; c++) {
        bricks[c] = [];
        for (r = 0; r < brickRowCount; r++) {
            // estas son las coordenadas donde se dibujaran
            bricks[c][r] = { x: 0, y: 0, status: 1 };
        }
    }

    //guardamos una referencia al elemento canvas en la variable canvas
    var canvas = document.getElementById("myCanvas");
    //en esta variable iremos dibujando el videojuego
    var ctx = canvas.getContext("2d");
    //boton derecho y boton izquierdo, en false por que aun no se han pulsado estos botones
    var rightPressed = false;
    var leftPressed = false;

    //con esto pintamos la paleta para golpear la bola
    //altura
    var paddleHeight = 10;
    //anchura
    var paddleWidth = 75;
    //la posicion en el eje X en el cual empieza a dibujarse
    var paddleX = (canvas.width - paddleWidth) / 2;

    //aqui definimos el lugar donde se va a dibujar la bola
    var x = canvas.width / 2;
    var y = canvas.height - 30;

    // estas dos variables vamos a usarlas para ir moviendo la bola y cambiandola constantemente
    var dx = 2;
    var dy = -2;
    //este es el valor que va a tener nuestra pelota
    var ballRadius = 10;
    //definimos el color de
    var color = "blue";

    //esto son dos funciones las cuales llamariamos escuchadores de eventos para saber cuando se pulsan los botones
    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);
    // añadimos este evento de listener para escuchar el movimiento del raton
    document.addEventListener("mousemove", mouseMoveHandler, false);
    //dependiendo de las posiciones del raton movemos la pala 
    function mouseMoveHandler(e) {
        var relativeX = e.clientX - canvas.offsetLeft;
        if (relativeX > 0 && relativeX < canvas.width) {
            paddleX = relativeX - paddleWidth / 2;
        }
    }
    //cuando ocurra el evento keydown al pulsar una tecla, la funcion keyDownHandler se ejecutara
    // cuando se libere esa tecla(se deje de pulsar) se ejecutara la funcion keyUpHandler
    function keyDownHandler(e) {
        //e.keyCode recogera que tecla es si es 39 es que se ha pulsado la tecla derecha,si vale 37 la izquierda
        if (e.keyCode == 39) {
            rightPressed = true;
        } else if (e.keyCode == 37) {
            leftPressed = true;
        }
    }

    function keyUpHandler(e) {
        if (e.keyCode == 39) {
            rightPressed = false;
        } else if (e.keyCode == 37) {
            leftPressed = false;
        }
    }

    //funcion que detecta la colision de la bola
    function collisionDetection() {
        for (c = 0; c < brickColumnCount; c++) {
            for (r = 0; r < brickRowCount; r++) {
                var b = bricks[c][r];
                if (b.status == 1) {
                    if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                        dy = -dy;
                        b.status = 0;
                        color = "purple";
                        score += 4;
                        //si la puntuacion es igual al numero total de cuadraditos por 4 entonces es que tenemos la maxima puntuacion y se ha acabado el juego 
                        if (score == (brickRowCount * brickColumnCount) * 4) {
                            alert("YOU WIN, CONGRATULATIONS!");
                            document.location.reload();
                        }
                    }
                }
            }
        }
    }
    //funcion para pintar la puntuacion
    function drawScore() {
        ctx.font = "16px Arial";
        ctx.fillStyle = "#0095DD";
        // 8 y 20 son las coordenadas donde se va a dibujar la puntuacion
        ctx.fillText("Score: " + score, 8, 20);
    }
    //funcion para pintar las vidas
    function drawLives() {
        ctx.font = "16px Arial";
        ctx.fillStyle = "#0095DD";
        ctx.fillText("Lives: " + lives, canvas.width - 65, 20);
    }
    //funcion que dibuja la pelota
    function drawBall() {
        ctx.beginPath();
        ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.closePath();
    }
    //funcion que dibujara la pala
    function drawPaddle() {
        ctx.beginPath();
        ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
    }

    // esta funcion lo que hace es irnos pintando los ladrillos uno al lado del otro
    function drawBricks() {
        for (c = 0; c < brickColumnCount; c++) {
            for (r = 0; r < brickRowCount; r++) {
                if (bricks[c][r].status == 1) {
                    var brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
                    var brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
                    bricks[c][r].x = brickX;
                    bricks[c][r].y = brickY;
                    ctx.beginPath();
                    ctx.rect(brickX, brickY, brickWidth, brickHeight);
                    ctx.fillStyle = "#0095DD";
                    ctx.fill();
                    ctx.closePath();
                }
            }
        }
    }
    // funcion que dibuja
    function draw() {
        // código para dibujar
        //esto se utiliza para borrar el dibujo y que paresca que se mueve
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        //llamamos a esta funcion para dibujar los ladrillos
        drawBricks();
        //llamamos a esta funcion para dibujar la bola
        drawBall();
        //llamamos a la funcion drawPaddle para que nos la dibuje la paleta
        drawPaddle();
        //llamamos a la funcion drawScore para dibujar la puntuacion
        drawScore()
            //llamamos a la funcion que detecta las colisiones
        collisionDetection();
        //dibujamos las vidas que tenemos
        drawLives();
        //comprobamos si esta pulsada la izquierda o derecha cada vez que lo dibujamos 
        //si choca con el lado derecho
        if (x + dx > canvas.width - ballRadius) {
            color = "yellow";
            dx = -dx;
            //si choca con el lado izquierdo
        } else if (x + dx < ballRadius) {
            color = "orange";
            dx = -dx;
        }

        //si choca en la pantalla arriba
        if (y + dy < ballRadius) {
            color = "pink";
            dy = -dy;
        } else if (y + dy > canvas.height - ballRadius) {
            if (x > paddleX && x < paddleX + paddleWidth) {
                //con el menos 1 le damos velocidad a la bola cada vez que golpea la paleta
                dy = -dy;
            } else {
                lives--;
                if (!lives) {
                    alert("GAME OVER");
                    document.location.reload();
                } else {
                    x = canvas.width / 2;
                    y = canvas.height - 30;
                    dx = 2;
                    dy = -2;
                    paddleX = (canvas.width - paddleWidth) / 2;
                }
            }
        }

        //llamamos a la funcion drawBall para que nos la dibuje cada 10 milisegundos
        if (rightPressed && paddleX < canvas.width - paddleWidth) {
            //con esto indicamos la velocidad a la que se mueve la paleta
            paddleX += 3;
        } else if (leftPressed && paddleX > 0) {
            //con esto indicamos la velocidad a la que se mueve la paleta
            paddleX -= 3;
        }

        x += dx;
        y += dy;
        //esto ayuda al navegador a mejorar el refresco de las imagenes y al llamar a draw estamos llamandole una y otra vez
        requestAnimationFrame(draw);
    }
    // llamamos a la funcion draw para que este pintando constantemente
    draw();
    // //aqui dentro creamos el dibujo
    // ctx.beginPath();
    // //aqui definimos las coordenadas del cuadrado que dibujamos
    // //el cual se encontrara en en las cordenadas indicadas las cuales
    // //indican 20 pixeles a la izquierda y 40 desde la parte de arriba
    // //teniendo 50 pixeles de ancho y 50 de alto
    // ctx.rect(20, 40, 50, 50);
    // //aqui le guardamos el color a usar
    // ctx.fillStyle = "red";
    // //esta propiedad pintara el cuadrado rojo
    // ctx.fill();
    // //aqui cerramos ya la creacion del dibujo
    // ctx.closePath();

    // //aqui dibujamos un circulo verde 
    // ctx.beginPath();
    // //esta vez en lugar de rect para cuadrado usamos arc para circulo
    // ctx.arc(240, 160, 20, 0, Math.PI * 2, false);
    // ctx.fillStyle = "green";
    // ctx.fill();
    // ctx.closePath();

    // //aqui dibujamos el cuadrado azul
    // ctx.beginPath();
    // ctx.rect(90, 10, 50, 50);
    // //en lugar de fill style usamos stroke para colorear solo las lineas
    // ctx.strokeStyle = "blue";
    // ctx.stroke();
    // ctx.closePath();