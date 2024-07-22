import {
  View,
  Text,
  Linking,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  FlatList,
  RefreshControl,
  Touchable,
} from 'react-native';

import React, {useEffect, useRef, useState} from 'react';
import BottomTab from '../Components/BottomTab';
import {useSelector} from '../Modules';

import {useFocusEffect} from '@react-navigation/native';
import Header from '../Components/Header';
import Icon from '../Components/Icon';
import LinearGradient from 'react-native-linear-gradient';
import TextButton from '../Components/TextButton';
import moment from 'moment';
import Toast from '../Components/Toast';
import {no_data} from '../assets';
import {StackAuthProps} from '../AuthRoutes/AuthRoutes';
import {PROFILE_DATA} from '../InterFace/Interface';

type Props = StackAuthProps<'Dashboard'>;

const Dashboard = ({navigation}: Props): JSX.Element => {
  const {Sizes, Colors, Fonts} = useSelector(state => state.app);
  const {member} = useSelector(state => state.member);

  const [userData, setUserData] = useState<PROFILE_DATA>();

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1}}>
        <Header
          label="Dashboard"
          onProfile={() => {
            navigation.navigate('Profile');
          }}
        />
      </View>

      <BottomTab selectedTab="Dashboard" />
    </View>
  );
};

export default Dashboard;
