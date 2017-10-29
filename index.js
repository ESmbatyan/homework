	const canvas = document.getElementById("canvas");
    const context = canvas.getContext("2d");
    
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height; 

    const rand = function(num) {
      return Math.floor(Math.random() * num) + 1;
    };
    const colors = ["#ECF1CA", "#F17343", "#C03210", "#711106", "#410101","#001B5D", "#000629", "#A3A3A3", "#FFD502", "#5C3709"];
    const createPoints = function(count, canvasWidth, canvasHeight) {

        const rectData = [];
        
        

        const recur = function(count){
            
                
            if (count <= 0) {
              return"";
            }

            rectData.push({
              x: rand(canvasWidth-50),
              y: rand(canvasHeight-50),
              width: 50,
              height: 50,
              xDelta:rand(5),
              yDelta:rand(5),
              color:colors[rand(10)-1], 
            })

              recur(--count);
 
        };
        
        recur(count);
        return rectData;
            };

       const point = createPoints(50,canvasWidth,canvasHeight);
        
         const draw = function(){
          
          context.fillStyle = "rgba(255,255,255,.2)";
          context.fillRect(0,0,canvasWidth,canvasHeight)
          
          const drawMult = function(rectData,index){
            
            
            
            if (index === rectData.length) {
              return;
            }
            context.fillStyle = rectData[index].color;
            context.fillRect(rectData[index].x,rectData[index].y,rectData[index].width,rectData[index].height);

            drawMult(point,++index);

          };
          drawMult(point,0);

        };

        const update = function(){
            const moveRect = function(rectData,index){

            if (index === rectData.length) {
              return;
            }

            //const colors = ["#001B5D", "#000629", "#A3A3A3", "#FFD502", "#5C3709"];

              
             rectData[index].x = rectData[index].x + rectData[index].xDelta;
             rectData[index].y = rectData[index].y + rectData[index].yDelta;
            
            if (rectData[index].x >= canvasWidth-50) {
                   
                  rectData[index].color = colors[rand(10)-1]; 
                  rectData[index].xDelta = - rectData[index].xDelta;//- rand(2)


              } else if (rectData[index].x <= 0) {

                rectData[index].color = colors[rand(10)-1];
                rectData[index].xDelta = - rectData[index].xDelta; //+ rand(2)

              }

               if (rectData[index].y >= canvasHeight-50) {

                 rectData[index].color = colors[rand(10)-1];
                 rectData[index].yDelta = - rectData[index].yDelta; //- rand(2)

              } else if (rectData[index].y <= 0) {

                rectData[index].color = colors[rand(10)-1];
                rectData[index].yDelta = - rectData[index].yDelta; //+ rand(2)

              }


            moveRect(point,++index);

          };
          moveRect(point,0);

        };

        const loop = function(){
          draw();
          update();

          requestAnimationFrame(loop);

        };
        debugger;
        loop();