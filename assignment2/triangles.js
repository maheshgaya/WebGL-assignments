"use strict";
/*
* author: Mahesh Gaya
* Concept frame (the middle one) : http://tse3.mm.bing.net/th?id=OIP.M0f67ba88f656b95ae10424975205efado0
*/
var gl;
var points;

window.onload = function init()
{
    var canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    //
    //  Initialize our data for the triangles
    //
    //(red, green, blue) values for all of the vertices
    var colors = [
        //background
        
        vec3(0.89, 0.949, 0.992),
        vec3(0.89, 0.949, 0.992),
        vec3(0.733, 0.871, 0.984),

        vec3(0.89, 0.949, 0.992),
        vec3(0.89, 0.949, 0.992),
        vec3(0.89, 0.949, 0.992),

        //Right Face
        //1st
        vec3(0.961, 0.486, 0),
        vec3(0.961, 0.486, 0),
        vec3(0.961, 0.486, 0),
        //2nd
        vec3(0.961, 0.486, 0),
        vec3(0.961, 0.486, 0),
        vec3(0.961, 0.486, 0),
        //3rd
        vec3(0.937, 0.424, 0),
        vec3(0.937, 0.424, 0),
        vec3(0.937, 0.424, 0),
        //4th
        vec3(1, 0.718, 0.302),
        vec3(1, 0.718, 0.302),
        vec3(1, 0.718, 0.302),
        //5th
        vec3(1, 0.8, 0.502),
        vec3(1, 0.8, 0.502),
        vec3(1, 0.8, 0.502),
        //6th
        vec3(0.937, 0.424, 0),
        vec3(0.937, 0.424, 0),
        vec3(0.937, 0.424, 0),
        //7th
        vec3(0.902, 0.318, 0),
        vec3(0.902, 0.318, 0),
        vec3(0.902, 0.318, 0),

        //Left Face
        //1st
        vec3(0.937, 0.424, 0),
        vec3(0.937, 0.424, 0),
        vec3(0.937, 0.424, 0),
        //2nd
        vec3(0.961, 0.486, 0),
        vec3(0.961, 0.486, 0),
        vec3(0.961, 0.486, 0),
        //3rd
        vec3(0.984, 0.549, 0),
        vec3(0.984, 0.549, 0),
        vec3(0.984, 0.549, 0),
        //4th
        vec3(1, 0.718, 0.302),
        vec3(1, 0.718, 0.302),
        vec3(1, 0.718, 0.302),
        //5th
        vec3(1, 0.8, 0.502),
        vec3(1, 0.8, 0.502),
        vec3(1, 0.8, 0.502),
        //6th
        vec3(0.937, 0.424, 0),
        vec3(0.937, 0.424, 0),
        vec3(0.937, 0.424, 0),
        //7th
        vec3(0.902, 0.318, 0),
        vec3(0.902, 0.318, 0),
        vec3(0.902, 0.318, 0),

        //eyes
        vec3(0.0, 0.0, 0.0),
        vec3(0.0, 0.0, 0.0),
        vec3(0.0, 0.0, 0.0),

        vec3(0.0, 0.0, 0.0),
        vec3(0.0, 0.0, 0.0),
        vec3(0.0, 0.0, 0.0),

        //mouth
        vec3(0.0, 0.0, 0.0),
        vec3(0.0, 0.0, 0.0),
        vec3(0.0, 0.0, 0.0),

        
/*
        //Moustache
        //Right Face
        vec3(0.0, 0.0, 0.0),
        vec3(0.0, 0.0, 0.0),
        vec3(0.0, 0.0, 0.0),

        vec3(0.0, 0.0, 0.0),
        vec3(0.0, 0.0, 0.0),
        vec3(0.0, 0.0, 0.0),

        vec3(0.0, 0.0, 0.0),
        vec3(0.0, 0.0, 0.0),
        vec3(0.0, 0.0, 0.0),

        //Left Face
        vec3(0.0, 0.0, 0.0),
        vec3(0.0, 0.0, 0.0),
        vec3(0.0, 0.0, 0.0),

        vec3(0.0, 0.0, 0.0),
        vec3(0.0, 0.0, 0.0),
        vec3(0.0, 0.0, 0.0),

        vec3(0.0, 0.0, 0.0),
        vec3(0.0, 0.0, 0.0),
        vec3(0.0, 0.0, 0.0),
*/
    ];

    // And, add our vertices point into our array of points
    points = [
        //background
        vec2( 2, 2 ), //triangle 
        vec2( -2, -2 ),  
        vec2( 2, -2 ),

        vec2( -2, 2 ), //triangle 
        vec2( 2, 2 ),  
        vec2( -2, -2 ),

        //Right Face
        vec2( 0, 0 ), //triangle 
        vec2( 0, -1 ),    
        vec2( 0.5,  0 ),

        vec2( 0.5, 0 ),
        vec2( 0, 1 ), //triangle 
        vec2( 0.65, 0.65 ), 

        vec2( 0, 1 ), //triangle 
        vec2( 0.5, 0 ),  
        vec2( 0, 0 ),

        vec2( 0, 1 ), //triangle 
        vec2( 1, 1.5 ),  
        vec2( 0.65, 0.65 ),

        vec2( 1, 0 ), //triangle 
        vec2( 1, 1.5 ),  
        vec2( 0.65, 0.65 ),

        vec2( 0.65, 0.65 ), //triangle 
        vec2( 0.5, 0 ),  
        vec2( 1, 0 ),

        vec2( 0, -1 ), //triangle 
        vec2( 0.5, 0 ),  
        vec2( 1, 0 ),

        //Left Face
        vec2( 0, 0 ), //triangle 
        vec2( 0, -1 ),    
        vec2( -0.5,  0 ),

        vec2( -0.5, 0 ),
        vec2( 0, 1 ), //triangle 
        vec2( -0.65, 0.65 ), 

        vec2( 0, 1 ), //triangle 
        vec2( -0.5, 0 ),  
        vec2( 0, 0 ),

        vec2( 0, 1 ), //triangle 
        vec2( -1, 1.5 ),  
        vec2( -0.65, 0.65 ),

        vec2( -1, 0 ), //triangle 
        vec2( -1, 1.5 ),  
        vec2( -0.65, 0.65 ),

        vec2( -0.65, 0.65 ), //triangle 
        vec2( -0.5, 0 ),  
        vec2( -1, 0 ),

        vec2( 0, -1 ), //triangle 
        vec2( -0.5, 0 ),  
        vec2( -1, 0 ),

        //Right eye
        vec2( 0.69, 0 ), //triangle 
        vec2( 0.5, 0 ),  
        vec2( 0.438, -0.12 ),

        //Left eye
        vec2( -0.69, 0 ), //triangle 
        vec2( -0.5, 0 ),  
        vec2( -0.438, -0.12 ),

        //Mouth
        vec2( 0, -1 ), //triangle 
        vec2( 0.2, -0.8 ),  
        vec2( -0.2, -0.8 ),

        

/* Ugly
        //Moustache
        //Right Face
        vec2( 0, -.85 ), //triangle 
        vec2( 0, -0.86 ),  
        vec2( 0.3, -.88 ),

        vec2( 0, -.84 ), //triangle 
        vec2( 0, -0.85 ),  
        vec2( 0.4, -.84 ),

        vec2( 0, -.83 ), //triangle 
        vec2( 0, -0.84 ),  
        vec2( 0.5, -.80 ),

        //Left Face
        vec2( 0, -.85 ), //triangle 
        vec2( 0, -0.86 ),  
        vec2( -0.3, -.88 ),

        vec2( 0, -.84 ), //triangle 
        vec2( 0, -0.85 ),  
        vec2( -0.4, -.84 ),

        vec2( 0, -.83 ), //triangle 
        vec2( 0, -0.84 ),  
        vec2( -0.5, -.80 ),
*/
    
        
        ];

    //  Configure WebGL
    //
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

    //  Load shaders and initialize attribute buffers
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    // Create a buffer object, initialize it, and associate it with the
    //  associated attribute variable in our vertex shader

    var cBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW );

    var vColor = gl.getAttribLocation( program, "vColor" );
    gl.vertexAttribPointer( vColor, 3, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vColor );

    var vBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW );

    //note that the 2 below is because each of our 
    //data points has only 2 values (2D application)
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    render();
};


function render() {
    gl.clear( gl.COLOR_BUFFER_BIT );
    gl.drawArrays( gl.TRIANGLES, 0, points.length );
}
