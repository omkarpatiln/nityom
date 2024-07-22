import {View, Text, Alert} from 'react-native';
import React, {useEffect} from 'react';

import {useSelector} from './src/Modules';
import AuthRoutes from './src/AuthRoutes/AuthRoutes';
import {StatusBar} from 'react-native';
import SIGN from './src/AuthRoutes/SIGN';

const App = () => {
  const {showSplashScreen} = useSelector(state => state.app);
  const {Sizes, Colors, Fonts} = useSelector(state => state.app);

  const {member} = useSelector(state => state.member);
  useEffect(() => {
    console.log('member.........................', member);
  }, []);

  return (
    <>
      <StatusBar backgroundColor={Colors.STATUS_COLOR} />
      <AuthRoutes />
    </>
  );
};

export default App;
