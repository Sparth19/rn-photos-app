import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Metrics from '../Themes/Metrics';
import {Colors, FONT_SIZE, Fonts} from '../Themes/AppTheme';

const CardItem = ({item}) => {
  return (
    <View style={{marginLeft: Metrics.rfv(10), marginBottom: Metrics.rfv(15)}}>
      <Image
        source={{uri: item.src.medium}}
        style={{
          height: item.height / 20,
          width: Metrics.width / 2 - Metrics.rfv(15),
          borderRadius: Metrics.rfv(14),
          backgroundColor: item.avg_color || Colors.greyTheme1,
        }}
      />
      <Text
        numberOfLines={2}
        style={{
          color: Colors.white,
          fontFamily: Fonts.Tweb600,
          fontSize: FONT_SIZE.small_medium,
          marginTop: Metrics.rfv(5),
        }}>
        {item.alt || item.photographer}
      </Text>
    </View>
  );
};

export default CardItem;

const styles = StyleSheet.create({});
