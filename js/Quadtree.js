function Quadtree(boundary) {
  this.boundary = boundary || new Boundary({ x: 0, y: 0, w: width, h: height });

  this.points = [];
  this.maxPoints = 4;
  this.divided = false;

  this.ne = null;
  this.nw = null;
  this.se = null;
  this.sw = null;
}

Quadtree.prototype = {
  logTree: function logTree() {
    if (!this.divided) {
      return this.points;
    } else {
      return {
        nw: this.nw.logTree(),
        ne: this.ne.logTree(),
        sw: this.sw.logTree(),
        se: this.se.logTree(),
      };
    }
  },
  addToChildren: function addToChildren(pt) {
    this.ne.add(pt);
    this.nw.add(pt);
    this.se.add(pt);
    this.sw.add(pt);
  },
  add: function add(pt) {
    if (!this.boundary.contains(pt.pos)) return;

    if (this.divided) {
      this.addToChildren(pt)
      return;
    }

    if (this.points.length < this.maxPoints) {
      this.points.push(pt);
      return;
    } else {
      this.subDivide();
      for (let i = 0; i < this.points.length; i++) {
        const point = this.points[i];
        this.addToChildren(point)
      }
      this.points = [];
      this.addToChildren(pt)
    }
  },
  cleanup: function cleanup() {
    const newPoints = this.points.filter((p) => !p.toDelete);
    this.points = [...newPoints];
    this.ne && this.ne.cleanup();
    this.nw && this.nw.cleanup();
    this.se && this.se.cleanup();
    this.sw && this.sw.cleanup();
    if (this.isEmpty()) this.unDivide();
  },
  isEmpty: function isEmpty() {
    if (this.divided) {
      return !(
        this.ne.points.length ||
        this.ne.divided ||
        this.nw.points.length ||
        this.nw.divided ||
        this.se.points.length ||
        this.se.divided ||
        this.sw.points.length ||
        this.sw.divided
      );
    } else return false;
  },
  query: function query(circle) {
    if(this.boundary.intersects(circle)) {
      let found = []
      if(this.divided) {
        found = [
          ...found,
          ...this.ne.query(circle),
          ...this.nw.query(circle),
          ...this.se.query(circle),
          ...this.sw.query(circle)
        ]
      } else {
        found = [...found, ...this.points.filter(p => circle.contains(p))]
      }
      found.forEach(p => p.selected = true)
      return found
    } else return [];
  },

  unDivide: function unDivide() {
    this.divided = false;
    this.ne = null;
    this.nw = null;
    this.se = null;
    this.sw = null;
  },
  subDivide: function subDivide() {
    const { x, y, midX, midY, maxX, maxY, w, h } = this.boundary;

    const nw = new Boundary({ x, y, w: w / 2, h: h / 2 });
    this.nw = new Quadtree(nw);

    const ne = new Boundary({ x: midX, y, w: w / 2, h: h / 2 });
    this.ne = new Quadtree(ne);

    const sw = new Boundary({ x, y: midY, w: w / 2, h: h / 2 });
    this.sw = new Quadtree(sw);

    const se = new Boundary({ x: midX, y: midY, w: w / 2, h: h / 2 });
    this.se = new Quadtree(se);
    // console.log("Subdivide!", this.points.length);
    // console.log("NW: ", this.nw.boundary);
    // console.log("NE: ", this.ne.boundary);
    // console.log("SW: ", this.sw.boundary);
    // console.log("SE: ", this.se.boundary);
    this.divided = true;
  },

  // Canvas methods
  draw: function draw() {
    this.boundary.draw();
    stroke(0, 0, 255);
    strokeWeight(5);

    if (this.divided) {
      push();
      stroke(0, 0, 255);
      this.points.forEach((p) => p.draw());
      pop();
    } else {
      this.points.forEach((p) => p.draw());
    }

    this.ne && this.ne.draw();
    this.nw && this.nw.draw();
    this.se && this.se.draw();
    this.sw && this.sw.draw();
  },
};
