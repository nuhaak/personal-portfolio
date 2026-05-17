//i am selecting the <canvas> element and getting its drawing tool (the 2d context), in which im going to draw shapes and color it. 
const canvas= document.getElementById('starry-sky');
const ctx= canvas.getContext('2d');

let stars= []; //an empty array that is holding the information about each stars
                // (position, size, opacity etc.)


function resizeCanvas(){  //resizing the canvas to fit the window
    canvas.width= window.innerWidth;
    canvas.height= window.innerHeight;
    createStars(); //to regenerate the stars that will fit the canvas size
}

function createStars(){
    stars= []; //clearing the old stars
    for(let i=0; i<200; i++) {
    stars.push({
        x:Math.random() * canvas.width, // creating random stars horizonatlly
        y:Math.random() * canvas.height, //creating random stars vertically
        radius: Math.random() * 1.5, //random size of the stars up till 1.5px
        opacity: Math.random(), //random opacity b/w  0-1
        delta: Math.random() * 0.2 + 0.05 //how fast the stars will twinkle
            /* 'delta' lets us increase or decrease the opacity slightly in wach frame,
            creating a twinkling effect */
    });
}
}



function drawStars(){ 
    //clear the previous frame
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //fill the background in one color- black
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    //loop through each star
    stars.forEach(star => {

        //changing the stars opacity slightly
        star.opacity += star.delta;

        //reverse the direction if the star gets too dim or too bright
        if(star.opacity <= 0 || star.opacity >=1){
            star.delta = -star.delta;
        }

        //now drawing the star as a white circle with current opacity
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI*2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.fill();
    })
    
}

function animate(){
    drawStars(); //draw current frame
    requestAnimationFrame(animate); //schedule next frame
}

window.addEventListener('resize', resizeCanvas); //listens for when the user resizes the browser window

//initialize everything on page load
resizeCanvas(); //set intial canvas size and stars
animate(); //start animation loop
drawStars();
