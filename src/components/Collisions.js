const THREE = AFRAME.THREE;

export default {
  schema: {},

  init: function () {
    //register  
    this.colliders = []
    this.raycaster = new THREE.Raycaster();
    this.ORIGIN = new THREE.Vector3();
    this.DIR = new THREE.Vector3();
    this.UP = new THREE.Vector3(0,1,0);
    this.forwardDir = new THREE.Vector3();
    this.mainCamera = document.querySelector('#camera').object3D;
  },
  registerCollider: function (mesh) {
    this.colliders.push(mesh)
  },
  checkCollisions: function(pos, dir, timeDelta) {
    this.ORIGIN.copy(pos);
    this.ORIGIN.y += 1
    this.DIR.copy(dir);
    this.raycaster.set(this.ORIGIN, this.DIR.normalize());
    let intersects = this.raycaster.intersectObjects(this.colliders);
    if (intersects[0] && intersects[0].distance < 1) {
        //do not allow movement
        this.mainCamera.getWorldDirection(this.forwardDir)
        let slide = new THREE.Vector3().crossVectors(this.UP, intersects[0].face.normal).normalize().multiplyScalar(timeDelta/1000);

        let dot = this.forwardDir.dot(slide);
        if(dot > 0) {
          slide.multiplyScalar(-1);
        }
        return [true, slide];
    }
    return [false, 0];
  }, 

  tick: function (time, timeDelta) {
  },
};
