function Circle(x, y) {
  this.pos = createVector( x, y)
  this.r = 48
}

Circle.prototype = {
  positions: function positions() {
    return {
        minX: this.pos.x - this.r,
        minY: this.pos.y - this.r,
        maxX: this.pos.x + this.r,
        maxY: this.pos.y + this.r
      }
    },
  contains: function contains(pt) {
    const d = Math.sqrt(Math.pow(Math.abs(pt.pos.x - this.pos.x), 2) + Math.pow(Math.abs(pt.pos.y - this.pos.y), 2))
    return d < this.r
  },
  update: function update(pt) {
    this.pos = pt
  },
  draw: function draw() {
    stroke(255)
    strokeWeight(1)
    noFill()
    ellipse(this.pos.x, this.pos.y, this.r * 2)
  }
}
