import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Dimensions } from 'react-native';
import axios from 'axios'

const {height, width} = Dimensions.get('window')
export default function App() {
  const [todos, setTodos] = useState([])
  const [newTodo, setNewTodo] = useState()

  const fetchData = () => {
    axios.get('http://localhost:3000/todos')
    .then(res => setTodos(res.data))
    .catch(err => console.log(err))
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleChange = text => {
    setNewTodo(text)
  }

  const handlePress = e => {
    axios.post('http://localhost:3000/todos', {
      name: newTodo
    })
    .then(res => console.log(res))
    .catch(err => console.log(err))
    fetchData()
    setNewTodo('')
  }
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput style={styles.input} onChangeText={handleChange} value={newTodo} />
        <TouchableOpacity style={styles.button} onPress={handlePress}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.todos}>
        {todos.map((todo, index) => (
          <View key={index} style={styles.textContainer}>
            <Text style={styles.todoText}>{todo.name}</Text>
          </View>
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
    paddingTop: 100
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft:  20,
    paddingRight: 20,
    marginBottom: 40
  },
  input: {
    flex: 0.7,
    height: 50,
    borderRadius: 4,
    borderBottomWidth: 2,
    borderBottomColor: 'aqua',
    marginRight: 10,
    fontSize: 24,
  }, 
  button: {
    flex: 0.3,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ef2345',
    height: 50,
    borderRadius: 10
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 19
  },
  todos: {
    alignItems: 'center',
  },
  textContainer: {
    borderBottomWidth: 3,
    borderBottomColor: 'green',
    borderRadius: 5,
    marginBottom: 15,
    width: (width / 10) * 9,
  },
  todoText: {
    fontSize: 18,
  }
});
