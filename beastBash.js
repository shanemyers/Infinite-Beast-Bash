// Infinite Beast Bash
//
// DAGD 460 Multimedia 2
// Shane Myers
// 12/13/2015


// initilize arrays to hold sql data
var sqlNameData = [];
var loaded = false;
//-----------------------------------------------------------------------------------------------------------------

// receive sql data from the database
// return null
$(function(){
    
        var xml;
    
        $.ajax("getDatabase.php", {success:function(data){
    
                    xml = $.parseXML(data);
                    
                    $xml = $(xml);
                    
                    var scores = $xml.find("names name adj").toArray();
                    
                    //console.log("inscsssss: " + scores.length);
                    
                    for(var i = 0; i < scores.length; i++){
                        //console.log(scores[i].childNodes[0].nodeValue);
                        sqlNameData.push(scores[i].childNodes[0].nodeValue);
                    }
                    loaded = true;
        }});
});



// function holding the main game, runs itself
// return null
(function(){
    
    // initilize variables
    var info;
    var healthBar;
    var points;
    var loseScreen;

    var gameOver = false;
    
    var leaveBattleBtn;
    var leaveRestBtn;
    var leaveLoseBtn;
    
    var roundNum = 10;
    var roundCount = 0;
    var restBtns = [];
    var restBack = [];
    
    var state = 1;
    var testSprite = null;
    var player = null;
    var enemies = [];
    
    var battleGroup;
    var restGroup;
    var loseGroup;
    
    var selBattle;
    var selRest;
    
    var attacking = 0;
    var target = 0;
    var battleDone = true;
    var t2;
    
    var hpText;
    var atkText;
    var defText;
    var spdText;
    var expText;
    /* --------------------------------------------------------------------------------------------------- */
    
    // set up a game object as defined in phaser
    // creates a canvas object
    var game = new Phaser.Game(778, 560, Phaser.AUTO, 'body');
        
        // the main function to run the Phaser gameloop
        // return null
        var main = function(){
            
            // preload assets
            this.preload = function(){
                game.load.image("plus", "imgs/plus.png");
                game.load.image("plar", "imgs/usr.png");
                game.load.image("mon1", "imgs/mon1.png");
                game.load.image("swrd", "imgs/sword.png");
                game.load.image("bar", "imgs/bar.png");
                game.load.image("red", "imgs/red.png");
                game.load.image("btn", "imgs/btn.png");
                game.load.image("sel", "imgs/sel.png");
                game.load.image("lose", "imgs/lose.png");
            };
            
            // add assets to the scene
            this.create = function(){
                
                battleGroup = game.add.group();
                restGroup = game.add.group();
                loseGroup = game.add.group();
                
                // ----------------------------------------------------------------------------------------------------------
                // initilize battle group assets
                
                selBattle = game.add.button(-2000, -2000, 'sel', actionOnClick, this, 2, 1, 0);
                selBattle.anchor = new PIXI.Point(.5, .5);
                battleGroup.add(selBattle);
                
                player = new Player(389, 150);
                

                leaveBattleBtn = game.add.button(389, 450, 'btn', actionOnClick, this, 2, 1, 0);
                    
                leaveBattleBtn.name = "toRest";
                leaveBattleBtn.anchor = new PIXI.Point(.5, .5);
                leaveBattleBtn.alpha = 0;
                
                leaveBattleBtn.onInputOver.add(over, this);
                leaveBattleBtn.onInputOut.add(out, this);
                leaveBattleBtn.onInputDown.add(down, this);
                leaveBattleBtn.onInputUp.add(up, this);
                    
                battleGroup.add(leaveBattleBtn);
                
                
                t2 = new Phaser.Text(game, 389, 435, player.gold, { font: "26px Arial", fill: "#999", align: "center" });
                t2.anchor.x = .5;
                t2.text = "Rest";
                game.add.existing(t2);
                leaveBattleBtn.addChild(t2);
                battleGroup.add(t2);
                
                // ----------------------------------------------------------------------------------------------------------
                // initilize rest group assets
                
                for(var i = 0; i < 5; i++)
                {
                    var temp = game.add.sprite(389, 160 + (60 * i), 'btn');
                    temp.anchor = new PIXI.Point(.5, .5);
                    temp.scale.setTo(2.2, .9);
                    temp.alpha = .5;
                    
                    restGroup.add(temp);
                    restBack.push(temp);
                }
                
                selRest = game.add.button(-2000, -2000, 'sel', actionOnClickRest, this, 2, 1, 0);
                selRest.anchor = new PIXI.Point(.5, .5);
                selRest.scale.setTo(.35, .35);
                restGroup.add(selRest);
                
                // initilize rest group assets 
                //var temp;
                for(var i = 0; i < 4; i++)
                {
                    var temp = game.add.button(542, 160 + (60 * i), 'plus', actionOnClickRest, this, 2, 1, 0);
            
                    temp.name = "plus" + i;
                    temp.anchor = new PIXI.Point(.5, .5);
                    temp.scale.setTo(.3, .3);
                    temp.alpha = .8;
                    
                    temp.onInputOver.add(overRest, this);
                    temp.onInputOut.add(outRest, this);
                    temp.onInputDown.add(downRest, this);
                    temp.onInputUp.add(upRest, this);
                
                    restGroup.add(temp);
                    restBtns.push(temp);
                }
                
                
                leaveRestBtn = game.add.button(389, 500, 'btn', actionOnClickRest, this, 2, 1, 0);
                    
                leaveRestBtn.name = "toBattle";
                leaveRestBtn.anchor = new PIXI.Point(.5, .5);
                leaveRestBtn.alpha = .8;
                
                leaveRestBtn.onInputOver.add(overRest, this);
                leaveRestBtn.onInputOut.add(outRest, this);
                leaveRestBtn.onInputDown.add(downRest, this);
                leaveRestBtn.onInputUp.add(upRest, this);
                
                restGroup.add(leaveRestBtn);
                
                var t;
                t = new Phaser.Text(game, 355, 485, player.gold, { font: "26px Arial", fill: "#999", align: "center" });
                t.text = "Battle!";
                game.add.existing(t);
                leaveRestBtn.addChild(t);
                restGroup.add(t);
                
                
                var textX = 250;
                
                
                hpText = new Phaser.Text(game, textX, 146, player.gold, { font: "26px Arial", fill: "#999", align: "center" });
                hpText.text = "Health:             " + player.maxHealth;
                game.add.existing(hpText);
                restGroup.add(hpText);
                
                
                atkText = new Phaser.Text(game, textX, 206, player.gold, { font: "26px Arial", fill: "#999", align: "center" });
                atkText.text = "Attack:             " + player.atk;
                game.add.existing(atkText);
                restGroup.add(atkText);
                
                
                defText = new Phaser.Text(game, textX, 266, player.gold, { font: "26px Arial", fill: "#999", align: "center" });
                defText.text = "Defense:          " + player.def;
                game.add.existing(defText);
                restGroup.add(defText);
                
                
                spdText = new Phaser.Text(game, textX, 326, player.gold, { font: "26px Arial", fill: "#999", align: "center" });
                spdText.text = "Speed:             " + player.spd;
                game.add.existing(spdText);
                restGroup.add(spdText);
                
                
                expText = new Phaser.Text(game, textX, 386, player.gold, { font: "26px Arial", fill: "#999", align: "center" });
                expText.text = "Experience:     " + player.exp;
                game.add.existing(expText);
                restGroup.add(expText);
                
                // ----------------------------------------------------------------------------------------------------------
                // initilize general assets 
                
                healthBar = game.add.sprite(22,-1, 'red');
                info = game.add.sprite(0,-1, 'bar');
            
                
                points = new Phaser.Text(game, 220, 18, "Round: " + roundCount, { font: "26px Arial", fill: "#111", align: "center" });
                game.add.existing(points);
                
                
                loseScreen = game.add.sprite(0,0, 'lose');
                loseGroup.add(loseScreen);
                
                
                
                leaveLoseBtn = game.add.button(389, 500, 'btn', actionOnClickRest, this, 2, 1, 0);
                    
                leaveLoseBtn.name = "restart";
                leaveLoseBtn.anchor = new PIXI.Point(.5, .5);
                leaveLoseBtn.alpha = .8;
                
                leaveLoseBtn.onInputOver.add(overRest, this);
                leaveLoseBtn.onInputOut.add(outRest, this);
                leaveLoseBtn.onInputDown.add(downRest, this);
                leaveLoseBtn.onInputUp.add(upRest, this);
                
                loseGroup.add(leaveLoseBtn);
                
                
                
                var t3;
                t3 = new Phaser.Text(game, 389, 485, "", { font: "26px Arial", fill: "#999", align: "center" });
                t3.anchor.x = .5;
                t3.text = "Restart";
                game.add.existing(t3);
                leaveRestBtn.addChild(t3);
                loseGroup.add(t3);
                
                
                loseGroup.y = -581;
                
                genEnemies(roundNum);
            };
            this.update = function(){
 
                battleDone = true;
                
                if(gameOver && loseGroup.y != -1){
                    loseGroup.y += 20;
                    leaveLoseBtn.input.enabled = false;
                }
                else if(gameOver && loseGroup.y == -1){
                    battleGroup.alpha = 0;
                    leaveLoseBtn.input.enabled = true;
                }
                else if(gameOver == false && loseGroup.y > -581){
                    loseGroup.y -= 20;
                    leaveLoseBtn.input.enabled = false;
                }

                for(var i = enemies.length - 1; i >= 0; i--){
                    enemies[i].update();
                    
                    if(enemies[i].dead != true){
                        battleDone = false;
                    }
                }
                
                player.update();
                
                healthBar.scale.x = (player.health/player.maxHealth);
                
                // in rest state
                if(state == 1){
                    battleGroup.alpha = 0;
                    restGroup.alpha = 1;
                    
                    leaveBattleBtn.input.enabled = false;
                    leaveRestBtn.input.enabled = true;
                    
                    hpText.text = "Health:             " + player.maxHealth;
                    atkText.text = "Attack:             " + player.atk;
                    defText.text = "Defense:          " + player.def;
                    spdText.text = "Speed:             " + player.spd;
                    expText.text = "Experience:     " + player.exp;
                    
                }else if(state == 0){
                    battleGroup.alpha = 1;
                    restGroup.alpha = 0;
                    
                    t2.alpha = leaveBattleBtn.alpha;
                    
                    if(battleDone && leaveBattleBtn.alpha < .8 && gameOver != true){

                        enemies.splice(0, enemies.length);
  
                        leaveBattleBtn.alpha = .8;
                        leaveBattleBtn.angle = 0;
                        leaveBattleBtn.input.enabled = true;
                        
                        battleDone = false;
                    }
                }
                
            };
            this.render = function(){
            };                   
        }
        
        game.state.add("Main", main);
        game.state.start("Main");
    
        
        // handles clicks from buttons in the battle group
        // return null
        function actionOnClick(button){
   
            if(button.alpha == 1){
                var n = button.name.split(" ");
                
                if(button.name == "toRest"){
                    state = 1;
                    button.alpha = 0;
                    button.angle = 0;
                    button.input.enabled = false;
                    leaveRestBtn.alpha = .8;
                    player.health = player.maxHealth;
                    for(var i = restBtns.length - 1; i >= 0; i--){
                        restBtns[i].input.enabled = true;
                    }
                    
                    selRest.x = -2000;
                    selRest.y = -2000;
                }
                
                if(button.name == "atk"){
                    attacking = 1;
                    selBattle.x = -2000;
                    selBattle.y = -2000;
                }
    
                if(n[0] == "mon"){
                    target = n[1];
                    attacking = 2;
                    
                    selBattle.x = -2000;
                    selBattle.y = -2000;
                    
                }
                
                if(player.health > 0){
                    button.angle = button.angle - 5;
                }
            }
        }
    
        // handles mouse releases from buttons in the battle group
        // return null
        function up(button) {
        }
        // handles mouse down presses from buttons in the battle group
        // return null
        function down(button) {
            if(button.alpha == 1){
                button.angle = button.angle + 5;
            }
        }
        // handles mouse over from buttons in the battle group
        // return null
        function over(button) {
            
            
            if(button.alpha >= .8 && attacking != 2){
                if(attacking == 1 && button.name != "atk" || attacking == 0){
                    if(button.name != "toRest")
                    {
                        selBattle.x = button.x;
                        selBattle.y = button.y;
                    }
                    
                    button.alpha = 1;
                }
            }
            else{
                selBattle.x = -2000;
                selBattle.y = -2000;
            }
            
        }

        // handles mouse leaving from buttons in the battle group
        // return null
        function out(button) {
            button.alpha = .8;
            selBattle.x = -2000;
            selBattle.y = -2000;
        }
    // -----------------------------------------------------------------------------------
    
        // handles mouse click from buttons in the rest group
        // return null
        function actionOnClickRest(button){
   
            if(button.name == "toBattle" && state == 1){
                button.angle = 0;
                state = 0;
                leaveBattleBtn.input.enabled = false;
                leaveBattleBtn.alpha = 0;
                button.input.enabled = false;
                attacking = 0;
                
                for(var i = restBtns.length - 1; i >= 0; i--){
                    restBtns[i].input.enabled = false;
                }
                
                roundCount++;
                roundNum += (10 + 10 * (roundCount/2));
                
                points.text = "Round: " + roundCount;
                genEnemies(roundNum);
            }
            else if(button.name == "restart"){
                player.reset();
                
                
                state = 1;
                button.angle = 0;
                //button.input.enabled = false;
                leaveRestBtn.alpha = .8;
                
                player.health = player.maxHealth;
                for(var i = restBtns.length - 1; i >= 0; i--){
                    restBtns[i].input.enabled = true;
                }
                
                roundCount = 0;
                roundNum = 10;
                points.text = "Round: " + roundCount;
                selBattle.x = -2000;
                selBattle.y = -2000;
                selRest.x = -2000;
                selRest.y = -2000;
                
                gameOver = false;
            }
            else{
                
                if(player.exp > 0){
                    if(button.name == "plus0" && player.exp >= player.health/5){
                        player.exp -= player.health/5;
                        player.maxHealth += 5;
                        player.health = player.maxHealth;
                    }
                    else if(button.name == "plus1" && player.exp >= player.atk){
                        player.exp -= player.atk;
                        player.atk++;
                    }
                    else if(button.name == "plus2" && player.exp >= player.def){
                        player.exp -= player.def;
                        player.def++;
                    }
                    else if(button.name == "plus3" && player.exp >= player.spd){
                        player.exp -= player.spd;
                        player.spd++;
                    }
                }
                expText.text = "Experience:     " + player.exp;
                button.angle = button.angle - 5;
            }
        }
    
        // handles mouse release from buttons in the rest group
        // return null
        function upRest(button) {
        }
    
        // handles mouse down from buttons in the rest group
        // return null
        function downRest(button) {
            if(button.alpha == 1){
                button.angle = button.angle + 5;
            }
        }
    
        // handles mouse over from buttons in the rest group
        // return null
        function overRest(button) {
            
            button.alpha = 1;
            if(button.name != "toBattle" || button.name != "restart"){
                selRest.x = button.x;
                selRest.y = button.y;
            }
            else{
                selRest.x = -2000;
                selRest.y = -2000;
            }
                
        }
        
        // handles mouse leave from buttons in the rest group
        // return null
        function outRest(button) {
            button.alpha = .8;
            selRest.x = -2000;
            selRest.y = -2000;
        }
    
        // create a group of enemies
        // return null
        function genEnemies(num){
            
            for(var i = enemies.length - 1; i >= 0; i--){
                    enemies[i].remove();
            }
            
            enemies.splice(0, enemies.length);
            
            var monstCount = 0;
            
            while(num > 0 && monstCount < 3){
                
                var n;
                var monstPoints = Math.ceil(Math.random() * num);
                //console.log(monstPoints);
                
                var temp = new Enemy(monstCount, 189 + 200 * monstCount, 400 + Math.random() * 20 - 10, monstPoints);
                
                num -= monstPoints;
                
                n = Math.random() * monstPoints;
                temp.def += n;
                
                
                monstPoints -= n;
                n = Math.random() * monstPoints;
                temp.atk += n;
                
                monstPoints -= n;
                n = Math.random() * monstPoints;
                temp.health += n;
                temp.maxHealth = temp.health;
                
                monstPoints -= n;
                n = monstPoints;
                temp.spd += n;
                
                if(temp.def > temp.atk && temp.def > temp.spd && temp.def > temp.health/5)
                {
                    // white
                    temp.setColor(0xffffff);
                }
                else if(temp.atk > temp.def && temp.atk > temp.spd && temp.atk > temp.health/5)
                {
                    // blue
                    temp.setColor(0x2130bd);
                }
                else if(temp.spd > temp.def && temp.spd > temp.atk && temp.spd > temp.health/5)
                {
                    // green
                    temp.setColor(0x3bbd21);
                }
                else if(temp.health/5 > temp.def && temp.health/5 > temp.atk && temp.health/5 > temp.spd)
                {
                    // red
                    temp.setColor(0xbd2121);
                }
                
                enemies.push(temp);
                
                monstCount++;
            }
        }
    
    
    /* ------------------------------- objects ----------------------------- */
    
    // the player object
    function Player(x, y){
        
        this.health = 20;
        this.maxHealth = 20;
        this.gold = 10;
        this.exp = 100;
        this.atk = 1;
        this.def = 1;
        this.spd = 1;
        
        var obj = game.add.sprite(x, y, 'plar');
        obj.anchor = new PIXI.Point(.5, .5);
        obj.scale.x = .7;
        obj.scale.y = .7;
        battleGroup.add(obj);
        
        
        var atkBtn = game.add.button(389, y + 120, 'swrd', actionOnClick, this, 2, 1, 0);
        battleGroup.add(atkBtn);
        atkBtn.name = "atk";
        atkBtn.anchor = new PIXI.Point(.5, .5);
        atkBtn.angle = 90;
        atkBtn.scale.x = .5;
        atkBtn.scale.y = .5;
                
        atkBtn.onInputOver.add(over, this);
        atkBtn.onInputOut.add(out, this);
        atkBtn.onInputDown.add(down, this);
        atkBtn.onInputUp.add(up, this);
        
        
        
        this.update = function(){
            
            
            if(attacking == 1 || state == 1 || battleDone == true || this.health <= 0){
                atkBtn.alpha = .5;
                atkBtn.input.enabled = false;
                
                if(this.health <= 0 && gameOver == false){
                    gameOver = true;
                }
            }
            else if(attacking == 0){
                atkBtn.alpha = 1;
                atkBtn.input.enabled = true;
            }
            else if(attacking == 2){
                
                if(this.health > 0)
                {
                atkBtn.angle += 30;
                
                if(atkBtn.angle === 90){
                    
                    var f;
                    
                    if(this.spd < enemies[target].spd)
                    {
                        f = Math.random() * 10;
                    }
                    else{
                        f = 10;
                    }
                    
                    if(f > 5){
                        enemies[target].health -= player.atk; 
                    }
                    
                    attacking = 0;
                    
                    // enemmies attack back
                    for(var i = enemies.length - 1; i >= 0; i--){
                    
                        enemies[i].update();
                        if(enemies[i].dead != true){
                            
                            if(enemies[i].spd < player.spd)
                            {
                                f = Math.random() * 10;
                            }
                            else{
                                f = 10;
                            }
                            
                            if(f > 5)
                                {
                                if(enemies[i].atk > (player.def/2)){
                                    player.health -= enemies[i].atk - (player.def/2);
                                }
                                else{
                                    player.health--;
                                }
                            }
                            
                        }
                    }
                    
                }
                }
            }
        }
        
        this.reset = function(){
            this.health = 20;
            this.maxHealth = 20;
            this.gold = 10;
            this.exp = 100;
            this.atk = 1;
            this.def = 1;
            this.spd = 1;
        }
        
	}
    
    // the enemy object
    function Enemy(id, x, y, monstPoints){
        
        this.health = 10;
        this.maxHealth = 10;
        this.gold = 20;
        this.atk = 1;
        this.def = 1;
        this.spd = 1;
        this.monstPoints = monstPoints;
        this.dead = false;
        this.vy = 4;
        
        var obj = game.add.button(x, y, 'mon1', actionOnClick, this, 2, 1, 0);
        obj.name = "mon " + id;
        obj.anchor = new PIXI.Point(.5, .5);
        obj.scale.x = .9;
        obj.scale.y = .9;
        obj.alpha = .5;
        
        
        obj.onInputOver.add(over, this);
        obj.onInputOut.add(out, this);
        obj.onInputDown.add(down, this);
        obj.onInputUp.add(up, this);
        
        battleGroup.add(obj);
        
        var hp = game.add.sprite(x, y + 70, 'red');
        hp.anchor = new PIXI.Point(.5, .5);
        hp.scale.y = .15;
        battleGroup.add(hp);
        
        var name;
        name = new Phaser.Text(game, x, y + 35, player.gold, { font: "20px Arial", fill: "#999", align: "center" });
        name.anchor.x = .5;
        
        if(monstPoints < 20){
            name.text = "Monster";
        }
        else{
            name.text = sqlNameData[Math.floor(Math.random() * sqlNameData.length)] + " Monster";
        }
        battleGroup.add(name);
        
        this.update = function(){
            
            if(this.health <= 0){
                hp.scale.x = 0;
                name.alpha -= .1;
            }
            else{
                hp.scale.x = this.health/this.maxHealth;
            }
            
            if(this.health > 0 && gameOver == false){
                if(attacking == 1){
                    obj.alpha = 1;
                    obj.input.enabled = true;
                }
                else if(attacking == 0){
                    obj.alpha = .5;
                    obj.input.enabled = false;
                }
                else if(attacking == 2){
                    obj.alpha = .5;
                }
                
            }
            else if(this.health <= 0){
                if(this.dead == false && obj.y > 650){
                    this.remove();
                    this.dead = true;
                    
                    if(gameOver == false){
                        player.exp += this.monstPoints;
                    }
                }
                else{
                    obj.angle++;
                    obj.y -= this.vy;
                    this.vy -= .2;
                }
            }
        }
        
        this.remove = function(){
            obj.destroy();
            hp.destroy();
            name.destroy();
        }
        
        this.setColor = function(color){
            obj.tint = color;
        }
	}
})();