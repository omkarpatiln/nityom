import {
  KeyboardTypeOptions,
  StyleSheet,
  Text,
  TextInput as TextField,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import {useSelector} from '../Modules';
import {isTablet} from '../Modules/Reducers/app';
interface INPUT_INTERFACE {
  leftChild?: any;
  rightChild?: any;
  value: string | number;
  placeholder?: string;
  onChangeText: (text: string) => void;
  disable?: boolean;
  keyboardType?: KeyboardTypeOptions;
  multiline?: boolean;
  maxLength?: number;
  style?: ViewStyle;
  textStyle?: TextStyle;
  error?: boolean;
  label?: string;
  labelStyle?: TextStyle;
  hidden?: boolean;
  imp?: boolean;
  FontSize?: TextStyle;
}
const TextInput = ({
  leftChild,
  rightChild,
  value,
  placeholder,
  onChangeText,
  disable,
  keyboardType = 'default',
  multiline = false,
  maxLength,
  style,
  textStyle,
  error,
  label,
  labelStyle,
  hidden,
  imp,
}: INPUT_INTERFACE) => {
  const {Colors, Fonts, Sizes} = useSelector(state => state.app);
  return (
    <View style={{width: '100%'}}>
      {label && (
        <Text
          style={{
            ...Fonts.Regular3,
            color: Colors.Black,

            ...labelStyle,
          }}
          numberOfLines={1}
          adjustsFontSizeToFit>
          {'' + label}
          {imp ? (
            <Text
              style={{
                ...Fonts.Regular3,
                color: '#FF0123',
                ...labelStyle,
              }}>
              {'*'}
            </Text>
          ) : (
            ''
          )}
        </Text>
      )}
      <View
        style={[
          {
            width: '100%',
            borderRadius: Sizes.Base,
            minHeight: isTablet
              ? Sizes.ScreenPadding
              : multiline
              ? Sizes.Field * 2
              : Sizes.Field,
            maxHeight: multiline ? Sizes.Field * 3 : Sizes.Field,
            borderColor: error ? Colors.error : Colors.Primary,
            borderWidth: 1,
            flexDirection: 'row',
            alignItems: multiline ? 'baseline' : 'center',
            backgroundColor: disable ? '#dddddd' : Colors.Background,
            shadowColor: Colors.Primary,
          },
          {...style},
        ]}>
        {leftChild ? leftChild : null}
        <TextField
          secureTextEntry={hidden ? true : false}
          keyboardType={keyboardType}
          value={`${value}`}
          onChangeText={(text: string) => {
            onChangeText(text);
          }}
          style={[
            {
              flex: 1,
              paddingHorizontal: Sizes.Padding,
              ...Fonts.Regular3,
              alignItems: 'center',
              height: '100%',
              textAlignVertical: multiline ? 'top' : 'center',
              justifyContent: 'center',
              color: error ? Colors.error : Colors.Black,
              paddingVertical: 0,
            },
            {...textStyle},
          ]}
          editable={!disable}
          placeholder={placeholder}
          placeholderTextColor={error ? Colors.error + '80' : 'gray'}
          multiline={multiline}
          maxLength={maxLength}
        />
        {rightChild ? rightChild : null}
      </View>
    </View>
  );
};

export default TextInput;

const styles = StyleSheet.create({});
