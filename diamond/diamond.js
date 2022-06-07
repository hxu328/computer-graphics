function start() {

    // Get canvas, WebGL context, twgl.m4
    var canvas = document.getElementById("mycanvas");
    var gl = canvas.getContext("webgl");

    // Sliders at center
    var slider1 = document.getElementById('slider1');
    slider1.value = 0;
    var slider2 = document.getElementById('slider2');
    slider2.value = 0;
    var slider3 = document.getElementById('slider3');
    slider3.value = 200;
    var slider4 = document.getElementById('slider4');
    slider4.value = 10;

    // object data
    var vertexPos = new Float32Array([
        0,0,0.5,  1,0,0,  0.3,0.3,0,
        0,0,0.5,  0,1,0,  0.3,0.3,0,
        0,0,0.5,  0,1,0,  -0.3,0.3,0,
        0,0,0.5,  -1,0,0, -0.3,0.3,0,
        0,0,0.5,  -1,0,0, -0.3,-0.3,0,
        0,0,0.5,  0,-1,0, -0.3,-0.3,0,
        0,0,0.5,  0,-1,0, 0.3,-0.3,0,
        0,0,0.5,  1,0,0, 0.3,-0.3,0,

        0,0,-0.5,  1,0,0,  0.3,0.3,0,
        0,0,-0.5,  0,1,0,  0.3,0.3,0,
        0,0,-0.5,  0,1,0,  -0.3,0.3,0,
        0,0,-0.5,  -1,0,0, -0.3,0.3,0,
        0,0,-0.5,  -1,0,0, -0.3,-0.3,0,
        0,0,-0.5,  0,-1,0, -0.3,-0.3,0,
        0,0,-0.5,  0,-1,0, 0.3,-0.3,0,
        0,0,-0.5,  1,0,0, 0.3,-0.3,0
    ]);

    var vertexNormals = new Float32Array([
        0.15,0.35,0.3,  0.15,0.35,0.3,  0.15,0.35,0.3,//front
        0.35,0.15,0.3,  0.35,0.15,0.3,  0.35,0.15,0.3,

        -0.35,0.15,0.3, -0.35,0.15,0.3, -0.35,0.15,0.3,
        -0.15,0.35,0.3, -0.15,0.35,0.3, -0.15,0.35,0.3,

        -0.15,-0.35,0.3,-0.15,-0.35,0.3,-0.15,-0.35,0.3,
        -0.35,-0.15,0.3,-0.35,-0.15,0.3,-0.35,-0.15,0.3,

        0.35,-0.15,0.3, 0.35,-0.15,0.3, 0.35,-0.15,0.3,
        0.15,-0.35,0.3, 0.15,-0.35,0.3, 0.15,-0.35,0.3,

        0.15,0.35,-0.3,  0.15,0.35,-0.3,  0.15,0.35,-0.3,//back
        0.35,0.15,-0.3,  0.35,0.15,-0.3,  0.35,0.15,-0.3,

        -0.35,0.15,-0.3, -0.35,0.15,-0.3, -0.35,0.15,-0.3,
        -0.15,0.35,-0.3, -0.15,0.35,-0.3, -0.15,0.35,-0.3,

        -0.15,-0.35,-0.3,-0.15,-0.35,-0.3,-0.15,-0.35,-0.3,
        -0.35,-0.15,-0.3,-0.35,-0.15,-0.3,-0.35,-0.15,-0.3,

        0.35,-0.15,-0.3, 0.35,-0.15,-0.3, 0.35,-0.15,-0.3,
        0.15,-0.35,-0.3, 0.15,-0.35,-0.3, 0.15,-0.35,-0.3
    ]);

    var vertexColors = new Float32Array([

        0.9,1,0.6,  0.9,0.6,1,   0.9,0.8,0.8,
        0.9,1,0.6,  0.9,1,1,     0.9,0.8,0.8,
        0.9,1,0.6,  0.9,1,1,     1,0.4,0,
        0.9,1,0.6,  0.7,1,0,     1,0.4,0,
        0.9,1,0.6,  0.7,1,0,     0.7,1,0.8,
        0.9,1,0.6,  0.8,0,0.2,   0.7,1,0.8,
        0.9,1,0.6,  0.8,0,0.2,   0.8,0.4,0,
        0.9,1,0.6,  0.9,0.6,1,   0.8,0.4,0,

        0.4,1,0.6,  0.9,0.6,1,   0.9,0.8,0.8,
        0.4,1,0.6,  0.9,1,1,     0.9,0.8,0.8,
        0.4,1,0.6,  0.9,1,1,     1,0.4,0,
        0.4,1,0.6,  0.7,1,0,     1,0.4,0,
        0.4,1,0.6,  0.7,1,0,     0.7,1,0.8,
        0.4,1,0.6,  0.8,0,0.2,   0.7,1,0.8,
        0.4,1,0.6,  0.8,0,0.2,   0.8,0.4,0,
        0.4,1,0.6,  0.9,0.6,1,   0.8,0.4,0

    ]);

    var vertexTextureCoords = new Float32Array([

        0.5,0.5,    0,0.5,  0.2,0.2,//front
        0.5,0.5,    0.5,0,  0.2,0.2,

        0.5,0.5,    0.5,0,  0.8,0.2,
        0.5,0.5,    1,0.5,  0.8,0.2,

        0.5,0.5,    1,0.5,  0.8,0.8,
        0.5,0.5,    0.5,1,  0.8,0.8,

        0.5,0.5,    0.5,1,  0.2,0.8,
        0.5,0.5,    0,0.5,  0.2,0.8,

        0.5,0.5,    0,0.5,  0.2,0.2,//back
        0.5,0.5,    0.5,0,  0.2,0.2,

        0.5,0.5,    0.5,0,  0.8,0.2,
        0.5,0.5,    1,0.5,  0.8,0.2,

        0.5,0.5,    1,0.5,  0.8,0.8,
        0.5,0.5,    0.5,1,  0.8,0.8,

        0.5,0.5,    0.5,1,  0.2,0.8,
        0.5,0.5,    0,0.5,  0.2,0.8

    ]);

    var triangleIndices = new Uint8Array([
        0,1,2,  3,4,5,  6,7,8,  9,10,11,
        12,13,14, 15,16,17, 18,19,20, 21,22,23,
        24,25,26,    27,28,29,  30,31,32,
        33,34,35,   36,37,38,   39,40,41,
        42,43,44,   45,46,47

    ]);

    // prepare for shaderProgram
    var vertexSource = document.getElementById("vertexShader").text;
    var fragmentSource = document.getElementById("fragmentShader").text;
    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader,vertexSource);
    gl.compileShader(vertexShader);
    if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
      alert(gl.getShaderInfoLog(vertexShader)); return null; }
    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader,fragmentSource);
    gl.compileShader(fragmentShader);
    if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
      alert(gl.getShaderInfoLog(fragmentShader)); return null; }
    var shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);
    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
      alert("Could not initialize shaders"); }
    gl.useProgram(shaderProgram);
    shaderProgram.PositionAttribute = gl.getAttribLocation(shaderProgram, "vPosition");
    gl.enableVertexAttribArray(shaderProgram.PositionAttribute);
    shaderProgram.NormalAttribute = gl.getAttribLocation(shaderProgram, "vNormal");
    gl.enableVertexAttribArray(shaderProgram.NormalAttribute);
    shaderProgram.ColorAttribute = gl.getAttribLocation(shaderProgram, "vColor");
    gl.enableVertexAttribArray(shaderProgram.ColorAttribute);
    shaderProgram.texcoordAttribute = gl.getAttribLocation(shaderProgram, "vTexCoord");
    gl.enableVertexAttribArray(shaderProgram.texcoordAttribute);
    shaderProgram.MVmatrix = gl.getUniformLocation(shaderProgram,"uMV");
    shaderProgram.MVNormalmatrix = gl.getUniformLocation(shaderProgram,"uMVn");
    shaderProgram.MVPmatrix = gl.getUniformLocation(shaderProgram,"uMVP");
    shaderProgram.texSampler1 = gl.getUniformLocation(shaderProgram, "texSampler1");
    gl.uniform1i(shaderProgram.texSampler1, 0);
    var timeLocation_center = gl.getUniformLocation(shaderProgram, "u_time");
    var timeLocation_wave_center =  gl.getUniformLocation(shaderProgram, "wave_time");
    var trianglePosBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, trianglePosBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertexPos, gl.STATIC_DRAW);
    trianglePosBuffer.itemSize = 3;
    trianglePosBuffer.numItems = 48;
    var triangleNormalBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, triangleNormalBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertexNormals, gl.STATIC_DRAW);
    triangleNormalBuffer.itemSize = 3;
    triangleNormalBuffer.numItems = 48;
    var colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertexColors, gl.STATIC_DRAW);
    colorBuffer.itemSize = 3;
    colorBuffer.numItems = 48;
    var textureBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, textureBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertexTextureCoords, gl.STATIC_DRAW);
    textureBuffer.itemSize = 2;
    textureBuffer.numItems = 48;
    var indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, triangleIndices, gl.STATIC_DRAW);
    var texture1 = gl.createTexture();
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture1);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
    var image1 = new Image();

    //prepare for shaderProgram_left
    var vertexSource_left = document.getElementById("vertexShader_left").text;
    var fragmentSource_left = document.getElementById("fragmentShader_left").text;
    var vertexShader_left = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader_left,vertexSource_left);
    gl.compileShader(vertexShader_left);
    if (!gl.getShaderParameter(vertexShader_left, gl.COMPILE_STATUS)) {
        alert(gl.getShaderInfoLog(vertexShader_left)); return null; }
    var fragmentShader_left = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader_left,fragmentSource_left);
    gl.compileShader(fragmentShader_left);
    if (!gl.getShaderParameter(fragmentShader_left, gl.COMPILE_STATUS)) {
        alert(gl.getShaderInfoLog(fragmentShader_left)); return null; }
    var shaderProgram_left = gl.createProgram();
    gl.attachShader(shaderProgram_left, vertexShader_left);
    gl.attachShader(shaderProgram_left, fragmentShader_left);
    gl.linkProgram(shaderProgram_left);
    if (!gl.getProgramParameter(shaderProgram_left, gl.LINK_STATUS)) {
        alert("Could not initialize shaders (left)"); }
    gl.useProgram(shaderProgram_left);
    shaderProgram_left.PositionAttribute = gl.getAttribLocation(shaderProgram_left, "vPosition");
    gl.enableVertexAttribArray(shaderProgram_left.PositionAttribute);
    shaderProgram_left.NormalAttribute = gl.getAttribLocation(shaderProgram_left, "vNormal");
    gl.enableVertexAttribArray(shaderProgram_left.NormalAttribute);
    shaderProgram_left.ColorAttribute = gl.getAttribLocation(shaderProgram_left, "vColor");
    gl.enableVertexAttribArray(shaderProgram_left.ColorAttribute);
    shaderProgram_left.texcoordAttribute = gl.getAttribLocation(shaderProgram_left, "vTexCoord");
    gl.enableVertexAttribArray(shaderProgram_left.texcoordAttribute);
    shaderProgram_left.MVmatrix = gl.getUniformLocation(shaderProgram_left,"uMV");
    shaderProgram_left.MVNormalmatrix = gl.getUniformLocation(shaderProgram_left,"uMVn");
    shaderProgram_left.MVPmatrix = gl.getUniformLocation(shaderProgram_left,"uMVP");
    shaderProgram_left.texSampler2 = gl.getUniformLocation(shaderProgram_left, "texSampler2");
    gl.uniform1i(shaderProgram_left.texSampler2, 1);
    var timeLocation_left = gl.getUniformLocation(shaderProgram_left, "u_time");
    var timeLocation_wave_left =  gl.getUniformLocation(shaderProgram_left, "wave_time");
    var trianglePosBuffer_left = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, trianglePosBuffer_left);
    gl.bufferData(gl.ARRAY_BUFFER, vertexPos, gl.STATIC_DRAW);
    trianglePosBuffer_left.itemSize = 3;
    trianglePosBuffer_left.numItems = 48;
    var triangleNormalBuffer_left = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, triangleNormalBuffer_left);
    gl.bufferData(gl.ARRAY_BUFFER, vertexNormals, gl.STATIC_DRAW);
    triangleNormalBuffer_left.itemSize = 3;
    triangleNormalBuffer_left.numItems = 48;
    var colorBuffer_left = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer_left);
    gl.bufferData(gl.ARRAY_BUFFER, vertexColors, gl.STATIC_DRAW);
    colorBuffer_left.itemSize = 3;
    colorBuffer_left.numItems = 48;
    var textureBuffer_left = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, textureBuffer_left);
    gl.bufferData(gl.ARRAY_BUFFER, vertexTextureCoords, gl.STATIC_DRAW);
    textureBuffer_left.itemSize = 2;
    textureBuffer_left.numItems = 48;
    var indexBuffer_left = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer_left);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, triangleIndices, gl.STATIC_DRAW);
    var texture2 = gl.createTexture();
    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, texture2);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
    var image2 = new Image();

    // prepare for shaderProgram_right
    var vertexSource_right = document.getElementById("vertexShader_right").text;
    var fragmentSource_right = document.getElementById("fragmentShader_right").text;
    var vertexShader_right = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader_right,vertexSource_right);
    gl.compileShader(vertexShader_right);
    if (!gl.getShaderParameter(vertexShader_right, gl.COMPILE_STATUS)) {
        alert(gl.getShaderInfoLog(vertexShader_right)); return null; }
    var fragmentShader_right = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader_right,fragmentSource_right);
    gl.compileShader(fragmentShader_right);
    if (!gl.getShaderParameter(fragmentShader_right, gl.COMPILE_STATUS)) {
        alert(gl.getShaderInfoLog(fragmentShader_right)); return null; }
    var shaderProgram_right = gl.createProgram();
    gl.attachShader(shaderProgram_right, vertexShader_right);
    gl.attachShader(shaderProgram_right, fragmentShader_right);
    gl.linkProgram(shaderProgram_right);
    if (!gl.getProgramParameter(shaderProgram_right, gl.LINK_STATUS)) {
        alert("Could not initialize shaders (right)"); }
    gl.useProgram(shaderProgram_right);
    shaderProgram_right.PositionAttribute = gl.getAttribLocation(shaderProgram_right, "vPosition");
    gl.enableVertexAttribArray(shaderProgram_right.PositionAttribute);
    shaderProgram_right.NormalAttribute = gl.getAttribLocation(shaderProgram_right, "vNormal");
    gl.enableVertexAttribArray(shaderProgram_right.NormalAttribute);
    shaderProgram_right.ColorAttribute = gl.getAttribLocation(shaderProgram_right, "vColor");
    gl.enableVertexAttribArray(shaderProgram_right.ColorAttribute);
    shaderProgram_right.texcoordAttribute = gl.getAttribLocation(shaderProgram_right, "vTexCoord");
    gl.enableVertexAttribArray(shaderProgram_right.texcoordAttribute);
    shaderProgram_right.MVmatrix = gl.getUniformLocation(shaderProgram_right,"uMV");
    shaderProgram_right.MVNormalmatrix = gl.getUniformLocation(shaderProgram_right,"uMVn");
    shaderProgram_right.MVPmatrix = gl.getUniformLocation(shaderProgram_right,"uMVP");
    shaderProgram_right.texSampler3 = gl.getUniformLocation(shaderProgram_right, "texSampler3");
    gl.uniform1i(shaderProgram_right.texSampler3, 2);
    shaderProgram_right.texSampler4 = gl.getUniformLocation(shaderProgram_right, "texSampler4");
    gl.uniform1i(shaderProgram_right.texSampler4, 3);
    shaderProgram_right.texSampler5 = gl.getUniformLocation(shaderProgram_right, "texSampler5");
    gl.uniform1i(shaderProgram_right.texSampler5, 4);

    var timeLocation_right = gl.getUniformLocation(shaderProgram_right, "u_time");
    var timeLocation_wave_right =  gl.getUniformLocation(shaderProgram_right, "wave_time");
    var trianglePosBuffer_right = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, trianglePosBuffer_right);
    gl.bufferData(gl.ARRAY_BUFFER, vertexPos, gl.STATIC_DRAW);
    trianglePosBuffer_right.itemSize = 3;
    trianglePosBuffer_right.numItems = 48;
    var triangleNormalBuffer_right = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, triangleNormalBuffer_right);
    gl.bufferData(gl.ARRAY_BUFFER, vertexNormals, gl.STATIC_DRAW);
    triangleNormalBuffer_right.itemSize = 3;
    triangleNormalBuffer_right.numItems = 48;
    var colorBuffer_right = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer_right);
    gl.bufferData(gl.ARRAY_BUFFER, vertexColors, gl.STATIC_DRAW);
    colorBuffer_right.itemSize = 3;
    colorBuffer_right.numItems = 48;
    var textureBuffer_right = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, textureBuffer_right);
    gl.bufferData(gl.ARRAY_BUFFER, vertexTextureCoords, gl.STATIC_DRAW);
    textureBuffer_right.itemSize = 2;
    textureBuffer_right.numItems = 48;
    var indexBuffer_right = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer_right);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, triangleIndices, gl.STATIC_DRAW);
    var texture3 = gl.createTexture();
    gl.activeTexture(gl.TEXTURE2);
    gl.bindTexture(gl.TEXTURE_2D, texture3);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
    var image3 = new Image();
    var texture4 = gl.createTexture();
    gl.activeTexture(gl.TEXTURE3);
    gl.bindTexture(gl.TEXTURE_2D, texture4);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
    var image4 = new Image();
    var texture5 = gl.createTexture();
    gl.activeTexture(gl.TEXTURE4);
    gl.bindTexture(gl.TEXTURE_2D, texture5);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
    var image5 = new Image();









    function initTextureThenDraw()
    {
        image1.onload = function() { loadTexture(image1,texture1); };
        image1.crossOrigin = "anonymous";
        image1.src = "https://farm6.staticflickr.com/8705/16917618511_1dd9b03c85_b.jpg";

        image2.onload = function() { loadTexture(image2,texture2); };
        image2.crossOrigin = "anonymous";
        image2.src = "https://farm6.staticflickr.com/6105/6321136387_23bfaca985_b.jpg";

        image3.onload = function() { loadTexture(image3,texture3); }; //selector
        image3.crossOrigin = "anonymous";
        image3.src = "https://farm6.staticflickr.com/5746/22017035611_9da1dfa5c2_b.jpg";

        image4.onload = function() { loadTexture(image4,texture4); };
        image4.crossOrigin = "anonymous";
        image4.src = "https://farm6.staticflickr.com/65535/49896889513_0868545904_b.jpg";

        image5.onload = function() { loadTexture(image5,texture5); };
        image5.crossOrigin = "anonymous";
        image5.src = "https://farm6.staticflickr.com/2469/4000205386_28972b8b61_b.jpg";
        window.setTimeout(draw,200);
    }

    function loadTexture(image,texture)
    {
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);

      //Use mipmap, select interpolation mode
      gl.generateMipmap(gl.TEXTURE_2D);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);


    }    

    var uniform_time = 0;
    var wave_time = 0;
    var uniform_time_left = 0;
    var wave_time_left = 0;
    var uniform_time_right = 0;
    var wave_time_right = 0;

    var angle_left = 0;
    var angle_right = 90 * Math.PI/180;

    function draw() {

        var angle1 = slider1.value*0.01*Math.PI; //camera position
        var angle2 = slider2.value*0.01*Math.PI; //rotate center object to rotate along z-axis
        var wave_speed = slider3.value; //control the speed to wave
    
        // camera position
        var eye = [200*Math.sin(angle1),50.0,400.0*Math.cos(angle1)];
        var target = [0,0,0];
        var up = [0,1,0];

        // model transforms
        var tModel = mat4.create();
        mat4.fromScaling(tModel,[100,100,100]);
        mat4.rotate(tModel,tModel,angle2,[0,0,1]);

        var tModel_left = mat4.create();
        mat4.fromScaling(tModel_left,[50,50,50]);
        mat4.rotate(tModel_left,tModel_left,-45 * Math.PI / 180,[0,0,1]);
        mat4.rotate(tModel_left,tModel_left,angle_left,[0,1,0]);
        mat4.translate(tModel_left,tModel_left,[2*Math.sin(angle_left),0,2*Math.cos(angle_left)]);
        //mat4.fromScaling(tModel_left,[50,50,50]);

        var tModel_right = mat4.create();
        mat4.fromScaling(tModel_right,[50,50,50]);
        mat4.rotate(tModel_right,tModel_right,45 * Math.PI / 180,[0,0,1]);
        mat4.rotate(tModel_right,tModel_right,angle_right,[0,1,0]);
        mat4.translate(tModel_right,tModel_right,[2*Math.sin(angle_right),0,2*Math.cos(angle_right)]);
        //mat4.scale(tModel_right,[50,50,50]);

        // camera transform
        var tCamera = mat4.create();
        mat4.lookAt(tCamera, eye, target, up);      

        // projection transform
        var tProjection = mat4.create();
        mat4.perspective(tProjection,Math.PI/4,1,10,1000);


        // set of transforms for center model
        var tMV = mat4.create();
        var tMVn = mat3.create();
        var tMVP = mat4.create();
        mat4.multiply(tMV,tCamera,tModel);
        mat3.normalFromMat4(tMVn,tMV);
        mat4.multiply(tMVP,tProjection,tMV);

        // set of transforms for left model
        var tMV_left = mat4.create();
        var tMVn_left = mat3.create();
        var tMVP_left = mat4.create();
        mat4.multiply(tMV_left,tCamera,tModel_left);
        mat3.normalFromMat4(tMVn_left,tMV_left);
        mat4.multiply(tMVP_left,tProjection,tMV_left);

        // set of transforms for right model
        var tMV_right = mat4.create();
        var tMVn_right = mat3.create();
        var tMVP_right = mat4.create();
        mat4.multiply(tMV_right,tCamera,tModel_right);
        mat3.normalFromMat4(tMVn_right,tMV_right);
        mat4.multiply(tMVP_right,tProjection,tMV_right);
      
        // Clear screen, prepare for rendering
        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.enable(gl.DEPTH_TEST);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    
        // Set up uniforms & attributes & texture

        gl.useProgram(shaderProgram);
        gl.uniform1f(timeLocation_center, uniform_time*0.01);
        gl.uniform1f(timeLocation_wave_center, wave_time*0.01);
        gl.uniformMatrix4fv(shaderProgram.MVmatrix,false,tMV);
        gl.uniformMatrix3fv(shaderProgram.MVNormalmatrix,false,tMVn);
        gl.uniformMatrix4fv(shaderProgram.MVPmatrix,false,tMVP);
        gl.bindBuffer(gl.ARRAY_BUFFER, trianglePosBuffer);
        gl.vertexAttribPointer(shaderProgram.PositionAttribute, trianglePosBuffer.itemSize,
          gl.FLOAT, false, 0, 0);
        gl.bindBuffer(gl.ARRAY_BUFFER, triangleNormalBuffer);
        gl.vertexAttribPointer(shaderProgram.NormalAttribute, triangleNormalBuffer.itemSize,
          gl.FLOAT, false, 0, 0);
        gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
        gl.vertexAttribPointer(shaderProgram.ColorAttribute, colorBuffer.itemSize,
          gl.FLOAT,false, 0, 0);
        gl.bindBuffer(gl.ARRAY_BUFFER, textureBuffer);
        gl.vertexAttribPointer(shaderProgram.texcoordAttribute, textureBuffer.itemSize,
          gl.FLOAT, false, 0, 0);
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, texture1);
        gl.drawElements(gl.TRIANGLES, triangleIndices.length, gl.UNSIGNED_BYTE, 0);


        gl.useProgram(shaderProgram_left);
        gl.uniform1f(timeLocation_left, uniform_time_left*0.01);
        gl.uniform1f(timeLocation_wave_left, wave_time_left*0.01);
        gl.uniformMatrix4fv(shaderProgram_left.MVmatrix,false,tMV_left);
        gl.uniformMatrix3fv(shaderProgram_left.MVNormalmatrix,false,tMVn_left);
        gl.uniformMatrix4fv(shaderProgram_left.MVPmatrix,false,tMVP_left);
        gl.bindBuffer(gl.ARRAY_BUFFER, trianglePosBuffer_left);
        gl.vertexAttribPointer(shaderProgram_left.PositionAttribute, trianglePosBuffer_left.itemSize,
            gl.FLOAT, false, 0, 0);
        gl.bindBuffer(gl.ARRAY_BUFFER, triangleNormalBuffer_left);
        gl.vertexAttribPointer(shaderProgram_left.NormalAttribute, triangleNormalBuffer_left.itemSize,
            gl.FLOAT, false, 0, 0);
        gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer_left);
        gl.vertexAttribPointer(shaderProgram_left.ColorAttribute, colorBuffer_left.itemSize,
            gl.FLOAT,false, 0, 0);
        gl.bindBuffer(gl.ARRAY_BUFFER, textureBuffer_left);
        gl.vertexAttribPointer(shaderProgram_left.texcoordAttribute, textureBuffer_left.itemSize,
            gl.FLOAT, false, 0, 0);
        gl.activeTexture(gl.TEXTURE1);
        gl.bindTexture(gl.TEXTURE_2D, texture2);
        gl.drawElements(gl.TRIANGLES, triangleIndices.length, gl.UNSIGNED_BYTE, 0);

        gl.useProgram(shaderProgram_right);
        gl.uniform1f(timeLocation_right, uniform_time_right*0.01);
        gl.uniform1f(timeLocation_wave_right, wave_time_right*0.01);
        gl.uniformMatrix4fv(shaderProgram_right.MVmatrix,false,tMV_right);
        gl.uniformMatrix3fv(shaderProgram_right.MVNormalmatrix,false,tMVn_right);
        gl.uniformMatrix4fv(shaderProgram_right.MVPmatrix,false,tMVP_right);
        gl.bindBuffer(gl.ARRAY_BUFFER, trianglePosBuffer_right);
        gl.vertexAttribPointer(shaderProgram_right.PositionAttribute, trianglePosBuffer_right.itemSize,
            gl.FLOAT, false, 0, 0);
        gl.bindBuffer(gl.ARRAY_BUFFER, triangleNormalBuffer_right);
        gl.vertexAttribPointer(shaderProgram_right.NormalAttribute, triangleNormalBuffer_right.itemSize,
            gl.FLOAT, false, 0, 0);
        gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer_right);
        gl.vertexAttribPointer(shaderProgram_right.ColorAttribute, colorBuffer_right.itemSize,
            gl.FLOAT,false, 0, 0);
        gl.bindBuffer(gl.ARRAY_BUFFER, textureBuffer_right);
        gl.vertexAttribPointer(shaderProgram_right.texcoordAttribute, textureBuffer_right.itemSize,
            gl.FLOAT, false, 0, 0);
        gl.activeTexture(gl.TEXTURE2);
        gl.bindTexture(gl.TEXTURE_2D, texture3);
        gl.activeTexture(gl.TEXTURE3);
        gl.bindTexture(gl.TEXTURE_2D, texture4);
        gl.activeTexture(gl.TEXTURE4);
        gl.bindTexture(gl.TEXTURE_2D, texture5);
        gl.drawElements(gl.TRIANGLES, triangleIndices.length, gl.UNSIGNED_BYTE, 0);


        uniform_time = uniform_time + 0.1;
        wave_time = wave_time + wave_speed * 0.001;

        uniform_time_left = uniform_time_left + 0.1;
        wave_time_left = wave_time_left + wave_speed * 0.001;

        uniform_time_right = uniform_time_right + 0.1;
        wave_time_right = wave_time_right + wave_speed * 0.001;

        angle_left = angle_left + (slider4.value)*Math.PI/18000;
        angle_right = angle_right - (slider4.value)*Math.PI/18000;
        window.requestAnimationFrame(draw);
    }

    initTextureThenDraw();
    window.requestAnimationFrame(draw);
}

window.onload=start;



