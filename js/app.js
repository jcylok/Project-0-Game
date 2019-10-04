console.log("123");

let cvs = document.getElementById("myCanvas");
let ctx = cvs.getContext("2d");

console.log(ctx);

function createImage(image_url, x_position, y_position, width, height) {
    var image = new Image();
    image.src = image_url;
    image.onload = function() {
        var context;
        ctx.drawImage( image, x_position, y_position, width, height );
    }
      
    return image;
}




let bg = "/images/space.jpg"
let player = "/images/balloon.png"
let obstacle = "/images/monster.png"
let coin = "/images/coin.png"


// canvasWidth = 450;
// canvasHeight = 600;

console.log(cvs.width)
console.log(cvs.height)
let cvsWidth = cvs.width;
let cvsHeight = cvs.height;
let playerWidth = 100;
let playerHeight = 100;
let obsWidth = 20;
let obsHeight = 4;
let coinWidth = 60;
let coinHeight = 60;
let bulletWidth = 10
let bulletLength = 30



function onkeydown(e) {
    if(e.keyCode === 39) { //right
        if (px + playerWidth > cvsWidth) {
            px = px;
        } else {
            px+=50;
        }
    } else if (e.keyCode === 37) { //left
        if (px - 10 < 0) {
            px = px;
        } else {
            px-=50;
        }       
    } else if (e.keyCode === 38) { //up
        if (py - 10 === 0) {
            py = py;
        } else {
            py-=20;
        }
        
    } else if (e.keyCode === 40) { //down
        if (py > cvsHeight - playerWidth -2) {
            py = py;
            console.log(py)
        } else {
            py+=20;
            console.log(py)
        }

    } else if (e.keyCode === 32) {
        bullet.push({
            x: px,
            y: py - 20
        })
    }
}



document.addEventListener("keydown", onkeydown);
// document.addEventListener("keydown", attack);





let px = 300
let py = 500
let obs = [];
let bullet = [];
let back = [];
let coins = [];



back[0] = {
    x: 0,
    y: 0
}

coins[0] = {
    x: 100,
    y: 0
}

obs[0] = {
    x: 50,
    y: 0
}


// bullet[0] = {
//     x: px ,
//     y: py
// }

// bullet[1] = {
//     x: px,
//     y: py + 50
// }

let score = 0;


let x = 100
let y =200


  
const drawPlayer = () => {
    ctx.beginPath();
    let player = new Image();
    player.src = "/images/spaceship.png";
    ctx.drawImage(player, px, py, playerWidth, playerHeight);
    // py+= 0.5
    ctx.closePath();
  }





function draw() {
    ctx.clearRect(0, 0, cvsWidth, cvsHeight);

    for(let i=0; i<coins.length; i++) {
        var c = coins[i];
        ctx.beginPath();
        let coinsIm = new Image();
        coinsIm.src = "/images/astronaut.png";
        ctx.drawImage(coinsIm, c.x, c.y, coinWidth, coinHeight);
        ctx.closePath();
        c.y ++
        if(c.y === 400) {
            coins.push( {
                x: Math.floor(Math.random() * cvsWidth) - 10,
                y: 0
            })
        }
        if ((px + playerWidth >= coins[i].x) && (px + playerWidth <= coins[i].x + coinWidth) && (py + playerHeight >= coins[i].y) && (py + playerHeight <= coins[i].y + coinHeight)) {
            score ++;
            coins[i] = '';
        }
        if(coins[i].y > cvsHeight) {
            coins.splice(i, 1)
        }
    }


    for(let i=0; i<obs.length; i++) {
        var o = obs[i];
        ctx.beginPath();
        let obsIm = new Image();
        obsIm.src = "/images/monster.png";
        ctx.drawImage(obsIm, o.x, o.y, 70, 70);
        ctx.closePath();
        o.y ++
        // if(o.y === 400) {
        //     obs.push( {
        //         x: Math.floor(Math.random() * cvsWidth) - 10,
        //         y: 0
        //     })
        // }

        var interval = setInterval(function() {
            obs.push( {
                x: Math.floor(Math.random() * cvsWidth) - 10,
                y: 0
            })
        }, 200000);

        clearInterval(interval)
        if(obs[i].y > cvsHeight) {
            obs.splice(i, 1)
        }
    }


    for(let i=0; i<bullet.length; i++) {
        ctx.beginPath();
        let bulletIm = new Image();
        bulletIm.src = "/images/bullet.png";
        ctx.drawImage(bulletIm, bullet[i].x, bullet[i].y, bulletWidth, bulletLength);
        ctx.closePath();
        bullet[i].y -=5
 
        if(bullet[i].y < 0) {
            bullet.splice(i, 1)
        }
    }

    for (let i=0; i<bullet.length; i++) {
        for (let j=0; j<obs.length;j++ ) {
            if ((bullet[i].x + bulletWidth >= obs[j].x) && (bullet[i].x + bulletWidth <= obs[j].x + obsWidth) && (bullet[i].y + bulletLength >= obs[j].y) && (bullet[i].y + bulletLength <= obs[j].y + obsHeight)) {
                score ++;
                obs[j] = '';
        }
    }
}

    
 
    ctx.fillStyle = "#C0C0C0";
    ctx.font = "30px Arial";
    ctx.fillText(`Score: ${score}`, 10, cvsHeight - 20);


    drawPlayer()
    // attack();
    // for (i=0; i<bullet.length; i++) {
    //     bullet[i].y -=1
    // }

    
}
setInterval(() => {
    requestAnimationFrame(draw)
    
}, 0.0000000001);

// draw()
// 

// function draw() {

    

    
    
//     requestAnimationFrame(draw)
    
    
// }  
// draw()
// setTimeout(draw, 100)
