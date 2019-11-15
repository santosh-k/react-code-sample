import React from 'react';
import {Image, ImageBackground, StatusBar, AsyncStorage} from 'react-native';
import {BaseScreen} from '../Components';
import {setNavigation} from './RootContainer';

// Styles
import styles from './Styles/LaunchScreenStyles';

import {Images} from '../Themes';
import {WonderfruitSelectors} from '../Redux/WonderfruitRedux';
import {LoginSelectors} from '../Redux/LoginRedux';
import api from '../Services/WonderfruitApi';

import {connect} from 'react-redux';
import {View} from 'react-native-animatable';
import Load from "react-native-loading-gif";

class LaunchScreen extends BaseScreen {
  task = null;

  // ////////////////////
  // Life Cycle Functions
  // ////////////////////
  constructor(props) {
    super(props);

    setNavigation(this.navigation());
  }

  componentDidMount() {
    this.startNextScreen();
  }

  componentWillUnmount() {
    this.cancelTask();
  }

  // ////////////////
  // Render Functions
  // ////////////////
  render() {
    return (
      <View style={styles.container}>
        <StatusBar hidden />
        <Image
          source={Images.launch_screen_bg}
          style={{width: '100%', height: '100%'}}
        />
        <Load ref={Images.launch_screen_gif} style={styles.logo} />
        <Image
          source={Images.sidemenu_sponsors}
          style={styles.sponsors}
          resizeMode="contain"
        />
      </View>
    );
  }

  // ///////////////////
  // Countdown Functions
  // ///////////////////
  startNextScreen() {
    // this.cancelTask();
    // this.task = setTimeout(this.nextSceen, 3000);
  }

  cancelTask() {
    if (this.task) clearTimeout(this.task);
    this.task = null;
  }

  nextSceen = () => {
    const {user} = this.props;
    //         this.showStorage();
    console.warn('USER::::' + JSON.stringify(user));
    console.log('USER::::' + JSON.stringify(user));

    if (this.shouldShowTutorial()) {
      this.navigateTo('TutorialScreen');
    } else if (user) {
      api.create().updateProfileToken();

      this.navigateToHome();
    } else {
      this.navigateTo('LoginMainScreen');
    }
  };

  shouldShowTutorial = () => this.props.tutorial;

  showStorage = async () => {
    console.log('TRYING TO SHOW STORAGE');
    try {
      const k = await AsyncStorage.getAllKeys();
      console.log('AKK=================================');
      console.log(k);
      console.log('=================================');

      for (var i = 0; i < k.length; i++) {
        console.log(k[i]);
        try {
          const kv = await AsyncStorage.getItem(k[i]);
          console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$');
          console.log(kv);
          console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$');
        } catch (error) {
          console.log('EE$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$');
          console.log(error);
          console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$');
        }
      }
    } catch (error) {
      console.log('KK======EE===========================');
      console.log(error);
      console.log('=================================');
    }
    console.log('DONE TRYING TO SHOW STORAGE');
  };
}

const mapStateToProps = state => {
  return {
    tutorial: WonderfruitSelectors.getTutorial(state),
    user: LoginSelectors.getUser(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LaunchScreen);
