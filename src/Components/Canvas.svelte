<script lang="ts">
  import { onMount } from "svelte";

  let {
    width,
    height,
    fragment_shader,
    vertex_shader,
  }: {
    width: number;
    height: number;
    fragment_shader: string;
    vertex_shader: string;
  } = $props();

  let canvas: HTMLCanvasElement | null = null;
  let gl: WebGLRenderingContext | null = null;
  let program: WebGLProgram | null = null;
  let animationId: number;

  function main(): void {
    if (!gl || !canvas) {
      return;
    }

    canvas.width = width;
    canvas.height = height;
    gl.viewport(0, 0, width, height);

    program = initShader(gl, fragment_shader, vertex_shader);
    if (!program) return;

    gl.useProgram(program);

    const vertices = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);

    const vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const positionLoc = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(positionLoc);
    gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

    const resolutionLoc = gl.getUniformLocation(program, "iResolution");
    if (resolutionLoc) {
      gl.uniform3f(resolutionLoc, width, height, 1);
    }

    let startTime = performance.now();
    const timeLoc = gl.getUniformLocation(program, "iTime");

    function render() {
      if (!gl) return;

      gl.uniform1f(timeLoc, (performance.now() - startTime) / 1000);

      gl.clearColor(0.0, 0.0, 0.0, 1.0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      animationId = requestAnimationFrame(render);
    }

    animationId = requestAnimationFrame(render);
  }

  function initShader(
    gl: WebGLRenderingContext,
    f_shader: string,
    v_shader: string,
  ) {
    const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, f_shader);
    const vertexShader = loadShader(gl, gl.VERTEX_SHADER, v_shader);

    if (!fragmentShader || !vertexShader) {
      alert("shader loading failed");
      return null;
    }

    const shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, fragmentShader);
    gl.attachShader(shaderProgram, vertexShader);
    gl.linkProgram(shaderProgram);

    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
      alert(gl.getProgramInfoLog(shaderProgram));
      return null;
    }

    return shaderProgram;
  }

  function loadShader(gl: WebGLRenderingContext, type: number, source: string) {
    const shader = gl.createShader(type);
    if (!shader) {
      alert("shader creation failed");
      return null;
    }

    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      alert(
        `An error occurred compiling the shaders: ${gl.getShaderInfoLog(shader)}`,
      );
      gl.deleteShader(shader);
      return null;
    }

    return shader;
  }

  onMount(() => {
    canvas = document.querySelector<HTMLCanvasElement>("#gl-canvas")!;
    gl = canvas.getContext("webgl");

    main();
    return () => cleanup();
  });

  function cleanup() {
    if (program && gl) {
      gl.deleteProgram(program);
      program = null;
    }
    if (animationId) {
      cancelAnimationFrame(animationId);
    }
  }

  $effect(() => {
    width;
    height;
    cleanup();
    main();

    return () => cleanup();
  });
</script>

<div>
  <canvas id="gl-canvas" {width} {height}></canvas>
</div>
