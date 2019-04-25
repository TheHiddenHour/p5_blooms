const CIRCLE_COLORS = [
    [255, 0, 0], // RED
    [0, 255, 0], // GREEN 
    [0, 0, 255], // BLUE
];

class Circle {
    constructor(fade_size, lerp_rate, move_speed, x, y) {
        this.position = createVector(x || randomInt(0, width - fade_size), y || randomInt(0, height - fade_size));
        this.color = CIRCLE_COLORS[randomInt(0, CIRCLE_COLORS.length)];
        this.size = 0;
        this.alpha = 255;
        this.fade_size = fade_size;
        this.lerp_rate = lerp_rate;
        this.move_speed = move_speed || 0;
    }

    draw() {
        fill(this.color[0], this.color[1], this.color[2], this.alpha);
        // Render last circle frame 
        circle(this.position.x, this.position.y, this.size);
        // Calc new size 
        this.size = lerp(this.size, this.fade_size * 2, this.lerp_rate);
        // Check if current size has surpassed fade size  
        if(this.size >= this.fade_size) {
            // Calc new alpha  
            this.alpha = lerp(this.alpha, 0, this.lerp_rate);
        }
        // Move circle with move_speed 
        this.position.x += this.move_speed;
        this.position.y += this.move_speed;
    }
}