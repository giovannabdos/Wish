import React, {useState, useRef, useEffect} from 'react';
import {StyleSheet, View, ActivityIndicator} from 'react-native';
import Container from '../components/Container';
import DateRange from '../components/DateRange';
import Select from '../components/Select';
import LineChart from '../components/LineChart';
import queryBuilder from '../utils/queryBuilder';
import api from '../services/api';

const reportTypeList = [
  {
    name: 'Quantidade de vendas',
    value: 'sales_amount'
  },
  {
    name: 'Total de vendas em R$',
    value: 'total_sales'
  },
  {
    name: 'Clientes captados',
    value: 'customers_captured'
  },
];

const reportSellersList = [
  {
    name: 'Todos os vendedores',
    value: 'all'
  },
  {
    name: 'Somente eu',
    value: 'me'
  },
];

const lineChartData = {
  labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul'],
  datasets: [
    [5555, 3333, 1111, 7777, 999, 1111, 1111],
    [2222, 4444, 2222, 1111, 3333, 1111, 1111],
  ],
};

export default function Consultas() {
  const dateRangeRef = useRef(null);

  const [query, setQuery] = useState({})
  const [initialFetched, setInitialFetched] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [reportData, setReportData] = useState(null)

  useEffect(() => {
    if (initialFetched) {
      fetchReport(query);
    } else if (dateRangeRef?.current?.initialRange) {
      setQuery({
        ...dateRangeRef.current.initialRange,
        report_type: reportTypeList[0].value,
        sellers: reportSellersList[0].value
      })
      setInitialFetched(true)
    }
  }, [query]);

  const fetchReport = async query => {
    try {
      setIsLoading(true);
      const response = await api.get(`/reports/seller${queryBuilder(query)}`);
      setReportData(response.data)
      setIsLoading(false);
    } catch (response) {
      console.log(response)
      setIsLoading(false);
    }
  };

  const handleChangeQuery = (value) => {
    setQuery({
      ...query,
      ...value
    })
  }

  return (
    <Container>
      <DateRange
        ref={dateRangeRef}
        onChange={rangeDate => handleChangeQuery(rangeDate)}
      />
      <View style={styles.spacingTop} />
      <Select
        label="Tipo do relatório"
        list={reportTypeList}
        onChange={(selected) => handleChangeQuery({report_type: selected.value})}
      />
      <Select
        label="Vendedores"
        list={reportSellersList}
        onChange={selected => handleChangeQuery({sellers: selected.value})}
      />
      {isLoading ? (
        <ActivityIndicator color={'#193E5B'} size={40} style={styles.loading} />
      ) : reportData && (
        <LineChart data={reportData} />
      )}
    </Container>
  );
}

const styles = StyleSheet.create({
  spacingTop: {
    marginTop: 10,
  },
  loading: {
    marginTop: 100
  }
});
