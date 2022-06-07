function setup() { 
  var canvas = document.getElementById('myCanvas');
  var slider1 = document.getElementById('slider1');
  slider1.value = 7;
  var slider2 = document.getElementById('slider2');
  slider2.value = 1;
  var slider3 = document.getElementById('slider3');
  slider3.value = 0;
  var slider4 = document.getElementById('slider4');
  slider4.value = 0;
  var slider5 = document.getElementById('slider5');
  slider5.value = 10;

  var theta1 = 60 * Math.PI / 180;
  var theta2 = 0;
  var theta3 = 30 * Math.PI / 180;
  
  var y = 0;
  var x = 0;
  var z = 0;

  function draw() {
    var context = canvas.getContext('2d');
    canvas.width = canvas.width;
    context.fillStyle = 'black';
    context.fillRect(0,0,canvas.width, canvas.height);
    z = slider5.value;

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

    function shape1(color) {
      
      //x = slider2.value / 10;
      context.strokeStyle = color;
      context.lineWidth = 2;
      var m = slider1.value;
      var n = m * Math.sqrt(1/3);
      context.beginPath();

      if(x >= 0 && x < 1){
        context.moveTo(m*x, -n*(+x + 4));
        context.lineTo(m*(+x + 1), -n*(+x + 5));

        context.moveTo(0, -2*n*(+x + 0));
        context.lineTo(0, -2*n*(+x + 1));

        context.moveTo(2*m, -2*n*(+x - 1));
        context.lineTo(2*m, -2*n*(+x + 0));
      }
      else if(x >= 1 && x < 2){
        context.moveTo(m * x, -n * (+x + 4));
        context.lineTo(m * 2, -n * 6);
        context.lineTo(m*(+x + 1), -n*(-x + 7));

        context.moveTo(0, -2*n*(+x + 0));
        context.lineTo(0, -2*n*(+2));
        context.lineTo(m*(+x - 1), -n*(-x + 5));

        context.moveTo(2*m, -2*n*(+x - 1));
        context.lineTo(2*m, -2*n);
        context.lineTo(m*(+x + 1), -n*(x + 1));
      }
      else if(x >= 2 && x <= 3){
        context.moveTo(m * x, -n * (-x + 8));
        context.lineTo(m * (+x + 1), -n * (-x + 7));

        context.moveTo(m*(+x - 2), -n*(-x + 6));
        context.lineTo(m*(+x - 1), -n*(-x + 5));

        context.moveTo(m*(+x + 0), -n*(x + 0));
        context.lineTo(m*(+x + 1), -n*(x + 1));
      }
       
      context.stroke();
    }


    function kaleidoscope(){

        var interval = slider3.value / 100;
        x = position(+y + interval);
        shape1('#eb3434');//red
        context.rotate(theta1);

        x = position(+y + interval*1);
        shape1('#cc34eb');//purple
        context.rotate(theta1);

        x = position(+y + interval*2);
        shape1('#3437eb');//blue
        context.rotate(theta1);

        x = position(+y + interval*3);
        shape1('#34d3eb');//pool blue
        context.rotate(theta1);

        x = position(+y + interval*4);
        shape1('#34eb5f');//green

        x = position(+y + interval*5);
        context.rotate(theta1);
        shape1('#d3eb34');//yellow

    }
    //Draw Shapes here
    context.translate(170, 170);
    context.save();
    context.rotate(theta2);
    context.translate(60, 0);
    kaleidoscope();

    context.rotate(theta3);

    context.save();

    context.translate(80 + z*position(+y + 0), 0);
    context.scale(0.5, 0.5);
    kaleidoscope();

    context.restore();
    context.save();

    context.rotate(60 * Math.PI / 180);
    context.translate(80 + z*position(+y + 1), 0);
    context.scale(0.5, 0.5);
    kaleidoscope();

    context.restore();
    context.save();

    context.rotate(120 * Math.PI / 180);
    context.translate(80 + z*position(+y + 2), 0);
    context.scale(0.5, 0.5);
    kaleidoscope();

    context.restore();
    context.save();

    context.rotate(180 * Math.PI / 180);
    context.translate(80 + z*position(+y + 3), 0);
    context.scale(0.5, 0.5);
    kaleidoscope();
    
    context.restore();
    context.save();

    context.rotate(240 * Math.PI / 180);
    context.translate(80 + z*position(+y + 4), 0);
    context.scale(0.5, 0.5);
    kaleidoscope();

    context.restore();
    context.save();

    context.rotate(300 * Math.PI / 180);
    context.translate(80 + z*position(+y + 5), 0);
    context.scale(0.5, 0.5);
    kaleidoscope();

    y = y + 0.05;
    x = position(y);
    
    theta2 = theta2 + slider2.value * Math.PI / 180;
    theta3 = theta3 + slider4.value * Math.PI / 180;
    window.requestAnimationFrame(draw);
  }

  slider1.addEventListener("input", window.requestAnimationFrame(draw));
  slider2.addEventListener("input", window.requestAnimationFrame(draw));
  slider3.addEventListener("input", window.requestAnimationFrame(draw));
  slider4.addEventListener("input", window.requestAnimationFrame(draw));
  slider5.addEventListener("input", window.requestAnimationFrame(draw));
  window.requestAnimationFrame(draw);
}
window.onload = setup;

