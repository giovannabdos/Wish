import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  FlatList,
  TouchableOpacity,
  View,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import {connect} from 'react-redux';
import {setOtherDesires} from '../redux/actions';
import api from '../services/api';
import Desire from '../components/Desire';
import Container from '../components/Container';
import Select from '../components/Select';
import ContentEmpty from '../components/ContentEmpty';
import uuid from 'react-native-uuid';
import status from '../utils/desireStatus';

function OutrosDesejos({store, navigation, setOtherDesires}) {
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    fetchDesires();
  }, []);

  const fetchDesires = async status => {
    try {
      const response = await api.get(`/users/other-desires?status=${status}`);

      const {desires} = response.data;

      setOtherDesires(
        desires.map(desire => {
          return {
            ...desire,
            uuid: uuid.v4(),
          };
        }),
      );
      setIsLoading(false);
    } catch (response) {
      setIsLoading(false);
    }
  };

  const handleOnChangeStatus = status => {
    setIsLoading(true);
    fetchDesires(status);
  };

  const desiresAlignScrollView = () => {
    if (store.otherDesires.length === 0 && !isRefreshing) {
      return {
        flexGrow: 0.8,
        justifyContent: 'center',
      };
    }
    return {};
  };

  return (
    <Container component={View}>
      <Select list={status} onChange={handleOnChangeStatus} />
      <View style={styles.desiresContainer}>
        {!isLoading ? (
          <FlatList
            data={store.otherDesires}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => navigation.navigate('MyDesiresDetails', {item})}>
                <Desire item={item} />
              </TouchableOpacity>
            )}
            keyExtractor={item => item.id}
            refreshControl={
              <RefreshControl
                colors={['#193E5B']}
                refreshing={isRefreshing}
                onRefresh={async () => {
                  setIsRefreshing(true);
                  await fetchDesires();
                  setIsRefreshing(false);
                }}
              />
            }
            ListEmptyComponent={
              <ContentEmpty text={'Não há outros desejos no momento'} />
            }
            contentContainerStyle={desiresAlignScrollView()}
            showsVerticalScrollIndicator={false}
            style={styles.flatlist}
          />
        ) : (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#193E5B" />
          </View>
        )}
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  desiresContainer: {
    height: '100%',
  },
  loadingContainer: {
    flex: 0.8,
    justifyContent: 'center',
  },
  flatlist: {
    marginBottom: 100,
  },
});

function mapStateToProps(state) {
  return {store: state};
}

export default connect(mapStateToProps, {setOtherDesires})(OutrosDesejos);
