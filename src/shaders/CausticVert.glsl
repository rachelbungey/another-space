@import ./PerlinNoise;
varying vec2 vUv;
uniform float timeMsec;
varying vec3 vWorldPos;
varying vec3 vLightAdded;
uniform float alphaVal;

#include <common>
#include <lights_pars_begin>

void main() {
  vec4 worldPosition = modelMatrix * vec4(position, 1.0);
  if(alphaVal < 1.0) {
    worldPosition.y += 0.005*sin(20.0*worldPosition.x + 100.0*timeMsec);
  }

  vWorldPos = worldPosition.xyz;
  vWorldPos.x += 20.0;
  vWorldPos.z += 20.0;
  vec4 mvPosition = viewMatrix * worldPosition;
  gl_Position = projectionMatrix * mvPosition;

  vec3 lightAdded = vec3(1.0, 1.0, 1.0);

  #if ( NUM_DIR_LIGHTS > 0 )
		DirectionalLight directionalLight;
		for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
			directionalLight = directionalLights[ i ];
			float lightAmt = saturate(dot(directionalLight.direction, normal));
			lightAdded += lightAmt*directionalLight.color;
		}
	#endif
  vLightAdded = lightAdded;
}
