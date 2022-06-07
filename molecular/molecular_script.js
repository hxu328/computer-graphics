function setup() { 
  var canvas = document.getElementById('myCanvas');

  //Change size
  var slider1 = document.getElementById('slider1');
  slider1.value = 7;

  //Change absolute velocity
  var slider2 = document.getElementById('slider2');
  slider2.value = 1;

  //Change shape
  var slider3 = document.getElementById('slider3');
  slider3.value = 0;

  //Change electron motion velocity
  var slider4 = document.getElementById('slider4');
  slider4.value = 1;

  //Change electron orbit radius
  var slider5 = document.getElementById('slider5');
  slider5.value = 10;




  //fixed 60 degree
  var theta1 = 60 * Math.PI / 180;
  
  //change shape
  var x = 0;
  var y = 0;

  //electron move
  var time = 0;

  //atom move
  var time_atom = 0;

  //obit radius
  var r = slider5.value;

  function draw() {
    var context = canvas.getContext('2d');
    canvas.width = canvas.width;
    context.fillStyle = 'black';
    context.fillRect(0,0,canvas.width, canvas.height);

    function moveToTx(x,y,Tx) {
      var res=vec2.create(); 
      vec2.transformMat3(res,[x,y],Tx); 
      context.moveTo(res[0],res[1]);
    }

    function lineToTx(x,y,Tx) {
      var res=vec2.create();
      vec2.transformMat3(res,[x,y],Tx); 
      context.lineTo(res[0],res[1]);
    }

    function position(p){
        var w = p;
        w = w - Math.floor(w/6) * 6;
        if(w >= 0 && w <= 3){
            w = w;
        }
        else if ( w > 3 && w <= 6){
            w = 6 - w;
        }
        return w;
    }

    function zoom(p){
        var w = p;
        w = w - Math.floor(w/2) * 2;
        if(w >= 0 && w <= 1){
            w = w;
        }
        else if ( w > 1 && w <= 2){
            w = 2 - w;
        }
        return w;
    }

    var ellipse = function(t){
      var x = slider5.value * 12 * Math.cos(Math.PI * t);
      var y = slider5.value * 6 * Math.sin(Math.PI * t);
      return [x, y];
    }

    var ellipse_tangent_angle = function(t){
      var x = slider5.value  * -12 * Math.PI * Math.sin(Math.PI * t);
      var y = slider5.value  * 6 * Math.PI * Math.cos(Math.PI * t);
      return Math.atan2(y, x);
    }

    var huge_ellipse = function (t){
      var x = 300 * Math.cos(Math.PI * t);
      var y = 150 * Math.sin(Math.PI * t);
      return [x, y];
    }

    var huge_ellipse_tangent_angle = function(t){
      var x = -300 * Math.PI * Math.sin(Math.PI * t);
      var y = 150 * Math.PI * Math.cos(Math.PI * t);
      return Math.atan2(y, x);
    }

    function drawEllipse(t_begin, t_end, intervals, C, Tx, color){
      context.strokeStyle=color; 
      context.beginPath(); 
      moveToTx(C(t_begin)[0], C(t_begin)[1], Tx); 
      for(var i=1; i<=intervals; i++){ 
        var t=((intervals-i)/intervals)*t_begin+(i/intervals)*t_end; 
        lineToTx(C(t)[0], C(t)[1], Tx); 
      } 
      context.stroke();
    }

    function drawHugeEllipse(t_begin, t_end, intervals, C, Tx, color){
      context.strokeStyle=color;
      context.lineWidth = 5;
      context.beginPath(); 
      moveToTx(C(t_begin)[0], C(t_begin)[1], Tx); 
      for(var i=1; i<=intervals; i++){ 
        var t=((intervals-i)/intervals)*t_begin+(i/intervals)*t_end; 
        lineToTx(C(t)[0], C(t)[1], Tx); 
      } 
      context.stroke();
    }

    function shape1(color, Tx) {
      
      context.strokeStyle = color;
      context.lineWidth = 2;
      var m = slider1.value; //slider1 changes size here
      var n = m * Math.sqrt(1/3);
      context.beginPath();

      if(x >= 0 && x < 1){
        moveToTx(m*x, -n*(+x + 4), Tx);
        lineToTx(m*(+x + 1), -n*(+x + 5), Tx);

        moveToTx(0, -2*n*(+x + 0), Tx);
        lineToTx(0, -2*n*(+x + 1), Tx);

        moveToTx(2*m, -2*n*(+x - 1), Tx);
        lineToTx(2*m, -2*n*(+x + 0), Tx);
      }
      else if(x >= 1 && x < 2){
        moveToTx(m * x, -n * (+x + 4), Tx);
        lineToTx(m * 2, -n * 6, Tx);
        lineToTx(m*(+x + 1), -n*(-x + 7), Tx);

        moveToTx(0, -2*n*(+x + 0), Tx);
        lineToTx(0, -2*n*(+2), Tx);
        lineToTx(m*(+x - 1), -n*(-x + 5), Tx);

        moveToTx(2*m, -2*n*(+x - 1), Tx);
        lineToTx(2*m, -2*n, Tx);
        lineToTx(m*(+x + 1), -n*(x + 1), Tx);
      }
      else if(x >= 2 && x <= 3){
        moveToTx(m * x, -n * (-x + 8), Tx);
        lineToTx(m * (+x + 1), -n * (-x + 7), Tx);

        moveToTx(m*(+x - 2), -n*(-x + 6), Tx);
        lineToTx(m*(+x - 1), -n*(-x + 5), Tx);

        moveToTx(m*(+x + 0), -n*(x + 0), Tx);
        lineToTx(m*(+x + 1), -n*(x + 1), Tx);
      }
       
      context.stroke();
    }


    function kaleidoscope(Tx){

        var interval = slider3.value / 100;

        var Tx_1 = mat3.clone(Tx);
        x = position(+y + interval);
        shape1('#eb3434', Tx_1);//red


        var Tx_2 = mat3.clone(Tx_1);
        mat3.rotate(Tx_2, Tx_2, theta1);
        x = position(+y + interval*1);
        shape1('#cc34eb', Tx_2);//purple


        var Tx_3 = mat3.clone(Tx_2);
        mat3.rotate(Tx_3, Tx_3, theta1);
        x = position(+y + interval*2);
        shape1('#3437eb', Tx_3);//blue

        var Tx_4 = mat3.clone(Tx_3);
        mat3.rotate(Tx_4, Tx_4, theta1);
        x = position(+y + interval*3);
        shape1('#34d3eb', Tx_4);//pool blue

        var Tx_5 = mat3.clone(Tx_4);
        mat3.rotate(Tx_5, Tx_5, theta1);
        x = position(+y + interval*4);
        shape1('#34eb5f', Tx_5);//green

        var Tx_6 = mat3.clone(Tx_5);
        mat3.rotate(Tx_6, Tx_6, theta1);
        x = position(+y + interval*5);
        shape1('#d3eb34', Tx_6);//yellow

    }


    function drawAtom(Tx){
        var Tmain_to_canvas = mat3.clone(Tx);

        kaleidoscope(Tmain_to_canvas);

        //draw electronic orbit
        drawEllipse(0.0, 2.0, 100, ellipse, Tmain_to_canvas, "red");
        var Tmain_rotate_60 = mat3.clone(Tmain_to_canvas);
        mat3.rotate(Tmain_rotate_60, Tmain_rotate_60, theta1);
        drawEllipse(0.0, 2.0, 100, ellipse, Tmain_rotate_60, "yellow");
        var Tmain_rotate_120 = mat3.clone(Tmain_to_canvas);
        mat3.rotate(Tmain_rotate_120, Tmain_rotate_120, theta1*2);
        drawEllipse(0.0, 2.0, 100, ellipse, Tmain_rotate_120, "blue");

        //draw electron motions
        var Telectron_to_canvas_1 = mat3.clone(Tmain_to_canvas);
        mat3.translate(Telectron_to_canvas_1, Telectron_to_canvas_1, ellipse(time));
        mat3.scale(Telectron_to_canvas_1, Telectron_to_canvas_1, [0.5, 0.5]);
        mat3.rotate(Telectron_to_canvas_1, Telectron_to_canvas_1, ellipse_tangent_angle(time));
        kaleidoscope(Telectron_to_canvas_1);

        var Telectron_to_canvas_2 = mat3.clone(Tmain_rotate_60);
        mat3.translate(Telectron_to_canvas_2, Telectron_to_canvas_2, ellipse(time + 0.3));
        mat3.scale(Telectron_to_canvas_2, Telectron_to_canvas_2, [0.5, 0.5]);
        mat3.rotate(Telectron_to_canvas_2, Telectron_to_canvas_2, ellipse_tangent_angle(time + 0.3));
        kaleidoscope(Telectron_to_canvas_2);

        var Telectron_to_canvas_3 = mat3.clone(Tmain_rotate_120);
        mat3.translate(Telectron_to_canvas_3, Telectron_to_canvas_3, ellipse(time + 0.6));
        mat3.scale(Telectron_to_canvas_3, Telectron_to_canvas_3, [0.5, 0.5]);
        mat3.rotate(Telectron_to_canvas_3, Telectron_to_canvas_3, ellipse_tangent_angle(time + 0.6));
        kaleidoscope(Telectron_to_canvas_3);
    }

    var space = mat3.create();
    mat3.fromTranslation(space,[400, 400]);
    mat3.rotate(space, space, theta1 * -0.5); //rotate 30 degree
    drawHugeEllipse(0.0, 2.0, 100, huge_ellipse, space, "green");
    var Tatom_to_canvas_1 = mat3.clone(space);
    mat3.translate(Tatom_to_canvas_1, Tatom_to_canvas_1, huge_ellipse(time_atom));
    mat3.rotate(Tatom_to_canvas_1, Tatom_to_canvas_1, huge_ellipse_tangent_angle(time_atom));
    mat3.scale(Tatom_to_canvas_1, Tatom_to_canvas_1, [zoom(time_atom) + 0.3, zoom(time_atom) + 0.3]);
    drawAtom(Tatom_to_canvas_1);

    var Tatom_to_canvas_2 = mat3.clone(space);
    mat3.translate(Tatom_to_canvas_2, Tatom_to_canvas_2, huge_ellipse(time_atom + 0.66));
    mat3.rotate(Tatom_to_canvas_2, Tatom_to_canvas_2, huge_ellipse_tangent_angle(time_atom + 0.66));
    mat3.scale(Tatom_to_canvas_2, Tatom_to_canvas_2, [zoom(time_atom+0.66) + 0.3, zoom(time_atom+0.66) + 0.3]);
    drawAtom(Tatom_to_canvas_2);

    var Tatom_to_canvas_3 = mat3.clone(space);
    mat3.translate(Tatom_to_canvas_3, Tatom_to_canvas_3, huge_ellipse(time_atom + 1.33));
    mat3.rotate(Tatom_to_canvas_3, Tatom_to_canvas_3, huge_ellipse_tangent_angle(time_atom + 1.33));
    mat3.scale(Tatom_to_canvas_3, Tatom_to_canvas_3, [zoom(time_atom + 1.33) + 0.3, zoom(time_atom + 1.33) + 0.3]);
    drawAtom(Tatom_to_canvas_3);


    //Change shape
    y = y + 0.05;
    x = position(y);

    //Change abolute velocity
    time_atom = time_atom + slider2.value / 100;

    //Change electron motion velocity
    time = time + slider4.value / 100;

    window.requestAnimationFrame(draw);
  }


  window.requestAnimationFrame(draw);
//   slider1.addEventListener("input", window.requestAnimationFrame(draw));
//   slider2.addEventListener("input", window.requestAnimationFrame(draw));
//   slider3.addEventListener("input", window.requestAnimationFrame(draw));
//   slider4.addEventListener("input", window.requestAnimationFrame(draw));
//   slider5.addEventListener("input", window.requestAnimationFrame(draw));
}
window.onload = setup;

