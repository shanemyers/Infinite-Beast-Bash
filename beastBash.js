// Infinite Beast Bash
//
// DAGD 460 Multimedia 2
//

// function holding the main game
(function(){
    
    /* ----------------------------------------Initilize variables-----------------------------------------*/
	
    var canv = document.getElementById("beastBash");
    var graphics = canv.getContext("2d");
    
    var requestAnimFrame = (function(){
        // return must be on the same line at the data
        return window.requestAnimationFrame || 
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            function(f){
            setTimeout(f, 1000/60);
        };
    })();
    
    var mouse = {x:0, y:0};
    var isMouseDown = false;
    var bounds = canv.getBoundingClientRect();
    
    
	/* ------------------------------------------------ Objects -----------------------------------------------*/
	
    
    // A basic javascript function template
    // used for quick reference when creating other functions
    /*
	function SomeObject(){
		var obj = new Sprite( "url path to image");
		obj.x = 0;
		obj.y = 0;
		obj.angle = 0;
		
		obj.vx = 0;
		obj.vy = 0;
		obj.va = 0;
		
		obj.dead = false;
		
        // the update logic for this object
        // dt: the delta time of this frame
        // retun: null
		obj.update = function(dt){
			obj.x += obj.vx;
			obj.y += obj.vy;
			obj.angle += obj.va;
		};
		
		return obj;
	}
	*/
    
    
    // Create a sprite object
    // used as the base to the other object functions
    // url: The string url of the target sprite image's file location
    // returns: null
	function Sprite(url){
		this.image = new Image();
		this.x = 0;
		this.y = 0;
		this.angle = 0;
		this.scale = 1;
		this.anchorx = 0;
		this.anchory = 0;
		this.hasLoaded = false;
		this.alpha = 1;
        
		var me = this;
		
		this.image.onload = function(){
			me.anchorx = this.width/2;
			me.anchory = this.height/2;
			me.hasLoaded = true;
		}
        
		this.image.src = url;
		
        
        // draw function for the text
        // call this in the main call loop
        // g: graphics or the canvas' context
        // return: null
		this.draw = function(g){
			if(!this.hasLoaded) return;
			g.save();
			
			g.translate(this.x, this.y);
			g.rotate(this.angle);
			g.scale(this.scale, this.scale);
            g.globalAlpha = this.alpha;
			g.drawImage(this.image, -this.anchorx, - this.anchory);
			
			g.restore();
		};
	}
	
	
	/* -------------------------------------------Event Functions-------------------------------------------*/
	
	// Track the mouse cursor
	canv.addEventListener("mousemove", function(e){  
        bounds = canv.getBoundingClientRect();
        
        mouse.x = e.clientX - bounds.left;
        mouse.y = e.clientY - bounds.top;
        
        console.log("top: " + mouse.y + " :: doc: " + document);
    });
    
    // track whenever the mouse is pressed down
	canv.addEventListener("mousedown", function(e){
		isMouseDown = true;
	});
    
    // track when the mouse is not pressed
	canv.addEventListener("mouseup", function(e){	
		isMouseDown = false;
	});
    
    // track a completed mouse click
	canv.addEventListener("click", function(e){


	});
	
	/* ----------------------------------------------------Game Loop -----------------------------------------*/
	
	var ptime = 0;
    
    // the main gameloop of the game
    // time: the time since the start of the code
    // return: null
	function gameloop(time){ 
        if(isNaN(time)) time = 0;
        
        var dt = (time - ptime) / 1000;
        ptime = time;
        
        
        update(dt);
        draw();
        requestAnimFrame(gameloop);
    }
    
    // the main update loop of the function
    // game logic and updates go here
    // dt: the delta time of each frame
    // return: null
	function update(dt){
		
        
        //console.clear();
    }
    
    // main draw function for the game
    // return: null
    function draw(){
        graphics.clearRect(0,0, canv.width, canv.height);
		
    }
    gameloop();
    
    
})();