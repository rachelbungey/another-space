@import ./PerlinNoise;

uniform vec3 diffuse;
uniform float opacity;

#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <lights_pars_begin>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <cube_uv_reflection_fragment>
@import ./FogFragPars;
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>

#ifdef FAKE_SUBSURFACE
varying vec3 vViewDir;
uniform float fakeSubsurface;
uniform vec3 subsurfacecolor;
varying vec3 vNormal;
#endif

void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>

#ifdef USE_MAP
 	vec4 texelColor = texture2D( map, vUv );
 	texelColor = mapTexelToLinear( texelColor );
 	diffuseColor *= texelColor;
 #endif
	#include <color_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	// reflectedLight.indirectDiffuse += getAmbientLightIrradiance(ambientLightColor);
	reflectedLight.indirectDiffuse += diffuseColor.rgb;

	// ambient*diffuse

#ifdef FAKE_SUBSURFACE
	vec3 normal = vNormal;

	//add basic toon lighting 
	vec3 lightAdded = vec3(0.0,0.0,0.0);
	vec3 backlightAdded = vec3(0.0,0.0,0.0);

	#if ( NUM_DIR_LIGHTS > 0 )
		DirectionalLight directionalLight;
		for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
			directionalLight = directionalLights[ i ];
			float lightAmt = saturate(dot(directionalLight.direction, normal));
			lightAdded += lightAmt*directionalLight.color;
			float backLightAmt = 1.0 - lightAmt;
			backLightAmt *= saturate(dot(-directionalLight.direction, -vViewDir));
			backlightAdded += backLightAmt*directionalLight.color;
		}
	#endif
	reflectedLight.directDiffuse += lightAdded;
    reflectedLight.directDiffuse *= diffuseColor.rgb;

	// // //how much light was added
	float l_coef = min(length(backlightAdded),1.0); 
	//base color
	float d_coef = (pow(1.0-length(diffuseColor.rgb),20.0)); 


	diffuseColor.a *= 1.0 - l_coef*d_coef - 0.1*d_coef;
	reflectedLight.directDiffuse.rgb += 0.2*d_coef * l_coef * subsurfacecolor;
	reflectedLight.directDiffuse.rgb += 0.1*d_coef*(1.0-l_coef)*subsurfacecolor;
#endif


	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;

#ifdef CAUSTIC
	float closenessToGround = 1.0 - smoothstep(0.0, 1.1, vWorldPos.y)/1.1;
	float noise1 = 0.5 + cnoise(0.5*vWorldPos.xyz + timeMsec);
	float col1 = pow(0.5 + 0.5 * sin(noise1*1.9*vWorldPos.x),8.0 + sin(timeMsec));
	float col3 = pow(0.5 + 0.5 * cos(noise1*2.1*vWorldPos.z)*cos(noise1*5.0*vWorldPos.z),8.0+ cos(timeMsec));

	float col = min(min( col1, col3),noise1) + 0.1*max(col1,col3);
	outgoingLight += 0.3*col*closenessToGround;
#endif

	gl_FragColor = vec4( outgoingLight, diffuseColor.a);

	#include <encodings_fragment>
	@import ./FogFrag;
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>

	if ( diffuseColor.a < 0.5 ) discard;
}