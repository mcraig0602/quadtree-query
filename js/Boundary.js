function Boundary({ x, y, w, h, color = [255] }) {
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  //[255, 0, 0]
  this.color = color;

  //Computed Boundary
  this.midX = this.x + this.w / 2;
  this.maxX = this.x + this.w;
  this.midY = this.y + this.h / 2;
  this.maxY = this.y + this.h;
}

Boundary.prototype = {
  contains: function contains(pt, log = false) {
    const isLessThanMaxX = pt.x < this.maxX;
    const isMoreThanMinX = pt.x > this.x;
    const isLessThanMaxY = pt.y < this.maxY;
    const isMoreThanMinY = pt.y > this.y;
    if (log) {
      console.log("Point: ", pt.x, pt.y);
      console.log("Boundary: ", this.x, this.maxX);
      console.log(
        isLessThanMaxX,
        isMoreThanMinX,
        isLessThanMaxY,
        isMoreThanMinY
      );
    }

    return isLessThanMaxX && isMoreThanMinX && isLessThanMaxY && isMoreThanMinY;
  },

  intersects:  function intersects(circle) {
    const cPos = circle.positions()
    const isGreaterThanMinX = cPos.maxX > this.x
    const isGreaterThanMinY = cPos.maxY > this.y

    const isLessThanMaxX = cPos.minX < this.maxX
    const isLessThanMaxY = cPos.minY < this.maxY

    return isGreaterThanMinX && isGreaterThanMinY && isLessThanMaxX && isLessThanMaxY
  },

  //p5 functions
  draw: function draw() {
    noFill();
    stroke(...this.color);
    strokeWeight(1);
    rect(this.x, this.y, this.w, this.h);
  },
};
