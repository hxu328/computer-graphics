function setup() {
    var observerCanvas = document.getElementById('observerCanvas');
    var cameraCanvas = document.getElementById('cameraCanvas');
    var observerContext = observerCanvas.getContext('2d');
    var cameraContext = cameraCanvas.getContext('2d');
    var slider1 = document.getElementById('slider1');
    slider1.value = 2;
    var slider2 = document.getElementById('slider2');
    slider2.value = 0;
    var slider3 = document.getElementById('slider3');
    slider3.value = 100;
    var slider4 = document.getElementById('slider4');
    slider4.value = 50;
    var slider5 = document.getElementById('slider5');
    slider5.value = 0;
    var slider6 = document.getElementById('slider6');
    slider6.value = 50;
    var slider7 = document.getElementById('slider7');
    slider7.value = 60;


    var context = cameraContext; // default to drawing in the camera window
    var tParam = 0.00;
    var planeAngle = 0;
    var x = 0;
    var y = 0;

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
        var plane_distance = slider6.value/1000.0;
        var relative_angle = slider7.value * Math.PI/180.0;


        //moveto and lineto functions
        function moveToTx(loc,Tx)
        {var res=vec3.create(); vec3.transformMat4(res,loc,Tx); context.moveTo(res[0],res[1]);}
        function lineToTx(loc,Tx)
        {var res=vec3.create(); vec3.transformMat4(res,loc,Tx); context.lineTo(res[0],res[1]);}


        ///////////////////////////////////////////////////////////////
        function drawLittlePlane(color,TxU,scale) {
            var Tx = mat4.clone(TxU);
            mat4.scale(Tx,Tx,[scale,scale,scale]);
            context.fillStyle = color;
            context.beginPath();
            moveToTx([0,  0, -30],Tx);lineToTx([10,  0, 10],Tx);lineToTx([0,  0, 5],Tx);
            lineToTx([-10,  0, 10],Tx);lineToTx([0,  0, -30],Tx);
            context.closePath();
            context.fill();
        }
        var PlaneCurve = function(angle) {
            var distance = 30.0;
            var object = vec3.create();
            object[0] = distance*Math.sin(angle);
            object[1] = distance*Math.cos(angle);
            object[2] = 0;
            return [object[0],object[1],object[2]];
        }
        ///////////////////////////////////////////////////////////////
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

        function drawBasicShape(color,TxU,scale) {
            var Tx = mat4.clone(TxU);
            mat4.scale(Tx,Tx,[scale,scale,scale]);
            context.strokeStyle = color;
            context.lineWidth = 2;
            var n = Math.sqrt(1/3);
            context.beginPath();

            if(x >= 0 && x < 1){
                moveToTx([x, -n*(+x + 4), 0], Tx);
                lineToTx([(+x + 1), -n*(+x + 5), 0], Tx);

                moveToTx([0, -2*n*(+x + 0), 0], Tx);
                lineToTx([0, -2*n*(+x + 1), 0], Tx);

                moveToTx([2, -2*n*(+x - 1), 0], Tx);
                lineToTx([2, -2*n*(+x + 0), 0], Tx);
            }
            else if(x >= 1 && x < 2){
                moveToTx([x, -n * (+x + 4), 0], Tx);
                lineToTx([2, -n * 6, 0], Tx);
                lineToTx([(+x + 1), -n*(-x + 7), 0], Tx);

                moveToTx([0, -2*n*(+x + 0), 0], Tx);
                lineToTx([0, -2*n*(+2), 0], Tx);
                lineToTx([(+x - 1), -n*(-x + 5), 0], Tx);

                moveToTx([2, -2*n*(+x - 1), 0], Tx);
                lineToTx([2, -2*n, 0], Tx);
                lineToTx([(+x + 1), -n*(x + 1), 0], Tx);
            }
            else if(x >= 2 && x <= 3){
                moveToTx([x, -n * (-x + 8), 0], Tx);
                lineToTx([(+x + 1), -n * (-x + 7), 0], Tx);

                moveToTx([(+x - 2), -n*(-x + 6), 0], Tx);
                lineToTx([(+x - 1), -n*(-x + 5), 0], Tx);

                moveToTx([(+x + 0), -n*(x + 0), 0], Tx);
                lineToTx([(+x + 1), -n*(x + 1), 0], Tx);
            }
            context.stroke();
        }
        function drawKaleidoscope(TxU,scale){
            var Tx = mat4.clone(TxU);
            var Tx1 = mat4.create();
            var Tx2 = mat4.create();
            var Tx3 = mat4.create();
            var Tx4 = mat4.create();
            var Tx5 = mat4.create();
            var Tx6 = mat4.create();

            mat4.rotateZ(Tx1, Tx, 0 * 60 * Math.PI / 180);
            mat4.rotateZ(Tx2, Tx, 1 * 60 * Math.PI / 180);
            mat4.rotateZ(Tx3, Tx, 2 * 60 * Math.PI / 180);
            mat4.rotateZ(Tx4, Tx, 3 * 60 * Math.PI / 180);
            mat4.rotateZ(Tx5, Tx, 4 * 60 * Math.PI / 180);
            mat4.rotateZ(Tx6, Tx, 5 * 60 * Math.PI / 180);


            var interval = slider5.value / 100;
            x = position(+y + interval);
            drawBasicShape('#eb3434', Tx1, scale);

            x = position(+y + interval*1);
            drawBasicShape('#cc34eb', Tx2, scale);

            x = position(+y + interval*2);
            drawBasicShape('#3437eb', Tx3, scale);

            x = position(+y + interval*3);
            drawBasicShape('#34d3eb', Tx4, scale);

            x = position(+y + interval*4);
            drawBasicShape('#34eb5f', Tx5, scale);

            x = position(+y + interval*5);
            drawBasicShape('#d3eb34', Tx6, scale);
        }

        function drawMultipleK(Tux, scale, angle){

            var Tx1 = mat4.clone(Tux);
            var Tx2 = mat4.clone(Tux);
            var Tx3 = mat4.clone(Tux);
            var Tx4 = mat4.clone(Tux);
            var Tx5 = mat4.clone(Tux);
            var Tx6 = mat4.clone(Tux);

            mat4.rotateZ(Tx1, Tx1, 30*Math.PI/180);
            mat4.rotateZ(Tx2, Tx2, (30 + 1 * 60) * Math.PI/180);
            mat4.rotateZ(Tx3, Tx3, (30 + 2 * 60) * Math.PI/180);
            mat4.rotateZ(Tx4, Tx4, (30 + 3 * 60) * Math.PI/180);
            mat4.rotateZ(Tx5, Tx5, (30 + 4 * 60) * Math.PI/180);
            mat4.rotateZ(Tx6, Tx6, (30 + 5 * 60) * Math.PI/180);

            mat4.translate(Tx1, Tx1, [0, 0, 8 * scale]);
            mat4.translate(Tx2, Tx2, [0, 0, 8 * scale]);
            mat4.translate(Tx3, Tx3, [0, 0, 8 * scale]);
            mat4.translate(Tx4, Tx4, [0, 0, 8 * scale]);
            mat4.translate(Tx5, Tx5, [0, 0, 8 * scale]);
            mat4.translate(Tx6, Tx6, [0, 0, 8 * scale]);

            mat4.rotateY(Tx1, Tx1, angle);
            mat4.rotateY(Tx2, Tx2, angle);
            mat4.rotateY(Tx3, Tx3, angle);
            mat4.rotateY(Tx4, Tx4, angle);
            mat4.rotateY(Tx5, Tx5, angle);
            mat4.rotateY(Tx6, Tx6, angle);

            mat4.translate(Tx1, Tx1, [0, 0, -8 * scale]);
            mat4.translate(Tx2, Tx2, [0, 0, -8 * scale]);
            mat4.translate(Tx3, Tx3, [0, 0, -8 * scale]);
            mat4.translate(Tx4, Tx4, [0, 0, -8 * scale]);
            mat4.translate(Tx5, Tx5, [0, 0, -8 * scale]);
            mat4.translate(Tx6, Tx6, [0, 0, -8 * scale]);

            drawKaleidoscope(Tux, scale);
            drawKaleidoscope(Tx1, scale);
            drawKaleidoscope(Tx2, scale);
            drawKaleidoscope(Tx3, scale);
            drawKaleidoscope(Tx4, scale);
            drawKaleidoscope(Tx5, scale);
            drawKaleidoscope(Tx6, scale);


        }

        ///////////////////////////////////////////////////////////////

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

        var CameraCurve = function() {
            var distance = 120.0;
            var eye = vec3.create();
            eye[0] = distance*Math.sin(viewAngle);
            eye[1] = 100 * Math.sin(viewAngle) + 20;
            eye[2] = distance*Math.cos(viewAngle);
            return [eye[0],eye[1],eye[2]];
        }

        function drawTrajectory(startPoint, t_begin,t_end,intervals,C,Tx,color) {
            context.lineWidth = 2;
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

        // camera lookAt transform
        var eyeCamera = CameraCurve(viewAngle);
        var targetCamera = vec3.fromValues(0,0,0);
        var upCamera = vec3.fromValues(0,1,0);
        var TlookAtCamera = mat4.create();
        mat4.lookAt(TlookAtCamera, eyeCamera, targetCamera, upCamera);

        // observer lookAt transform
        var eyeObserver = vec3.fromValues(300,400,500);
        var targetObserver = vec3.fromValues(0,40,0);
        var upObserver = vec3.fromValues(0,1,0);
        var TlookAtObserver = mat4.create();
        mat4.lookAt(TlookAtObserver, eyeObserver, targetObserver, upObserver);

        // ViewPort transform for both camera and observer
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

        //modeling transform function
        var getModel_line = function(t, startPoint){
            var Tmodel = mat4.create();
            mat4.fromTranslation(Tmodel,Ccomp(t,startPoint));
            var Tmodel_rot = mat4.create();
            var eyePlane = vec3.fromValues(0,0,0);
            mat4.lookAt(Tmodel_rot, eyePlane, Ccomp_tangent(t,startPoint), upObserver);
            mat4.invert(Tmodel_rot,Tmodel_rot);
            mat4.multiply(Tmodel,Tmodel,Tmodel_rot);
            return Tmodel;
        }

        var getModel_plane = function(model_line, angle_plane){
            var model = mat4.create();
            mat4.fromTranslation(model,PlaneCurve(angle_plane));
            mat4.rotateZ(model, model, -1 * angle_plane);
            mat4.multiply(model, model_line, model);
            return model;
        }

        //modeling transform
        var Tmodel_line1_1 = getModel_line(tParam, startPoint1);
        var Tmodel_line1_2 = getModel_line(tParam - 1*plane_distance, startPoint1);
        var Tmodel_line1_3 = getModel_line(tParam - 2*plane_distance, startPoint1);
        var Tmodel_line1_4 = getModel_line(tParam - 3*plane_distance, startPoint1);
        var Tmodel_line1_5 = getModel_line(tParam - 4*plane_distance, startPoint1);
        var Tmodel_line1_6 = getModel_line(tParam + 0.1, startPoint1);
        var Tmodel_line1_plane1 = getModel_plane(Tmodel_line1_1, planeAngle);
        var Tmodel_line1_plane2 = getModel_plane(Tmodel_line1_2, planeAngle - 1 * 40 * Math.PI/180);
        var Tmodel_line1_plane3 = getModel_plane(Tmodel_line1_3, planeAngle - 2 * 40 * Math.PI/180);
        var Tmodel_line1_plane4 = getModel_plane(Tmodel_line1_4, planeAngle - 3 * 40 * Math.PI/180);
        var Tmodel_line1_plane5 = getModel_plane(Tmodel_line1_5, planeAngle - 4 * 40 * Math.PI/180);

        var Tmodel_line2 = getModel_line(tParam, startPoint2);


        //t_VP_PROJ_VIEW_MOD for camera
        var tVP_PROJ_VIEW_Plane1_Camera = mat4.create();
        mat4.multiply(tVP_PROJ_VIEW_Plane1_Camera, tVP_PROJ_VIEW_Camera, Tmodel_line1_plane1);

        var tVP_PROJ_VIEW_Plane2_Camera = mat4.create();
        mat4.multiply(tVP_PROJ_VIEW_Plane2_Camera, tVP_PROJ_VIEW_Camera, Tmodel_line1_plane2);

        var tVP_PROJ_VIEW_Plane3_Camera = mat4.create();
        mat4.multiply(tVP_PROJ_VIEW_Plane3_Camera, tVP_PROJ_VIEW_Camera, Tmodel_line1_plane3);

        var tVP_PROJ_VIEW_Plane4_Camera = mat4.create();
        mat4.multiply(tVP_PROJ_VIEW_Plane4_Camera, tVP_PROJ_VIEW_Camera, Tmodel_line1_plane4);

        var tVP_PROJ_VIEW_Plane5_Camera = mat4.create();
        mat4.multiply(tVP_PROJ_VIEW_Plane5_Camera, tVP_PROJ_VIEW_Camera, Tmodel_line1_plane5);

        var tVP_PROJ_VIEW_Line1_Camera = mat4.create();
        mat4.multiply(tVP_PROJ_VIEW_Line1_Camera, tVP_PROJ_VIEW_Camera, Tmodel_line1_6);

        var tVP_PROJ_VIEW_Line2_Camera = mat4.create();
        mat4.multiply(tVP_PROJ_VIEW_Line2_Camera, tVP_PROJ_VIEW_Camera, Tmodel_line2);


        //t_VP_PROJ_VIEW_MOD for observer
        var tVP_PROJ_VIEW_Plane1_Observer = mat4.create();
        mat4.multiply(tVP_PROJ_VIEW_Plane1_Observer, tVP_PROJ_VIEW_Observer, Tmodel_line1_plane1);

        var tVP_PROJ_VIEW_Plane2_Observer = mat4.create();
        mat4.multiply(tVP_PROJ_VIEW_Plane2_Observer, tVP_PROJ_VIEW_Observer, Tmodel_line1_plane2);

        var tVP_PROJ_VIEW_Plane3_Observer = mat4.create();
        mat4.multiply(tVP_PROJ_VIEW_Plane3_Observer, tVP_PROJ_VIEW_Observer, Tmodel_line1_plane3);

        var tVP_PROJ_VIEW_Plane4_Observer = mat4.create();
        mat4.multiply(tVP_PROJ_VIEW_Plane4_Observer, tVP_PROJ_VIEW_Observer, Tmodel_line1_plane4);

        var tVP_PROJ_VIEW_Plane5_Observer = mat4.create();
        mat4.multiply(tVP_PROJ_VIEW_Plane5_Observer, tVP_PROJ_VIEW_Observer, Tmodel_line1_plane5);

        var tVP_PROJ_VIEW_Line1_Observer = mat4.create();
        mat4.multiply(tVP_PROJ_VIEW_Line1_Observer, tVP_PROJ_VIEW_Observer, Tmodel_line1_6);

        var tVP_PROJ_VIEW_Line2_Observer = mat4.create();
        mat4.multiply(tVP_PROJ_VIEW_Line2_Observer, tVP_PROJ_VIEW_Observer, Tmodel_line2);

        var tVP_PROJ_VIEW_Camera_Observer = mat4.create();
        mat4.translate(tVP_PROJ_VIEW_Camera_Observer, tVP_PROJ_VIEW_Observer, eyeCamera);
        var TlookFromCamera = mat4.create();
        mat4.invert(TlookFromCamera,TlookAtCamera);
        mat4.multiply(tVP_PROJ_VIEW_Camera_Observer, tVP_PROJ_VIEW_Camera_Observer, TlookFromCamera);

        // camera window
        context = cameraContext;
        if(switchOn == 0){
            drawTrajectory(startPoint1, tParam-0.2,tParam,100,Ccomp,tVP_PROJ_VIEW_Camera,'#dad5de');
            drawTrajectory(startPoint2, tParam-0.2,tParam,100,Ccomp,tVP_PROJ_VIEW_Camera,'#42f5b3');
            drawLittlePlane('#eb3434', tVP_PROJ_VIEW_Plane1_Camera, 0.5);
            drawLittlePlane('#cc34eb', tVP_PROJ_VIEW_Plane2_Camera, 0.5);
            drawLittlePlane('#34d3eb', tVP_PROJ_VIEW_Plane3_Camera, 0.5);
            drawLittlePlane('#34eb5f', tVP_PROJ_VIEW_Plane4_Camera, 0.5);
            drawLittlePlane('#d3eb34', tVP_PROJ_VIEW_Plane5_Camera ,0.5);
            drawMultipleK(tVP_PROJ_VIEW_Line2_Camera, 5, relative_angle);
        }else if (switchOn == 1){
            drawTrajectory(startPoint1, 0.0,4.0,100,Ccomp,tVP_PROJ_VIEW_Camera,'#dad5de');
            drawTrajectory(startPoint2, 0.0,4.0,100,Ccomp,tVP_PROJ_VIEW_Camera,'#42f5b3');
            drawLittlePlane('#eb3434', tVP_PROJ_VIEW_Plane1_Camera, 0.5);
            drawLittlePlane('#cc34eb', tVP_PROJ_VIEW_Plane2_Camera, 0.5);
            drawLittlePlane('#34d3eb', tVP_PROJ_VIEW_Plane3_Camera, 0.5);
            drawLittlePlane('#34eb5f', tVP_PROJ_VIEW_Plane4_Camera, 0.5);
            drawLittlePlane('#d3eb34', tVP_PROJ_VIEW_Plane5_Camera ,0.5);
            drawMultipleK(tVP_PROJ_VIEW_Line2_Camera, 5, relative_angle);
        } else{
            drawLittlePlane('#eb3434', tVP_PROJ_VIEW_Plane1_Camera, 0.5);
            drawLittlePlane('#cc34eb', tVP_PROJ_VIEW_Plane2_Camera, 0.5);
            drawLittlePlane('#34d3eb', tVP_PROJ_VIEW_Plane3_Camera, 0.5);
            drawLittlePlane('#34eb5f', tVP_PROJ_VIEW_Plane4_Camera, 0.5);
            drawLittlePlane('#d3eb34', tVP_PROJ_VIEW_Plane5_Camera ,0.5);
            drawMultipleK(tVP_PROJ_VIEW_Line1_Camera, 5, relative_angle);
        }

        // observer window
        context = observerContext;
        if(switchOn == 0){
            drawTrajectory(startPoint1, tParam-0.2,tParam,100,Ccomp,tVP_PROJ_VIEW_Observer,'#dad5de');
            drawTrajectory(startPoint2, tParam-0.2,tParam,100,Ccomp,tVP_PROJ_VIEW_Observer,'#42f5b3');
            drawLittlePlane('#eb3434', tVP_PROJ_VIEW_Plane1_Observer, 0.5);
            drawLittlePlane('#cc34eb', tVP_PROJ_VIEW_Plane2_Observer, 0.5);
            drawLittlePlane('#34d3eb', tVP_PROJ_VIEW_Plane3_Observer, 0.5);
            drawLittlePlane('#34eb5f', tVP_PROJ_VIEW_Plane4_Observer, 0.5);
            drawLittlePlane('#d3eb34', tVP_PROJ_VIEW_Plane5_Observer,0.5);
            drawMultipleK(tVP_PROJ_VIEW_Line2_Observer, 5, relative_angle);
            drawCamera("blue",tVP_PROJ_VIEW_Camera_Observer,10.0);
        }else if (switchOn == 1){
            drawTrajectory(startPoint1, 0.0,4.0,100,Ccomp,tVP_PROJ_VIEW_Observer,'#dad5de');
            drawTrajectory(startPoint2, 0.0,4.0,100,Ccomp,tVP_PROJ_VIEW_Observer,'#42f5b3');
            drawLittlePlane('#eb3434', tVP_PROJ_VIEW_Plane1_Observer, 0.5);
            drawLittlePlane('#cc34eb', tVP_PROJ_VIEW_Plane2_Observer, 0.5);
            drawLittlePlane('#34d3eb', tVP_PROJ_VIEW_Plane3_Observer, 0.5);
            drawLittlePlane('#34eb5f', tVP_PROJ_VIEW_Plane4_Observer, 0.5);
            drawLittlePlane('#d3eb34', tVP_PROJ_VIEW_Plane5_Observer,0.5);
            drawMultipleK(tVP_PROJ_VIEW_Line2_Observer, 5, relative_angle);
            drawCamera("blue",tVP_PROJ_VIEW_Camera_Observer,10.0);
        }else{
            drawLittlePlane('#eb3434', tVP_PROJ_VIEW_Plane1_Observer, 0.5);
            drawLittlePlane('#cc34eb', tVP_PROJ_VIEW_Plane2_Observer, 0.5);
            drawLittlePlane('#34d3eb', tVP_PROJ_VIEW_Plane3_Observer, 0.5);
            drawLittlePlane('#34eb5f', tVP_PROJ_VIEW_Plane4_Observer, 0.5);
            drawLittlePlane('#d3eb34', tVP_PROJ_VIEW_Plane5_Observer,0.5);
            drawMultipleK(tVP_PROJ_VIEW_Line1_Observer, 5, relative_angle);
            drawCamera("blue",tVP_PROJ_VIEW_Camera_Observer,10.0);
        }

        tParam = tParam + rotationSpeed*0.01;
        if(tParam > 4){
            tParam = tParam-4;
        }

        planeAngle = planeAngle + 0.06*Math.PI;

        y = y + 0.05;
        x = position(y);
        window.requestAnimationFrame(draw);
    }


    window.requestAnimationFrame(draw);
}
window.onload = setup;
