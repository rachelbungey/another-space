import AFRAME from 'aframe';
const THREE = AFRAME.THREE;

import { Sky } from '../libs/Sky.js';

export default {
  init: function () {
    var sky = new Sky();
    sky.scale.setScalar(450000);
    sky.frustumCulled = false;
    this.el.object3D.add(sky);

    // calculate sun position
    var inclination = 1;
    var azimuth = 0.8;

    var theta = Math.PI * (inclination - 0.5);
    var phi = 2 * Math.PI * (azimuth - 0.5);
    var distance = 400000;

    this.sunPosition = new THREE.Vector3(
      distance * Math.cos(phi),
      distance * Math.sin(phi) * Math.sin(theta),
      distance * Math.sin(phi) * Math.cos(theta),
    );

    sky.material.uniforms['sunPosition'].value.copy(this.sunPosition);
  },
  tick: function (time, timeDelta) {},
}