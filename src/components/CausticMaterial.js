import AFRAME from "aframe";
const THREE = AFRAME.THREE;

import CausticVert from "../shaders/CausticVert.glsl";
import CausticFrag from "../shaders/CausticFrag.glsl";

export default {
  schema: {
    timeMsec: { default: 1 },
    diffuseTexMult: { default: 1 },
    color: { type: "color", default: "#ffffff" },
    color1: { type: "color", default:"#ffffff"},
    color2: { type: "color", default:"#ffffff"},
    alphaVal: { type: "float", default: 1 },
  },

  init: function () {
    const { color, alphaVal } = this.data;
    this.uniforms = this.initVariables(this.data);
    this.vAmt = 0.0;
    let transparent = (alphaVal < 0.99);
    this.materialOptions = {
      color: new THREE.Color(color),
      side: THREE.DoubleSide,
      transparent: transparent,
    };

    //push atleast one
    let mat = this.createMaterial(this.materialOptions);

    this.basicMats = [mat];
    this.materialShaders = [];

    // Set materials on default primitives
    this.setChildMaterials();

    this.el.addEventListener("object3dset", () => {
      this.setChildMaterials();
    });

    this.fractBy3 = new THREE.Vector3();
  },

  /** Assign material to all child meshes */
  setChildMaterials: function () {
    const { instanced } = this.data;
    this.el.object3D.traverse((child) => {
      if (child.type === "Mesh" && child.name !== "collider") {
        let mat;
        if (!instanced) {
          mat = this.basicMats[0];
        } else {
          // make a new material
          mat = this.createMaterial(this.materialOptions);
          this.basicMats.push(mat);
        }

        if (child.material.map) {
          mat.map = child.material.map;
        }
        child.material = mat;
      }
    });
  },

  createMaterial: function (materialOptions) {
    let mat = new THREE.MeshPhongMaterial(materialOptions);
    mat.defines = {};
    mat.onBeforeCompile = (shader) => {
      shader.uniforms = THREE.UniformsUtils.merge([
        this.uniforms,
        shader.uniforms,
      ]);
      shader.vertexShader = CausticVert;
      shader.fragmentShader = CausticFrag;
      this.materialShaders.push(shader);
    };

    mat.extensions = {
      derivatives: true,
    };
    return mat;
  },

  initVariables: function (data, type) {
    let key;
    let variables = {};
    for (key in data) {
      let val = data[key]
      if(key.includes("color")) {
        val = new THREE.Color(val);
      }
      variables[key] = {
        value: val,
      };
    }
    return variables;
  },

  update: function (data) {
    if (this.materialShaders.length <= 0) {
      return;
    }

    let key;
    for (key in data) {
      let val = data[key]
      if(key.includes("color")) {
        val = new THREE.Color(val);
      }
      this.materialShaders.forEach((shader) => {
        shader.uniforms[key].value = val;
        shader.uniforms[key].needsUpdate = true;
      });
    }
  },

  tick: function (time, timeDelta) {
    this.materialShaders.forEach((shader) => {
      shader.uniforms.timeMsec.value = time/20000;
    });
  },
};
