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
