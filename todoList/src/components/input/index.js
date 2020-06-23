import React from 'react';
import {TextInput} from 'react-native';

import styles from './styles';

export function DefaultTextInput(props) {
  const {
    onChangeText = () => props.onChangeText,
    placeholder = props.placeholder,
    multiline = false,
  } = props;
  return (
    <TextInput
      placeholder={placeholder}
      placeholderTextColor="#000"
      style={styles.mainInput}
      onChangeText={onChangeText}
      multiline={multiline}
    />
  );
}
