"use strict";
//Author: Mahesh Gaya
//description: introduction to 3D lighting
var canvas;
var gl;

var numTimesToSubdivide = 3;

var index = 0;

var pointsArray = [];
var normalsArray = [];

var near = -10;
var far = 10;
var radius = 2.0;
var theta  = 0.0;
var phi    = 0.0;
var dr = 5.0 * Math.PI/180.0;

var left = -3.0;
var right = 3.0;
var ytop =3.0;
var bottom = -3.0;

var lightPosition = vec4(0.0, 0.0, 1.0, 0.0 );
var lightAmbient = vec4(0.2, 0.2, 0.2, 1.0 );
var lightDiffuse = vec4( 1.0, 1.0, 1.0, 1.0 );
var lightSpecular = vec4( 1.0, 1.0, 1.0, 1.0 );

var materialAmbient = vec4( 1.0, 0.0, 1.0, 1.0 );
var materialDiffuse = vec4( 1.0, 0.8, 0.0, 1.0 );
var materialSpecular = vec4( 1.0, 1.0, 1.0, 1.0 );
var materialShininess = 20.0;

var modelViewMatrix, projectionMatrix;
var modelViewMatrixLoc, projectionMatrixLoc;

var phongFragmentShading = false;

var eye;
var at = vec3(0.0, 0.0, 0.0);
var up = vec3(0.0, 1.0, 0.0);

window.onload = function init() {

    canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 0.9, 0.9, 0.9, 1.0 );

    gl.enable(gl.DEPTH_TEST);

    //
    //  Load shaders and initialize attribute buffers
    //
    if (phongFragmentShading == true){
      var program = initShaders( gl, "vertex-shader-phong", "fragment-shader-phong" );
    } else {
      var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    }

    gl.useProgram( program );

    var ambientProduct = mult(lightAmbient, materialAmbient);
    var diffuseProduct = mult(lightDiffuse, materialDiffuse);
    var specularProduct = mult(lightSpecular, materialSpecular);

    //establishes points on sphere
    tetrahedron(va, vb, vc, vd, numTimesToSubdivide);

    var nBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, nBuffer);
    gl.bufferData( gl.ARRAY_BUFFER, flatten(normalsArray), gl.STATIC_DRAW );

    var vNormal = gl.getAttribLocation( program, "vNormal" );
    gl.vertexAttribPointer( vNormal, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vNormal);

    var vBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(pointsArray), gl.STATIC_DRAW);

    var vPosition = gl.getAttribLocation( program, "vPosition");
    gl.vertexAttribPointer(vPosition, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);

    modelViewMatrixLoc = gl.getUniformLocation( program, "modelViewMatrix" );
    projectionMatrixLoc = gl.getUniformLocation( program, "projectionMatrix" );

    /*
    * MATERIAL
    */
    //Material Ambient
    document.getElementById("materialAmbientRedSlider").onchange = function(event) {
        materialAmbient[0] = event.target.value;
        document.getElementById("materialAmbientRedSliderText").innerHTML = event.target.value;
        init();
    };
    document.getElementById("materialAmbientGreenSlider").onchange = function(event) {
        materialAmbient[1] = event.target.value;
        document.getElementById("materialAmbientGreenSliderText").innerHTML = event.target.value;
        init();
    };
    document.getElementById("materialAmbientBlueSlider").onchange = function(event) {
        materialAmbient[2] = event.target.value;
        document.getElementById("materialAmbientBlueSliderText").innerHTML = event.target.value;
        init();
    };

    //Material Diffuse
    document.getElementById("materialDiffuseRedSlider").onchange = function(event) {
        materialDiffuse[0] = event.target.value;
        document.getElementById("materialDiffuseRedSliderText").innerHTML = event.target.value;
        init();
    };
    document.getElementById("materialDiffuseGreenSlider").onchange = function(event) {
        materialDiffuse[1] = event.target.value;
        document.getElementById("materialDiffuseGreenSliderText").innerHTML = event.target.value;
        init();
    };
    document.getElementById("materialDiffuseBlueSlider").onchange = function(event) {
        materialDiffuse[2] = event.target.value;
        document.getElementById("materialDiffuseBlueSliderText").innerHTML = event.target.value;
        init();
    };
    //Material Specular
    document.getElementById("materialSpecularRedSlider").onchange = function(event) {
        materialSpecular[0] = event.target.value;
        document.getElementById("materialSpecularRedSliderText").innerHTML = event.target.value;
        init();
    };
    document.getElementById("materialSpecularGreenSlider").onchange = function(event) {
        materialSpecular[1] = event.target.value;
        document.getElementById("materialSpecularGreenSliderText").innerHTML = event.target.value;
        init();
    };
    document.getElementById("materialSpecularBlueSlider").onchange = function(event) {
        materialSpecular[2] = event.target.value;
        document.getElementById("materialSpecularBlueSliderText").innerHTML = event.target.value;
        init();
    };
    //Shininess

    document.getElementById("materialShininessSlider").onchange = function(event) {
        materialShininess = event.target.value;
        document.getElementById("materialShininessSliderText").innerHTML = event.target.value;
        init();
    };

    //Subdivisions
    document.getElementById("slider").onchange = function(event) {
        numTimesToSubdivide = event.target.value;
        document.getElementById("sliderText").innerHTML = event.target.value;
        index = 0;
        pointsArray = [];
        normalsArray = [];
        init();
    };

    /*
    * LIGHT
    */
    //Light Ambient
    document.getElementById("lightAmbientRedSlider").onchange = function(event) {
        lightAmbient[0] = event.target.value;
        document.getElementById("lightAmbientRedSliderText").innerHTML = event.target.value;
        init();
    };
    document.getElementById("lightAmbientGreenSlider").onchange = function(event) {
        lightAmbient[1] = event.target.value;
        document.getElementById("lightAmbientGreenSliderText").innerHTML = event.target.value;
        init();
    };
    document.getElementById("lightAmbientBlueSlider").onchange = function(event) {
        lightAmbient[2] = event.target.value;
        document.getElementById("lightAmbientBlueSliderText").innerHTML = event.target.value;
        init();
    };

    //Light Diffuse
    document.getElementById("lightDiffuseRedSlider").onchange = function(event) {
        lightDiffuse[0] = event.target.value;
        document.getElementById("lightDiffuseRedSliderText").innerHTML = event.target.value;
        init();
    };
    document.getElementById("lightDiffuseGreenSlider").onchange = function(event) {
        lightDiffuse[1] = event.target.value;
        document.getElementById("lightDiffuseGreenSliderText").innerHTML = event.target.value;
        init();
    };
    document.getElementById("lightDiffuseBlueSlider").onchange = function(event) {
        lightDiffuse[2] = event.target.value;
        document.getElementById("lightDiffuseBlueSliderText").innerHTML = event.target.value;
        init();
    };
    //Light Specular
    document.getElementById("lightSpecularRedSlider").onchange = function(event) {
        lightSpecular[0] = event.target.value;
        document.getElementById("lightSpecularRedSliderText").innerHTML = event.target.value;
        init();
    };
    document.getElementById("lightSpecularGreenSlider").onchange = function(event) {
        lightSpecular[1] = event.target.value;
        document.getElementById("lightSpecularGreenSliderText").innerHTML = event.target.value;
        init();
    };
    document.getElementById("lightSpecularBlueSlider").onchange = function(event) {
        lightSpecular[2] = event.target.value;
        document.getElementById("lightSpecularBlueSliderText").innerHTML = event.target.value;
        init();
    };

    document.getElementById("phiSlider").onchange = function(event) {
        phi = event.target.value;
        document.getElementById("phiSliderText").innerHTML = event.target.value;
        init();
    };

    document.getElementById("thetaSlider").onchange = function(event) {
        theta = event.target.value;
        document.getElementById("thetaSliderText").innerHTML = event.target.value;
        init();
    };

    document.getElementById("Controls").onclick = function(event){
      console.log(event.target.index);
      switch (event.target.index) {
        case 0:
          phongFragmentShading = false;
          break;
        case 1:
          phongFragmentShading = true;
          break;
      }
      init();
    };


    lightPosition[0] = radius*Math.sin(theta);
    lightPosition[1] = radius*Math.sin(phi);
    lightPosition[2] = radius;


    gl.uniform4fv( gl.getUniformLocation(program,
        "ambientProduct"),flatten(ambientProduct) );
    gl.uniform4fv( gl.getUniformLocation(program,
       "diffuseProduct"),flatten(diffuseProduct) );
    gl.uniform4fv( gl.getUniformLocation(program,
       "specularProduct"),flatten(specularProduct) );
    gl.uniform4fv( gl.getUniformLocation(program,
       "lightPosition"),flatten(lightPosition) );
    gl.uniform1f( gl.getUniformLocation(program,
       "shininess"),materialShininess );

    render();
}


function render() {

    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    eye = vec3(0,0,1.5);

    modelViewMatrix = lookAt(eye, at , up);
    projectionMatrix = ortho(left, right, bottom, ytop, near, far);

    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix) );
    gl.uniformMatrix4fv(projectionMatrixLoc, false, flatten(projectionMatrix) );

    for( var i=0; i<index; i+=3)
        gl.drawArrays( gl.TRIANGLES, i, 3 );

    window.requestAnimFrame(render);
}
