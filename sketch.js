let snowflakes = []; // array to hold snowflake objects
let img ="";
let x = 0; // La posición x de la imagen
let y = 0; // La posición y de la imagen
let vx = 5; // La velocidad en x de la imagen
let vy = 5; // La velocidad en y de la imagen
let ax = 0; // La aceleración en x de la imagen
let ay = 0; // La aceleración en y de la imagen
function setup() {
  createCanvas(1000, 1000);
  fill(240);
  noStroke();
    
  img = loadImage("https://i.ibb.co/LYMTPt8/bombones.jpg");
  textFont('Arial', 'bold', 16);
}

function draw() {
  console.log("draw() " + frameCount);
  background('brown');
  let t = frameCount / 60; // update time
 
  // create a random number of snowflakes each frame
  for (let i = 0; i < random(5); i++) {
    snowflakes.push(new snowflake()); // append snowflake object
  }

  // loop through snowflakes with a for..of loop
  for (let flake of snowflakes) {
    flake.update(t); // update snowflake position
    flake.display(); // draw snowflake
  }
  textSize(50);
  textAlign(CENTER, CENTER);
  
  text("BOMBONES LINDOR ", 500, 200);
  // Dibuja la imagen en la pantalla
 
    // Dibujamos la imagen en el lienzo en la posición (x, y)
    image(img, x, y);

    // Actualizamos la posición de la imagen en función de su velocidad y aceleración
    x += vx;
    y += vy;
    vx += ax;
    vy += ay;
  
    // Si la imagen choca contra el borde derecho o izquierdo del lienzo, cambiamos su
    // velocidad en x para que rebote
    if (x + img.width >= width || x <= 0) {
      vx = -vx;
    }
  
    // Si la imagen choca contra el borde superior o inferior del lienzo, cambiamos su
    // velocidad en y para que rebote
    if (y + img.height >= height || y <= 0) {
      vy = -vy;
}
}

// snowflake class
function snowflake() {
  // initialize coordinates
  this.posX = 0;
  this.posY = random(-50, 0);
  this.initialangle = random(0, 2 * PI);
  this.size = random(2, 5);

  // radius of snowflake spiral
  // chosen so the snowflakes are uniformly spread out in area
  this.radius = sqrt(random(pow(width / 2, 2)));

  this.update = function(time) {
    // x position follows a circle
    let w = 0.6; // angular speed
    let angle = w * time + this.initialangle;
    this.posX = width / 2 + this.radius * sin(angle);

    // different size snowflakes fall at slightly different y speeds
    this.posY += pow(this.size, 0.5);

    // delete snowflake if past end of screen
    if (this.posY > height) {
      let index = snowflakes.indexOf(this);
      snowflakes.splice(index, 1);
    }
  };

  this.display = function() {
    ellipse(this.posX, this.posY, this.size);
  };
}

