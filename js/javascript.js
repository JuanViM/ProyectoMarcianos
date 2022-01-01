     //guardamos una referencia al elemento canvas en la variable canvas
     var canvas = document.getElementById("myCanvas");
     //en esta variable iremos dibujando el videojuego
     var ctx = canvas.getContext("2d");

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
     //funcion que dibuja la pelota
     function drawBall() {
         ctx.beginPath();
         ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
         ctx.fillStyle = color;
         ctx.fill();
         ctx.closePath();
     }
     // funcion que dibuja
     function draw() {
         // código para dibujar
         //esto se utiliza para borrar el dibujo y que paresca que se mueve
         ctx.clearRect(0, 0, canvas.width, canvas.height);
         //llamamos a la funcion drawBall para que nos la dibuje cada 10 milisegundos
         drawBall();
         x += dx;
         y += dy;
         //si choca con el lado derecho
         if (x + dx > canvas.width - ballRadius) {
             color = "yellow";
             dx = -dx;
             //si choca con el lado izquierdo
         } else if (x + dx < ballRadius) {
             color = "orange";
             dx = -dx;
         }
         //si choca en la pantalla abajo
         if (y + dy > canvas.height - ballRadius) {
             color = "green";
             dy = -dy;
             //si choca en la pantalla arriba
         } else if (y + dy < ballRadius) {
             color = "pink";
             dy = -dy;
         }
     }
     //esta funcion indica el tiempo que tardara en ejecutarse 
     //la funcion draw en este caso seran 10 milisegundos y se ejecutrara todo el rato cada 10 milisegundos.
     setInterval(draw, 10);
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