import CausticVert from './CausticVert.glsl';
import CausticFrag from './CausticFrag.glsl';

export const Caustic = {
  schema: {
    timeMsec: { type: 'time', is: 'uniform' },
  },
  vertexShader: CausticVert,
  fragmentShader: CausticFrag,
};
