import { registerRootComponent } from 'expo';
import TrackPlayer from 'react-native-track-player'

TrackPlayer.registerPlayerbackService(() => require('./service'));

import App from './App';

module.exports = async function() {

}

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
