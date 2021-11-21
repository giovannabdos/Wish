import React, {useMemo} from 'react';
import {ScrollView, View, Text, Dimensions, StyleSheet} from 'react-native';
import {LineChart as LineChartCore} from 'react-native-chart-kit';

const {width} = Dimensions.get('window');

const colors = ['#193E5B', '#F3B516'];

export default function LineChart({data}) {
  const multipleDatasets = useMemo(() => {
    return data?.datasets.length > 1;
  }, [data]);

  const yAxisBiggestTextLength = useMemo(() => {
    if (data.datasets) {
      return Math.max(...[].concat(...data.datasets)).toString().length;
    }
    return 1;
  }, [data]);
  
  const segments = useMemo(() => {
    uniqueItems = [...new Set([].concat(...data.datasets))]
    if (uniqueItems.length <= 2) {
      return 2
    }
    if (uniqueItems.length < 5) {
      return uniqueItems.length - 1
    }
    return 4
  }, [data])

  const offsetAxis = useMemo(() => {
    if (yAxisBiggestTextLength === 1 || yAxisBiggestTextLength === 2) {
      return 20;
    } else if (yAxisBiggestTextLength === 3) {
      return 10;
    } else if (
      yAxisBiggestTextLength === 4 ||
      (yAxisBiggestTextLength >= 5 && yAxisBiggestTextLength < 7)
    ) {
      return 0;
    }
    return -10;
  }, [yAxisBiggestTextLength]);

  const datasetsFormatted = useMemo(() => {
    if (yAxisBiggestTextLength < 5) {
      return data.datasets;
    }
    if (yAxisBiggestTextLength < 7) {
      return data.datasets.map(dataset => dataset.map(number => number / 1000));
    }
    return data.datasets.map(dataset =>
      dataset.map(number => number / 1000000),
    );
  }, [data, yAxisBiggestTextLength]);

  const yAxisSuffix = useMemo(() => {
    if (yAxisBiggestTextLength < 5) {
      return '';
    }
    if (yAxisBiggestTextLength < 7) {
      return 'k';
    }
    return 'M';
  }, [yAxisBiggestTextLength]);

  const decimalPlaces = useMemo(() => {
    if (yAxisBiggestTextLength >= 7) {
      return 1;
    }
    return 0;
  }, [yAxisBiggestTextLength]);

  const offsetLabels = useMemo(() => {
    const isMultiYear = data.labels[0].length > 3;
    const limit = isMultiYear ? 5 : 7;
    const offsetWidth = isMultiYear ? 70 : 50;
    const qty = data.labels.length - limit;
    if (qty > 0) {
      return qty * offsetWidth;
    }
    return 0;
  }, [data]);

  return (
    <ScrollView horizontal>
      <View style={styles.container}>
        {multipleDatasets && (
          <View style={styles.legendContainer}>
            <View style={styles.legendRow}>
              <View
                style={[styles.legendCircle, {backgroundColor: colors[1]}]}
              />
              <Text style={styles.legendText}>Média dos outros vendedores</Text>
            </View>
            <View style={styles.legendRow}>
              <View
                style={[styles.legendCircle, {backgroundColor: colors[0]}]}
              />
              <Text style={styles.legendText}>Eu</Text>
            </View>
          </View>
        )}
        <LineChartCore
          data={{
            labels: data.labels,
            datasets: datasetsFormatted.map((dataset, index) => ({
              data: dataset,
              color: (opcaity = 1) => colors[index],
            })),
          }}
          width={width - 20 + offsetAxis + offsetLabels}
          height={300}
          yAxisSuffix={yAxisSuffix}
          segments={segments}
          chartConfig={{
            backgroundColor: '#fff',
            backgroundGradientFrom: '#fff',
            backgroundGradientTo: '#fff',
            decimalPlaces: decimalPlaces,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            propsForDots: {
              r: '5',
            },
            propsForLabels: {
              fontFamily: 'Montserrat',
              fontSize: 16,
            },
          }}
          style={{
            marginTop: -30,
            paddingTop: 30,
            borderRadius: 20,
            marginLeft: offsetAxis * -1,
          }}
          withShadow={false}
          withVerticalLines={false}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: '#fff',
    borderRadius: 20,
    marginTop: 5,
    paddingTop: 16,
    paddingBottom: 16,
  },
  legendContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  legendRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendCircle: {
    width: 13,
    height: 13,
    borderRadius: 100,
    marginRight: 6,
  },
  legendText: {
    fontFamily: 'Montserrat',
  },
});
