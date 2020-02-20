import React from 'react'
import Todo from './Todo.js'
import { Provider } from 'react-redux'
import { store } from './store.js'
import { StyleSheet } from 'react-native'

export default App = () => {
    return(
    <Provider store={store}>
        <Todo />
    </Provider>
)
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        paddingTop: 100
      },
})