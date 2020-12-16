let points;
let current;
let percent;
let previous;
let previous2;
let count = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);

  //Vertices 
  points = [];
  percent = 0.5;
  
  const n = 5;

  for (let i = 0; i < n; i++) {
    let angle = i * TWO_PI / n - PI / 2;

    let v = p5.Vector.fromAngle(angle);
    v.mult(height / 2);
    v.add(width / 2, height / 2);
    points.push(v);
  }
  reset();
  
}

function reset() {
  background(0);

  // Random start point
  current = createVector(random(width), random(height));

  stroke(50);
  strokeWeight(1);

  // Vertices display
  /*for (let i = 0; i < points.length; i++) {
    let point1 = points[i];
    let point2 = points[i + 1];
    if (i + 1 == points.length) {
      point2 = points[0];
    }
    line(point1.x, point1.y, point2.x, point2.y);
  }*/ 
}


function draw() {
  
  if (frameCount < 1000) {

    for (let i = 0; i < 1000; i++) {
			
      // Next point index
      let nextIndex = floor(random(points.length));

      let next = points[nextIndex];
      
      //Restrictions
      let previousPlus = previous + 1;
      let previousMinus = previous - 1;
      let previous2Plus = previous2 + 1;
      let previous2Minus = previous2 - 1;
      if (previousPlus >= points.length) previousPlus -= points.length;
			if (previousMinus < 0) previousMinus += points.length;
			if (previous2Plus >= points.length) previous2Plus -= points.length;
      if (previous2Minus < 0) previous2Minus += points.length;
      
      if ((nextIndex != previousPlus && nextIndex != previous2Minus) 
       		|| (nextIndex != previousMinus && nextIndex != previous2Plus)) {
       	
        current.x = lerp(current.x, next.x, percent);
        current.y = lerp(current.y, next.y, percent);
        
        strokeWeight(1);
 				stroke(255, 50);
        point(current.x, current.y);
        
        previous2 = previous;
        previous = nextIndex;
      }
    }
  }
}   