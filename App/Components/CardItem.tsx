import React, {FC, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Metrics from '../Themes/Metrics';
import {Colors, FONT_SIZE, Fonts} from '../Themes/AppTheme';
import Modal from 'react-native-modal';
import FastImage from 'react-native-fast-image';
import isEmpty from 'lodash/isEmpty';
import IconMaterial from 'react-native-vector-icons/MaterialIcons';
import {downloadImageRemote} from '../Helper/functions';

interface Item {
  src: {
    medium: string;
    original: string;
  };
  height: number;
  avg_color?: string;
  alt?: string;
  photographer?: string;
}

interface Props {
  item: Item;
}

const SCREEN_HEIGHT = Dimensions.get('screen').height;

const CardItem: FC<Props> = ({item}) => {
  const [preview, setPreview] = useState<Item | null>();
  const [loading, setLoading] = useState<boolean>(false);

  const toggleImagePreview = (item: Item | null) => setPreview(item);

  const closePreview = () => toggleImagePreview(null);

  const renderPreviewModal = () => {
    return (
      <Modal
        isVisible={!isEmpty(preview)}
        animationIn={'zoomIn'}
        animationOut={'zoomOut'}
        onBackdropPress={closePreview}
        style={styles.modalView}
        statusBarTranslucent
        onBackButtonPress={closePreview}>
        <View style={styles.modalView}>
          {loading ? (
            <View style={styles.loader}>
              <ActivityIndicator size={Metrics.rfv(25)} color={Colors.white} />
            </View>
          ) : null}
          <FastImage
            source={{uri: preview?.src?.original}}
            onLoadStart={() => setLoading(true)}
            onLoadEnd={() => setLoading(false)}
            style={{
              width: Metrics.width,
              height: SCREEN_HEIGHT,
              backgroundColor: preview?.avg_color || Colors.greyTheme1,
            }}
            resizeMode={'cover'}
          />
          <View
            style={{
              ...styles.btnView,
              left: Metrics.rfv(20),
            }}>
            <TouchableOpacity onPress={closePreview} style={styles.imageBg}>
              <IconMaterial
                name={'arrow-back-ios-new'}
                size={Metrics.rfv(20)}
                color={Colors.white}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              ...styles.btnView,
              right: Metrics.rfv(20),
            }}>
            <TouchableOpacity
              onPress={() => downloadImageRemote(preview?.src?.original)}
              style={styles.imageBg}>
              <IconMaterial
                name={'file-download'}
                size={Metrics.rfv(20)}
                color={Colors.white}
              />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };
  return (
    <View style={styles.mainView}>
      {preview ? renderPreviewModal() : null}
      <TouchableOpacity onPress={() => toggleImagePreview(item)}>
        <FastImage
          source={{uri: item.src.medium}}
          style={{
            ...styles.image,
            height: item.height / 20,
            backgroundColor: item.avg_color || Colors.greyTheme1,
          }}
        />
      </TouchableOpacity>
      <Text numberOfLines={2} style={styles.text}>
        {item.alt || item.photographer}
      </Text>
    </View>
  );
};

export default CardItem;

const styles = StyleSheet.create({
  image: {
    width: Metrics.width / 2 - Metrics.rfv(22),
    borderRadius: Metrics.rfv(14),
  },
  mainView: {
    flex: 1,
    marginBottom: Metrics.rfv(15),
  },
  text: {
    color: Colors.white,
    fontFamily: Fonts.Tweb600,
    fontSize: FONT_SIZE.small_medium,
    marginTop: Metrics.rfv(5),
  },
  btnView: {
    flex: 1,
    position: 'absolute',
    top: Metrics.rfv(50),
  },
  imageBg: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: Metrics.rfv(35),
    width: Metrics.rfv(35),
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: Metrics.rfv(30),
  },
  loader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    zIndex: 2,
  },
  modalView: {
    margin: 0,
    flex: 1,
  },
});
