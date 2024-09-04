/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//let hash = tokenData.hash
class Random {
  constructor() {
    this.useA = false;
    // sfc32 function for PRNG
    let sfc32 = function (uint128Hex) {
      let a = parseInt(uint128Hex.substring(0, 8), 16);
      let b = parseInt(uint128Hex.substring(8, 8), 16);
      let c = parseInt(uint128Hex.substring(16, 8), 16);
      let d = parseInt(uint128Hex.substring(24, 8), 16);
      return function () {
        a |= 0; b |= 0; c |= 0; d |= 0;
        let t = (((a + b) | 0) + d) | 0;
        d = (d + 1) | 0;
        a = b ^ (b >>> 9);
        b = (c + (c << 3)) | 0;
        c = (c << 21) | (c >>> 11);
        c = (c + t) | 0;
        return (t >>> 0) / 4294967296;
      };
    };
    this.prngA = new sfc32(inputData.hash.substring(2, 32));
    this.prngB = new sfc32(inputData.hash.substring(34, 32));
    for (let i = 0; i < 1e6; i += 2) {
      this.prngA();
      this.prngB();
    }
  }
  // Random decimal [0, 1)
  random_dec() {
    this.useA = !this.useA;
    return this.useA ? this.prngA() : this.prngB();
  }
  // Random number [a, b)
  random_num(a, b) {
    return a + (b - a) * this.random_dec();
  }
  // Random integer [a, b] (a < b required)
  random_int(a, b) {
    return Math.floor(this.random_num(a, b + 1));
  }
  // Random boolean (p = true probability)
  random_bool(p) {
    return this.random_dec() < p;
  }
  // Choose random item from array
  random_choice(list) {
    return list[this.random_int(0, list.length - 1)];
  }
  // Shuffle Array
  shuffleArray(array) {
    const shuffled = array.slice();
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = this.random_int(0, i);
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }
}
let R;
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const aspectRatio = 16 / 9;
let largura, altura;
let DEFAULT_SIZE = 1000;
let WIDTH, HEIGHT, DIM, M;
let particulas = [];
let target = [];
//let targetorigin;
let p;
let cor;
let oscillation;


paleta1 = ["#c58c85","#ecbcb4","#d1a3a4","#a1665e","#d9c2bf"];
paleta2 = ["#48736b","#6aa096","#95b1ab","#f2e4bb","#bfb39b"];
paleta3 = ["#caf0f8","#90e0ef","#00b4d8","#0077b6","#70c3ff"];
paleta4 = ["#fce4ec","#f8bbd0","#f48fb1","#f06292","#ec407a"];
paleta5 = ["#cdaffa","#dcc6fe","#ede5fa","#e6dff1","#e5d7fa"];
paleta6 = ["#eed9b6","#d6c3a4","#beae92","#a7987f","#8f826d"];
paleta7 = ["#737272","#bfbfbf","#f2f2f2","#404040","#adadad"];
paleta8 = ["#0f6ca6","#4590bf","#f2ead0","#d97b29","#bf4e24"];
paleta9 = ["#d05353","#36c9c6","#e4d6a7","#e9b44c","#006e90"];
paleta10 = ["#9d9b9c","#bbbbbb","#10879f","#13aecd","#16bddf"];
paleta11 = ["#f3dfc1","#ddbea8","#3c86e2","#2ca58d","#f46197"];
paleta12 = ["#ff7f51","#ff9b54","#ce4257","#ffc499","#ff7847"];
paleta13 = ["#d6d8da","#d37fcc","#8e96b5","#9fa6bc","#e0a4db"];
paleta14 = ["#e0cdd3","#f2a7ca","#d585a3","#d9cbba","#f2e5d5"];
paleta15 = ["#f9dc5c","#fae588","#fcefb4","#fdf8e1","#f9dc5c"];
paleta16 = ["#f9df7b","#a9c45e","#f9ab00","#66921b","#e2683c"];
paleta17 = ["#e0fbfc","#c2dfe3","#9db4c0","#b0babf","#c2d0d6"];
paleta18 = ["#e8e8e8","#f4f4f2","#bbbfca","#bbbbbe","#495464"];
paleta19 = ["#f25764","#76a68b","#f2f2e9","#f29f8d","#f25757"];
paleta20 = ["#da746b","#d45d52","#ce4639","#c82f21","#c21808"];
paleta21 = ["#f29e38","#bf8b5e","#337ca0","#f27f3d","#f24c3d"];

paletas = [paleta1,paleta2,paleta3,paleta4,paleta5,paleta6,paleta7,paleta8,paleta9,paleta10,paleta11,paleta12,paleta13,paleta14,paleta15,paleta16,paleta17,paleta18,paleta19,paleta20,paleta21];


class Particle {
  constructor(px, py, s, m) {
    this.pos = createVector(px, py);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.massa = s/2;
    this.maxspeed = m/5;
    this.maxforce = this.maxspeed;
    //this.targetselected = targetMouse;
    this.targetselected = target[R.random_int(0, target.length - 1)];
    this.pickColor = R.random_int(0, 4);
    this.colorir = color(cor[this.pickColor]);
    this.oscFactor = R.random_dec(0.01,0.09);
  }
  applyForce(force) {
    this.acc.add(force);
  }
  seek(target) {
  var desired = p5.Vector.sub(target, this.pos);
  var d = desired.mag();
  // arrive behavior
  if (d < 100) {
    // map the desired mag according to distance
    var m = map(d,0,100,0,this.maxspeed);
    desired.setMag(m) 
  } else {
    desired.setMag(this.maxspeed);
  }
  var steering = p5.Vector.sub(desired, this.vel);
  steering.limit(this.maxforce);
  return steering;
  }
  applyBehaviors(vehicles, target) {
    let separateForce = this.separate(particulas);
    let seekForce = this.seek(target);
    //separateForce.mult(4.4);
    separateForce.mult(.4);
    //seekForce.mult(18);
    //seekForce.mult(30);
    seekForce.mult(130);
    //seekForce.mult(-30);
    this.applyForce(separateForce);
    this.applyForce(seekForce);
}

   // Separation
  // Method checks for nearby vehicles and steers away
  separate(particulas) {
    //let desiredseparation = 100;
    let desiredseparation = R.random_int(100, 380);
    let sum = createVector();
    let count = 0;
    // For every boid in the system, check if it's too close
    for (let i = 0; i < particulas.length; i++) {
      let d = p5.Vector.dist(this.pos, particulas[i].pos);
      // If the distance is greater than 0 and less than an arbitrary amount (0 when you are yourself)
      if ((d > 0) && (d < desiredseparation)) {
        // Calculate vector pointing away from neighbor
        let diff = p5.Vector.sub(this.pos, particulas[i].pos);
        diff.normalize();
        diff.div(d); // Weight by distance
        sum.add(diff);
        count++; // Keep track of how many

/*         // Desenhar uma linha entre as conexões
        let alpha = map(d, 0, desiredseparation, 255, 0); // Map distance to alpha value
        //stroke(255, 0, alpha);
        strokeWeight(.001)
        line(this.pos.x,this.pos.y,particulas[i].pos.x,particulas[i].pos.y);
        stroke(255, 0, alpha);
        strokeWeight(.001)
        line(this.pos.x,this.pos.y,particulas[i].pos.x,particulas[i].pos.y); */


      }
    }
        // Average -- divide by how many
        if (count > 0) {
          sum.div(count);
          // Our desired vector is the average scaled to maximum speed
          sum.normalize();
          sum.mult(this.maxspeed);
          // Implement Reynolds: Steering = Desired - Velocity
          sum.sub(this.vel);
          sum.limit(this.maxforce);
        }
        return sum;
      }
  
      
/*   display() {
    stroke(100,0,100,128);
    fill(this.colorir)
    strokeWeight(1)
    ellipse(this.pos.x, this.pos.y, this.massa, this.massa);
  } */

  display() {
    noFill();
    
    stroke(this.colorir);
    strokeWeight(.1)
    ellipse(this.pos.x, this.pos.y, this.massa*2, this.massa*2);
    //rect(this.pos.x, this.pos.y, this.massa*2, this.massa*2);

    fill(this.colorir);
    stroke(100,0,100,128);
    //stroke(0,0,200,128);
    strokeWeight(1)
    ellipse(this.pos.x, this.pos.y, this.massa, this.massa);
    //rect(this.pos.x, this.pos.y, this.massa, this.massa);
  }

/*   update() {
    this.vel.add(this.acc)
    this.vel.limit(this.maxspeed)
    this.pos.add(this.vel)
    this.acc.mult(0);

    //this.massa -= .03*M
    this.massa -= .01*M
    if (frameCount > 1500 && this.massa >= 0) {
      this.massa -= .01*M
      }
        
        
      if (this.massa <= 0) {
      this.massa = 0;
    }
  } */

  update() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxspeed);
    this.pos.add(this.vel);
    this.acc.mult(0);

    // Introduce scaleFactor and sin function for oscillation
    let scaleFactor = 0.03; // Adjust this value for desired amplitude
    let oscillation = cos(frameCount * 0.03) * scaleFactor;

    // Apply oscillation to mass reduction
    this.massa -= (0.01 * M) + oscillation;

    if (frameCount > 1500 && this.massa >= 0) {
      this.massa -= (0.01 * M) + oscillation;
    }

    if (this.massa <= 0) {
      this.massa = 0;
    }
  }
}

class backgroundPattern{
  constructor(tipo){
  this.tipo = tipo
  }
  
  display(){
  stroke(255)

      if (this.tipo == 1){
          var tamanholinha = .1;
          var tamanhoespaco = 1 * M / tamanholinha;
          for (var i = 0; i < width; i += tamanhoespaco){
            strokeWeight(tamanholinha * M)
            line (i,0,i,height)
            line (0,i,width,i) 
          }  
        }

        
        if (this.tipo == 2){
          var tamanhoespaco = 18 * M;
          var tamanholinha = 2 * M / tamanhoespaco;
          for (var y = 0-height/4; y <= height+height/2; y += tamanhoespaco){
            for (var x = 0-width/4; x <= width+width/2; x += tamanhoespaco) {
              strokeWeight(tamanholinha)
              noFill()
              ellipse(x, y, width/32, width/32)
            }
          }
        }


        if (this.tipo == 3){
          var tamanhoespaco = 20 * M;
          var tamanholinha = 2 * M / tamanhoespaco;
          for (var y = 0-height/4; y <= height+height/2; y += tamanhoespaco){
            for (var x = 0-width/4; x <= width+width/2; x += tamanhoespaco) {
              strokeWeight(tamanholinha)
              noFill()
              ellipse(x, y, width/32, width/32)
            }
          }
        }

        if (this.tipo == 4){
          var tamanhoespaco = 23 * M;
          var tamanholinha = 2 * M / tamanhoespaco;
          for (var y = 0-height/4; y <= height+height/2; y += tamanhoespaco){
            for (var x = 0-width/4; x <= width+width/2; x += tamanhoespaco) {
              strokeWeight(tamanholinha)
              noFill()
              ellipse(x, y, width/32, width/32)
            }
          }
        }
  }
}

function setup() {
  R = new Random();
  largura = window.innerWidth;
  altura = window.innerHeight;
  if (largura / altura >= aspectRatio) {
    largura = altura * aspectRatio;
  } else {
    altura = largura / aspectRatio;
  }
  DIM = Math.min(largura, altura)
  M = DIM / DEFAULT_SIZE
  M = M

  c = createCanvas(largura, altura);

  p = R.random_int(0, paletas.length - 1);
  //p = 1
  cor = paletas[p];

  background(0);
  tipoBackground = R.random_int(1,4);


  target.push(createVector(mouseX, mouseY));


  for (n1 = 0; n1 < 128; n1++) {
    const x = R.random_int(0, width);
    const y = R.random_int(0, height);
    particulas[n1] = new Particle(x, y, R.random_int(30, 80),R.random_int(1, 22));
  }

  let bg = new backgroundPattern(tipoBackground);
  bg.display();


}

function draw() {
  const centerX = width / 2;
  const centerY = height / 2;

  translate(centerX, centerY);
  scale(1);
  translate(-centerX, -centerY);

  target[0] = createVector(mouseX, mouseY);


  for (i = 0; i < particulas.length; i++) {
    particulas[i].applyBehaviors(particulas, target[0]);
    particulas[i].update();
    particulas[i].display();
  }
}
function keyTyped() {
  if (key === "s") {
    save("prototipo.png");
  }
}
new p5();