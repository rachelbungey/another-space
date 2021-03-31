import AFRAME from 'aframe';

require('aframe-extras');
require('aframe-log-component');

import KeyboardControls from './components/KeyboardControls';
import VRControls from './components/VRControls';
import QuickTurn from './components/QuickTurn';
import Mover from './components/Mover';
import Collisions from './components/Collisions';
import ColliderMesh from './components/ColliderMesh';

import CustomVRController from './components/CustomVRController';
import VRButton from './components/VRButton';
import SideArrows from './components/SideArrows';

import ExampleSystem from './systems/ExampleSystem';
import SoundSystem from './systems/SoundSystem';
import GLTFPart from './components/GLTFPart';
import CausticMaterial from './components/CausticMaterial';
import CCBasicMaterial from './components/CCBasicMaterial';
import ChromeMaterial from './components/ChromeMaterial';

// Register all shaders

// Register all systems
AFRAME.registerSystem('example-system', ExampleSystem);
AFRAME.registerSystem('sound-system', SoundSystem);

// Register all components
AFRAME.registerComponent('cc-keyboard-controls', KeyboardControls);
AFRAME.registerComponent('cc-vr-controls', VRControls);
AFRAME.registerComponent('quick-turn', QuickTurn);
AFRAME.registerComponent('mover', Mover);
AFRAME.registerComponent('collider', ColliderMesh);
AFRAME.registerComponent('collisions', Collisions);
AFRAME.registerComponent('custom-vr-controller', CustomVRController);
AFRAME.registerComponent('vr-button', VRButton);
AFRAME.registerComponent('gltf-part', GLTFPart);
AFRAME.registerComponent('side-arrows', SideArrows);
AFRAME.registerComponent('caustic-material', CausticMaterial);
AFRAME.registerComponent('cc-material', CCBasicMaterial);
AFRAME.registerComponent('chrome-material', ChromeMaterial);
