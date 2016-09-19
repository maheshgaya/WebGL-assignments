/*
* author: Mahesh Gaya
* date: 9/14/2016
* description:
**  displays a cross with rotation
**  cross can be moved, speed up or down
**  color of cross can also be changed
* proposed points (out of 15): 15, I have covered every points
*/

"use strict";

var gl;

//for rotation
var theta = 0.0;
var thetaLoc;

//for movement
var xPosition = 0.0;
var xPositionLoc;

var yPosition = 0.0;
var yPositionLoc;

//direction of rotation
var direction = true;
var timesPressed = 0;

//color of cross
var red = 1.0;
var redLoc;
var green = 0.0;
var greenLoc;
var blue = 0.0;
var blueLoc;

//speed of rotation
var speed = 0.2;

window.onload = function init()
{
    var canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    //
    //  Configure WebGL
    //
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

    //  Load shaders and initialize attribute buffers

    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    var vertices = [
        vec2(-0.5, 1.5), //upper square
        vec2(0.5, 1.5),
        vec2(-0.5,0.5),
        vec2(0.5, 0.5),

        vec2(-1.5, 0.5), //middle rectangle
        vec2(1.5, 0.5),
        vec2(-1.5, -0.5),
        vec2(1.5, -0.5),

        vec2(-0.5,-0.5), //lower square
        vec2(0.5, -0.5),
        vec2(-0.5, -1.5),
        vec2(0.5, -1.5)

    ];


    // Load the data into the GPU

    var vBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);

    // Associate out shader variables with our data buffer

    var vPosition = gl.getAttribLocation( program, "vPosition");
    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);

    //Make the bridge to variables from js to html
    thetaLoc = gl.getUniformLocation( program, "theta" );
    redLoc = gl.getUniformLocation( program, "red" );
    greenLoc = gl.getUniformLocation( program, "green" );
    blueLoc = gl.getUniformLocation( program, "blue" );
    xPositionLoc = gl.getUniformLocation( program, "xPosition");
    yPositionLoc = gl.getUniformLocation( program, "yPosition");

    //Menu Events, moves the square left, right, up or down
    document.getElementById("Controls").onclick = function(event){
      switch( event.target.index ) {
          case 0: //Reset
              xPosition = 0.0;
              yPosition = 0.0;
              break;
          case 1: //Move Up
              xPosition = 0.0;
              yPosition = 2.0;
              break;
          case 2: //Move Left
              xPosition = -2.0;
              yPosition = 0.0;
              break;
          case 3: //Move Right
              xPosition = 2.0;
              yPosition = 0.0;
              break;
          case 4: //Move Down
              xPosition = 0.0;
              yPosition = -2.0;
              break;
     }
     console.debug(xPosition + " : " + yPosition + " from event="+ event.target.index);
    };

    //show initial values for each slider
    document.getElementById("redText").innerHTML = red;
    document.getElementById("greenText").innerHTML = green;
    document.getElementById("blueText").innerHTML = blue;

    // Change direction
    document.getElementById("Direction").onclick = function () {
        timesPressed++;
        console.debug("Direction button pressed", timesPressed);
        direction = !direction;
    };

    //Reset Speed to 0.2
    document.getElementById("ResetSpeed").onclick = function () {
      speed = 0.2;
      document.getElementById("speedText").innerHTML = Number((speed).toFixed(2));
      console.debug("ResetSpeed button pressed");
    }

    //
    //Get values of red, green and blue from slider (0 to 1)
    //Print values to rgba and next to each slider
    //Red Slider
    //
    document.getElementById("redColor").onchange = function(event) {
      red = parseFloat(event.target.value);
      document.getElementById("redText").innerHTML = red;
      document.getElementById("redText1").innerHTML = red;
      console.debug(red);
    };
    //Green Slider
    document.getElementById("greenColor").onchange = function(event) {
      green = parseFloat(event.target.value);
      document.getElementById("greenText").innerHTML = green;
      document.getElementById("greenText1").innerHTML = green;
      console.debug(green);
    };
    //Blue Slider
    document.getElementById("blueColor").onchange = function(event) {
      blue = parseFloat(event.target.value);
      document.getElementById("blueText").innerHTML = blue;
      document.getElementById("blueText1").innerHTML = blue;
      console.debug(blue);
    };

    //Handling key strokes
    window.onkeydown = function( event ) {
        var key = String.fromCharCode(event.keyCode);
        switch( key ) {
          case 'M': //rotates faster
          case 'm':
            if (speed <= 1.0){
              speed += 0.01;
            }
            break;
          case 'N': //rotates slower
          case 'n':
            if (speed >= -1.0){
              speed -= 0.01;
            }
            break;
        }
        document.getElementById("speedText").innerHTML = Number((speed).toFixed(2));
    };

    render();
};

function render()
{
    gl.clear( gl.COLOR_BUFFER_BIT );

    //changes direction
    if (direction == true)
    {
        theta += speed;
    }
    else
    {
        theta -= speed;
    }
    gl.uniform1f(thetaLoc, theta);
    gl.uniform1f(xPositionLoc, xPosition);
    gl.uniform1f(yPositionLoc, yPosition);
    gl.uniform1f(redLoc, red);
    gl.uniform1f(greenLoc, green);
    gl.uniform1f(blueLoc, blue);

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 12);
    window.requestAnimFrame(render);
}
