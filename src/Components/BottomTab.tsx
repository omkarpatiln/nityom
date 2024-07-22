import React, {useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  BackHandler,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
// import Animated from 'react-native-reanimated';

import {useNavigation} from '@react-navigation/native';
import {useSelector} from '../Modules';
import Icon from './Icon';
interface BottomTabProps {
  selectedTab: 'Dashboard' | 'History' | 'RateUs' | 'Profile';
}
const BottomTab: React.FC<BottomTabProps> = ({selectedTab}) => {
  const navigation = useNavigation();
  const {Colors, Fonts, Sizes} = useSelector(state => state.app);
  const {member} = useSelector(state => state);
  const getStyle: (
    label: 'Dashboard' | 'History' | 'RateUs' | 'Profile',
  ) => ViewStyle = label => {
    return selectedTab == label ? Styles.selected : {};
  };

  return (
    <LinearGradient
      colors={[Colors.STATUS_COLOR, Colors.Primary]}
      style={{
        height: 60,
        width: '100%',
        flexDirection: 'row',
        borderTopLeftRadius: Sizes.Padding,
        borderTopRightRadius: Sizes.Padding,
      }}>
      <TouchableOpacity
        // @ts-ignore
        onPress={() => navigation.navigate('Dashboard')}
        style={{flex: 1, alignItems: 'center', justifyContent: 'flex-end'}}>
        <View style={[getStyle('Dashboard')]}>
          {selectedTab == 'Dashboard' ? (
            <Icon
              color={Colors.STATUS_COLOR}
              name="dashboard"
              type="AntDesign"
              size={20}
            />
          ) : (
            <Icon
              color={Colors.White}
              name="dashboard"
              type="AntDesign"
              size={20}
            />
          )}
        </View>
        <Text style={[Styles.label]}>{'Dashboard'}</Text>
      </TouchableOpacity>

      {member.member.IS_ACTIVE ? (
        <TouchableOpacity
          // @ts-ignore
          onPress={() => navigation.navigate('RateUs')}
          style={{flex: 1, alignItems: 'center', justifyContent: 'flex-end'}}>
          <View style={[getStyle('RateUs')]}>
            {selectedTab == 'RateUs' ? (
              <Icon
                color={Colors.STATUS_COLOR}
                name="attach-money"
                type="MaterialIcons"
                size={20}
              />
            ) : (
              <Icon
                color={Colors.White}
                name="attach-money"
                type="MaterialIcons"
                size={20}
              />
            )}
          </View>
          <Text style={[Styles.label]}>{'RateUs'}</Text>
        </TouchableOpacity>
      ) : null}

      {member.member.IS_ACTIVE ? (
        <TouchableOpacity
          // @ts-ignore
          onPress={() => navigation.navigate('History')}
          style={{flex: 1, alignItems: 'center', justifyContent: 'flex-end'}}>
          <View style={[getStyle('History')]}>
            {selectedTab == 'History' ? (
              <Icon
                color={Colors.STATUS_COLOR}
                name="history"
                type="FontAwesome"
                size={20}
              />
            ) : (
              <Icon
                color={Colors.White}
                name="history"
                type="FontAwesome"
                size={20}
              />
            )}
          </View>
          <Text style={[Styles.label]}>{'History'}</Text>
        </TouchableOpacity>
      ) : null}

      <TouchableOpacity
        // @ts-ignore
        onPress={() => navigation.navigate('Profile')}
        style={{flex: 1, alignItems: 'center', justifyContent: 'flex-end'}}>
        <View style={[getStyle('Profile')]}>
          {selectedTab == 'Profile' ? (
            <Icon
              color={Colors.STATUS_COLOR}
              name="user"
              type="Entypo"
              size={20}
            />
          ) : (
            <Icon color={Colors.White} name="user" type="Entypo" size={20} />
          )}
        </View>
        <Text style={[Styles.label]}>{'Profile'}</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};
export default BottomTab;
const Styles = StyleSheet.create({
  label: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    letterSpacing: 0.25,
    lineHeight: 20,
    color: '#FFFFFF',
    marginTop: 5,
  },
  selected: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 150,
  },
});
