import React, {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {FONT_SIZE, Fonts} from '../Themes/AppTheme';

const HomeScreen: FC = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text
        style={{fontSize: FONT_SIZE.medium_extra, fontFamily: Fonts.Tweb600}}>
        HomeScreen
      </Text>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
