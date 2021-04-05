import AFRAME from "aframe";
const THREE = AFRAME.THREE;

export default {
  schema: {
    src: { type: "asset" },
    triggerRadius: { default: 2 },
  },

  init: function () {
    this.mesh = null;

    this.el.addEventListener("object3dset", () => {
      this.mesh = this.el.getObject3D("mesh");
      const texture = new THREE.VideoTexture(this.data.src);

      texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.y = -1;

      const mat = new THREE.MeshBasicMaterial({
        map: texture,
      });

      this.mesh.material = mat;
      this.mesh.material.needUpdate = true;
    });

    const camera = document.querySelector("#camera");
    this.timeOfLookAt = 0;
    this.camera = camera.object3D;
    this.cameraWorldPos = new THREE.Vector3();
    this.objWorldPos = new THREE.Vector3();
    this.canPause = false;
    this.data.src.play();
  },

  tick: function (time, deltaTime) {
    if(!this.canPause) {
      if(this.data.src.currentTime > 2) {
        this.data.src.pause();
        this.canPause = true;
      }
      return;
    }

    this.camera.getWorldPosition(this.cameraWorldPos);

    if (this.mesh) {
      this.mesh.getWorldPosition(this.objWorldPos);
    }

    let dist = this.cameraWorldPos.distanceTo(this.objWorldPos);

    if (dist > this.data.triggerRadius) {
      this.data.src.pause();
      this.data.src.muted = true;
      this.timeOfLookAt = 0.0;
    } else {
      this.data.src.play();
      this.data.src.muted = false;
      this.timeOfLookAt += deltaTime / 1000;
    }
  },
};
