import React, {useRef, useEffect} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Container from '../components/Container';
import DateRange from '../components/DateRange';
import Select from '../components/Select';
import LineChart from '../components/LineChart';

const reportTypeList = [
  {
    name: 'Quantidade de vendas',
  },
  {
    name: 'Total de vendas em R$',
  },
  {
    name: 'Clientes captados',
  },
];

const reportSellersList = [
  {
    name: 'Todos os vendedores',
  },
  {
    name: 'Somente eu',
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

  useEffect(() => {
    fetchReport({...dateRangeRef.current.initialRange});
  }, []);

  const fetchReport = query => {
    console.log(query);
  };

  return (
    <Container>
      <DateRange
        ref={dateRangeRef}
        onChange={rangeDate => console.log(rangeDate)}
      />
      <View style={styles.spacingTop} />
      <Select
        label="Tipo do relatório"
        list={reportTypeList}
        onChange={value => console.log(value)}
      />
      <Select
        label="Vendedores"
        list={reportSellersList}
        onChange={value => console.log(value)}
      />
      <LineChart data={lineChartData} />
    </Container>
  );
}

const styles = StyleSheet.create({
  spacingTop: {
    marginTop: 10,
  },
});
