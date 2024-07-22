import React from 'react';
import {ActivityIndicator} from 'react-native';
import Modal from './Modal';
import {useSelector} from '../Modules';

const Loader = () => {
  const {Sizes, Colors, Fonts} = useSelector(state => state.app);

  return (
    <Modal
      isVisible={true}
      onClose={() => {}}
      style={{padding: Sizes.ScreenPadding * 2}}
      containerStyle={{alignItems: 'center'}}>
      <ActivityIndicator size={'large'} color={Colors.Primary} />
    </Modal>
  );
};

export default Loader;
