import format from 'date-fns/format';

export const formatDate = date => {
  let parsedDate = date;
  if (typeof date !== 'object') {
    parsedDate = new Date(date.replace(' ', 'T'));
  }
  return format(parsedDate, 'dd/MM/yyyy HH:mm');
};

export const formatCurrency = value => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  })
    .format(value)
    .replace('R$', 'R$ ');
};
