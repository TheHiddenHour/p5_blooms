// Constants
const SPAWN_SHIFT = 1;
const LERP_SHIFT = 1;
// Variables  
let spawndelay = 10;
let lerpspeed = 10;
let lerpdiv = 1000;
let circles = [];

function setup() {
    createCanvas(windowWidth, windowHeight);
    // Reset HTML sliders 
    document.getElementById("spawn-delay-slider").value = spawndelay;
    document.getElementById("lerp-speed-slider").value = lerpspeed;
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(12);
    // Draw initial circle so the screen's not so empty lol 
    circles.push(new Circle(100, lerpspeed / lerpdiv));
}

function draw() {
    background(0);
    // Draw instruction text 
    fill(255);
    text("Press R to clear canvas", width / 2, 12);
    text("Spawndelay: " + spawndelay.toString() + " Lerpspeed: " + lerpspeed.toString(), width / 2, height - 12);

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
    if(frameCount % spawndelay == 0) {
        // Spawn another circle 
        circles.push(new Circle(100, lerpspeed / lerpdiv));
    }
}

function keyPressed() {
    if(keyCode === 65) { // A key 
        // spawndelay down 
        spawndelay -= SPAWN_SHIFT;
    }
    else if(keyCode === 68) { // D key 
        // spawndelay up 
        spawndelay += SPAWN_SHIFT;
    }
    else if(keyCode === 87) { // W key 
        // lerpspeed up 
        lerpspeed += LERP_SHIFT;
    }
    else if(keyCode == 83) { // S key 
        // lerpspeed down 
        lerpspeed -= LERP_SHIFT;
    }
    else if(keyCode == 82) { // R key 
        circles = [];
    }
}

function touchStarted() {
    // Spawn circle when mouse clicked 
    circles.push(new Circle(100, lerpspeed / lerpdiv, mouseX, mouseY));
}

function randomInt(min, max) {
    return Math.floor(Math.random() * max) + min;
}

document.getElementById("spawn-delay-slider").oninput = function() {
    spawndelay = this.value;
}

document.getElementById("lerp-speed-slider").oninput = function() {
    lerpspeed = this.value;
}