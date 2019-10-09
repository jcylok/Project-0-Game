$("#container").hide();
$("#choose1").hide();
$("#choose2").hide();
$("#play").hide();
$("#play2").hide();
$(".finishScreen").hide();
$(".shipOption2").show();

$('#one').on('click',function() {
    $(this).prop("disabled",true);
    $('#two').prop("disabled",false);
});
$('#two').on('click',function() {
    $(this).prop("disabled",true);
    $('#one').prop("disabled",false);
});

$('#one').click( function() {
    $("#choose1").show();
    $("#choose2").hide();
})

$('#two').click( function() {
    $("#choose2").show();
    $("#choose1").hide();
})

$('#restart').on('click',function() {
    location.reload();
});

let previous=0;
let previous1=0;

$('.shipOption').click(function(){   // Codes reference: http://jsfiddle.net/Zword/QzM6m/
    let s = $(this).attr('id');
    $('#'+s).animate({'width':'100px', 'height':'100px'});
    $('#'+s).css({'cursor':'zoom-out'});
    if($('#'+previous).width()!=70)
    {
    $('#'+previous).animate({'width':'70px', 'height':'70px'});
    $('#'+previous).css({'cursor':'zoom-in'});
    }
    previous=s;
});

$('.shipOption1').click(function(){
    let s = $(this).attr('id');
    $('#'+s).animate({'width':'100px', 'height':'100px'});
    $('#'+s).css({'cursor':'zoom-out'});
    if($('#'+previous).width()!=70)
    {
    $('#'+previous).animate({'width':'70px', 'height':'70px'});
    $('#'+previous).css({'cursor':'zoom-in'});
    }
    previous=s;
});

$('.shipOption2').click(function(){
    let t = $(this).attr('id');
    $('#'+t).animate({'width':'100px', 'height':'100px'});
    $('#'+t).css({'cursor':'zoom-out'});
    if($('#'+previous1).width()!=70)
    {
    $('#'+previous1).animate({'width':'70px', 'height':'70px'});
    $('#'+previous1).css({'cursor':'zoom-in'});
    }
    previous1=t;
});


$('.shipOption').click(function(){
    $("#play2").hide();
    $("#play").show();
    $('#play').attr('selectedItem', $(this).attr('id'))
});


$('.shipOption1').click(function(){
    $("#play").hide();
    $(".shipOption2").show();
    $('#play2').attr('selectedItem1', $(this).attr('id'))
});

$('.shipOption2').click(function(){
    $("#play").hide();
    $("#play2").show();
    $('#play2').attr('selectedItem2', $(this).attr('id'))
});

const themeAudio = document.getElementById("theme");
themeAudio.volume = 0.7;
const shootAudio = document.getElementById("shoot");
shootAudio.volume = 0.3;
const coinAudio = document.getElementById("coin");
coinAudio.volume = 1;
const explosionAudio = document.getElementById("explosion");
explosionAudio.volume = 0.3;

let cvs = document.getElementById("myCanvas");
let ctx = cvs.getContext("2d");

$("#play").click(function () {
    $("#menu").hide();
    $("#container").show();
    singlePlayer();
});

$("#play2").click(function () {
    $("#menu").hide();
    $("#container").show();
    doublePlayer();
});


let cvsWidth = cvs.width;
let cvsHeight = cvs.height;
let playerWidth = 80;
let playerHeight = 80;
let obsWidth = 70;
let obsHeight = 80;
let satelliteWidth = 80;
let satelliteHeight = 70;
let satellite2Width = 80;
let satellite2Height = 70;
let bulletWidth = 30
let bulletHeight = 50
let coinWidth = 30
let coinHeight = 30
let explosionWidth = 60;
let explosionHeight = 60;
let astronautWidth = 100;
let astronautHeight = 100;

function onkeydown(e) {
    if(e.keyCode === 39) { //right
        if (px + playerWidth > cvsWidth - 10 ) {
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
        } else {
            py+=20;
        }

    } else if (e.keyCode === 32) {
        if (bullet.length < 10) {
            bullet.push({
                x: px,
                y: py - 20
            })
            shootAudio.play();
            
        }
     // player 2
    } else if (e.keyCode === 68) { //right
        if (px2 + playerWidth > cvsWidth - 10) {
            px2 = px2;
        } else {
            px2+=50;
        }
    } else if (e.keyCode === 65) { //left
        if (px2 - 10 < 0) {
            px2 = px2;
        } else {
            px2-=50;
        }       
    } else if (e.keyCode === 87) { //up
        if (py2 - 10 === 0) {
            py2 = py2;
        } else {
            py2-=20;
        }
        
    } else if (e.keyCode === 88) { //down
        if (py2 > cvsHeight - playerWidth -2) {
            py2 = py2;
        } else {
            py2+=20;
        }

    } else if (e.keyCode === 16) {
        if (bullet2.length < 10) {
            bullet2.push({
                x: px2,
                y: py2 - 20
            })
            shootAudio.play();           
        }
    }
}


document.addEventListener("keydown", onkeydown);

let px = 300;
let py = 700;
let px2 = 600;
let py2 = 700;
let lives = 5;
let lives2 = 5;
let score = 0;
let score2 = 0;
let obs = [];
let bullet = [];
let bullet2 = [];
let satellite = [];
let satellite2 = [];
let hit = [];
let collected = [];
let explosion = [];
let astronaut = [];



satellite[0] = {
    x: 0,
    y: Math.floor(Math.random() * (cvsHeight - 40))
}
satellite2[0] = {
    x: cvsWidth,
    y: Math.floor(Math.random() * (cvsHeight - 40))
}

obs[0] = {
    x: Math.floor(Math.random() * cvsWidth) - 10,
    y: 0
}
obs[1] = {
    x: Math.floor(Math.random() * cvsWidth) - 10,
    y: 0
}

hit[0] = {
    x: 0,
    y: cvsHeight
}

bullet[0] = {
    x: 0,
    y: 0
}

let x = 100
let y = 200


const drawPlayer = (imagePath, px, py) => {
    ctx.beginPath();
    let player = new Image();
    player.src = imagePath;
    ctx.drawImage(player, px, py, playerWidth, playerHeight);
    // if (py <= cvsHeight - playerHeight) {
    //     py += 2;
    // } 
    ctx.closePath();
  }

function endGame() {
    $("#container").hide();
    $(".startScreen").hide();
    $("#play").hide();
    $("#play2").hide();
    $("#menu").show();
    $(".finishScreen").show();
    $("#score2").text(`${score}`);
}

function endGame2() {
    $("#container").hide();
    $(".startScreen").hide();
    $("#play").hide();
    $("#play2").hide();
    $("#menu").show();
    $(".finishScreen").show();
    $("#score1").text(`Player 1's score was: ${score}`)
    $("#score2").text(`Player 2's score was: ${score2}`)
}

// Single Player

const singlePlayer = function() {

    let selected = document.getElementById("play").getAttribute("selectedItem");
    let imagepath;
    if (selected === "1p1s1") {
        imagepath = "../images/spaceship.png"
    } else if (selected === "1p1s2") {
        imagepath = "../images/spaceship2.png"
    } else if (selected === "1p1s3") {
        imagepath = "../images/spaceship3.png"
    } else if (selected === "1p1s4") {
        imagepath = "../images/spaceship4.png"
    }
    themeAudio.play();   
    ctx.clearRect(0, 0, cvsWidth, cvsHeight);

    for(let i=0; i<satellite.length; i++) {
        ctx.beginPath();
        let satelliteIm = new Image();
        satelliteIm.src = "../images/satellite2.png";
        ctx.drawImage(satelliteIm, satellite[i].x, satellite[i].y, satelliteWidth, satelliteHeight);
        ctx.closePath();
        satellite[i].x += 0.1
        if(satellite[i].x === 688.700000000088) {
            satellite.push( {
                x: 0,
                y: Math.floor(Math.random() * (cvsHeight - 40))
            })
        }
        if(satellite[i].x > cvsWidth) {
            satellite.splice(i, 1)
        }
    }

    for(let i=0; i<satellite2.length; i++) {
        ctx.beginPath();
        let satellite2Im = new Image();
        satellite2Im.src = "../images/satellite.png";
        ctx.drawImage(satellite2Im, satellite2[i].x, satellite2[i].y, satellite2Width, satellite2Height);
        ctx.closePath();
        satellite2[i].x -= 0.1
        console.log(satellite2[i].x)
        if(satellite2[i].x === 500 ) {
            satellite2.push( {
                x: 0,
                y: Math.floor(Math.random() * (cvsHeight - 40)) 
            })
        }
        if(satellite2[i].x < 0) {
            satellite2.splice(i, 1)
        }
    }

    for(let i=0; i<obs.length; i++) {
        ctx.beginPath();
        let obsIm = new Image();
        obsIm.src = "../images/enemy.png";
        ctx.drawImage(obsIm, obs[i].x, obs[i].y, obsWidth, obsHeight);
        ctx.closePath();

        if (i % 2 === 0) {
            obs[i].y += 4;
        } else {
            obs[i].y += 7;
        }

        if( obs.length < 5) {
                obs.push( {
                    x: Math.floor(Math.random() * cvsWidth) - 10,
                    y: 0
                })
        }
        if(obs[i].y > cvsHeight) {
            obs.splice(i, 1);
        }
        // check collision
        if ((px + playerWidth/2 >= obs[i].x - 10) && (px + playerWidth/2 <= obs[i].x + obsWidth + 10) && (py + playerHeight/2 >= obs[i].y - 5) && (py + playerHeight/2 <= obs[i].y + obsHeight + 5)) {
            lives --;
            explosionAudio.play();
            console.log(lives);
            let explosionX = obs[i].x;
            let explosionY = obs[i].y;
            explosion.push({
                x: explosionX + obsWidth/3,
                y: explosionY
            })
            obs.splice(i,1);
        }
    }
    
    // create explosion
    for(let i=0; i<explosion.length; i++) {
        ctx.beginPath();
        let explosionIm = new Image();
        explosionIm.src = "../images/explosion.png";
        ctx.drawImage(explosionIm, explosion[i].x, explosion[i].y, explosionWidth, explosionHeight);
        ctx.closePath();
        explosion[i].y += 0.6
        if(explosion[i].y === cvsHeight || explosion[i].y === py || explosion[i].y === py + 1) {
            // if (obs.length + hit.length + explosion.length + collected.length <= 5) {
                obs.push( {
                    x: Math.floor(Math.random() * cvsWidth) - 10,
                    y: 0
                })
            // }
        }

        if(explosion[i].y > cvsHeight) {
            explosion.splice(i, 1)
        }

    }
    
    // change obstacle to coin when hit
    if (hit.length != 0) {
    for(let i=0; i<hit.length; i++) {
        ctx.beginPath();
        let hitIm = new Image();
        hitIm.src = "../images/coin.png";
        ctx.drawImage(hitIm, hit[i].x, hit[i].y, 30, 30);
        ctx.closePath();
        hit[i].y += 12;
        if(hit[i].y === cvsHeight || hit[i].y === py || hit[i].y === py + 1) {
            if (obs.length + hit.length + explosion.length <= 8) {
                obs.push( {
                    x: Math.floor(Math.random() * cvsWidth) - 10,
                    y: 0
                })
            }
        }
 
        let hitX = hit[i].x;
        let hitY = hit[i].y;
        // let indexRemove = i;

        // make coin disappear when player collected
        if ((px + playerWidth/2 >= hitX - 10) && (px + playerWidth/2 <= hitX + coinWidth + 10) && (py + playerHeight/2 >= hitY - 10) && (py + playerHeight/2 <= hitY + coinHeight + 10) && hitY > 0) {
            score ++;   
            coinAudio.play();
            disappearX = hit[i].x;
            disappearY = hit[i].y;
            collected.push({
                x: disappearX,
                y: disappearY
            })
            hit.splice(i,1)

        }
        if(hitY > cvsHeight) {
            hit.splice(i, 1)
        }
        
    }
    }

    for(let i=0; i<collected.length; i++) {
        ctx.beginPath();
        let collectedIm = new Image();
        collectedIm.src = "../images/coin.png";
        ctx.drawImage(collectedIm, px, py + 100, 1, 1);
        ctx.closePath();
        collected[i].y -=10

        if (collected[i].y > cvsHeight) {
            collected.splice(i, 1);
        }
    }

    for(let i=0; i<bullet.length; i++) {
        ctx.beginPath();         
        let bulletIm = new Image();
        bulletIm.src = "../images/bullet.png";
        ctx.drawImage(bulletIm, bullet[i].x + playerWidth/2.5, bullet[i].y, bulletWidth, bulletHeight);
        ctx.closePath();
        bullet[i].y -=10
         
        if(bullet[i].y <= 0) {
            bullet.splice(i, 1);
        }
    }

    
    for (let i=0; i<bullet.length; i++) {
        let buX = bullet[i].x;
        let buY = bullet[i].y;
        for (let j=0; j<obs.length;j++ ) {
            let obX = obs[j].x;
            let obY = obs[j].y;
            if (( buX + bulletWidth >= obX - 20) && ( buX + bulletWidth <= obX + obsWidth + 20) && (buY + bulletHeight >= obY - 20) && (buY + bulletHeight <= obY + obsHeight + 20) && (buY > 0)) {
                hitX = obs[j].x;
                hitY = obs[j].y;
                hit.push({
                    x: hitX + obsWidth/3,
                    y: hitY
                })
                bullet.splice(i,1);
                obs.splice(j,1); 
            }
        }

    }

     
    if (lives === 1 && astronaut.length === 0) {
        astronaut.push({
            x: Math.floor(Math.random() * cvsWidth) - 10,
            y: cvsHeight
        })
    }

    for (let i=0; i<astronaut.length; i++) {
        ctx.beginPath();         
        let astronautIm = new Image();
        astronautIm.src = "../images/astronaut.png";
        ctx.drawImage(astronautIm, astronaut[i].x, astronaut[i].y, astronautWidth, astronautHeight);
        ctx.closePath();
        astronaut[i].y --;
        
        if ((px + playerWidth/2 >= astronaut[i].x - 10) && (px + playerWidth/2 <= astronaut[i].x + astronautWidth + 10) && (py + playerHeight/2 >= astronaut[i].y - 10) && (py + playerHeight/2 <= astronaut[i].y + astronautHeight + 10) && astronaut[i].y > 0) {
            lives ++;   
            coinAudio.play();
            let disappearX = astronaut[i].x;
            let disappearY = astronaut[i].y;
            collected.push({
                x: disappearX,
                y: disappearY
            })
            astronaut.splice(i,1)

        } else if (astronaut[i].y < 0) {
                astronaut.splice(i, 1);
            }
    }


    ctx.fillStyle = "#C0C0C0";
    ctx.font = "30px Arial";
    ctx.fillText(`❤️ Lives: ${lives}`, 10, cvsHeight - 60);
    
 
    ctx.fillStyle = "#C0C0C0";
    ctx.font = "30px Arial";
    ctx.fillText(`💰 Score: ${score}`, 10, cvsHeight - 20);

    drawPlayer(imagepath, px, py)
    // gravity for player
    if (py <= cvsHeight - playerHeight) {
        py += 1;
    } 

    if (lives === 0) {
        return endGame() ;           
    }

  requestAnimationFrame(singlePlayer);   
}
   
// Double Players

const doublePlayer = function() {

    let selected = document.getElementById("play2").getAttribute("selectedItem1");
    let imagepath;
    if (selected === "2p1s1") {
        imagepath = "../images/spaceship.png"
    } else if (selected === "2p1s2") {
        imagepath = "../images/spaceship2.png"
    } else if (selected === "2p1s3") {
        imagepath = "../images/spaceship3.png"
    }

    let selected2 = document.getElementById("play2").getAttribute("selectedItem2");
    let imagepath2;
    if (selected2 === "2p2s1") {
        imagepath2 = "../images/spaceship.png"
    } else if (selected2 === "2p2s2") {
        imagepath2 = "../images/spaceship2.png"
    } else if (selected2 === "2p2s3") {
        imagepath2 = "../images/spaceship3.png"
    }


    themeAudio.play();   
    ctx.clearRect(0, 0, cvsWidth, cvsHeight);

    for(let i=0; i<satellite.length; i++) {
        ctx.beginPath();
        let satelliteIm = new Image();
        satelliteIm.src = "../images/satellite2.png";
        ctx.drawImage(satelliteIm, satellite[i].x, satellite[i].y, satelliteWidth, satelliteHeight);
        ctx.closePath();
        satellite[i].x += 0.1
        if(satellite[i].x === 688.700000000088) {
            satellite.push( {
                x: 0,
                y: Math.floor(Math.random() * (cvsHeight - 40))
            })
        }
        if(satellite[i].x > cvsWidth) {
            satellite.splice(i, 1)
        }
    }

    for(let i=0; i<satellite2.length; i++) {
        ctx.beginPath();
        let satellite2Im = new Image();
        satellite2Im.src = "../images/satellite.png";
        ctx.drawImage(satellite2Im, satellite2[i].x, satellite2[i].y, satellite2Width, satellite2Height);
        ctx.closePath();
        satellite2[i].x -= 0.1
        console.log(satellite2[i].x)
        if(satellite2[i].x === 221.1999999998374 ) {
            satellite2.push( {
                x: 0,
                y: Math.floor(Math.random() * (cvsHeight - 40))
            })
        }
        if(satellite2[i].x < 0) {
            satellite2.splice(i, 1)
        }
    }

    for(let i=0; i<obs.length; i++) {
        ctx.beginPath();
        let obsIm = new Image();
        obsIm.src = "../images/enemy.png";
        ctx.drawImage(obsIm, obs[i].x, obs[i].y, obsWidth, obsHeight);
        ctx.closePath();

        if (i % 2 === 0) {
            obs[i].y += 4;
        } else {
            obs[i].y += 7;
        }

        if( obs.length < 5) {
                obs.push( {
                    x: Math.floor(Math.random() * cvsWidth) - 10,
                    y: 0
                })
        }
        if(obs[i].y > cvsHeight) {
            obs.splice(i, 1);
        }
        // check collision
        if ((px + playerWidth/2 >= obs[i].x - 10) && (px + playerWidth/2 <= obs[i].x + obsWidth + 10) && (py + playerHeight/2 >= obs[i].y - 5) && (py + playerHeight/2 <= obs[i].y + obsHeight + 5)) {
            lives --;
            explosionAudio.play();
            console.log(lives);
            let explosionX = obs[i].x;
            let explosionY = obs[i].y;
            explosion.push({
                x: explosionX + obsWidth/3,
                y: explosionY
            })
            obs.splice(i,1);
        } else if ((px2 + playerWidth/2 >= obs[i].x - 10) && (px2 + playerWidth/2 <= obs[i].x + obsWidth + 10) && (py2 + playerHeight/2 >= obs[i].y - 5) && (py2 + playerHeight/2 <= obs[i].y + obsHeight + 5)) {
            lives2 --;
            explosionAudio.play();
            console.log(lives);
            let explosionX = obs[i].x;
            let explosionY = obs[i].y;
            explosion.push({
                x: explosionX + obsWidth/3,
                y: explosionY
            })
            obs.splice(i,1);
        }
    }
    
    // create explosion
    for(let i=0; i<explosion.length; i++) {
        ctx.beginPath();
        let explosionIm = new Image();
        explosionIm.src = "../images/explosion.png";
        ctx.drawImage(explosionIm, explosion[i].x, explosion[i].y, explosionWidth, explosionHeight);
        ctx.closePath();
        explosion[i].y += 0.6
        if (explosion[i].y === cvsHeight || explosion[i].y === py || explosion[i].y === py + 1) {
                obs.push( {
                    x: Math.floor(Math.random() * cvsWidth) - 10,
                    y: 0
                })
        }

        if(explosion[i].y > cvsHeight) {
            explosion.splice(i, 1)
        }

    }
    
    // change obstacle to coin when hit
    if (hit.length != 0) {
    for(let i=0; i<hit.length; i++) {

        ctx.beginPath();
        let hitIm = new Image();
        hitIm.src = "../images/coin.png";
        ctx.drawImage(hitIm, hit[i].x, hit[i].y, 30, 30);
        ctx.closePath();
        hit[i].y += 12;
        if (hit[i].y === cvsHeight || hit[i].y === py || hit[i].y === py + 1) {
            if (obs.length + hit.length + explosion.length <= 8) {
                obs.push( {
                    x: Math.floor(Math.random() * cvsWidth) - 10,
                    y: 0
                })
            }
        } else if (hit[i].y === cvsHeight || hit[i].y === py2 || hit[i].y === py2 + 1) {
            if (obs.length + hit.length + explosion.length <= 8) {
                obs.push( {
                    x: Math.floor(Math.random() * cvsWidth) - 10,
                    y: 0
                })
            }
        }
 
        let hitX = hit[i].x;
        let hitY = hit[i].y;

        // make coin disappear when player collected
        if ((px + playerWidth/2 >= hitX - 10) && (px + playerWidth/2 <= hitX + coinWidth + 10) && (py + playerHeight/2 >= hitY - 10) && (py + playerHeight/2 <= hitY + coinHeight + 10) && hitY > 0) {
            score ++;   
            coinAudio.play();
            disappearX = hit[i].x;
            disappearY = hit[i].y;
            collected.push({
                x: disappearX,
                y: disappearY
            })
            hit.splice(i,1)

        } else if ((px2 + playerWidth/2 >= hitX - 10) && (px2 + playerWidth/2 <= hitX + coinWidth + 10) && (py2 + playerHeight/2 >= hitY - 10) && (py2 + playerHeight/2 <= hitY + coinHeight + 10) && hitY > 0) {
            score2 ++;   
            coinAudio.play();
            disappearX = hit[i].x;
            disappearY = hit[i].y;
            collected.push({
                x: disappearX,
                y: disappearY
            })
            hit.splice(i,1)
        }

        if (hitY > cvsHeight) {
            hit.splice(i, 1)
        }
        
    }
    }

    for(let i=0; i<collected.length; i++) {
        ctx.beginPath();
        let collectedIm = new Image();
        collectedIm.src = "../images/coin.png";
        ctx.drawImage(collectedIm, px, py + 100, 1, 1);
        ctx.closePath();
        collected[i].y -=10

        if (collected[i].y > cvsHeight) {
            collected.splice(i, 1);
        }
    }

    for(let i=0; i<bullet.length; i++) {
        ctx.beginPath();         
        let bulletIm = new Image();
        bulletIm.src = "../images/bullet.png";
        ctx.drawImage(bulletIm, bullet[i].x + playerWidth/2.5, bullet[i].y, bulletWidth, bulletHeight);
        ctx.closePath();
        bullet[i].y -=10
         
        if(bullet[i].y <= 0) {
            bullet.splice(i, 1);
        }
    }

    for(let i=0; i<bullet2.length; i++) {
        ctx.beginPath();         
        let bullet2Im = new Image();
        bullet2Im.src = "../images/bullet.png";
        ctx.drawImage(bullet2Im, bullet2[i].x + playerWidth/2.5, bullet2[i].y, bulletWidth, bulletHeight);
        ctx.closePath();
        bullet2[i].y -=10
         
        if(bullet2[i].y <= 0) {
            bullet2.splice(i, 1);
        }
    }

    
    for (let i=0; i<bullet.length; i++) {
        let buX = bullet[i].x;
        let buY = bullet[i].y;
        for (let j=0; j<obs.length;j++ ) {
            let obX = obs[j].x;
            let obY = obs[j].y;
            if (( buX + bulletWidth >= obX - 20) && ( buX + bulletWidth <= obX + obsWidth + 20) && (buY + bulletHeight >= obY - 20) && (buY + bulletHeight <= obY + obsHeight + 20) && (buY > 0)) {
                hitX = obs[j].x;
                hitY = obs[j].y;
                hit.push({
                    x: hitX + obsWidth/3,
                    y: hitY
                })
                bullet.splice(i,1);
                obs.splice(j,1); 
            }
        }

    }

    for (let i=0; i<bullet2.length; i++) {
        let buX = bullet2[i].x;
        let buY = bullet2[i].y;
        for (let j=0; j<obs.length;j++ ) {
            let obX = obs[j].x;
            let obY = obs[j].y;
            if (( buX + bulletWidth >= obX - 20) && ( buX + bulletWidth <= obX + obsWidth + 20) && (buY + bulletHeight >= obY - 20) && (buY + bulletHeight <= obY + obsHeight + 20) && (buY > 0)) {
                hitX = obs[j].x;
                hitY = obs[j].y;
                hit.push({
                    x: hitX + obsWidth/3,
                    y: hitY
                })
                bullet2.splice(i,1);
                obs.splice(j,1); 
            }
        }

    }

     
    if ((lives === 1 || lives2 === 1) && astronaut.length === 0) {
        astronaut.push({
            x: Math.floor(Math.random() * cvsWidth) - 10,
            y: cvsHeight
        })
    }

    for (let i=0; i<astronaut.length; i++) {
        ctx.beginPath();         
        let astronautIm = new Image();
        astronautIm.src = "../images/astronaut.png";
        ctx.drawImage(astronautIm, astronaut[i].x, astronaut[i].y, astronautWidth, astronautHeight);
        ctx.closePath();
        astronaut[i].y --;
        
        if ((px + playerWidth/2 >= astronaut[i].x - 10) && (px + playerWidth/2 <= astronaut[i].x + astronautWidth + 10) && (py + playerHeight/2 >= astronaut[i].y - 10) && (py + playerHeight/2 <= astronaut[i].y + astronautHeight + 10) && astronaut[i].y > 0) {
            lives ++;   
            coinAudio.play();
            let disappearX = astronaut[i].x;
            let disappearY = astronaut[i].y;
            collected.push({
                x: disappearX,
                y: disappearY
            })
            astronaut.splice(i,1)

        } else if ((px2 + playerWidth/2 >= astronaut[i].x - 10) && (px2 + playerWidth/2 <= astronaut[i].x + astronautWidth + 10) && (py2 + playerHeight/2 >= astronaut[i].y - 10) && (py2 + playerHeight/2 <= astronaut[i].y + astronautHeight + 10) && astronaut[i].y > 0) {
            lives2 ++;   
            coinAudio.play();
            let disappearX = astronaut[i].x;
            let disappearY = astronaut[i].y;
            collected.push({
                x: disappearX,
                y: disappearY
            })
            astronaut.splice(i,1)
        } else if (astronaut[i].y < 0) {
                astronaut.splice(i, 1);
        }
    }

    ctx.fillStyle = "#C0C0C0";
    ctx.font = "30px Arial";
    ctx.fillText("Player 1", 40, cvsHeight - 100); 
    ctx.fillStyle = "#C0C0C0";
    ctx.font = "30px Arial";
    ctx.fillText(`❤️ Lives: ${lives}`, 10, cvsHeight - 60);   
    ctx.fillStyle = "#C0C0C0";
    ctx.font = "30px Arial";
    ctx.fillText(`💰 Score: ${score}`, 10, cvsHeight - 20);

    ctx.fillStyle = "#C0C0C0";
    ctx.font = "30px Arial";
    ctx.fillText("Player 2", cvsWidth - 130, cvsHeight - 100); 
    ctx.fillStyle = "#C0C0C0";
    ctx.font = "30px Arial";
    ctx.fillText(`❤️ Lives: ${lives2}`, cvsWidth - 160, cvsHeight - 60);   
    ctx.fillStyle = "#C0C0C0";
    ctx.font = "30px Arial";
    ctx.fillText(`💰 Score: ${score2}`, cvsWidth - 160, cvsHeight - 20);

    drawPlayer(imagepath, px, py)
    drawPlayer(imagepath2, px2, py2)

    if (py <= cvsHeight - playerHeight) {
        py += 1;
    }
    if (py2 <= cvsHeight - playerHeight) {
        py2 += 1;
    }

    if (lives === 0 || lives2 === 0) {
        return endGame2();           
    }

  requestAnimationFrame(doublePlayer);    
}




