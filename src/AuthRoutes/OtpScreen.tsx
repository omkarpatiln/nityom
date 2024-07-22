import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {StackAuthProps} from './AuthRoutes';
import {Reducers, useDispatch, useSelector} from '../Modules';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import TextButton from '../Components/TextButton';
import Icon from '../Components/Icon';
import AsyncStorage from '@react-native-async-storage/async-storage';

import moment from 'moment';
import Toast from '../Components/Toast';

type Props = StackAuthProps<'OtpScreen'>;

const OtpScreen = ({navigation, route}: Props): JSX.Element => {
  const {Sizes, Colors, Fonts} = useSelector(state => state.app);
  const {ProfileData, OTP} = route.params;
  const dispatch = useDispatch();
  const [otp, setOtp] = useState({
    otp: '',
    loading: false,
  });

  const [SentOtp, setSentOtp] = useState({
    verifyOtp: '',
    loading: false,
  });
  const [timer, setTimer] = useState(30);
  useEffect(() => {
    let interval: any;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const checkValidation = () => {
    if (otp.otp.trim() == '') {
      Toast('Please enter OTP');
      return false;
    } else {
      return true;
    }
  };

  const verifyOtp = async (value: any) => {
    if (!(await checkValidation())) {
      setOtp({...otp, loading: false});
      return;
    }

    setSentOtp({...SentOtp, loading: true});

    if (OTP == value) {
      try {
        try {
          await AsyncStorage.setItem(
            'MOBILE_NUMBER',
            ProfileData.MOBILE_NUMBER,
          );
          navigation.navigate('Dashboard');
        } catch (error) {
          console.error('Error saving user number:', error);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setSentOtp({...SentOtp, loading: false});
      }

      setOtp({...otp, loading: false});
    } else {
      Toast('Please Enter Correct Otp');
      setOtp({...otp, loading: false});
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.White,
        paddingHorizontal: Sizes.ScreenPadding,
        justifyContent: 'center',
      }}>
      <Text
        style={{
          color: Colors.Primary2,
          ...Fonts.Bold1,
          alignSelf: 'center',
        }}>
        OTP Verification
      </Text>

      <View style={{margin: Sizes.ScreenPadding * 2}}>
        <OTPInputView
          keyboardType="number-pad"
          style={{height: 45}}
          pinCount={4}
          codeInputFieldStyle={{
            width: Sizes.Header,
            height: Sizes.Header,
            borderRadius: 8,
            borderWidth: 0.5,
            borderColor: Colors.Primary2,
            backgroundColor: '#FFF',
            shadowColor: Colors.Primary,
            elevation: 5,
            shadowRadius: 5,
            color: Colors.Primary,
            ...Fonts.Medium3,
          }}
          onCodeFilled={value => {
            verifyOtp(value);
          }}
          onCodeChanged={value => {
            setOtp({...otp, otp: value});
          }}
        />
      </View>
      <View>
        <TextButton
          onPress={() => {
            verifyOtp(otp.otp);
          }}
          loading={otp.loading}
          label="Verify"
          style={{marginTop: Sizes.Base}}
        />
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: Sizes.Padding,
        }}>
        <Text
          style={{
            ...Fonts.Medium3,
            color: Colors.Primary,
          }}
          onPress={() => navigation.goBack()}>
          Change Mobile Number
        </Text>
        <Text
          disabled={timer > 0}
          style={{
            ...Fonts.Medium3,
            color: Colors.Primary,
          }}
          onPress={() => {
            setTimer(30);
            // sendOTP();
          }}>
          {timer > 0 ? `Resend OTP(${timer})` : 'Resend OTP'}
        </Text>
      </View>
      <Icon
        onPress={() => navigation.goBack()}
        name="chevron-back"
        type="Ionicons"
        color={Colors.PrimaryText}
        style={{position: 'absolute', top: Sizes.Padding, left: Sizes.Padding}}
      />
    </View>
  );
};

export default OtpScreen;
