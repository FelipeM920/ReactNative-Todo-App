import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  todoCard: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  todoCardTitle: {
    flex: 1,
    marginHorizontal: 10,
    fontSize: 16,
  },
  isDone: {
    textDecorationLine: 'line-through',
    color: '#808080',
  },
});
