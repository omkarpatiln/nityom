import {View, Text, ImageSourcePropType} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from './Icon';
import {useSelector} from '../Modules';
import {TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {PROFILE_DATA} from '../InterFace/Interface';

interface HEADERS_PROPS {
  onBack?: () => void;
  onUserData?: (data: PROFILE_DATA) => void;
  onProfile?: () => void;
  isDemo?: boolean;
  Image?: ImageSourcePropType;
  label: string;
}

const Header = ({
  label,
  onBack,
  isDemo,
  Image,
  onProfile,
  onUserData,
}: HEADERS_PROPS) => {
  const {Sizes, Colors, Fonts} = useSelector(state => state.app);
  const {member} = useSelector(state => state.member);

  return (
    <LinearGradient
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: Colors.STATUS_COLOR,
        paddingVertical: Sizes.ScreenPadding,
        borderBottomRightRadius: Sizes.ScreenPadding * 2,
        borderBottomLeftRadius: Sizes.ScreenPadding * 2,
      }}
      colors={[Colors.STATUS_COLOR, Colors.Primary]}>
      <View
        style={{
          justifyContent: 'center',
          marginStart: Sizes.Base,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        {onBack ? (
          <TouchableOpacity
            onPress={() => {
              onBack();
            }}
            style={{
              padding: Sizes.Base,
              elevation: 5,
              borderRadius: Sizes.ScreenPadding,
              marginStart: Sizes.Base,
              backgroundColor: Colors.White,
            }}>
            <Icon size={25} style={{}} name="arrow-back" type="Ionicons" />
          </TouchableOpacity>
        ) : null}

        {onProfile ? (
          <TouchableOpacity
            onPress={() => {
              onProfile();
            }}
            style={{
              padding: Sizes.Base,
              elevation: 5,
              borderRadius: Sizes.ScreenPadding,
              marginStart: Sizes.Base,
              backgroundColor: Colors.White,
            }}>
            <Icon size={25} style={{}} name="person" type="Ionicons" />
          </TouchableOpacity>
        ) : null}

        <View style={{width: Sizes.Padding}} />

        <Text
          style={{
            ...Fonts.Bold1,
            color: Colors.White,
          }}>
          {label}
        </Text>
      </View>
    </LinearGradient>
  );
};

export default Header;
