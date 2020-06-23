import React from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import {MyIcon} from '../my-icon';
import styles from './styles';

export function TodoCard(props) {
  const {
    isDone = false,
    title = '',
    onDelete = () => {},
    onPress = () => {},
    onPressCard = () => {},
    id = '',
  } = props;

  return (
    <TouchableOpacity onPress={() => onPressCard(id)} disabled={isDone}>
      <View style={styles.todoCard}>
        <MyIcon
          name="icon-certo"
          color={isDone ? '#50A133' : '#808080'}
          onPress={() => onPress(id)}
        />
        <Text
          numberOfLines={1}
          style={[styles.todoCardTitle, isDone && styles.isDone]}>
          {title}
        </Text>
        <TouchableWithoutFeedback onPress={() => onDelete(id)}>
          <MyIcon name="icon-delete" color="#C60000" />
        </TouchableWithoutFeedback>
      </View>
    </TouchableOpacity>
  );
}
