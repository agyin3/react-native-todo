import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableHighlight, TouchableOpacity } from 'react-native';

export default function App() {
  const [todos, setTodos] = useState(['React Native Tutorial'])
  const [newTodo, setNewTodo] = useState()

  const handleChange = text => {
    setNewTodo(text)
  }

  const handlePress = e => {
    const newTodos = [...todos, newTodo]
    setTodos(newTodos)
    setNewTodo('')
  }
  return (
    <View style={styles.container}>
      <Text>Mobile To-Do List</Text>
      <TextInput style={styles.input} onChangeText={handleChange} value={newTodo} />
      <TouchableOpacity onPress={handlePress}>
        <Text>Submit</Text>
      </TouchableOpacity>
      <View>
        {todos.map((todo, index) => (
          <Text key={index}>{todo}</Text>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 50,
    width: 150,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'aqua'
  }
});
