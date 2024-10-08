const CONFIG = {
    DEVELOPMENT_URL: 'http://10.0.2.2:8081',  // Use 10.0.2.2 for Android emulator
 // DEVELOPMENT_URL: 'http://192.168.1.114:8081',
 PRODUCTION_URL: 'http://192.168.1.114:8081',
    //PRODUCTION_URL: 'https://api.yourapp.com',
    TIMEOUT: 5000, // optional: add timeout for API calls if needed
};
  
// Decide which environment to use (dev or prod)
const BASE_URL1 = __DEV__ ? CONFIG.DEVELOPMENT_URL : CONFIG.PRODUCTION_URL;
console.log('__DEV__:', __DEV__);
export default {
    BASE_URL1,
    TIMEOUT: CONFIG.TIMEOUT,
};
