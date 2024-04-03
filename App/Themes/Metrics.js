import {Dimensions, Platform, StatusBar} from 'react-native';
import {isIphoneNotch, isTablet} from './iPhoneX';

const {width, height} = Dimensions.get('window');

const standardLength = width > height ? width : height;
const offset =
  width > height ? 0 : Platform.OS === 'ios' ? 78 : StatusBar.currentHeight; // iPhone X style SafeAreaView size in portrait
const deviceHeight =
  isIphoneNotch() || Platform.OS === 'android'
    ? standardLength - offset
    : standardLength;

// used for responsive UI across all screen sizes according to screen width/height
function RFValue(fontSize, standardScreenHeight = 812) {
  const size = 375;
  const wid = width < height ? width : height;
  const heightPercent = (fontSize * deviceHeight) / standardScreenHeight;

  const res =
    Platform.isPad || isTablet() || width > 500
      ? heightPercent.toFixed(2)
      : wid / (size / fontSize);
  return Number(res);
}

const Metrics = {
  width: width < height ? width : height,
  height: height < width ? width : height,
  rfv: RFValue,
};

export default Metrics;
