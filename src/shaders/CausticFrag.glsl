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
  float noise1 = 1.2 + cnoise(0.7*vWorldPos + timeMsec);
  float col1 = pow(0.5 + 0.5 * sin(noise1*1.0*vWorldPos.x - 9.0*timeMsec),8.0 + sin(4.0*timeMsec));
  float col3 = pow(0.5 + 0.5 * cos(noise1*1.1*vWorldPos.z+ 11.0*timeMsec)*cos(noise1*2.0*vWorldPos.z + 10.0*timeMsec),8.0+ cos(timeMsec));

  float col = min(min( col1, col3),noise1) + 0.1*max(col1,col3);
  gl_FragColor = vec4( mix(mapColor.xyz, 1.4*color2, col), alphaVal );

}



