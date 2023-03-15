document.addEventListener("DOMContentLoaded", function () {
  const sceneEl = document.querySelector("a-scene");
  const gameEl = document.querySelector("#game");

  // Create the cube
  const cubeEl = document.createElement("a-box");
  cubeEl.setAttribute("id", "cube");
  cubeEl.setAttribute("position", "0 1.6 0");
  cubeEl.setAttribute("width", "10");
  cubeEl.setAttribute("height", "10");
  cubeEl.setAttribute("depth", "10");
  cubeEl.setAttribute("color", "blue");
  cubeEl.setAttribute("material", "side: double");
  gameEl.appendChild(cubeEl);

  // Create the paddle
  const paddleEl = document.createElement("a-entity");
  paddleEl.setAttribute("id", "paddle");
  paddleEl.setAttribute("position", "0 1.6 -0.5");
  paddleEl.setAttribute("gltf-model", "./Flyinghero_2023-03-01_23.49.17.gltf");
  gameEl.appendChild(paddleEl);

  // Create the ball
  const ballEl = document.createElement("a-sphere");
  ballEl.setAttribute("id", "ball");
  ballEl.setAttribute("position", "0 1.6 -1.5");
  ballEl.setAttribute("radius", "0.05");
  ballEl.setAttribute("color", "yellow");
  gameEl.appendChild(ballEl);

  // Ball velocity
  const ballVelocity = { x: 0.0025, y: 0.0025, z: -0.0025 };

  // Animate the ball
  function animateBall() {
    const ballPos = ballEl.object3D.position;
    const paddlePos = paddleEl.object3D.position;
    const cubePos = cubeEl.object3D.position;
    const ballRadius = parseFloat(ballEl.getAttribute("radius"));
    const cubeSize = {
      width: parseFloat(cubeEl.getAttribute("width")),
      height: parseFloat(cubeEl.getAttribute("height")),
      depth: parseFloat(cubeEl.getAttribute("depth")),
    };

    // Update ball position
    ballPos.x += ballVelocity.x;
    ballPos.y += ballVelocity.y;
    ballPos.z += ballVelocity.z;

    // Check for collisions with cube walls
    if (
      ballPos.x + ballRadius >= cubePos.x + cubeSize.width / 2 ||
      ballPos.x - ballRadius <= cubePos.x - cubeSize.width / 2
    ) {
      ballVelocity.x = -ballVelocity.x;
    }
    if (
      ballPos.y + ballRadius >= cubePos.y + cubeSize.height / 2 ||
      ballPos.y - ballRadius <= cubePos.y - cubeSize.height / 2
    ) {
      ballVelocity.y = -ballVelocity.y;
    }
    if (
      ballPos.z + ballRadius >= cubePos.z + cubeSize.depth / 2 ||
      ballPos.z - ballRadius <= cubePos.z - cubeSize.depth / 2
    ) {
      ballVelocity.z = -ballVelocity.z;
    }

    // Check for collisions with the paddle
    const paddleSize = {
      width: parseFloat(paddleEl.getAttribute("width")),
      height: parseFloat(paddleEl.getAttribute("height")),
      depth: parseFloat(paddleEl.getAttribute("depth")),
    };

    if (
      ballPos.x >= paddlePos.x - paddleSize.width / 2 &&
      ballPos.x <= paddlePos.x + paddleSize.width / 2 &&
      ballPos.y >= paddlePos.y - paddleSize.height / 2 &&
      ballPos.y <= paddlePos.y + paddleSize.height / 2 &&
      ballPos.z >= paddlePos.z - paddleSize.depth / 2 &&
      ballPos.z <= paddlePos.z + paddleSize.depth / 2
    ) {
      ballVelocity.z = -ballVelocity.z;
    }

    // Continue animation
    requestAnimationFrame(animateBall);
  }

  // Start ball animation
  animateBall();

  // Camera and controller
  const rigEl = document.querySelector("#rig");
  const controllerEl = document.createElement("a-entity");
  controllerEl.setAttribute("laser-controls", "hand: right");
  controllerEl.setAttribute("raycaster", "objects: .collidable");
  controllerEl.setAttribute("line", "color: red; opacity: 0.75");
  rigEl.appendChild(controllerEl);

  // Attach the paddle to the controller
  controllerEl.appendChild(paddleEl);

});
``;
