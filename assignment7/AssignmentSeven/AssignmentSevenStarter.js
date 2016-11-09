//name: Mahesh Gaya
//description: Assignment 7
//proposed points: 15 (out of 15)
// texture link: http://rlv.zcache.com/haunted_house_halloween_square_invitation-r6a127166b57645ebb13d69acf6931a8c_imtet_8byvr_512.jpg
// key bindings are set so that pressing 'W' will make the eye position move in z direction
//                                       'S' will make the eye position move in -z direction
//                                       'A' will rotate to the left
//                                       'D' will rotate to the right
//   The keys allow for the user to move within the environment
//    it's a bit of a hack, but works well enough for simple navigation here



"use strict";

var render, canvas, gl;
var textureArray = [];
var pointsArray = [];
var program;

var zPos = 10.0;  //position of Eye
var theta  = 0.0; //rotation for eye position
var eye;

var modelViewMatrix;
var modelViewMatrixLoc;

var projectionMatrix;
var projectionMatrixLoc;

var at = vec3(0.0, 0.0, 0.0);
var up = vec3(0.0, 1.0, 0.0);

var texCoordsArray = [];


function loadPoints(points,texture) {
    //load the vertex positions and texture positions here
    //points: x, y, z, w
    //texture: x

    //The texture (floor, mona lisa, wall, painting)
    //The layout of the texture below:
    //(0,1)   - (0.5,1)   - (1,1)
    //(0,0.5) - (0.5,0.5) - (1,0.5)
    //(0,0)   - (0.5,0)   - (1,0)
    /*
    (0,1)   - (0.25,1)    - (0.5,1)     - (0.75,1)    - (1,1)
    (0,0.5) - (0.25,0.5)  - (0.5, 0.5)  - (0.75, 0.5) - (1, 0.5)
    (0,0)   - (0.25,0)    - (0.5,0)     - (0.75,0)    - (1,0)
    */
    // .  .  .  .  .
    // .  .  .  .  .
    // .  .  .  .  .
    //(floor)(mona darling)
    //(wall)(painting)

    //adding textures and points
    //floor
    points.push(vec4(-6.0, 0 , 10, 1)); //closest on left
    texture.push(vec2(0,0.5));
    points.push(vec4(-6.0 , 0 , 0, 1));//farthest on left
    texture.push(vec2(0,1));
    points.push(vec4(6.0 , 0 , 0, 1));//farthest on right
    texture.push(vec2(0.25, 1));

    points.push(vec4(6.0 , 0 , 0, 1));//farthest on right
    texture.push(vec2(0.25, 1));
    points.push(vec4(6.0 , 0 , 10, 1));//closest on right
    texture.push(vec2(0.25,0.5));
    points.push(vec4(-6.0, 0 , 10, 1)); //closest on left
    texture.push(vec2(0,0.5));

    //left wall
    points.push(vec4(-6.0, 0 , 10, 1)); //closest on left bottom
    texture.push(vec2(0, 0));
    points.push(vec4(-6.0, 6 , 10, 1)); //closest on left top
    texture.push(vec2(0,0.5));
    points.push(vec4(-6.0, 6 , 0, 1)); //farthest on left top
    texture.push(vec2(0.25,0.5));

    points.push(vec4(-6.0, 6 , 0, 1)); //farthest on left top
    texture.push(vec2(0.25,0.5));
    points.push(vec4(-6.0, 0 , 0, 1)); //farthest on left bottom
    texture.push(vec2(0.25,0));
    points.push(vec4(-6.0, 0 , 10, 1)); //closest on left bottom
    texture.push(vec2(0, 0));

    //right wall
    points.push(vec4(6.0, 0 , 10, 1)); //closest on right bottom
    texture.push(vec2(0, 0));
    points.push(vec4(6.0, 6 , 10, 1)); //closest on right top
    texture.push(vec2(0,0.5));
    points.push(vec4(6.0, 6 , 0, 1)); //farthest on right top
    texture.push(vec2(0.25,0.5));

    points.push(vec4(6.0, 6 , 0, 1)); //farthest on right top
    texture.push(vec2(0.25,0.5));
    points.push(vec4(6.0, 0 , 0, 1)); //farthest on right bottom
    texture.push(vec2(0.25,0));
    points.push(vec4(6.0, 0 , 10, 1)); //closest on right bottom
    texture.push(vec2(0, 0));

    //back wall
    points.push(vec4(-6.0, 0 , 0, 1)); //farthest on left bottom
    texture.push(vec2(0, 0));
    points.push(vec4(-6.0, 6.0 , 0, 1)); //farthest on left top
    texture.push(vec2(0,0.5));
    points.push(vec4(6.0, 6.0 , 0, 1)); //farthest on right top
    texture.push(vec2(0.25,0.5));

    points.push(vec4(6.0, 6.0 , 0, 1)); //farthest on right top
    texture.push(vec2(0.25,0.5));
    points.push(vec4(6.0, 0 , 0, 1)); //farthest on right bottom
    texture.push(vec2(0.25,0));
    points.push(vec4(-6.0, 0 , 0, 1)); //farthest on left bottom
    texture.push(vec2(0, 0));

    //add arts to walls
    //left for mona lisa

    points.push(vec4(-5.990, 2.0 , 7, 1)); //close bottom picture corner
    texture.push(vec2(0.25,0.5));
    points.push(vec4(-5.990, 4.0 , 7, 1)); //close top picture corner
    texture.push(vec2(0.25,1));
    points.push(vec4(-5.990, 4.0 , 3, 1)); //far top picture corner
    texture.push(vec2(0.5,1));

    points.push(vec4(-5.990, 4.0 , 3, 1)); //far top picture corner
    texture.push(vec2(0.5,1));
    points.push(vec4(-5.990, 2.0 , 3, 1)); //far bottom picture corner
    texture.push(vec2(0.5,0.5));
    points.push(vec4(-5.990, 2.0 , 7, 1)); //close bottom picture corner
    texture.push(vec2(0.25,0.5));

    //right for painting
    points.push(vec4(5.990, 2.0 , 3, 1)); //far bottom picture corner
    texture.push(vec2(0.25,0));
    points.push(vec4(5.990, 4.0 , 3, 1)); //far top picture corner
    texture.push(vec2(0.25,0.5));
    points.push(vec4(5.990, 2.0 , 7, 1)); //close bottom picture corner
    texture.push(vec2(0.5,0));
    points.push(vec4(5.990, 4.0 , 3, 1)); //far top picture corner
    texture.push(vec2(0.25,0.5));
    points.push(vec4(5.990, 4.0 , 7, 1)); //close top picture corner
    texture.push(vec2(0.5,0.5));
    points.push(vec4(5.990, 2.0 , 7, 1)); //close bottom picture corner
    texture.push(vec2(0.5,0));

    //back wall for custom halloween texture
    points.push(vec4(-3.0, 5.0, 0.01, 1)); //top left corner
    texture.push(vec2(0.55,0.95));
    points.push(vec4(-3.0, 1.0, 0.01, 1)); //bottom left corner
    texture.push(vec2(0.55,0.05));
    points.push(vec4(3.0, 1.0, 0.01, 1)); //bottom right corner
    texture.push(vec2(0.95,0.05));

    points.push(vec4(-3.0, 5.0, 0.01, 1)); //top left corner
    texture.push(vec2(0.55,0.95));
    points.push(vec4(3.0, 5.0, 0.01, 1)); //top right corner
    texture.push(vec2(0.95,0.95));
    points.push(vec4(3.0, 1.0, 0.01, 1)); //bottom right corner
    texture.push(vec2(0.95,0.05));

}


function configureTexture(image) {
    var texture = gl.createTexture();
    gl.activeTexture( gl.TEXTURE0 );
    gl.bindTexture( gl.TEXTURE_2D, texture );
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA,
        gl.RGBA, gl.UNSIGNED_BYTE, image);

    gl.generateMipmap( gl.TEXTURE_2D );

    //point sampling
    gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST_MIPMAP_NEAREST);
    gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST );

}

onload = function init()  {

    canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( .9, .9, .9, 1.0 );
    gl.enable(gl.DEPTH_TEST);

    program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    loadPoints(pointsArray, textureArray);

    //establish buffers to send to shaders
    var vBufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vBufferId );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(pointsArray), gl.STATIC_DRAW );

    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    var tBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, tBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(textureArray), gl.STATIC_DRAW );

    var vTexCoord = gl.getAttribLocation( program, "vTexCoord" );
    gl.vertexAttribPointer( vTexCoord, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vTexCoord );

    modelViewMatrixLoc = gl.getUniformLocation( program, "modelViewMatrix" );
    projectionMatrixLoc = gl.getUniformLocation( program, "projectionMatrix" );

    //establish texture
    var image = document.getElementById("texImage");
    configureTexture(image);

    //handle the styles
    document.getElementById("Texture Style").onclick = function(event){
      switch (event.target.index) {
        case 0: //Nearest
          gl.texParameteri(gl.TEXTURE_2D,  gl.TEXTURE_MIN_FILTER, gl.NEAREST_MIPMAP_NEAREST);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
          break;
        case 1: //Linear
          gl.texParameteri(gl.TEXTURE_2D,  gl.TEXTURE_MIN_FILTER, gl.NEAREST_MIPMAP_NEAREST);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
          break;
        case 2: //mipmap nearest
          gl.texParameteri(gl.TEXTURE_2D,  gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
          break;
        case 3: //mipmap nearest
          gl.texParameteri(gl.TEXTURE_2D,  gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
          break;


      }
    }

   // Initialize event handler (key codes)
    window.onkeydown = function( event ) {
        var key = String.fromCharCode(event.keyCode);
        switch( key ) {
          case 'W': //forward
            zPos -= .4
            break;
          case 'S': //back
            zPos += .4
           break;
          case 'A': //pan to left
            theta-=.04;
            break;
          case 'D':  //pan to right
           theta+=.04;
           break;
        }
    };

    render();
}

render = function(){
    gl.clear( gl.COLOR_BUFFER_BIT);

    eye = vec3(0, 1, zPos);
    at = vec3(zPos*Math.sin(theta), 1, 10 - 10*Math.cos(theta));

    //establish modelView and Projection matrices
    modelViewMatrix = lookAt(eye, at, up);
    projectionMatrix = perspective(45, 1, 1.0, 100);

    gl.uniformMatrix4fv( modelViewMatrixLoc, false, flatten(modelViewMatrix) );
    gl.uniformMatrix4fv( projectionMatrixLoc, false, flatten(projectionMatrix) );

    //draw triangles
    gl.drawArrays( gl.TRIANGLES, 0, pointsArray.length);

    requestAnimFrame(render);
}
