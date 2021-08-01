import {create} from 'apisauce';
import host from '../utils/host';

const api = create({
  baseURL: `${host()}/api/v1`,
});

api.addResponseTransform(response => {
  if (!response.ok) throw response;
});

export default api;
