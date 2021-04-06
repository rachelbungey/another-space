@import ./PerlinNoise;

varying vec3 vWorldPos;
varying vec3 vViewDir;
varying vec3 vNormal;

uniform vec3 color1;
uniform vec3 color2;
uniform float timeMsec;
uniform float alphaVal;
uniform float diffuseTexMult;

uniform sampler2D map;
varying vec2 vUv;

void main() {


  float specColF = 0.0;

  if(alphaVal < 0.5) {
    float noise2 = 2.0*cnoise(2.0*vec3(0.5*vWorldPos.x,vWorldPos.y,vWorldPos.z) + 8.0*timeMsec) - 1.0;
    // worldPosition.y -= 0.1*sin(noise1);
    noise2 *= 0.8;
    vec3 normal = normalize(vec3(0.9*noise2, 1.0-0.1*noise2, 0.1*noise2));

    vec3 light_vector = normalize(vec3(-2.32, 3.29, -3.77));
    float specCol = pow(max(0.0,dot(reflect(-light_vector,normal), normalize(vViewDir))),64.0);
    specColF = 0.8*specCol;
  }

  float noise1 = 1.2 + cnoise(0.7*vWorldPos + timeMsec);
  float col1 = pow(0.5 + 0.5 * sin(specColF + noise1*1.0*vWorldPos.x - 9.0*timeMsec),8.0 + sin(4.0*timeMsec));
  float col3 = pow(0.5 + 0.5 * cos(specColF + noise1*1.1*vWorldPos.z+ 11.0*timeMsec)*cos(noise1*2.0*vWorldPos.z + 10.0*timeMsec),8.0+ cos(timeMsec));

  float col = min(min( col1, col3),noise1) + 0.1*max(col1,col3);

  // col *= 1.0 + specColF;
  // col += 0.1 * specColF;

  vec4 mapColor = vec4(color1, 1.0);

  #ifdef USE_MAP
  vec2 distortedUv = vUv + 0.035 * vec2 ( col, col );
 	mapColor = texture2D( map, distortedUv );
 	vec4 mapColor2 = texture2D( map, vUv );
  mapColor = max(mapColor, mapColor2);
 	mapColor = diffuseTexMult * mapTexelToLinear( mapColor );
  #endif

  gl_FragColor = vec4( mix(mapColor.xyz, 1.4*color2, col), alphaVal);

  gl_FragColor += specColF * vec4(1.0, 1.0, 1.0,1.0);
}



