import axios from 'axios';

// export const BASE_URL = "http://192.168.1.138:8002";
export const BASE_URL = "https://ecco.royaldonuts.xyz/api/";

const API = async config => {
  //   const token = await getApiKey();
  //   console.log(token);
  //   if (token) {
  //     config.headers = {
  //       authorization: token,
  //     };
  //   }
  //interceptors handle network error
  axios.interceptors.response.use(
    response => {
      return response;
    },
    function (error) {
      if (!error.response) {
        error.response = {
          data: 'net work error',
          status: 500,
        };
      }
      if (error.response.status === 401) {
        console.log('Unauthorised');
      }
      return Promise.reject(error);
    },
  );
  config.baseURL = URL;
  return axios(config);
};
export default API;
