import React, {FC} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import Metrics from '../Themes/Metrics';
import {Colors, FONT_SIZE, Fonts} from '../Themes/AppTheme';

interface Item {
  src: {
    medium: string;
  };
  height: number;
  avg_color?: string;
  alt?: string;
  photographer?: string;
}

interface Props {
  item: Item;
}

const CardItem: FC<Props> = ({item}) => {
  return (
    <View style={styles.mainView}>
      <Image
        source={{uri: item.src.medium}}
        style={{
          ...styles.image,
          height: item.height / 20,
          backgroundColor: item.avg_color || Colors.greyTheme1,
        }}
      />
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
});
