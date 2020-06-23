import React from 'react';
import {TouchableOpacity, Text} from 'react-native';

import styles from './styles';

export function AddButton(props) {
  const {onPress = () => props.onPress} = props;
  return (
    <TouchableOpacity onPress={onPress} style={styles.mainButton}>
      <Text style={styles.buttonText}>Adicionar</Text>
    </TouchableOpacity>
  );
}
