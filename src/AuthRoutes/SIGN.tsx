import {View, Text, StatusBar, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {StackAuthProps} from './AuthRoutes';
import {Reducers, useDispatch, useSelector} from '../Modules';
import {PROFILE_DATA} from '../InterFace/Interface';
import Toast from '../Components/Toast';
import packageJson from '../../package.json';
import Icon from '../Components/Icon';
import TextButton from '../Components/TextButton';
import TextInput from '../Components/TextInput';
import Modal from '../Components/Modal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {isTablet} from '../Modules/Reducers/app';

type Props = StackAuthProps<'SIGN'>;

const SIGN = ({navigation}: Props): JSX.Element => {
  const {Sizes, Colors, Fonts} = useSelector(state => state.app);
  const [ProfileData, setProfileData] = useState({
    NAME: 'Demo',
    EMAIL: 'demo@gmail.com',
    MOBILE_NUMBER: '',
    PASSWORD: '12345678',
    Loader: false,
    Error: false,
  });

  const [OTP, SetOTP] = useState('');

  const CheckValidation = async () => {
    if (ProfileData.MOBILE_NUMBER == '') {
      Toast('Please Enter Mobile Number');
      setProfileData({...ProfileData, Error: true});

      return true;
    } else if (ProfileData.MOBILE_NUMBER.length != 10) {
      Toast('Please Enter Valid Number');
      setProfileData({...ProfileData, Error: true});

      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    const randomOTP = Math.floor(1000 + Math.random() * 9000);

    console.log('randam', randomOTP);

    SetOTP(randomOTP.toString());
  }, []);

  const SentToOtp = async () => {
    if (await CheckValidation()) {
      return true;
    } else {
      setProfileData({...ProfileData, Loader: true});

      try {
        const response = await axios.get(
          `https://www.fast2sms.com/dev/bulkV2?authorization=GZ8LfAoKB4skczuWvPEg6Tr3jRmpCS05x1lFhMdO92HXtVbYiDKCF4UiLkJuXcft1al2hDBpZ0gYnV9e&variables_values=${OTP}&route=otp&numbers=${ProfileData.MOBILE_NUMBER}`,
        );

        if (response && response.data && response.data.return === true) {
          navigation.navigate('OtpScreen', {
            ProfileData: ProfileData,
            OTP: OTP,
          });
        } else {
          console.error('Failed to send SMS.');

          // Add your error handling logic here.
        }
      } catch (error) {
        console.error(error);
      } finally {
        setProfileData({...ProfileData, Loader: true});
      }
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: Colors.Primary}}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={Colors.Primary}
        // translucent
      />
      <ScrollView>
        {/* Set StatusBar properties */}
        <View
          style={{
            marginTop: Sizes.ScreenPadding,
            marginHorizontal: Sizes.Padding,
            flex: 1,
            backgroundColor: Colors.Primary,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text
              style={{
                ...Fonts.Regular1,
                color: Colors.White,
                fontSize: 14,
              }}>{`Don't have Account?`}</Text>
            <TextButton
              label="Register Now"
              loading={false}
              colors={[Colors.Primary_Over_Light, Colors.Primary_Over_Light]}
              onPress={() => {
                navigation.navigate('SIGN_UP');
              }}
              style={{width: '40%'}}
              textStyle={{fontSize: 12}}
            />
          </View>

          <View style={{height: Sizes.ScreenPadding * 2}} />

          <Text
            style={{
              ...Fonts.Bold1,
              color: Colors.White,
              alignSelf: 'center',
              fontSize: 35,
            }}>{`${packageJson.name}`}</Text>
        </View>
      </ScrollView>
      {isTablet ? null : (
        <View
          style={{
            marginHorizontal: Sizes.ScreenPadding * 2,
            backgroundColor: Colors.Primary_Over_Light,
            height: Sizes.Padding,
            borderTopRightRadius: Sizes.ScreenPadding,
            borderTopLeftRadius: Sizes.ScreenPadding,
          }}></View>
      )}

      <View
        style={{
          backgroundColor: Colors.White,
          borderTopRightRadius: Sizes.ScreenPadding * 2,
          borderTopLeftRadius: Sizes.ScreenPadding * 2,
          alignItems: 'center',
          paddingHorizontal: Sizes.Padding,
          paddingVertical: Sizes.ScreenPadding * 2,
        }}>
        <Text
          style={{
            ...Fonts.Bold1,
            color: Colors.Black,
            fontSize: 30,
          }}>{`Login Now`}</Text>

        <View style={{height: Sizes.Padding}} />

        <TextInput
          value={ProfileData?.MOBILE_NUMBER ? ProfileData.MOBILE_NUMBER : ''}
          onChangeText={text => {
            setProfileData({
              ...ProfileData,
              MOBILE_NUMBER: text,
              Error: false,
              Loader: false,
            });
          }}
          style={{borderColor: ProfileData.Error ? 'red' : Colors.Primary}}
          keyboardType="number-pad"
          label="Mobile Number"
          maxLength={10}
          placeholder="Enter Mobile Number"
        />

        <View style={{height: Sizes.ScreenPadding}} />

        <TextButton
          loading={ProfileData.Loader}
          label="Login Now"
          onPress={SentToOtp}
          colors={[Colors.Primary, Colors.Primary_Over_Light]}
        />
        <View style={{height: Sizes.ScreenPadding}} />
        <TextButton
          loading={false}
          label="Register"
          onPress={() => {
            navigation.navigate('SIGN_UP');
          }}
          colors={[Colors.Primary, Colors.Primary_Over_Light]}
        />

        <View style={{height: Sizes.ScreenPadding}} />
      </View>
    </View>
  );
};

export default SIGN;
