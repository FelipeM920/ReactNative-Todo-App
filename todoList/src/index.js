import React, {useState, useEffect} from 'react';
import {View, Alert, FlatList} from 'react-native';
import {TodoCard, AddButton, DefaultTextInput, Separator} from './components';

import AsyncStorage from '@react-native-community/async-storage';

import styles from './styles';

const storageKey = '@TODOS';

const storeDate = async value => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(storageKey, jsonValue);
  } catch (e) {
    Alert.alert('Não foi possivel salvar no storage.');
  }
};

const getDate = async () => {
  try {
    const todos = await AsyncStorage.getItem(storageKey);
    return todos !== null ? JSON.parse(todos) : null;
  } catch (e) {
    Alert.alert('Não foi possivel carregar no storage.');
    return [];
  }
};

export default function App() {
  const [todo, setTodo] = useState('');
  const [todoDescription, setTodoDescription] = useState('');
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    getDate().then(data => {
      setTodos(data);
    });
  }, []);

  useEffect(() => {
    storeDate(todos);
  }, [todos]);

  function onDelete(idCard) {
    const newTodos = todos.filter(function(value, index) {
      return idCard !== index;
    });
    setTodos(newTodos);
  }

  function onChangeText(text) {
    setTodo(text);
  }

  function onChangeDescriptionText(text) {
    setTodoDescription(text);
  }

  function onAddTodo() {
    const newTodos = todos.concat({
      isDone: false,
      title: todo,
      description: todoDescription,
      id: todos.length,
    });
    setTodos(newTodos);
  }

  function onPress(id) {
    const newTodos = todos.map((item, index) => {
      if (index === id) {
        return {...item, isDone: true};
      }
      return {...item};
    });
    setTodos(newTodos);
  }

  function onPressCard(id) {
    const selectedTodo = todos.find(todoCard => todoCard.id === id);
    Alert.alert(
      '',
      selectedTodo.description,
      [
        {text: 'FEITO', onPress: () => onPress(id)},
        {text: 'EXCLUIR', onPress: () => onDelete(id)},
      ],
      {cancelable: false},
    );
  }

  function renderItem({item, index}) {
    return (
      <TodoCard
        isDone={item.isDone}
        title={item.title}
        onDelete={onDelete}
        onPress={onPress}
        onPressCard={onPressCard}
        id={index}
      />
    );
  }

  return (
    <View style={styles.container}>
      <DefaultTextInput
        placeholder="To do"
        onChangeText={text => onChangeText(text)}
        value={todo}
      />
      <DefaultTextInput
        placeholder="Descrição"
        onChangeText={text => onChangeDescriptionText(text)}
        value={todoDescription}
        multiline={true}
      />
      <AddButton onPress={onAddTodo} />
      <Separator />
      <FlatList
        data={todos}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
}
