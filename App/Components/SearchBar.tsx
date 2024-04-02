import {SafeAreaView, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import {Colors, FONT_SIZE, Fonts} from '../Themes/AppTheme';
import Metrics from '../Themes/Metrics';

const SearchBar = () => {
  const [query, setQuery] = useState<string>('');

  return (
    <View
      style={{
        height: 35,
        backgroundColor: Colors.greyTheme1,
        marginHorizontal: Metrics.rfv(10),
        borderRadius: Metrics.rfv(5),
        marginBottom: Metrics.rfv(15),
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <TextInput
        style={styles.input}
        onChangeText={v => setQuery(v)}
        value={query}
        placeholder="useless placeholder"
        keyboardType="numeric"
        cursorColor={Colors.white}
      />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  input: {
    color: Colors.white,
    fontFamily: Fonts.Tweb600,
    fontSize: FONT_SIZE.small_medium,
    paddingHorizontal: Metrics.rfv(10),
  },
});
