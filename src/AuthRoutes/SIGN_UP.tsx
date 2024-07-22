import {View, Text, StatusBar, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {StackAuthProps} from './AuthRoutes';
import {useSelector} from '../Modules';
import TextButton from '../Components/TextButton';
import LinearGradient from 'react-native-linear-gradient';
import packageJson from '../../package.json';
import Icon from '../Components/Icon';
import TextInput from '../Components/TextInput';
import {PROFILE_DATA} from '../InterFace/Interface';
import Toast from '../Components/Toast';
import axios from 'axios';

type Props = StackAuthProps<'SIGN_UP'>;

const SIGN_UP = ({navigation}: Props): JSX.Element => {
  const {Sizes, Colors, Fonts} = useSelector(state => state.app);
  const [ProfileData, setProfileData] = useState<PROFILE_DATA>({
    NAME: '',
    EMAIL: '',
    MOBILE_NUMBER: '',
    PASSWORD: '',
  });

  const [OTP, SetOTP] = useState('');
  const [ConfPass, SetConfPass] = useState({
    ConfPass: '',
    Loader: false,
  });

  useEffect(() => {
    const randomOTP = Math.floor(1000 + Math.random() * 9000);

    console.log('randam', randomOTP);

    SetOTP(randomOTP.toString());
  }, []);

  const CheckValidation = async () => {
    if (ProfileData.NAME == '') {
      Toast('Please Enter Your Name');
      return true;
    } else if (ProfileData.MOBILE_NUMBER == '') {
      Toast('Please Enter Mobile Number');
      return true;
    } else if (ProfileData.MOBILE_NUMBER.length != 10) {
      Toast('Please Enter Valid Number');
      return true;
    } else if (ProfileData.PASSWORD == '') {
      Toast('Please Enter Password');
      return true;
    } else if (ProfileData.PASSWORD != ConfPass.ConfPass) {
      Toast('Please Enter Correct Confirm Password');
      return true;
    } else {
      return false;
    }
  };

  const SentToOtp = async () => {
    if (await CheckValidation()) {
      return true;
    } else {
      SetConfPass({...ConfPass, Loader: true});

      try {
        const response = await axios.get(
          `https://www.fast2sms.com/dev/bulkV2?authorization=GZ8LfAoKB4skczuWvPEg6Tr3jRmpCS05x1lFhMdO92HXtVbYiDKCF4UiLkJuXcft1al2hDBpZ0gYnV9e&variables_values=${OTP}&route=otp&numbers=${ProfileData.MOBILE_NUMBER}`,
        );

        if (response && response.data && response.data.return === true) {
          navigation.navigate('OtpScreen', {
            Item: ProfileData,
            IS_REGISTERED: true,
            OTP: OTP,
          });
          SetConfPass({...ConfPass, Loader: false});

          // Add your logic here for handling a successful SMS send.
        } else {
          console.error('Failed to send SMS.');
          SetConfPass({...ConfPass, Loader: false});

          // Add your error handling logic here.
        }
      } catch (error) {
        SetConfPass({...ConfPass, Loader: false});

        console.error(error);
      }
    }
  };
  const appName = packageJson.name;

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
            <Icon
              onPress={() => {
                navigation.navigate('SIGN');
              }}
              color={Colors.White}
              name="chevron-left"
              type="FontAwesome5"
            />
            <Text
              style={{
                ...Fonts.Regular1,
                color: Colors.White,
                fontSize: 14,
              }}>{`Already have Account?`}</Text>
            <TextButton
              label="Login Now"
              loading={false}
              colors={[Colors.Primary_Over_Light, Colors.Primary_Over_Light]}
              onPress={() => {
                navigation.navigate('SIGN');
              }}
              style={{width: '30%'}}
              textStyle={{fontSize: 14}}
            />
          </View>

          <View style={{height: Sizes.ScreenPadding * 2}} />

          <Text
            style={{
              ...Fonts.Bold1,
              color: Colors.White,
              alignSelf: 'center',
              fontSize: 35,
            }}>{`${appName}`}</Text>
        </View>
      </ScrollView>
      <View
        style={{
          marginHorizontal: Sizes.ScreenPadding * 2,
          backgroundColor: Colors.Primary_Over_Light,
          height: Sizes.Padding,
          borderTopRightRadius: Sizes.ScreenPadding,
          borderTopLeftRadius: Sizes.ScreenPadding,
        }}></View>
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
          }}>{`Register Now`}</Text>
        <TextInput
          value={ProfileData.NAME}
          onChangeText={text => {
            setProfileData({...ProfileData, NAME: text});
          }}
          label="Name"
          placeholder="Enter Your Name"
        />
        <View style={{height: Sizes.Padding}} />

        <TextInput
          value={ProfileData?.MOBILE_NUMBER ? ProfileData.MOBILE_NUMBER : ''}
          onChangeText={text => {
            setProfileData({...ProfileData, MOBILE_NUMBER: text});
          }}
          keyboardType="number-pad"
          label="Mobile Number"
          maxLength={10}
          placeholder="Enter Mobile Number"
        />
        <View style={{height: Sizes.Padding}} />
        <TextInput
          value={ProfileData.PASSWORD}
          onChangeText={text => {
            setProfileData({...ProfileData, PASSWORD: text});
          }}
          label="Password"
          placeholder="Enter Password"
        />
        <View style={{height: Sizes.Padding}} />
        <TextInput
          value={ConfPass.ConfPass}
          onChangeText={text => {
            SetConfPass({...ConfPass, ConfPass: text});
          }}
          label="Confirm Password"
          placeholder="Confirm Password"
        />
        <View style={{height: Sizes.ScreenPadding}} />

        <TextButton
          loading={ConfPass.Loader}
          label="Register"
          onPress={SentToOtp}
          colors={[Colors.Primary, Colors.Primary_Over_Light]}
        />
        <View style={{height: Sizes.ScreenPadding}} />

        <TextButton
          loading={false}
          label="Login Now"
          onPress={() => {
            navigation.navigate('SIGN');
          }}
          colors={[Colors.Primary, Colors.Primary_Over_Light]}
        />
      </View>
    </View>
  );
};

export default SIGN_UP;
