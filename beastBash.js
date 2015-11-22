// Infinite Beast Bash
//
// DAGD 460 Multimedia 2
//




// function holding the main game
(function(){
    
    /* ----------------------------------------Initilize variables-----------------------------------------*/

    
    var state;
    

    // Make PIXI aliases for quicker typing
    var Container = PIXI.Container,
    autoDetectRenderer = PIXI.autoDetectRenderer,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    Sprite = PIXI.Sprite;
    
    
    // Set up PIXI canvas
    //Create the renderer
    var c = document.getElementById("body");
    var renderer = autoDetectRenderer(778, 560);
    
    //Add the canvas to the HTML document
    var canv = c.appendChild(renderer.view);
    
    // Make a loading area for all used images
    PIXI.loader
        .add("imgs/plus.png")
        .load(setup);

    

    var graphics = canv.getContext("2d");    
    
    //Create a container object called the `stage`
    var stage = new PIXI.Container();
    
    var testSprite = null;
    
    function setup() {
        testSprite = new PIXI.Sprite(
            resources["imgs/plus.png"].texture
        );
        
        testSprite.x = 200;
        testSprite.y = 100;
        
        
        bttlScene = new Container();
        stage.addChild(bttlScene);
        
        restScene = new Container();
        stage.addChild(restScene);
        
        overScene = new Container();
        stage.addChild(overScene);
        
        toBattle();

        gameLoop();
    } 
    
    function gameLoop(){
        requestAnimationFrame(gameLoop);
        
        //testSprite.x++;
        
        //console.log(testSprite.x);
        
        state();
        
        renderer.render(stage);
    }
    
    function toBattle(){
        
        // generate the enemies for the bttlscene
        bttlScene.addChild(testSprite);
        
        bttlScene.visible = true;
        restScene.visible = false;
        overScene.visible = false;
        
        state = battle;
    }
    
    var count = 0;
    
    function battle(){
        // handle any battle scene logic
        count++;
        
        if(count > 400){
            console.log("Change");
            count = 0;
            toRest();
        }
        else{
            console.log("here");
        }
    }
    
    function toRest(){
        
        // generate the enemies for the bttlscene
        
        bttlScene.visible = false;
        restScene.visible = true;
        overScene.visible = false;
        
        state = rest;
    }
    function rest(){
        // handle any rest scene logic        
        count++;
        
        if(count > 300){
            count = 0;
            console.log("to battle");
            toBattle();
        }
        else{
            console.log("rest in");
        }
    }
    
    function toOver(){
        
        // generate the enemies for the bttlscene
        
        bttlScene.visible = false;
        restScene.visible = false;
        overScene.visible = true;
        
        state = over;
    }
    function over(){
        // handle any over scene logic
        testSprite.x += testSprite.vx;
    }

    
    /*
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
    
    var state = -1;
    var btns = [];
    
    var selecting = false;
    var first = true;
    var marginTop = 100;
    var enemiesExist = false;
        var marginLeft = 200;
        
        var barLength = 200;
        
        var hor = canv.width - marginLeft * 2;
        var vert = 60;
    */
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
    
    /*
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
	
	function battleInfo(g){
         
        var barLength = 200;
        
        g.save
        // background
        g.fillStyle = "#FFF";
        g.fillRect(0, 0, canv.width, 60);
        g.fillStyle = "#DDD";
        g.fillRect(0, 0, barLength, 60);
     
        g.fillStyle = "#CCC";
        g.fillRect(barLength, 0, barLength, 60);
     
        g.fillStyle = "#AAA";
        g.fillRect(barLength* 2, 0, barLength, 60);
        
        g.fillStyle = "#111";
        g.font ="20px Arial";
        g.textBaseline="middle";
        g.textAlign="center";
        g.fillText("INFO", marginLeft + hor/2, marginTop - 70, 300);
        
        g.restore();
	}
    function restInfo(g){
        
        g.save();
		
        g.fillStyle = "#DDD";
        g.font ="20px Arial";
        g.textBaseline="middle";
        g.textAlign="center";
        g.fillText("Upgrade", marginLeft + hor/2, marginTop - 40, 300);
        
        // background
        g.fillStyle = "#FFF";
        g.fillRect(marginLeft, marginTop, hor, canv.height - marginTop * 2);
        
        g.fillStyle = "#DDD";
        g.fillRect(marginLeft, marginTop, hor, vert);
        
        g.fillStyle = "#CCC";
        g.fillRect(marginLeft, marginTop + vert, hor, vert);
        
        g.fillStyle = "#AAA";
        g.fillRect(marginLeft, marginTop + vert * 2, hor, vert);
        
        
        
        g.fillStyle = "#DDD";
        g.fillRect(marginLeft, marginTop + vert * 3, hor, vert);
        
        g.fillStyle = "#CCC";
        g.fillRect(marginLeft, marginTop + vert * 4, hor, vert);
        g.fillStyle = "#AAA";
        g.fillRect(marginLeft, marginTop + vert * 5, hor, vert);
        
        
        //g.fillStyle = "#CCC";
        //g.fillRect(marginLeft + hor/4, marginTop + vert * 6.1, hor / 2, vert);
        
        //g.fillStyle = "#222";
        //g.fillText("Bash", marginLeft + hor/2, marginTop + vert * 6.1 + vert/2, 300);
        
        g.restore();
	}
    
    
    function button(id, x, y, w, h, strng){
        this.id = id;
		this.x = x;
		this.y = y;
        this.h = h;
        this.w = w;
        this.dead = false;
		
        // the update logic for this object
        // dt: the delta time of this frame
        // retun: null
		this.draw = function(g){
			g.save();
            
            if(this.id === 9 && selecting === false){
                g.globalAlpha = .5;
            }
            
			g.font ="20px Arial";
            g.textBaseline="middle";
            g.textAlign="center";
            
			g.fillStyle = "#CCC";
            g.fillRect(x - w/2, y - h/2, w, h);
            //g.fillRect(0, 0, 20, 20);
            
        
            g.fillStyle = "#222";
            g.fillText(strng, x, y, 300);
			
			g.restore();
		};
        
        this.clicked = function(){
            if(this.id === 0){
                console.log("yep");
                toBattle();
            }
            else if(this.id === 1){
                console.log("lol");
                toRest();
            }
            else if(this.id === 5){
                selecting = true;
            }
            else if(this.id === 9 && selecting === true){
                selecting = false;
                this.dead = true;
            }
        }
		
	}
    
    
    function NPC(){
        // sprite reference
        // name
        // position x
        // position y
        // health
        // attack
        // defense
        // speed
        
		
        // the update logic for this object
        // dt: the delta time of this frame
        // retun: null
		this.draw = function(g){
			g.save();
            
            if(this.id === 9 && selecting === false){
                g.globalAlpha = .5;
            }
            
			g.font ="20px Arial";
            g.textBaseline="middle";
            g.textAlign="center";
            
			g.fillStyle = "#CCC";
            g.fillRect(x - w/2, y - h/2, w, h);
            //g.fillRect(0, 0, 20, 20);
            
        
            g.fillStyle = "#222";
            g.fillText(strng, x, y, 300);
			
			g.restore();
		};
		
	}
	/* -------------------------------------------Event Functions-------------------------------------------*/
	/*
    function toRest(){
        state = 1;
        console.log("lolsss");
        removeBtns();
         
        btns.push(new button(0, canv.width/2,  marginTop + vert * 6.1 + vert/2, hor/2, vert, "Bash"));
		
	}
    function toBattle(){
        enemiesExist = true;
        state = 0;
		removeBtns();
        console.log("yeps");
        
        
        var temp = new button(5, 390,  150, 100, 100, "ATK");
        btns.push(temp);
        
        
        temp = new button(9, 250,  350, 100, 100, "EN");
        btns.push(temp);
        temp = new button(9, 390,  350, 100, 100, "EN");
        btns.push(temp);
        temp = new button(9, 530,  350, 100, 100, "EN");
        btns.push(temp);
        
		temp = new button(1, canv.width/6,  marginTop + vert * 6.1 + vert/2, hor/2, vert, "bop");
        btns.push(temp);
        
	}
    function removeBtns(){
        btns = [];
    }
	// Track the mouse cursor
	canv.addEventListener("mousemove", function(e){  
        bounds = canv.getBoundingClientRect();
        
        mouse.x = e.clientX - bounds.left;
        mouse.y = e.clientY - bounds.top;

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
        for(var i = 0; i < btns.length; i++)
        {
            if(mouse.x < btns[i].x + btns[i].w/2 && mouse.x > btns[i].x - btns[i].w/2 &&
               mouse.y < btns[i].y + btns[i].h/2 && mouse.y > btns[i].y - btns[i].h/2){

                btns[i].clicked();
            }
        }

	});
	
	/* ----------------------------------------------------Game Loop -----------------------------------------*/
	/*
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
            
        if(first){
            toBattle();
            first = false;
        }
        
        if(state === 0){
        
        for(var i = btns.length - 1; i >= 0; i--){
            if(btns[i].id === 9 && btns[i].dead === false){
                enemiesExist = true;
            }
            if(btns[i].dead === true){
                btns.splice(i, 1);
            }
        }
        
            if(enemiesExist === false){
                console.log("lol");
                toRest();
            }
            
            enemiesExist = false;
        }
        //console.clear();
        
    }
    
    // main draw function for the game
    // return: null
    function draw(){
        /*graphics.clearRect(0,0, canv.width, canv.height);
        if(state === 0)
        {
            battleInfo(graphics);
        }
        else if(state === 1)
        {
            restInfo(graphics);
        }
        for(var i = 0; i < btns.length; i++)
        {
            btns[i].draw(graphics);
        }
        */
    //}
    //gameloop();
    
})();