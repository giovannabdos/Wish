export const maskWhatsapp = value => {
  return value
    .replace(/\D/g, '')
    .replace(/(^\d{2})(\d)/, '($1) $2')
    .replace(/(\d{4,5})(\d{4}$)/, '$1-$2');
};

export const maskCPF = value => {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1');
};

export const maskCurrency = value => {
  value = value.replace(/\D/g, '');
  value = (value / 100).toFixed(2) + '';
  value = value.replace('.', ',').replace(/(\d)(\d{3}),/g, '$1.$2,');
  return value;
};
