let particles = [];
let qt;

let particleSlider
const defaultParticles = 50
let sliderPos = {x: 10, y: 25}

function setup() {
  createCanvas(windowWidth, windowHeight);
  particleSlider = createSlider(10, 2000, defaultParticles, 1)
  particleSlider.position(sliderPos.x, sliderPos.y)
  // Initialize first 50 particles
  for (let i = 0; i < defaultParticles; i++) {
    const particle = new Particle()
    particles.push(particle);
  }
}

//Resize canvas to fit window
function windowResized() {
  createCanvas(windowWidth, windowHeight);
}

//Used to show circle and the lines used to determine if pt is inside circle
let hotkeyDown = false
function keyPressed() {
  if(key === 'a') {
    hotkeyDown = true
  }
}

function keyReleased() {
  hotkeyDown = false
}

function drawFPS() {
  noStroke()
  fill(255)
  text(`FPS: ${(frameRate()).toFixed()}`, 15, 20)
}

let sliderVal = defaultParticles
function updateSlider() {
  const prevVal = sliderVal
  const newVal = particleSlider.value()
  if(newVal === prevVal) return;
  if(newVal < prevVal) {
    particles.splice(newVal)
  } else {
    const diff = newVal - prevVal
    for(let i = 0; i < diff; i++) {
      particles.push(new Particle())
    }
  }
  sliderVal = newVal
}

function draw() {
  // frameRate(30)
  background(51);
  updateSlider()

  qt = new Quadtree()
  const circle = new Circle(mouseX, mouseY)
  for (let i = 0; i < particles.length; i++) {
    const particle = particles[i]
    particle.update()
    qt.add(particle)
  }
  qt.query(circle)
  particles.forEach(p => p.draw(circle))
  if(hotkeyDown) {
    circle.draw()
  }
  drawToolBar()
}

function drawToolBar() {
  push()
  stroke(255)
  strokeWeight(1)
  fill(51, 100)
  rect(5, 5, 175, 50)
  pop()
  push()
  fill(255)
  noStroke()
  const sliderWidth = particleSlider.width
  textAlign(LEFT, TOP)
  text(particles.length, sliderPos.x + sliderWidth + 5, sliderPos.y+1)
  pop()
  drawFPS()
}
