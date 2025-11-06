import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {Dimensions} from 'react-native';

export const hexToRgba = (hex, opacity) => {
  // Remove the hash at the start if it's there
  hex = hex.replace(/^#/, '');

  // Parse the r, g, b values
  let r = parseInt(hex.substring(0, 2), 16);
  let g = parseInt(hex.substring(2, 4), 16);
  let b = parseInt(hex.substring(4, 6), 16);

  // Return the RGBA color
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

export const SCREEN_WIDTH = Dimensions.get('window').width;
export const SCREEN_HEIGHT = Dimensions.get('window').height;

export const SW = dimension => {
  return wp((dimension / 375) * 100 + '%');
};

export const SH = dimension => {
  return hp((dimension / 812) * 100 + '%');
};

export const SF = dimension => {
  return hp((dimension / 812) * 100 + '%');
};

export const heightPercent = percent => {
  return hp(percent);
};

export const widthPercent = percent => {
  return wp(percent);
};

export const fontPercent = percent => {
  return hp(percent);
};

