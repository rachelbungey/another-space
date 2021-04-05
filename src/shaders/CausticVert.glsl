@import ./PerlinNoise;
varying vec2 vUv;
uniform float timeMsec;
varying vec3 vWorldPos;
uniform float alphaVal;

void main() {
  vec4 worldPosition = modelMatrix * vec4(position, 1.0);
  vUv = uv;
  vWorldPos = worldPosition.xyz;
  vWorldPos.x += 20.0;
  vWorldPos.z += 20.0;
  vec4 mvPosition = viewMatrix * worldPosition;
  gl_Position = projectionMatrix * mvPosition;
}
