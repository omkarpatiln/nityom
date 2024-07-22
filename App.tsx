import {View, Text, Alert} from 'react-native';
import React, {useEffect} from 'react';

import {useSelector} from './src/Modules';
import AuthRoutes from './src/AuthRoutes/AuthRoutes';
import {StatusBar} from 'react-native';
import SIGN from './src/AuthRoutes/SIGN';

const App = () => {
  const {Colors} = useSelector(state => state.app);

  return (
    <>
      <StatusBar backgroundColor={Colors.STATUS_COLOR} />
      <AuthRoutes />
    </>
  );
};

export default App;
