const THREE = AFRAME.THREE;
require('super-three/examples/js/objects/Reflector');

export default {
  schema: {
    color: { type: 'color', default: '#ffffff' }
  },

  init: function () {
    this.el.addEventListener("object3dset", () => {
      this.mesh = this.el.getObject3D("mesh");
      const reflector = new THREE.Reflector(this.mesh.geometry, {
        clipBias: 0.003,
        textureWidth: window.innerWidth * window.devicePixelRatio,
        textureHeight: window.innerHeight * window.devicePixelRatio,
        color: 0x777777
      });
      reflector.position.copy(this.mesh.position)
      this.el.object3D.add(reflector)
      this.mesh.visible = false;
    });
  },

  update: function () {
  },
  
  tick: function (time) {
  },
};
