import {
  ActivityIndicator,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {ViewStyle} from 'react-native';
import {TextStyle} from 'react-native';
import {useSelector} from '../Modules';
import {isTablet} from '../Modules/Reducers/app';

interface TEXT_BUTTON {
  label: string;
  onPress: () => void;
  loading: boolean;
  disable?: boolean;
  colors?: string[];
  leftChild?: any;
  rightChild?: any;
  style?: ViewStyle;
  ViewSytle?: ViewStyle;
  textStyle?: TextStyle;
  isBorder?: boolean;
}
const TextButton = ({
  label,
  onPress,
  loading,
  disable,
  leftChild,
  rightChild,
  colors,
  style,
  textStyle,
  ViewSytle,
  isBorder,
}: TEXT_BUTTON) => {
  const {Colors, Fonts, Sizes} = useSelector(state => state.app);
  const colorCode = disable
    ? ['#808080', '#999999']
    : colors
    ? colors
    : [Colors.STATUS_COLOR, Colors.Primary];
  return (
    <TouchableOpacity
      style={{
        width: '100%',
        height: isTablet ? Sizes.ScreenPadding : Sizes.Field,
        borderRadius: Sizes.Base,
        ...style,
        // backgroundColor: 'red',
      }}
      onPress={() => onPress()}
      activeOpacity={0.7}
      disabled={disable || loading}
      hitSlop={{bottom: 10, left: 10, right: 10, top: 10}}>
      <LinearGradient
        colors={colorCode}
        style={{
          flex: 1,
          borderRadius: Sizes.Base,
        }}>
        <View
          style={{
            flex: 1,
            margin: 1,
            backgroundColor: isBorder ? Colors.Background : 'transparent',
            borderRadius: Sizes.Base - 1,
            paddingHorizontal: Sizes.Padding,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            ...ViewSytle,
          }}>
          {leftChild ? leftChild : null}
          <Text
            style={{
              ...Fonts.Bold3,
              flex: 1,
              textAlign: 'center',
              textAlignVertical: 'center',
              color: isBorder ? colorCode[0] : Colors.Background,
              ...textStyle,
            }}
            numberOfLines={1}
            // adjustsFontSizeToFit
            selectable={false}>
            {label}
          </Text>
          {loading ? (
            <ActivityIndicator
              color={Colors.Background}
              style={{
                position: 'absolute',
                right: 10,
              }}
            />
          ) : null}
          {rightChild ? rightChild : null}
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default TextButton;

const styles = StyleSheet.create({});
