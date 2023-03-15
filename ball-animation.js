AFRAME.registerComponent("ball-animation", {
  init: function () {
    this.paddleEl = document.querySelector("#paddle");
    this.ballEl = document.querySelector("#ball");
    this.cubeEl = document.querySelector("#cube");
  },

  tick: function (time, timeDelta) {
    if (!ballEl || !this.paddleEl || !this.cubeEl) {
      return;
    }

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

  },
});