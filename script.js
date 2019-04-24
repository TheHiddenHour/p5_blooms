// Constants
const SPAWN_SHIFT = 1;
const LERP_SHIFT = 1;
// Variables  
let spawnrate = 10;
let lerprate = 10;
let lerpdiv = 1000;
let circles = [];

function setup() {
    createCanvas(windowWidth, windowHeight);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(12);
    // Draw initial circle so the screen's not so empty lol 
    circles.push(new Circle(100, lerprate / lerpdiv));
}

function draw() {
    background(0);
    // Draw instruction text 
    fill(255);
    text("Press A/D to change spawndelay and W/S to change lerpspeed", width / 2, 12);
    text("Press R to clear canvas", width / 2, 36);
    text("Spawndelay: " + spawnrate.toString() + " Lerpspeed: " + lerprate.toString(), width / 2, height - 12);

    for(let i = 0; i < circles.length; i++) {
        let circ = circles[i];
        circ.draw();
        // Check for whether circ should despawn 
        if(circ.alpha <= 0.5) {
            // Remove the current circle 
            circles.splice(circles.indexOf(circ), 1);
        }
    }

    // Spawn new circle at interval 
    if(frameCount % spawnrate == 0) {
        // Spawn another circle 
        circles.push(new Circle(100, lerprate / lerpdiv));
    }
}

function keyPressed() {
    if(keyCode === 65) { // A key 
        // Spawnrate down 
        spawnrate -= SPAWN_SHIFT;
    }
    else if(keyCode === 68) { // D key 
        // Spawnrate up 
        spawnrate += SPAWN_SHIFT;
    }
    else if(keyCode === 87) { // W key 
        // Lerprate up 
        lerprate += LERP_SHIFT;
    }
    else if(keyCode == 83) { // S key 
        // Lerprate down 
        lerprate -= LERP_SHIFT;
    }
    else if(keyCode == 82) { // R key 
        circles = [];
    }
}

function mouseClicked() {
    // Spawn circle when mouse clicked 
    circles.push(new Circle(100, lerprate / lerpdiv, mouseX, mouseY));
}

function randomInt(min, max) {
    return Math.floor(Math.random() * max) + min;
}