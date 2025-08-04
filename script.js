const canvas = document.getElementById("mazeCanvas");
const ctx = canvas.getContext("2d");

const WIDTH = canvas.width;
const HEIGHT = canvas.height;

const CUBE_SIZE = 15;
const EXIT_ZONE = 20;

const mazeWalls = [
  {x: 100, y: 100, w: 200, h: 10},
  {x: 100, y: 200, w: 200, h: 10},
  {x: 0, y: 300, w: 150, h: 10},
  {x: 250, y: 300, w: 150, h: 10},
  {x: 100, y: 400, w: 200, h: 10},
  {x: 150, y: 500, w: 100, h: 10}
];

const cubes = [
  createCube("red"),
  createCube("blue"),
  createCube("green")
];

function createCube(color) {
  return {
    x: Math.random() * (WIDTH - CUBE_SIZE),
    y: HEIGHT - CUBE_SIZE,
    dx: (Math.random() - 0.5) * 2,
    dy: -1 - Math.random(),
    color: color,
    finished: false
  };
}

function drawMaze() {
  ctx.fillStyle = "#000";
  mazeWalls.forEach(wall => {
    ctx.fillRect(wall.x, wall.y, wall.w, wall.h);
  });

  ctx.fillStyle = "lightgreen";
  ctx.fillRect(0, 0, WIDTH, EXIT_ZONE);
}

function drawCubes() {
  cubes.forEach(cube => {
    ctx.fillStyle = cube.finished ? "gray" : cube.color;
    ctx.fillRect(cube.x, cube.y, CUBE_SIZE, CUBE_SIZE);
  });
}

function updateCubes() {
  cubes.forEach(cube => {
    if (cube.finished) return;
    cube.x += cube.dx;
    cube.y += cube.dy;

    if (cube.x < 0 || cube.x + CUBE_SIZE > WIDTH) {
      cube.dx *= -1;
      cube.x = Math.max(0, Math.min(WIDTH - CUBE_SIZE, cube.x));
    }

    if (cube.y <= EXIT_ZONE) {
      cube.finished = true;
      cube.y = EXIT_ZONE;
      return;
    }

    if (cube.y + CUBE_SIZE > HEIGHT) {
      cube.dy *= -1;
      cube.y = HEIGHT - CUBE_SIZE;
    }

    mazeWalls.forEach(wall => {
      if (
        cube.x < wall.x + wall.w &&
        cube.x + CUBE_SIZE > wall.x &&
        cube.y < wall.y + wall.h &&
        cube.y + CUBE_SIZE > wall.y
      ) {
        cube.dy *= -1;
        cube.y += cube.dy * 2;
      }
    });
  });
}

function loop() {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
  drawMaze();
  updateCubes();
  drawCubes();
  requestAnimationFrame(loop);
}

loop();
