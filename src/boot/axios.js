import axios from 'axios'

export default ({
  Vue,
  router
}) => {
  // Añadimos un interceptor para que añada el token a las Headers de cada peticion HTTP al Servidor.
  axios.interceptors.request.use(function (configuration) {

    axios.defaults.withCredentials = true;

    let token = localStorage.getItem('token');

    if (token) {
      configuration.headers.Authorization = `Bearer ${token}`;
      configuration.headers.IsTheRequest = 'true';
    }

    console.log("Added header Authorization to the Request");

    return configuration;

  }, function (error) {
    console.log('error request', error)
    return Promise.reject(error);
  });

  // Response Interceptor
  axios.interceptors.response.use(function (response) {

    if (response && response.data && response.headers.token && response.headers.user) {
      localStorage.clear();
      localStorage.setItem("user", response.headers.user);
      localStorage.setItem("token", response.headers.token);
    }
    return response;

  }, function (error) {
    if (error.response.status === 401) {
      //TODO variable isUserLogin not work
      console.log('Unauthorized response');
      localStorage.clear();
      router.push('/price');
    }
    return Promise.reject(error);
  });

  Vue.prototype.$axios = axios

}
