function setup() {
    var observerCanvas = document.getElementById('observerCanvas');
    var cameraCanvas = document.getElementById('cameraCanvas');
    var observerContext = observerCanvas.getContext('2d');
    var cameraContext = cameraCanvas.getContext('2d');
    var slider1 = document.getElementById('slider1');
    slider1.value = 1;
    var slider2 = document.getElementById('slider2');
    slider2.value = 0;
    var slider3 = document.getElementById('slider3');
    slider3.value = 100;
    var slider4 = document.getElementById('slider4');
    slider4.value = 50;


    var context = cameraContext; // default to drawing in the camera window
    var tParam = 0.00;

    function draw() {

        observerCanvas.width = observerCanvas.width;
        cameraCanvas.width = cameraCanvas.width;
        context = cameraContext;
        context.fillStyle = 'black';
        context.fillRect(0,0,cameraCanvas.width, cameraCanvas.height);

        context = observerContext;
        context.fillStyle = 'black';
        context.fillRect(0,0,observerCanvas.width, observerCanvas.height);
        context = cameraContext;

        var viewAngle = slider2.value*0.02*Math.PI;
        var rotationSpeed = slider3.value/100.0;
        var startPoint1 = 100.0;
        var startPoint2 = -100.0;
        var switchOn = slider1.value;
        var shape_radius = slider4.value/100.0;


        //moveto and lineto functions
        function moveToTx(loc,Tx)
        {var res=vec3.create(); vec3.transformMat4(res,loc,Tx); context.moveTo(res[0],res[1]);}
        function lineToTx(loc,Tx)
        {var res=vec3.create(); vec3.transformMat4(res,loc,Tx); context.lineTo(res[0],res[1]);}


        //draw the missile
        function drawMissile(color_1,color_2, TxU,scale) {
            var Tx = mat4.clone(TxU);
            mat4.scale(Tx,Tx,[scale,scale,scale]);
            context.fillStyle = color_1;
            context.beginPath();
            moveToTx([-10,  0, 70],Tx);lineToTx([-30,  0, 70],Tx);lineToTx([-10,  0, 50],Tx);
            lineToTx([-20,  0, 10],Tx);lineToTx([-30,  0,-10],Tx);lineToTx([-30,  0,-60],Tx);
            lineToTx([-10,  0,-80],Tx);
            lineToTx([ 10,  0,-80],Tx);lineToTx([ 30,  0, -60],Tx);lineToTx([ 30,  0,-10],Tx);
            lineToTx([ 20,  0, 10],Tx);lineToTx([ 10, 0, 50],Tx);
            lineToTx([30, 0, 70],Tx);lineToTx([10, 0, 70],Tx); lineToTx([0, 30, 70],Tx);
            lineToTx([-10,  0, 70],Tx);
            context.closePath();
            context.fill();

            context.fillStyle = color_2;
            context.beginPath();
            moveToTx([0, 30, 70], Tx); lineToTx([-10, 0, 70], Tx)
            lineToTx([-20,  0, 70],Tx);lineToTx([-30,  0, 100],Tx);lineToTx([-10,  0, 90],Tx);
            lineToTx([0,  0, 110],Tx);lineToTx([10,  0,90],Tx);lineToTx([30,  0, 100],Tx);
            lineToTx([20,  0,70],Tx); lineToTx([10, 0, 70], Tx);lineToTx([0, 30, 70],Tx);
            context.closePath();
            context.fill();
        }

        //draw the camera
        function drawCamera(color,TxU,scale) {
            var Tx = mat4.clone(TxU);
            mat4.scale(Tx,Tx,[scale,scale,scale]);
            context.beginPath();
            context.strokeStyle = color;
            context.fillStyle = "yellow";
            // Twelve edges of a cropped pyramid
            moveToTx([-3,-3,-2],Tx);lineToTx([3,-3,-2],Tx);
            lineToTx([3,3,-2],Tx);lineToTx([-3,3,-2],Tx);
            context.fill();
            context.stroke();
            context.beginPath();
            moveToTx([3,-3,-2],Tx);lineToTx([2,-2,0],Tx);
            lineToTx([2,2,0],Tx);lineToTx([3,3,-2],Tx);
            context.fill();
            context.stroke();
            context.beginPath();
            moveToTx([2,-2,0],Tx);lineToTx([-2,-2,0],Tx);
            lineToTx([-2,2,0],Tx);lineToTx([2,2,0],Tx);
            context.fill();
            context.stroke();
            context.beginPath();
            moveToTx([-2,-2,0],Tx);lineToTx([-3,-3,-2],Tx);
            lineToTx([-3,3,-2],Tx);lineToTx([-2,2,0],Tx);
            context.stroke();
            context.fill();
        }


        // This is the function C(t)
        function C0(t, startPoint){
            var r = shape_radius * t + 1;
            var x = r * startPoint*Math.cos(2.0*Math.PI*t);
            var y = 80.0*t*t;
            var z = r * startPoint*Math.sin(2.0*Math.PI*t);
            var result = [x, y, z];
            return result;
        }

        // And this is the derivative C'(t) -- which is the tangent vector
        function C0prime(t, startPoint){
            var xPrime = shape_radius * startPoint*Math.cos(2.0*Math.PI*t) +
                (shape_radius*t + 1) * -2 * startPoint*Math.PI*Math.sin(2.0*Math.PI*t);
            var yPrime = 2*80.0*t;
            var zPrime = shape_radius * startPoint*Math.sin(2.0*Math.PI*t) +
                (shape_radius*t + 1) * 2 * startPoint *Math.PI*Math.cos(2.0*Math.PI*t);
            var result = [xPrime, yPrime, zPrime];
            return result;
        }

        //cubic curves
        var Hermite = function(t) {
            return [
                2*t*t*t-3*t*t+1,
                t*t*t-2*t*t+t,
                -2*t*t*t+3*t*t,
                t*t*t-t*t
            ];
        }

        var HermiteDerivative = function(t) {
            return [
                6*t*t-6*t,
                3*t*t-4*t+1,
                -6*t*t+6*t,
                3*t*t-2*t
            ];
        }

        function Cubic(basis,P,t){
            var b = basis(t);
            var result=vec3.create();
            vec3.scale(result,P[0],b[0]);
            vec3.scaleAndAdd(result,result,P[1],b[1]);
            vec3.scaleAndAdd(result,result,P[2],b[2]);
            vec3.scaleAndAdd(result,result,P[3],b[3]);
            return result;
        }

        var p0=C0(2, startPoint1);
        var d0=C0prime(2, startPoint1);
        var p1=[300*shape_radius,160,0];
        var d1=[0,0,-300];
        var p2=C0(0, startPoint1);
        var d2=C0prime(0, startPoint1);

        var P0 = [p0,d0,p1,d1];
        var P1 = [p1,d1,p2,d2];

        var p3=C0(2, startPoint2);
        var d3=C0prime(2, startPoint2);
        var p4=[-300*shape_radius,160,0];
        var d4=[0,0,300];
        var p5=C0(0, startPoint2);
        var d5=C0prime(0, startPoint2);

        var P2 = [p3,d3,p4,d4];
        var P3 = [p4,d4,p5,d5];

        var C1 = function(t_, startPoint) {
            if (startPoint == startPoint1) {
                return Cubic(Hermite, P0, t_);
            }
            else if (startPoint == startPoint2){
                return Cubic(Hermite,P2,t_);
            }
        }
        var C2 = function(t_, startPoint) {
            if (startPoint == startPoint1){
                return Cubic(Hermite,P1,t_);
            }
            else if (startPoint == startPoint2){
                return Cubic(Hermite,P3,t_);
            }
        }

        var C1prime = function(t_, startPoint) {
            if (startPoint == startPoint1) {
                return Cubic(HermiteDerivative, P0, t_);
            } else if (startPoint == startPoint2) {
                return Cubic(HermiteDerivative, P2, t_);
            }
        }

        var C2prime = function(t_, startPoint) {
            if (startPoint == startPoint1) {
                return Cubic(HermiteDerivative, P1, t_);
            } else if (startPoint == startPoint2) {
                return Cubic(HermiteDerivative, P3, t_);
            }
        }

        var Ccomp = function(t, startPoint) {
            if (t<2){
                var u = t;
                return C0(u, startPoint);
            } else if (t<3){
                var u = t-2.0;
                return C1(u, startPoint);
            } else {
                var u = t-3.0;
                return C2(u, startPoint);
            }
        }

        var Ccomp_tangent = function(t, startPoint) {
            if (t<2){
                var u = t;
                return C0prime(u, startPoint);
            } else if (t<3){
                var u = t-2.0;
                return C1prime(u, startPoint);
            } else {
                var u = t-3.0;
                return C2prime(u, startPoint);
            }
        }

        var CameraCurve = function(angle) {
            var distance = 120.0;
            var eye = vec3.create();
            eye[0] = distance*Math.sin(viewAngle);
            eye[1] = 100 * Math.sin(viewAngle) + 20;
            eye[2] = distance*Math.cos(viewAngle);
            return [eye[0],eye[1],eye[2]];
        }

        function drawTrajectory(startPoint, t_begin,t_end,intervals,C,Tx,color) {
            context.lineWidth = 5;
            context.strokeStyle= color;
            context.beginPath();
            moveToTx(C(t_begin, startPoint),Tx);
            for(var i=1;i<=intervals;i++){
                var t=((intervals-i)/intervals)*t_begin+(i/intervals)*t_end;
                lineToTx(C(t, startPoint),Tx);
            }
            context.stroke();
            context.lineWidth = 1;
        }

        // camera (lookAt) transform
        var eyeCamera = CameraCurve(viewAngle);
        var targetCamera = vec3.fromValues(0,0,0);
        var upCamera = vec3.fromValues(0,1,0);
        var TlookAtCamera = mat4.create();
        mat4.lookAt(TlookAtCamera, eyeCamera, targetCamera, upCamera);

        // observer (lookAt) transform
        var eyeObserver = vec3.fromValues(300,400,500);
        var targetObserver = vec3.fromValues(0,40,0);
        var upObserver = vec3.fromValues(0,1,0);
        var TlookAtObserver = mat4.create();
        mat4.lookAt(TlookAtObserver, eyeObserver, targetObserver, upObserver);

        // ViewPort transform
        var Tviewport = mat4.create();
        mat4.fromTranslation(Tviewport,[300,400,0]);
        mat4.scale(Tviewport,Tviewport,[100,-100,1]);

        context = cameraContext;

        // camera projection transform
        var TprojectionCamera = mat4.create();
        mat4.ortho(TprojectionCamera,-100,100,-100,100,-1,1);

        // observer projection transform
        var TprojectionObserver = mat4.create();
        mat4.ortho(TprojectionObserver,-120,120,-120,120,-1,1);

        // transform t_VP_PROJ_VIEW for camera and observer
        var tVP_PROJ_VIEW_Camera = mat4.create();
        mat4.multiply(tVP_PROJ_VIEW_Camera,Tviewport,TprojectionCamera);
        mat4.multiply(tVP_PROJ_VIEW_Camera,tVP_PROJ_VIEW_Camera,TlookAtCamera);
        var tVP_PROJ_VIEW_Observer = mat4.create();
        mat4.multiply(tVP_PROJ_VIEW_Observer,Tviewport,TprojectionObserver);
        mat4.multiply(tVP_PROJ_VIEW_Observer,tVP_PROJ_VIEW_Observer,TlookAtObserver);

        //modeling transform
        var Tmodel1 = mat4.create();
        mat4.fromTranslation(Tmodel1,Ccomp(tParam,startPoint1));
        var Tmodel1_rot=mat4.create();
        var eyePlane1 = vec3.fromValues(0,0,0);
        mat4.lookAt(Tmodel1_rot, eyePlane1, Ccomp_tangent(tParam,startPoint1), upObserver);
        mat4.invert(Tmodel1_rot,Tmodel1_rot);
        mat4.multiply(Tmodel1,Tmodel1,Tmodel1_rot);

        var Tmodel2 = mat4.create();
        mat4.fromTranslation(Tmodel2,Ccomp(tParam,startPoint2));
        var Tmodel_rot2=mat4.create();
        var eyePlane2 = vec3.fromValues(0,0,0);
        mat4.lookAt(Tmodel_rot2, eyePlane2, Ccomp_tangent(tParam,startPoint2), upObserver);
        mat4.invert(Tmodel_rot2,Tmodel_rot2);
        mat4.multiply(Tmodel2,Tmodel2,Tmodel_rot2);

        // t_VP_PROJ_VIEW_MOD
        var tVP_PROJ_VIEW_MOD1_Camera = mat4.create();
        mat4.multiply(tVP_PROJ_VIEW_MOD1_Camera, tVP_PROJ_VIEW_Camera, Tmodel1);

        var tVP_PROJ_VIEW_MOD2_Camera = mat4.create();
        mat4.multiply(tVP_PROJ_VIEW_MOD2_Camera, tVP_PROJ_VIEW_Camera, Tmodel2);

        var tVP_PROJ_VIEW_MOD1_Observer = mat4.create();
        mat4.multiply(tVP_PROJ_VIEW_MOD1_Observer, tVP_PROJ_VIEW_Observer, Tmodel1);

        var tVP_PROJ_VIEW_MOD2_Observer = mat4.create();
        mat4.multiply(tVP_PROJ_VIEW_MOD2_Observer, tVP_PROJ_VIEW_Observer, Tmodel2);

        var tVP_PROJ_VIEW_MOD3_Observer = mat4.create();
        mat4.translate(tVP_PROJ_VIEW_MOD3_Observer, tVP_PROJ_VIEW_Observer, eyeCamera);
        var TlookFromCamera = mat4.create();
        mat4.invert(TlookFromCamera,TlookAtCamera);
        mat4.multiply(tVP_PROJ_VIEW_MOD3_Observer, tVP_PROJ_VIEW_MOD3_Observer, TlookFromCamera);

        // camera window
        context = cameraContext;
        if(switchOn == 0){
            drawTrajectory(startPoint1, tParam-0.2,tParam,100,Ccomp,tVP_PROJ_VIEW_Camera,"orange");
            drawTrajectory(startPoint2, tParam-0.2,tParam,100,Ccomp,tVP_PROJ_VIEW_Camera,"orange");
        }else{
            drawTrajectory(startPoint1, 0.0,4.0,100,Ccomp,tVP_PROJ_VIEW_Camera,"green");
            drawTrajectory(startPoint2, 0.0,4.0,100,Ccomp,tVP_PROJ_VIEW_Camera,"purple");
        }
        drawMissile("green","Red",tVP_PROJ_VIEW_MOD1_Camera,0.5);
        drawMissile("purple","Red",tVP_PROJ_VIEW_MOD2_Camera,0.5);

        // observer window
        context = observerContext;
        if(switchOn == 0){
            drawTrajectory(startPoint1, tParam-0.2,tParam,100,Ccomp,tVP_PROJ_VIEW_Observer,"orange");
            drawTrajectory(startPoint2, tParam-0.2,tParam,100,Ccomp,tVP_PROJ_VIEW_Observer,"orange");
        }else{
            drawTrajectory(startPoint1, 0.0,4.0,100,Ccomp,tVP_PROJ_VIEW_Observer,"green");
            drawTrajectory(startPoint2, 0.0,4.0,100,Ccomp,tVP_PROJ_VIEW_Observer,"purple");
        }
        drawMissile("green","Red", tVP_PROJ_VIEW_MOD1_Observer,0.5);
        drawMissile("purple","Red",tVP_PROJ_VIEW_MOD2_Observer,0.5);
        drawCamera("blue",tVP_PROJ_VIEW_MOD3_Observer,10.0);

        tParam = tParam + rotationSpeed*0.01;
        if(tParam > 4){
            tParam = tParam-4;
        }

        window.requestAnimationFrame(draw);
    }


    window.requestAnimationFrame(draw);
}
window.onload = setup;
