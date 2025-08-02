import {Platform} from 'react-native';

export const BASE_URL = 
Platform.OS === 'android' ? 'http://10.0.2.2:4000' : 'http://localhost:4000';

// USE YOUR NETWORK IP OR HOSTED URL
// export const BASE_URL = 'http://192.168.29.114:4000'