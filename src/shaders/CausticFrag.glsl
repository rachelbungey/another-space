@import ./PerlinNoise;

varying vec3 vWorldPos;
uniform vec3 color1;
uniform vec3 color2;
uniform float timeMsec;
uniform float alphaVal;

uniform sampler2D map;
varying vec2 vUv;

void main() {
  vec4 mapColor = vec4(color1, 1.0);

  #ifdef USE_MAP
 	mapColor = texture2D( map, vUv );
 	mapColor = mapTexelToLinear( mapColor );
  #endif
  float noise1 = 0.5 + cnoise(0.5*vWorldPos + timeMsec);
  float col1 = pow(0.5 + 0.5 * sin(noise1*1.9*vWorldPos.x),8.0 + sin(timeMsec));
  float col3 = pow(0.5 + 0.5 * cos(noise1*2.1*vWorldPos.z)*cos(noise1*5.0*vWorldPos.z),8.0+ cos(timeMsec));

  float col = min(min( col1, col3),noise1) + 0.1*max(col1,col3);

  gl_FragColor = vec4( mix(mapColor.xyz, 1.2*color2, col), alphaVal );

}



