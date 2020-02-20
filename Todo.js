import React, { useState, useEffect } from 'react';
import * as Animatable from 'react-native-animatable'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCheckSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Dimensions } from 'react-native';
import { connect } from 'react-redux'
import { fetchData, postData, toggleComplete, removeTask } from './actions.js'

const {height, width} = Dimensions.get('window') // Grab height/width to allow percentage calculations in styling
function Todo(props) {
  const [newTodo, setNewTodo] = useState('')

  useEffect(() => {
    props.fetchData()
  }, [])

  const handleChange = text => {
    setNewTodo(text)
  }

  const handleSubmit = e => {
    props.postData({
      name: newTodo,
      completed: false,
      deleted: false
    })
    setNewTodo('')
  }

  const toggleComplete = (todo) => {
    props.toggleComplete(
      {
        ...todo,
        completed: !todo.completed
        
      },
      todo.id
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heroText}>Todo List</Text>
      <View style={styles.inputContainer}>
        <TextInput style={styles.input} onChangeText={handleChange} value={newTodo} />
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.todos}>
        {props.todos && props.todos.map((todo) => (
          <Animatable.View animation={'fadeIn'} key={todo.id} style={[styles.textContainer, todo.completed ? styles.completed : '']}>
            <Text style={[styles.todoText, todo.completed ? styles.strikeThrough : '']}>{todo.name}</Text>
            <View style={styles.iconContainer}>
              <FontAwesomeIcon icon={faCheckSquare} style={{color: '#0f4c75'}} size={24} onPress={() => toggleComplete(todo)} />
              <FontAwesomeIcon icon={faTrash} size={24} style={{color: '#0f4c75'}} onPress={() => props.removeTask(todo.id)} />
            </View>
          </Animatable.View>
        ))}
      </View>
    </View>
  );
}

const mapStateToProps = state => {
  return {
    todos: state.todos
  }
}

export default connect(
  mapStateToProps,
  {
    fetchData,
    postData,
    toggleComplete,
    removeTask
  }
)(Todo)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#bbe1fa',
    alignItems: 'center',
    paddingTop: 100
  },
  heroText: {
    fontSize: 35,
    color: '#272727',
    marginBottom: 30
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingLeft:  20,
    paddingRight: 20,
    marginBottom: 40
  },
  input: {
    flex: 0.7,
    height: 50,
    borderRadius: 4,
    borderBottomWidth: 2,
    borderBottomColor: '#1b262c',
    marginRight: 10,
    fontSize: 24,
    color: '#1b262c'
  }, 
  button: {
    flex: 0.3,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3282b8',
    height: 35,
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 3,
    borderBottomColor: '#1b262c',
    borderRadius: 5,
    marginBottom: 15,
    width: (width / 10) * 9,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 5,
    paddingTop: 5
  },
  completed: {
    backgroundColor: '#52de97'
  },
  todoText: {
    fontSize: 22,
    color: '#1b262c'
  },
  strikeThrough: {
    textDecorationLine: 'line-through'
  },
  iconContainer: {
    width: (width / 10) * 1.5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
});
