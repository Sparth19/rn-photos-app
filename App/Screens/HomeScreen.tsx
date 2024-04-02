import React, {FC, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Colors, FONT_SIZE, Fonts} from '../Themes/AppTheme';
import {fetchPhotos} from '../Helper/api';
import {Photo} from '../Helper/interface';
import MasonryList from '@react-native-seoul/masonry-list';
import CardItem from '../Components/CardItem';
import Metrics from '../Themes/Metrics';
import SearchBar from '../Components/SearchBar';

const HomeScreen: FC = () => {
  const [data, setData] = useState<Photo[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  const getData = async (pageNum = 1) => {
    console.log(pageNum);
    try {
      setLoading(true);
      const result = await fetchPhotos(pageNum);
      const {photos, total_results, page} = result;
      setData(prev => [...prev, ...photos]);
      setTotalCount(total_results);
      setCurrentPage(page);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const loadMoreData = () => {
    if (!loading && data.length < totalCount) {
      getData(currentPage + 1);
      setCurrentPage(c => c + 1);
    }
  };

  const Temp = () => {
    return (
      <ActivityIndicator
        color={Colors.redTheme1}
        size={'large'}
        style={{marginVertical: Metrics.rfv(30)}}
      />
    );
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: Colors.black,
      }}>
      <SearchBar />
      <MasonryList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => <CardItem item={item} />}
        ListFooterComponent={<Temp />}
        refreshing={true}
        onEndReachedThreshold={0.1}
        onEndReached={loadMoreData}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
