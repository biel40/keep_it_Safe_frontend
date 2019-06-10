import axios from 'axios'

import {
  Notify
} from 'quasar'

export default ({
  Vue,
  router
}) => {
  // Añadimos un interceptor para que añada el token a las Headers de cada peticion HTTP al Servidor.
  axios.interceptors.request.use(function (configuration) {

    axios.defaults.withCredentials = true;
    
    console.log(localStorage.getItem('token'));

    axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');

    console.log("Added header Authorization to the Request");
  

    return configuration;

  }, function (error) {
    console.log('error request', error)
    return Promise.reject(error);
  });

  // Response interceptor
  axios.interceptors.response.use(function(response) {

    if (response && response.data && response.data.notifyMissatge) {
      if (response.data.notifyTipus && response.data.notifyTipus == 'SUCCESS') {
        Notify.create({
          message: response.data.notifyMissatge,
          type: 'positive'
        })
      } else if (response.data.notifyTipus && response.data.notifyTipus == 'WARNING') {
        Notify.create({
          message: response.data.notifyMissatge,
          type: 'warning'
        })
      } else if (response.data.notifyTipus && response.data.notifyTipus == 'ERROR') {
        Notify.create({
          message: response.data.notifyMissatge,
          type: 'negative'
        })
      } else {
        Notify.create({
          message: response.data.notifyMissatge,
          type: 'info'
        })
      }
    }

    return response;

  }, function (error) {
    if (error && error.response  == 401) {
      console.log('Unauthorized response');
      localStorage.clear();

      router.push('/Error401');
    }
  });

  Vue.prototype.$axios = axios

}
