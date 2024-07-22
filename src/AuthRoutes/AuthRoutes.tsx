import {View, Text} from 'react-native';
import React from 'react';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import SIGN from './SIGN';
import SIGN_UP from './SIGN_UP';
import OtpScreen from './OtpScreen';
import Dashboard from '../Screens/Dashboard';
import Profile from '../Screens/Profile';
import {PROFILE_DATA} from '../InterFace/Interface';
export type StackParams = {
  SIGN: undefined;
  SIGN_UP: undefined;
  Dashboard: undefined;
  Profile: undefined;
  OtpScreen: {ProfileData: PROFILE_DATA; OTP: string};
};

const stack = createSharedElementStackNavigator<StackParams>();

export type StackAuthProps<ScreenName extends keyof StackParams> =
  NativeStackScreenProps<StackParams, ScreenName>;

const AuthRoutes = () => {
  return (
    <NavigationContainer>
      <stack.Navigator
        initialRouteName="SIGN"
        screenOptions={{headerShown: false}}>
        <stack.Screen name="SIGN" component={SIGN}></stack.Screen>
        <stack.Screen name="SIGN_UP" component={SIGN_UP}></stack.Screen>
        <stack.Screen name="OtpScreen" component={OtpScreen}></stack.Screen>
        <stack.Screen name="Dashboard" component={Dashboard}></stack.Screen>
        <stack.Screen name="Profile" component={Profile}></stack.Screen>
      </stack.Navigator>
    </NavigationContainer>
  );
};

export default AuthRoutes;
