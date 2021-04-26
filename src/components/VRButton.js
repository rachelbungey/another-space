import AFRAME, { components } from "aframe";
const THREE = AFRAME.THREE;

export default {
  init: function () {
    this.el.setAttribute("vr-mode-ui", "enabled: false");

    if ("xr" in navigator) {
      navigator.xr.isSessionSupported("immersive-vr").then((supported) => {
        if (supported) {
          // Only show VR button if VR mode is supported
          this.el.setAttribute("vr-mode-ui", "enabled: true");
        }
      });
    }

    const entities = [
      /**
       * VIDEOS
       */
      [
        ["gltf-part", "src: #evironment; part: 29_Harddrive1"],
        ["video", "src: #harddrive-29; triggerRadius: 4"],
      ],
      [
        ["gltf-part", "src: #evironment; part: 37_Emilia_Wingfield"],
        ["video", "src: #emilia_wingfield-37"],
      ],
      [
        ["gltf-part", "src: #evironment; part: 31_Alex_Bois"],
        ["video", "src: #alex_bois-31"],
      ],
      [
        ["gltf-part", "src: #evironment; part: 02_Flora"],
        ["video", "src: #flora-02"],
      ],
      [
        ["gltf-part", "src: #evironment; part: 10_Bram_smiley"],
        ["video", "src: #bram_smiley-10"],
      ],
      [
        ["gltf-part", "src: #evironment; part: 43_Joel_Scott"],
        ["video", "src: #joel_scott-43"],
      ],
      [
        ["gltf-part", "src: #evironment; part: 34_Louise_Silfversparre_01"],
        ["video", "src: #louise_silfversparre_34_01"],
      ],
      [
        ["gltf-part", "src: #evironment; part: 34_Louise_Silfversparre_02"],
        ["video", "src: #louise_silfversparre_34_02"],
      ],
      [
        ["gltf-part", "src: #evironment; part: 34_Louise_Silfversparre_03"],
        ["video", "src: #louise_silfversparre_34_03"],
      ],
      [
        ["gltf-part", "src: #evironment; part: 34_Louise_Silfversparre_04"],
        ["video", "src: #louise_silfversparre_34_04"],
      ],
      [
        ["gltf-part", "src: #evironment; part: 34_Louise_Silfversparre_05"],
        ["video", "src: #louise_silfversparre_34_05"],
      ],
      [
        ["gltf-part", "src: #evironment; part: 34_Louise_Silfversparre_06"],
        ["video", "src: #louise_silfversparre_34_06"],
      ],
      [
        ["gltf-part", "src: #evironment; part: 1000_Rachel_Bungey_03"],
        ["video", "src: #rachel_bungey_03; triggerRadius: 4"],
      ],
      /**
       * IMAGES
       */
      [
        ["cc-material", ""],
        ["gltf-part", "src: #evironment; part: 01_Ben_Clark"],
      ],
      [
        ["cc-material", ""],
        ["gltf-part", "src: #evironment; part: 03_River_Cousins"],
      ],
      [
        ["cc-material", ""],
        ["gltf-part", "src: #evironment; part: 04_Tolga_Tarhan_01"],
      ],
      [
        ["cc-material", ""],
        ["gltf-part", "src: #evironment; part: 04_Tolga_Tarhan_02"],
      ],
      [
        ["cc-material", ""],
        ["gltf-part", "src: #evironment; part: 04_Tolga_Tarhan_03"],
      ],
      [
        ["cc-material", ""],
        ["gltf-part", "src: #evironment; part: 04_Tolga_Tarhan_04"],
      ],
      [
        ["cc-material", ""],
        ["gltf-part", "src: #evironment; part: 04_Tolga_Tarhan_05"],
      ],
      [
        ["cc-material", ""],
        ["gltf-part", "src: #evironment; part: 04_Tolga_Tarhan_06"],
      ],
      [
        ["cc-material", ""],
        ["gltf-part", "src: #evironment; part: 05_Hin_01"],
      ],
      [
        ["cc-material", ""],
        ["gltf-part", "src: #evironment; part: 05_Hin_02"],
      ],
      [
        ["cc-material", ""],
        ["gltf-part", "src: #evironment; part: 05_Hin_03"],
      ],
      [
        ["cc-material", ""],
        ["gltf-part", "src: #evironment; part: 06_Maura_Jamieson"],
      ],
      [
        ["cc-material", ""],
        ["gltf-part", "src: #evironment; part: 07_James_Mason_01"],
      ],
      [
        ["cc-material", ""],
        ["gltf-part", "src: #evironment; part: 07_James_Mason_02"],
      ],
      [
        ["cc-material", ""],
        ["gltf-part", "src: #evironment; part: 07_James_Mason_03"],
      ],
      [
        ["cc-material", ""],
        ["gltf-part", "src: #evironment; part: 07_James_Mason_04"],
      ],
      [
        ["cc-material", ""],
        ["gltf-part", "src: #evironment; part: 07_James_Mason_05"],
      ],
      [
        ["cc-material", ""],
        ["gltf-part", "src: #evironment; part: 07_James_Mason_06"],
      ],
      [
        ["cc-material", ""],
        ["gltf-part", "src: #evironment; part: 08_Jamal_Finni"],
      ],
      [
        ["cc-material", ""],
        ["gltf-part", "src: #evironment; part: 09_Bryce_Aspinall"],
      ],
      [
        ["cc-material", ""],
        ["gltf-part", "src: #evironment; part: 11_Mike_Zimmerman_01"],
      ],
      [
        ["cc-material", ""],
        ["gltf-part", "src: #evironment; part: 11_Mike_Zimmerman_02"],
      ],
      [
        ["cc-material", ""],
        ["gltf-part", "src: #evironment; part: 12_Fry_01"],
      ],
      [
        ["cc-material", ""],
        ["gltf-part", "src: #evironment; part: 13_BD85"],
      ],
      [
        ["cc-material", ""],
        ["gltf-part", "src: #evironment; part: 14_Mark_Manzi_01"],
      ],
      [
        ["cc-material", ""],
        ["gltf-part", "src: #evironment; part: 14_Mark_Manzi_02"],
      ],
      [
        ["cc-material", ""],
        ["gltf-part", "src: #evironment; part: 14_Mark_Manzi_03"],
      ],
      [
        ["cc-material", ""],
        ["gltf-part", "src: #evironment; part: 15_Kyla_Callista_03"],
      ],
      [
        ["cc-material", ""],
        ["gltf-part", "src: #evironment; part: 16_Daniel_Euphrat_02"],
      ],
      [
        ["cc-material", ""],
        ["gltf-part", "src: #evironment; part: 16_Daniel_Euphrat_03"],
      ],
      [
        ["cc-material", ""],
        ["gltf-part", "src: #evironment; part: 17_Daniel_Emmanuel"],
      ],
      [
        ["cc-material", ""],
        ["gltf-part", "src: #evironment; part: 18_Sarah_Tucker_04"],
      ],
      [
        ["cc-material", ""],
        ["gltf-part", "src: #evironment; part: 18_Sarah_Tucker_05"],
      ],
      [
        ["cc-material", ""],
        ["gltf-part", "src: #evironment; part: 18_Sarah_Tucker_08"],
      ],
      [
        ["cc-material", ""],
        ["gltf-part", "src: #evironment; part: 19_Sarah_Scattergood"],
      ],
      [
        ["cc-material", ""],
        ["gltf-part", "src: #evironment; part: 20_Ivy_Mai"],
      ],
      [
        ["cc-material", ""],
        ["gltf-part", "src: #evironment; part: 21_Henry_Hoffman"],
      ],
      [
        ["cc-material", ""],
        ["gltf-part", "src: #evironment; part: 22_Kat"],
      ],
      [
        ["cc-material", ""],
        ["gltf-part", "src: #evironment; part: 23_Shane_Lester_01"],
      ],
      [
        ["cc-material", ""],
        ["gltf-part", "src: #evironment; part: 23_Shane_Lester_02"],
      ],
      [
        ["cc-material", ""],
        ["gltf-part", "src: #evironment; part: 26_Peony_Gent_03"],
      ],
      [
        ["cc-material", ""],
        ["gltf-part", "src: #evironment; part: 26_Peony_Gent_07"],
      ],
      [
        ["cc-material", ""],
        ["gltf-part", "src: #evironment; part: 26_Peony_Gent_09"],
      ],
      [
        ["cc-material", ""],
        ["gltf-part", "src: #evironment; part: 27_Joe_Bungey"],
      ],
      [
        ["cc-material", ""],
        ["gltf-part", "src: #evironment; part: 33_Alex_vernon_03"],
      ],
      [
        ["cc-material", ""],
        ["gltf-part", "src: #evironment; part: 35_Caitlin_Hickling_01"],
      ],
      [
        ["cc-material", ""],
        ["gltf-part", "src: #evironment; part: 36_Martha_Bailey_01_01"],
      ],
      [
        ["cc-material", ""],
        ["gltf-part", "src: #evironment; part: 36_Martha_Bailey_01_02"],
      ],
      [
        ["cc-material", ""],
        ["gltf-part", "src: #evironment; part: 36_Martha_Bailey_01_03"],
      ],
      [
        ["cc-material", ""],
        ["gltf-part", "src: #evironment; part: 38_Anna_Sheridan_H2erg_01"],
      ],
      [
        ["cc-material", ""],
        ["gltf-part", "src: #evironment; part: 38_Anna_Sheridan_H2erg_02"],
      ],
      [
        ["cc-material", ""],
        ["gltf-part", "src: #evironment; part: 39_Fabrizio_Manzi_01"],
      ],
      [
        ["cc-material", ""],
        ["gltf-part", "src: #evironment; part: 41_Paul_Beaudoin_01"],
      ],
      [
        ["cc-material", ""],
        ["gltf-part", "src: #evironment; part: 42_Agnes_Jonas_01"],
      ],
      [
        ["cc-material", ""],
        ["gltf-part", "src: #evironment; part: 44_Patrick_Saville"],
      ],
      [
        ["cc-material", ""],
        ["gltf-part", "src: #evironment; part: 1000_Rachel_Bungey_02"],
      ],
    ];

    for (let i = 0; i < entities.length; i++) {
      const scene = document.querySelector("a-scene");
      const aEntity = document.createElement("a-entity");

      for (let j = 0; j < entities[i].length; j++) {
        const component = entities[i][j];
        const [name, value] = component;

        aEntity.setAttribute(name, value);
      }

      setTimeout(() => {
        console.log("[D] Appending a-entity", aEntity);
        scene.appendChild(aEntity);
      }, 1000 * i);
    }
  },
};
