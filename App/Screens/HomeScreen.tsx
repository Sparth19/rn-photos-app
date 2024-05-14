import React, {FC, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {Colors, FONT_SIZE, Fonts} from '../Themes/AppTheme';
import {fetchPhotos, searchPhotos} from '../Helper/api';
import {Photo} from '../Helper/interface';
import MasonryList from '@react-native-seoul/masonry-list';
import CardItem from '../Components/CardItem';
import Metrics from '../Themes/Metrics';
import {useDebouncedCallback} from 'use-debounce';
import {isIphoneNotch} from '../Themes/iPhoneX';
import FastImage from 'react-native-fast-image';
import IconMC from 'react-native-vector-icons/MaterialCommunityIcons';

const HomeScreen: FC = () => {
  const [data, setData] = useState<Photo[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [query, setQuery] = useState<string>('');

  const getData = async (pageNum = 1) => {
    try {
      if (pageNum === 1) setLoading(true);
      else setLoadingMore(true);
      const result = query
        ? await searchPhotos(query, pageNum)
        : await fetchPhotos(pageNum);
      const {photos, total_results, page} = result;
      setData(prev => (pageNum === 1 ? [...photos] : [...prev, ...photos]));
      setTotalCount(total_results);
      setCurrentPage(page);

      setError(false);
    } catch (error) {
      setError(true);
    } finally {
      setLoadingMore(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const loadMoreData = () => {
    if (!loadingMore && data.length < totalCount) {
      getData(currentPage + 1);
      setCurrentPage(c => c + 1);
    }
  };

  const debounced = useDebouncedCallback(async () => {
    getData();
  }, 500);

  const handleSearchTextChange = async (value: string) => {
    setQuery(value);
    setCurrentPage(0);
    if (value?.length > 2 || value === '') await debounced();
  };

  const Temp = () => {
    return loadingMore ? (
      <ActivityIndicator
        color={Colors.redTheme1}
        size={'large'}
        style={styles.mv30}
      />
    ) : null;
  };

  if (error) {
    return (
      <View style={styles.centerView}>
        <Text style={styles.errorText}>Something went wrong!</Text>
        <TouchableOpacity style={styles.retryBtn} onPress={getData}>
          <Text style={{...styles.errorText, color: Colors.black}}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.mainScreen}>
      <StatusBar backgroundColor={Colors.black} barStyle={'light-content'} />
      <View style={styles.searchBar}>
        <TextInput
          style={styles.input}
          onChangeText={handleSearchTextChange}
          value={query}
          placeholder="Search the idea"
          placeholderTextColor={Colors.white}
          cursorColor={Colors.white}
        />
        <TouchableOpacity
          onPress={() => handleSearchTextChange('')}
          hitSlop={{top: 10, right: 10, bottom: 10, left: 10}}>
          <IconMC
            name={'close-circle'}
            color={Colors.white}
            size={Metrics.rfv(23)}
          />
        </TouchableOpacity>
      </View>
      {loading ? (
        <ActivityIndicator
          color={Colors.redTheme1}
          size={'large'}
          style={styles.centerView}
        />
      ) : data?.length ? (
        <MasonryList
          data={data}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => <CardItem item={item} />}
          ListFooterComponent={<Temp />}
          onEndReachedThreshold={0.1}
          onEndReached={loadMoreData}
          style={styles.ml15}
        />
      ) : (
        <View style={styles.centerView}>
          <Text style={styles.errorText}>No image found!</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  input: {
    flex: 1,
    color: Colors.white,
    fontFamily: Fonts.Tweb600,
    fontSize: FONT_SIZE.small_medium,
    paddingHorizontal: Metrics.rfv(10),
    paddingVertical: 0,
  },
  searchBar: {
    height: Metrics.rfv(40),
    backgroundColor: Colors.greyTheme1,
    marginHorizontal: Metrics.rfv(15),
    borderRadius: Metrics.rfv(5),
    marginBottom: Metrics.rfv(15),
    marginTop: isIphoneNotch() ? 0 : Metrics.rfv(15),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: Metrics.rfv(10),
  },
  mainScreen: {
    flex: 1,
    backgroundColor: Colors.black,
  },
  errorText: {
    color: Colors.white,
    fontFamily: Fonts.Tweb600,
    fontSize: FONT_SIZE.medium,
  },
  centerView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.black,
  },
  mv30: {
    marginVertical: Metrics.rfv(30),
  },
  ml15: {
    marginLeft: Metrics.rfv(15),
  },
  image: {
    height: Metrics.rfv(22),
    width: Metrics.rfv(22),
  },
  retryBtn: {
    backgroundColor: Colors.white,
    paddingHorizontal: Metrics.rfv(10),
    paddingVertical: Metrics.rfv(3),
    margin: Metrics.rfv(10),
    borderRadius: Metrics.rfv(5),
  },
});
