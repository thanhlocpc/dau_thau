
import { AppRegistry } from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import "./shim"
// import {decode, encode} from 'base-64'

// if (!global.btoa) {  global.btoa = encode }
// console.log("frrrrrrrrrt55555555555");

// if (!global.atob) {
//     console.log("Ffffffffffffffffffff");
//     global.atob = decode }

AppRegistry.registerComponent(appName, () => App);
