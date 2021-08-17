import {create} from 'apisauce';
import Local from '../services/Local';
import host from '../utils/host';

const api = create({
  baseURL: `${host()}/api/v1`,
});

api.addAsyncRequestTransform(async request => {
  if (request.url !== '/users/authenticate') {
    request.headers['Authorization'] = `Bearer ${await Local.getToken()}`;
  }
});

api.addResponseTransform(response => {
  // TODO: Refresh Token

  if (!response.ok) throw response;
});

export default api;
