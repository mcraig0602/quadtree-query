
function Particle() {
  this.vel = createVector(random(-1, 1), random(-1, 1));
  this.pos = createVector(random(width), random(height));

  this.radius = 3
  this.toDelete = false;
  this.selected = false
}

Particle.prototype = {
  draw: function draw(circle) {
    if(this.selected) {
      stroke(0,0,255)
      push()
      strokeWeight(1)
      line(mouseX, mouseY, this.pos.x, this.pos.y)
      if(hotkeyDown) {
        //Vertical
        line(this.pos.x, this.pos.y, this.pos.x, circle.pos.y)
        //Horizontal
        line(this.pos.x, circle.pos.y, circle.pos.x, circle.pos.y)
      }
      pop()
      this.selected = false
    } else {
      stroke(255)
    }
    strokeWeight(this.radius * 2);
    point(this.pos.x, this.pos.y);
  },
  update: function update() {
    this.pos.add(this.vel)
    const { x, y } = this.pos;

    if (x + this.radius > width || x - this.radius < 0) {
      this.vel = createVector(this.vel.x * -1, this.vel.y);
    }
    if (y + this.radius > height || y - this.radius < 0) {
      this.vel = createVector(this.vel.x, this.vel.y * -1);
    }
  },
};
