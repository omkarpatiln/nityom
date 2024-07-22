import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import {Reducers, useDispatch, useSelector} from '../Modules';
import {Linking, ScrollView, Text, View} from 'react-native';
import {Header, Icon, Modal, TextButton, TextInput, Toast} from '../Components';
import {Image} from 'react-native';
import {noProfile} from '../assets';
import {StackAuthProps} from '../AuthRoutes/AuthRoutes';
import {PROFILE_DATA} from '../InterFace/Interface';
type Props = StackAuthProps<'Profile'>;

const Profile = ({navigation}: Props): JSX.Element => {
  const dispatch = useDispatch();
  const {member} = useSelector(state => state.member);
  const {Sizes, Colors, Fonts} = useSelector(state => state.app);
  const [ChangePass, setChangePass] = useState({
    Modal: false,
    OldPass: member?.PASSWORD ? member.PASSWORD : '',
    NEW_PASS: '',
    CONFIRM_NEW_PASS: '',
  });
  const [ProfileData, setProfileData] = useState<PROFILE_DATA>({
    NAME: 'Demo',
    EMAIL: 'demo@gmail.com',
    MOBILE_NUMBER: '',
    PASSWORD: '12345678',
  });

  const openWhatsApp = () => {
    // Encode the message for a URL
    const message = `Hello! Check out this link and ger Bounce: ${ProfileData?.link}  Code: ${member?.ReferCode}`;

    // Encode the message for a URL
    const encodedMessage = encodeURIComponent(message);
    // Create the WhatsApp URL with only the pre-filled message
    const whatsappUrl = `whatsapp://send?text=${encodedMessage}`;

    // Open WhatsApp with the pre-filled message
    Linking.openURL(whatsappUrl)
      .then(() => console.log('WhatsApp opened'))
      .catch(error => console.error('Error opening WhatsApp:', error));
  };

  const GetNumber = async () => {
    const MOBILE_NUMBER = await AsyncStorage.getItem('MOBILE_NUMBER');
    if (MOBILE_NUMBER) {
      setProfileData({...ProfileData, MOBILE_NUMBER: MOBILE_NUMBER});
    }
  };

  useEffect(() => {
    GetNumber;
  }, []);

  const checkValidation = () => {
    if (ChangePass.NEW_PASS.trim() == '') {
      Toast('Please enter New password');
      return true;
    } else if (ChangePass.CONFIRM_NEW_PASS.trim() == '') {
      Toast('Please enter Confirm password');
      return true;
    } else if (ChangePass.NEW_PASS !== ChangePass.CONFIRM_NEW_PASS) {
      Toast('Please enter Correct Confirm Password');
      return true;
    } else {
      return false;
    }
  };
  const UpdatePassTOData = async (Password: number) => {
    try {
      Toast('Password Update Successfully');
      setChangePass({
        CONFIRM_NEW_PASS: '',
        NEW_PASS: '',
        Modal: false,
        OldPass: ChangePass.NEW_PASS,
      });

      setProfileData({...ProfileData, PASSWORD: ChangePass.NEW_PASS});
    } catch (error) {
      console.error('Error decrementing points:', error);
    }
  };

  const UpdatePass = () => {
    if (checkValidation()) {
      return true;
    } else {
      UpdatePassTOData(parseInt(ChangePass.NEW_PASS));
    }
  };

  return (
    <View style={{flex: 1}}>
      {/* <Text>MineDetails</Text> */}
      <Header
        onBack={() => {
          navigation.goBack();
        }}
        label="Profile"
      />
      <ScrollView>
        <View style={{padding: Sizes.Padding}}>
          <View style={{}}>
            <Image
              style={{width: 150, height: 150, alignSelf: 'center'}}
              source={noProfile}
            />
          </View>

          <TextInput
            disable={true}
            onChangeText={value => {
              setProfileData({...ProfileData, NAME: value});
            }}
            value={ProfileData?.NAME}
            label="Name"
            leftChild={
              <Image
                style={{
                  width: 25,
                  height: 25,
                  alignSelf: 'center',
                  alignContent: 'center',
                  alignItems: 'center',
                  margin: Sizes.Base,
                }}
                source={noProfile}
              />
            }
          />
          <View style={{height: Sizes.Base}} />

          <View style={{height: Sizes.Base}} />
          <TextInput
            disable={true}
            onChangeText={value => {
              setProfileData({...ProfileData, MOBILE_NUMBER: value});
            }}
            value={ProfileData.MOBILE_NUMBER}
            label="Mobile Number"
            leftChild={
              <Icon
                style={{margin: Sizes.Base}}
                size={30}
                name="mobile"
                type="Entypo"
                color="black"
              />
              // <Mobile width={30} height={30} />
            }
          />
          <View style={{padding: Sizes.Base}}></View>

          <Text
            style={{
              ...Fonts.Regular1,
              fontSize: 12,
            }}>{`Share the Ling Get Money, Watch Ads get money Deposit Less Get Money Every Day`}</Text>

          <View style={{padding: Sizes.Padding, flexDirection: 'row'}}>
            {/* <TextButton
                onPress={openWhatsApp}
                loading={false}
                style={{flex: 1}}
                label={`Your Refer Id :${member.ReferCode.toString()}`}
              /> */}
            <TextButton
              style={{flex: 1}}
              onPress={openWhatsApp}
              loading={false}
              label={`Share Now`}
            />
          </View>

          <View
            style={{paddingHorizontal: Sizes.Padding, flexDirection: 'row'}}>
            <TextButton
              style={{flex: 1}}
              onPress={() => {
                setChangePass({...ChangePass, Modal: true});
              }}
              loading={false}
              label={`Change Password`}
            />
            <View style={{width: Sizes.Base}} />
          </View>

          <View style={{padding: Sizes.Padding}}>
            <TextButton
              onPress={async () => {
                await AsyncStorage.removeItem('MOBILE_NUMBER');
                navigation.popToTop();
              }}
              loading={false}
              label={`LogOut Account`}
            />
          </View>
        </View>
      </ScrollView>

      <Modal
        style={{
          margin: 0,
          position: 'absolute',
          bottom: 0,
          right: 0,
          left: 0,
          borderRadius: 0,
          borderTopRightRadius: Sizes.Radius * 2,
          borderTopLeftRadius: Sizes.Radius * 2,
        }}
        onClose={() => {
          setChangePass({...ChangePass, Modal: false});
        }}
        isVisible={ChangePass.Modal}>
        <View style={{padding: Sizes.Base}}>
          <TextInput
            disable={true}
            label="Old Password"
            value={ChangePass.OldPass}
            onChangeText={text => {
              setChangePass({...ChangePass, OldPass: text});
            }}
          />
          <View style={{padding: Sizes.Base}} />
          <TextInput
            label="New Password"
            value={ChangePass.NEW_PASS}
            placeholder="Enter New Password"
            onChangeText={text => {
              setChangePass({...ChangePass, NEW_PASS: text});
            }}
          />
          <View style={{padding: Sizes.Base}} />

          <TextInput
            label="Confirm New Password"
            value={ChangePass.CONFIRM_NEW_PASS}
            placeholder="Confirm New Password"
            onChangeText={text => {
              setChangePass({...ChangePass, CONFIRM_NEW_PASS: text});
            }}
          />
          <View style={{padding: Sizes.Base}} />

          <TextButton
            onPress={() => {
              UpdatePass();
            }}
            label="Update Password"
            loading={false}
          />
        </View>
      </Modal>
    </View>
  );
};

export default Profile;
