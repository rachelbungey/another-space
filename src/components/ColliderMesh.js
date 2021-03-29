const THREE = AFRAME.THREE;

export default {
  schema: {},

  init: function () {
    //register  
    this.camera = document.querySelector('#camera-rig');
    this.el.sceneEl.addEventListener('loaded', () => {
      this.collisionsystem = this.camera.components['collisions'];
    });

    this.el.addEventListener("object3dset", () => {
      const mesh = this.el.getObject3D("mesh");
      this.collisionsystem.registerCollider(mesh);
    });
  },
  tick: function (time, timeDelta) {
  },
};
