const THREE = AFRAME.THREE;
require('super-three/examples/js/objects/Reflector');

export default {
  schema: {
    speed: { type: 'number', default: 1 }
  },

  init: function () {
    this.el.addEventListener("object3dset", () => {
      this.mesh = this.el.getObject3D("mesh");
    });
  },
  
  tick: function (time) {
    if (this.mesh) {
      this.mesh.rotation.y += 0.001 * this.data.speed;
    }
  },
};
