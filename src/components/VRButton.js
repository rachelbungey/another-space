import AFRAME from "aframe";
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

    const imgs = [
      "01_Ben_Clark",
      "03_River_Cousins",
      "04_Tolga_Tarhan_01",
      "04_Tolga_Tarhan_02",
      "04_Tolga_Tarhan_03",
      "04_Tolga_Tarhan_04",
      "04_Tolga_Tarhan_05",
      "04_Tolga_Tarhan_06",
      "05_Hin_01",
      "05_Hin_02",
      "05_Hin_03",
      "06_Maura_Jamieson",
      "07_James_Mason_01",
      "07_James_Mason_02",
      "07_James_Mason_03",
      "07_James_Mason_04",
      "07_James_Mason_05",
      "07_James_Mason_06",
      "08_Jamal_Finni",
      "09_Bryce_Aspinall",
      "11_Mike_Zimmerman_01",
      "11_Mike_Zimmerman_02",
      "12_Fry_01",
      "13_BD85",
      "14_Mark_Manzi_01",
      "14_Mark_Manzi_02",
      "14_Mark_Manzi_03",
      "15_Kyla_Callista_03",
      "16_Daniel_Euphrat_02",
      "16_Daniel_Euphrat_03",
      "17_Daniel_Emmanuel",
      "18_Sarah_Tucker_04",
      "18_Sarah_Tucker_05",
      "18_Sarah_Tucker_08",
      "19_Sarah_Scattergood",
      "20_Ivy_Mai",
      "21_Henry_Hoffman",
      "22_Kat",
      "23_Shane_Lester_01",
      "23_Shane_Lester_02",
      "26_Peony_Gent_03",
      "26_Peony_Gent_07",
      "26_Peony_Gent_09",
      "27_Joe_Bungey",
      "33_Alex_vernon_03",
      "35_Caitlin_Hickling_01",
      "36_Martha_Bailey_01_01",
      "36_Martha_Bailey_01_02",
      "36_Martha_Bailey_01_03",
      "38_Anna_Sheridan_H2erg_01",
      "38_Anna_Sheridan_H2erg_02",
      "39_Fabrizio_Manzi_01",
      "41_Paul_Beaudoin_01",
      "42_Agnes_Jonas_01",
      "44_Patrick_Saville",
      "1000_Rachel_Bungey_02",
    ];
    
    const scene = document.querySelector('a-scene')
    
    for (let i=0; i < imgs.length; i++) {
      const img = imgs[i];
      
      setTimeout(() => {
        const imgEl = document.createElement('a-entity');
        
        imgEl.setAttribute('cc-material', ''); 
        imgEl.setAttribute('gltf-part', `src: #evironment; part: ${img}`); 

        console.log('[D] Appending ', img)
        
        scene.appendChild(imgEl)
      }, 1000*i);
      
    }
  },
};
