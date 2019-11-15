/* eslint-disable react-native/no-inline-styles */

import styles from './Styles/NavigationStyles';
import stylesHeader from '../Components/Styles/HeaderStyle';

import {Images, Metrics, Colors} from '../Themes';
import {connect} from 'react-redux';

import I18n from '../I18n';
import React from 'react';
import {View, Image, Text, ImageBackground} from 'react-native';
import {Button} from '../Components';
import {DrawerActions} from 'react-navigation-drawer';
import {SafeAreaConsumer} from 'react-native-safe-area-context';

import {createDrawerNavigator} from 'react-navigation-drawer';
import {createBottomTabNavigator, BottomTabBar} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';

import HappeningScreen from '../Containers/HappeningScreen';
import LineUpScreen from '../Containers/LineUpScreen';
import MapsScreen from '../Containers/MapsScreen';
import MyScheduleScreen from '../Containers/MyScheduleScreen';
import ProgramScreen from '../Containers/ProgramScreen';
import SideMenuScreen from '../Containers/SideMenuScreen';
import SingleProgramScreen from '../Containers/SingleProgramScreen';
import SingleWonderpostScreen from '../Containers/SingleWonderpostScreen';
import TreeHourScreen from '../Containers/TreeHourScreen';
import WonderpostScreen from '../Containers/WonderpostScreen';
import WonderfeedScreen from '../Containers/WonderfeedScreen';
import ProgramTutorial from '../Containers/ProgramTutorial';

import ForgotPasswordScreen from '../Containers/ForgotPasswordScreen';
import SignUpScreen from '../Containers/SignUpScreen';
import LoginMainScreen from '../Containers/LoginMainScreen';
import LoginScreen from '../Containers/LoginScreen';
import TutorialScreen from '../Containers/TutorialScreen';
import InformationScreen from '../Containers/InformationScreen';
import LaunchScreen from '../Containers/LaunchScreen';
import HomeScreen from '../Containers/Home';

import WonderfruitActions from '../Redux/WonderfruitRedux';

import store from '../Redux/CreateStore';

/*
const defineTabBarScreen = (screen, label, icon) => ({
  screen: screen,
  navigationOptions: {
    tabBarLabel: I18n.t(label),
//     tabBarIcon: () => icon
  }
})
*/

const appRoutes = {
  HappeningScreen: {
    screen: HappeningScreen,
    title: 'happening.title',
    menu: 'happening.menu',
    icon: Images.icon_tab_happeningnow,
  },
  WonderfeedScreen: {
    screen: WonderfeedScreen,
    title: 'wonderfeed.title',
    menu: 'wonderfeed.menu',

    icon: Images.icon_tab_wonderfeed,
  },
  ProgramScreen: {
    screen: ProgramScreen,
    title: 'program.title',
    menu: 'program.menu',
    icon: Images.icon_tab_program,
  },
  LineUpScreen: {
    screen: LineUpScreen,
    title: 'lineup.title',
    menu: 'lineup.menu',

    icon: Images.icon_tab_lineup,
  },
  WonderpostScreen: {
    screen: WonderpostScreen,
    title: 'wonderpost.title',
    menu: 'wonderpost.menu',

    icon: Images.icon_tab_wonderpost,
  },
  MapsScreen: {
    screen: MapsScreen,
    title: 'maps.title',
    menu: 'maps.menu',

    icon: Images.icon_tab_map,
  },
  MyScheduleScreen: {
    screen: MyScheduleScreen,
    title: 'myschedule.title',
    menu: 'myschedule.menu',

    icon: Images.icon_tab_myschedule,
  },
  HomeScreen: {
    screen: HomeScreen,
    title: 'test',
    menu: 'myschedule.menu',

    icon: Images.icon_tab_myschedule,
  },
};

const defineTabBarScreen = s => ({
  screen: appRoutes[s].screen,
  /*
  title: I18n.t(label),
  headerTitle: I18n.t(label),
*/

  navigationOptions: () => {
    return {
      /*
      title: I18n.t(label),
      headerTitle: I18n.t(label),
*/

      tabBarIcon: ({focused}) => {
        return (
          <View
            style={[
              styles.tabButton,
              {
                backgroundColor: focused
                  ? 'rgba(45, 118, 118,.7)'
                  : 'transparent',
              },
            ]}>
            <Image style={styles.iconStyle} source={appRoutes[s].icon} />
            <View style={styles.tabBarLabelContainerStyle}>
              <Text style={styles.tabBarLabelStyle}>
                {I18n.t(appRoutes[s].menu)}
              </Text>
            </View>
          </View>
        );
      },
    };
  },
});

const defineProgramTabBarScreen = s => ({
  screen: appRoutes[s].screen,
  /*
  title: I18n.t(label),
  headerTitle: I18n.t(label),
*/

  navigationOptions: () => {
    return {
      /*
      title: I18n.t(label),
      headerTitle: I18n.t(label),
*/

      tabBarIcon: ({focused}) => {
        return (
          <View
            style={[
              styles.tabButton,
              {
                backgroundColor: focused
                  ? 'rgba(45, 118, 118,.7)'
                  : 'transparent',
              },
            ]}>
            <Button
              theme={'whiteBlack'}
              faIcon={'filter'}
              // onPress={onFilterPress}
              style={stylesHeader.buttonLeft}
              iconStyle={stylesHeader.icon}
            />
            <Image style={styles.iconStyle} source={appRoutes[s].icon} />
            <View style={styles.tabBarLabelContainerStyle}>
              <Text style={styles.tabBarLabelStyle}>
                {I18n.t(appRoutes[s].menu)}
              </Text>
            </View>
          </View>
        );
      },
    };
  },
});
const TabBarNav = createBottomTabNavigator(
  {
    /*HomeScreen: defineTabBarScreen(HomeScreen, 'home.menu', 'home'),*/
    //     HappeningScreen: defineTabBarScreen('HappeningScreen'),
    WonderfeedScreen: defineTabBarScreen('WonderfeedScreen'),
    ProgramScreen: defineTabBarScreen('ProgramScreen'),
    LineUpScreen: defineTabBarScreen('LineUpScreen'),
    WonderpostScreen: defineTabBarScreen('WonderpostScreen'),
    MyScheduleScreen: defineTabBarScreen('MyScheduleScreen'),
    /*
     */

    //   MapsScreen: defineTabBarScreen(MapsScreen, 'maps.menu', 'map-marker-smile'),
  },
  {
    initialRouteName: 'WonderfeedScreen',
    headerMode: 'screen',
    swipeEnabled: false,
    animationEnabled: false,
    backBehavior: 'initialRoute',
    tabBarPosition: 'bottom',

    tabBarComponent: props => {
      console.log('test');
      return (
        <SafeAreaConsumer>
          {insets => (
            <ImageBackground
              source={Images.bg_footer}
              style={[styles.tabBarBackground, {height: 90}]}>
              {/* actual code below */}
              {/* style={[styles.tabBarBackground, {height: 90 + insets.bottom}]}> */}
              <BottomTabBar {...props} />
            </ImageBackground>
          )}
        </SafeAreaConsumer>
      );
    },
    tabBarOptions: {
      showIcon: true,
      showLabel: false,
      labelStyle: styles.tabBarLabelStyle,
      tabStyle: styles.tabStyle,
      style: styles.tabBarStyle,
      safeAreaInset: {bottom: 'never', top: 'never'},
    },
    navigationOptions: ({navigation}) => {
      var navIndex = navigation.state.index;
      var routeName = navigation.state.routes[navIndex].routeName;
      return {
        title: I18n.t(appRoutes[routeName].title),
      };
    },
    /*
  defaultNavigationOptions: ({ navigation }) => ({
    headerStyle: styles.header,
    headerTitleStyle: styles.headerTitleStyle,
  }),
  navigationOptions: ({ navigation }) => {
    var headerRight = null;
    return {
      headerStyle: styles.header,
      headerTitleStyle: styles.header,
      title: 'Lineup',
      headerRight : (<Button theme={'whiteBlack'} icon={Images.hamburger} onPress={ () => {navigation.dispatch(DrawerActions.toggleDrawer())} } style={styles.buttonRight} iconStyle={styles.buttonIcon} />)
    }
  },

*/
  },
);

const AfterLoginNav = createStackNavigator(
  {
    TabBarNav: {screen: TabBarNav},
    SingleProgramScreen: {screen: SingleProgramScreen},
    SingleWonderpostScreen: {
      screen: SingleWonderpostScreen,
      navigationOptions: {
        title: I18n.t('tree.title'),
      },
    },
    TreeHourScreen: {screen: TreeHourScreen},
    HappeningScreen: {screen: HappeningScreen},
    WonderpostScreen: {screen: WonderpostScreen},
    WonderfeedScreen: {screen: WonderfeedScreen},
    ProgramTutorialScreen: {screen: ProgramTutorial},
  },
  {
    // Default config for all screens
    headerMode: 'screen',
    initialRouteName: 'TabBarNav',
    headerBackTitleVisible: false,

    navigationOptions: ({navigation}) => {
      return {
        headerTitleStyle: styles.header,
        headerStyle: styles.header,
        headerRight: (
          <Button
            theme={'whiteBlack'}
            icon={Images.hamburger}
            onPress={() => {
              navigation.dispatch(DrawerActions.toggleDrawer());
            }}
            style={styles.buttonRight}
            iconStyle={styles.buttonIcon}
          />
        ),
      };
    },

    defaultNavigationOptions: ({navigation}) => {
      var options = {
        //     headerStyle: styles.header,
        headerTitleStyle: styles.header,
        //     headerTitle: 'Stack1',
        headerRight: (
          <Button
            theme={'whiteBlack'}
            icon={Images.hamburger}
            onPress={() => {
              navigation.dispatch(DrawerActions.toggleDrawer());
            }}
            style={styles.buttonRight}
            iconStyle={styles.buttonIcon}
          />
        ),
        // eslint-disable-next-line prettier/prettier
//         headerLeft: (navigation.state.routes[navigation.state.index].key === 'ProgramScreen' ?   <ReduxButtonWithConnect /> : null),
        //         headerLeft: (navigation.state.index && navigation.state.routes[navigation.state.index].key === 'ProgramScreen' ?   <ReduxButtonWithConnect /> : null),
        headerBackImage: (
          <Image source={Images.header_back} style={styles.buttonBackIcon} />
        ),
      };
      if (
        navigation.state.index &&
        (navigation.state.routes[navigation.state.index].key ===
          'ProgramScreen' ||
          navigation.state.routes[navigation.state.index].key ===
            'MyScheduleScreen')
      ) {
        options['headerLeft'] = <ReduxButtonWithConnect />;
      }
      return options;
    },
  },
);

const DrawerNav = createDrawerNavigator(
  {
    AfterLoginNav: {screen: AfterLoginNav},
  },
  {
    contentComponent: SideMenuScreen,
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle',
    drawerPosition: 'right',
    drawerWidth: Metrics.screenWidth,
    initialRouteName: 'AfterLoginNav',
  },
);

const mapDispatchToProps = dispatch => {
  return {
    toggleFilterModalVisible: () =>
      dispatch(WonderfruitActions.toggleFilterModalVisible()),
  };
};

const ReduxButton = props => {
  return (
    <Button
      theme={'whiteBlack'}
      icon={Images.filter}
      onPress={props.toggleFilterModalVisible}
      style={styles.buttonRight}
      iconStyle={styles.buttonIcon}
    />
    // <Button
    //   theme={'whiteBlack'}
    //   faIcon={'filter'}
    //   onPress={() => {
    //     console.warn('calling========');
    //   }}
    //   // onPress={props.programRequest}
    //   style={stylesHeader.buttonLeft}
    //   iconStyle={stylesHeader.icon}
    // />
  );
};

const PrimaryNav = createStackNavigator(
  {
    DrawerNav: {screen: DrawerNav},
    ForgotPasswordScreen: {screen: ForgotPasswordScreen},
    InformationScreen: {screen: InformationScreen},
    LaunchScreen: {screen: LaunchScreen},
    LoginMainScreen: {screen: LoginMainScreen},
    LoginScreen: {screen: LoginScreen},
    SignUpScreen: {screen: SignUpScreen},
    TutorialScreen: {screen: TutorialScreen},
    HomeScreen: {screen: HomeScreen},
  },
  {
    // Default config for all screens
    headerMode: 'none',
    initialRouteName: 'HomeScreen',
    navigationOptions: {
      headerStyle: styles.header,
    },
  },
);

const ReduxButtonWithConnect = connect(
  null,
  mapDispatchToProps,
)(ReduxButton);

export default PrimaryNav;
