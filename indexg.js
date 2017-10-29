	const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height; 


    const backgroundImg = new Image(); 

    backgroundImg.src = 'https://static.gamespot.com/uploads/original/949/9490474/2386168-_mg_7306.jpg';

   
    const heroImg = new Image(); 

    heroImg.src = 'https://s-media-cache-ak0.pinimg.com/originals/39/78/f8/3978f82cbad6dae127728669250ddedc.jpg';

    const badGuyImg = new Image(); 

    badGuyImg.src = 'http://www.halopedia.org/images/2/2a/Elite_minor_render.png';


    const floorY = canvasHeight-150;
    

    const gameData = {

    	hero:{
    		x:10,
    		y: canvasHeight-150,
    		img: heroImg,
    		width:120,
    		height:150,
    		xDelta:0,
    		yDelta:0,


    	},
    	badGuys:[{

    		x:600,
    		y:canvasHeight-150,
    		img: badGuyImg,
    		width: 120,
    		height:150,
    		xDelta:1,
    		yDelta:1,
    	}]

    };


	const maxJumpHeight = floorY - (gameData.hero.height*2);

    const draw = function(){

    	const hero = gameData.hero;
		ctx.drawImage(backgroundImg, 0, 0, canvas.width, canvas.height);
		ctx.drawImage(hero.img, hero.x, hero.y, hero.width,hero.height);
		const badGuy = gameData.badGuys[0];
    	ctx.drawImage(badGuy.img, badGuy.x, badGuy.y, badGuy.width,badGuy.height);
    	
    };


    const update = function(){
    	const hero = gameData.hero;
    	
    	if (hero.x >= gameData.badGuys[0].x-100 && hero.x <= gameData.badGuys[0].x+100 && hero.y > gameData.badGuys[0].y-gameData.badGuys[0].height ) {
		
    	ctx.fillStyle = "black";
    	ctx.fillRect(0,0,canvas.width,canvas.height);

    	}

    	if (hero.yDelta !== 0) {

    		hero.y = hero.y - hero.yDelta;

    		if (hero.y <= canvas.height - floorY - maxJumpHeight) {

    			hero.yDelta = (-hero.yDelta);

    		}else if (hero.y >= floorY) {
    			hero.y = floorY;
    			hero.yDelta = 0;
    		}
    	}


    	const badGuy = gameData.badGuys[0];



    };

    const loop = function(){

    	draw();

    	update();

    	requestAnimationFrame(loop);
    }

    loop();

    const leftKey = 37;
	const upKey = 38;
	const rightKey = 39;
	const downKey = 40;

	document.addEventListener('keydown', function(event) {

		const hero = gameData.hero;
		if(event.keyCode === rightKey) {


        	hero.x = hero.x + 15;
        	if (hero.x >= canvasWidth-hero.width) {
        		hero.x = 0;
        	}
  		}else if (event.keyCode === leftKey) {


  			hero.x = hero.x - 15;
  			if (hero.x <= 0) {

  				hero.x = canvas.width - hero.width;
  				}
  			}else if (event.keyCode === upKey) {

  					if (hero.yDelta === 0) {

  						hero.yDelta = 3;
  						hero.y = hero.y - hero.yDelta;
  					}

  			}
	}, false);