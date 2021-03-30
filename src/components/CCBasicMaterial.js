import AFRAME from "aframe";
const THREE = AFRAME.THREE;

import CCBasicVert from "../shaders/CCBasicVert.glsl";
import CCBasicFrag from "../shaders/CCBasicFrag.glsl";

export default {
  schema: {
    timeMsec: { default: 1 },
    color: { type: "color", default: "#ffffff" },
    vertexColors: { type: "string", default: "" },
    instanced: { type: "bool", default: false },
    transparent: { type: "bool", default: false },
  },

  init: function () {
    const { vertexColors, color, transparent } = this.data;
    this.uniforms = this.initVariables(this.data);
    this.vAmt = 0.0;

    this.materialOptions = {
      color: new THREE.Color(color),
      side: THREE.DoubleSide,
      transparent: transparent,
    };

    switch (vertexColors) {
      case "":
        break;

      case "vertex":
        this.materialOptions.vertexColors = THREE.VertexColors;
        break;

      case "face":
        this.materialOptions.vertexColors = THREE.FaceColors;
        break;

      default:
        console.log(
          'Unknown value for vertexColor parameter. Accepted values are "vertex" or "face".'
        );
        break;
    }

    //push atleast one
    let mat = this.createMaterial(this.materialOptions);

    this.basicMats = [mat];
    this.materialShaders = [];

    // Set materials on default primitives
    this.setChildMaterials();

    this.el.addEventListener("object3dset", () => {
      this.setChildMaterials();
    });

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
      shader.vertexShader = CCBasicVert;
      shader.fragmentShader = CCBasicFrag;
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
      variables[key] = {
        value: data[key],
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
      this.materialShaders.forEach((shader) => {
        shader.uniforms[key].value = data[key];
        shader.uniforms[key].needsUpdate = true;
      });
    }
  },

  tick: function (time, timeDelta) {
    if (this.materialShaders.length > 0) {
      this.materialShaders.forEach((shader) => {
        shader.uniforms.timeMsec.value = time;
      });
    }
  },
};
