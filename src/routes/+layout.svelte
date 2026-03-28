<script lang="ts">
  import "./layout.css";
  import favicon from "$lib/assets/favicon.svg";

  let { children } = $props();

  import Canvas from "../Components/Canvas.svelte";
  let width = $state<number>(0);
  let height = $state<number>(0);
  const fragment_shader = `
#define PI 3.142

precision highp float;
uniform vec3 iResolution;
uniform float iTime;

varying vec2 v_uv;

float hash(float n) {
  return fract(sin(n) * 424234.234234);
}

float line(float angle, float radial, float d, float t, float density, float seed) {
  float a = angle * density; 
  float dx = fract(a) - 0.2; 
  float id = floor(a) + seed; 

  float r = hash(id);
  float speed = r * 1.2;
  float phase = fract(radial * 0.3 + t * speed);
  
  float len = r * 0.005;
  float body = smoothstep(len, len - 0.002, phase);

  return body;
}

void main() {
  vec2 fragCoord = v_uv * iResolution.xy;
  vec2 uv = ((fragCoord - 0.5 * iResolution.xy) / iResolution.y);
  float angle = atan(uv.x, uv.y) / (2.0 * PI);
  float d = length(uv) - 0.2;
  float radial = -log(d);
  float t = iTime * 0.30;

  float l1 = line(angle, 1.0 - radial, d, t * 0.75, 360.0, 0.0);
  float l2 = line(angle, radial, d, t * 0.5, 90.0, 1.0);

  vec3 col = vec3(l1) + vec3(l2);
  vec3 blue = vec3(0.4, 0.6, 1.0);
  vec3 green = vec3(0.4, 0.6, 0.4);
  col += 0.1;
  col += mix(blue, green, sin(iTime) * 0.25) * exp(-d * d * 12.0) * 0.5;
  gl_FragColor = vec4(col, 1.0);
}
`;
  const vertex_shader = `
attribute vec2 a_position;
varying vec2 v_uv;

void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
  v_uv = a_position * 0.5 + 0.5;
}
`;
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
<svelte:window bind:innerWidth={width} bind:innerHeight={height} />
<div>
  <div
    class="w-full h-full absolute flex content-center items-center justify-center"
  >
    <div
      class="w-6/12 h-6/12 border border-amber-200 bg-gray-800/90 rounded-4xl md:px-8 px-4 py-6 pb-15"
    >
      <div
        class="flex text-white space-x-5 md:text-lg text-sm justify-center top-auto underline font-bold mb-3"
      >
        <a href="/">About</a>
        <a href="/works">My Works</a>
      </div>

      {@render children()}
    </div>
  </div>
  <div class="-z-10 relative">
    <Canvas {width} {height} {fragment_shader} {vertex_shader} />
  </div>
</div>
