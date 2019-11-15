import React, {PureComponent} from 'react';
import {
  Image,
  InteractionManager,
  Text,
  TouchableWithoutFeedback,
  View,
  ViewPropTypes,
} from 'react-native';

import styles from './Styles/ButtonStyle';
import {Colors, FontAwesomeIcons, Images} from '../Themes';

import PropTypes from 'prop-types';
import {ComponentUtils, TextUtils} from '../Utils';

const themeConfig = {
  blueFB: {
    normal: {
      buttonStyle: {borderWidth: 0, backgroundColor: Colors.blueFB},
      textStyle: {color: Colors.white},
    },
    active: {
      buttonStyle: {borderWidth: 0, backgroundColor: Colors.blueFBActive},
      textStyle: {color: Colors.white},
    },
  },
  blueTW: {
    normal: {
      buttonStyle: {borderWidth: 0, backgroundColor: Colors.blueTW},
      textStyle: {color: Colors.white},
    },
    active: {
      buttonStyle: {borderWidth: 0, backgroundColor: Colors.blueTWActive},
      textStyle: {color: Colors.white},
    },
  },
  green00C: {
    normal: {
      buttonStyle: {borderWidth: 0, backgroundColor: Colors.green00C},
      textStyle: {color: Colors.white},
    },
    active: {
      buttonStyle: {borderWidth: 0, backgroundColor: Colors.green00B2},
      textStyle: {color: Colors.white},
    },
  },
  orangeF7: {
    normal: {
      buttonStyle: {borderWidth: 0, backgroundColor: Colors.orangeF7},
      textStyle: {color: Colors.white},
    },
    active: {
      buttonStyle: {borderWidth: 0, backgroundColor: Colors.orangeDE},
      textStyle: {color: Colors.white},
    },
  },
  tranBlackO30: {
    normal: {
      buttonStyle: {borderWidth: 0, backgroundColor: Colors.transparent},
      textStyle: {color: Colors.white},
    },
    active: {
      buttonStyle: {borderWidth: 0, backgroundColor: Colors.blackO30},
      textStyle: {color: Colors.white},
    },
  },
  tranBlackO20: {
    normal: {
      buttonStyle: {borderWidth: 0, backgroundColor: Colors.transparent},
      textStyle: {color: Colors.white},
    },
    active: {
      buttonStyle: {borderWidth: 0, backgroundColor: Colors.blackO20},
      textStyle: {color: Colors.white},
    },
  },
  tranWhiteO25: {
    normal: {
      buttonStyle: {borderWidth: 0, backgroundColor: Colors.transparent},
      textStyle: {color: Colors.white},
    },
    active: {
      buttonStyle: {borderWidth: 0, backgroundColor: Colors.whiteO25},
      textStyle: {color: Colors.white},
    },
  },
  tranWhite: {
    normal: {
      buttonStyle: {borderWidth: 0, backgroundColor: Colors.transparent},
      textStyle: {color: Colors.white},
    },
    active: {
      buttonStyle: {borderWidth: 0, backgroundColor: Colors.white},
      textStyle: {color: Colors.onPressBtnTextColor},
    },
  },
  whiteBlack: {
    normal: {
      buttonStyle: {borderWidth: 0, backgroundColor: Colors.white},
      textStyle: {color: Colors.black},
    },
    active: {
      buttonStyle: {borderWidth: 0, backgroundColor: Colors.greyE4},
      textStyle: {color: Colors.black},
    },
  },
  whiteWhiteO25: {
    normal: {
      buttonStyle: {
        borderColor: Colors.white,
        backgroundColor: Colors.transparent,
      },
      textStyle: {color: Colors.white},
    },
    active: {
      buttonStyle: {
        borderColor: Colors.whiteO25,
        backgroundColor: Colors.whiteO25,
      },
      textStyle: {color: Colors.white},
    },
  },
  whiteWhite: {
    normal: {
      buttonStyle: {
        borderColor: Colors.white,
        backgroundColor: Colors.transparent,
      },
      textStyle: {color: Colors.white},
    },
    active: {
      buttonStyle: {borderColor: Colors.white, backgroundColor: Colors.white},
      textStyle: {color: Colors.black},
    },
  },
  tranBlue30: {
    normal: {
      buttonStyle: {borderWidth: 0, backgroundColor: Colors.transparent},
      textStyle: {color: Colors.white},
    },
    active: {
      buttonStyle: {borderWidth: 0, backgroundColor: Colors.blue30},
      textStyle: {color: Colors.white},
    },
  },
  tranGreen52: {
    normal: {
      buttonStyle: {borderWidth: 0, backgroundColor: Colors.blue78},
      textStyle: {color: Colors.white},
    },
    active: {
      buttonStyle: {borderWidth: 0, backgroundColor: Colors.green52},
      textStyle: {color: Colors.white},
    },
  },
  tabBarNav: {
    normal: {
      buttonStyle: {borderWidth: 0, backgroundColor: Colors.white},
      textStyle: {color: Colors.black1E},
      icon: {color: Colors.black1E},
    },
    active: {
      buttonStyle: {borderWidth: 0, backgroundColor: Colors.black21},
      textStyle: {color: Colors.white},
      icon: {color: Colors.white},
    },
  },
  tabLineup: {
    normal: {
      buttonStyle: {borderWidth: 0, backgroundColor: Colors.transparent},
      textStyle: {color: Colors.white},
    },
    active: {
      buttonStyle: {borderWidth: 0, backgroundColor: Colors.blackO30},
      textStyle: {color: Colors.white},
    },
  },
  addSchedule: {
    normal: {
      buttonStyle: {borderWidth: 0, backgroundColor: '#3B7575'},
      textStyle: {color: Colors.white},
    },
    active: {
      buttonStyle: {borderWidth: 0, backgroundColor: '#336565'},
      textStyle: {color: Colors.white},
    },
  },
  whiteTextRed: {
    normal: {
      buttonStyle: {borderWidth: 0, backgroundColor: Colors.transparent},
      textStyle: {color: Colors.white},
    },
    active: {
      buttonStyle: {borderWidth: 0, backgroundColor: Colors.white},
      textStyle: {color: Colors.schedule_alert_bg},
    },
  },
  whiteTextLightBrown: {
    normal: {
      buttonStyle: {borderWidth: 0, backgroundColor: Colors.transparent},
      textStyle: {color: Colors.white},
    },
    active: {
      buttonStyle: {borderWidth: 0, backgroundColor: Colors.white},
      textStyle: {color: Colors.remove_program_modal_bg},
    },
  },
  playBlackO20: {
    normal: {
      buttonStyle: {borderWidth: 0, backgroundColor: Colors.transparent},
      textStyle: {color: Colors.white},
      icon: Images.video_play_normal,
    },
    active: {
      buttonStyle: {borderWidth: 0, backgroundColor: Colors.blackO20},
      textStyle: {color: Colors.white},
      icon: Images.video_play_active,
    },
  },
  closeBtn: {
    normal: {
      buttonStyle: {borderWidth: 0, backgroundColor: Colors.transparent},
      //  textStyle: {color: Colors.white},
      icon: Images.close_normal,
    },
    active: {
      buttonStyle: {borderWidth: 0, backgroundColor: Colors.blackO20},
      // textStyle: {color: Colors.white},
      icon: Images.close_active,
    },
  },
  reserveButton: {
    normal: {
      buttonStyle: {borderWidth: 0, backgroundColor: Colors.transparent},
      textStyle: {color: '#FFFCF8'},
    },
    active: {
      buttonStyle: {borderWidth: 0, backgroundColor: '#70B5B5'},
      textStyle: {color: '#B8D9D7'},
    },
  },
};

export default class Button extends PureComponent {
  // Prop type warnings
  static propTypes = {
    icons: PropTypes.icon,
    icon: Image.propTypes.source,
    disabled: TouchableWithoutFeedback.propTypes.disabled,
    onPress: TouchableWithoutFeedback.propTypes.onPress,
    style: ViewPropTypes.style,
    text: PropTypes.string,
    textStyle: Text.propTypes.style,
    theme: PropTypes.oneOf(Object.keys(themeConfig)).isRequired,
  };

  // Defaults for props
  static defaultProps = {
    disabled: false,
  };

  state = {status: 'normal'};

  render() {
    const {
      disabled,
      style,
      faIcon,
      icon,
      iconStyle,
      text,
      textStyle,
      theme,
    } = this.props;
    const {status} = this.state;
    const config = themeConfig[theme][status];

    return (
      <TouchableWithoutFeedback
        disabled={disabled}
        onPressIn={this.setActive(true)}
        onPressOut={this.setActive(false)}
        onPress={this.onPress}>
        <View style={[styles.container, config.buttonStyle, style]}>
          {config.icon ? (
            <Image
              style={iconStyle}
              source={config.icon}
              resizeMode={'contain'}
            />
          ) : (
            <Image style={iconStyle} source={icon} resizeMode={'contain'} />
          )}
          {faIcon &&
            FontAwesomeIcons(faIcon, {
              size: 24,
              style: [config.icon, iconStyle],
            })}
          {!TextUtils.isEmpty(text) && (
            <Text style={[config.textStyle, textStyle]}>{text}</Text>
          )}
        </View>
      </TouchableWithoutFeedback>
    );
  }

  setActive = active => () => this.setState(ComponentUtils.stateStatus(active));
  onPress = () => {
    const {onPress} = this.props;
    if (!onPress) return;
    //     InteractionManager.runAfterInteractions(onPress)
    let called = false;
    const timeout = setTimeout(() => {
      called = true;
      onPress();
    }, 500);
    InteractionManager.runAfterInteractions(() => {
      if (called) return;
      clearTimeout(timeout);
      onPress();
    });
  };
}
