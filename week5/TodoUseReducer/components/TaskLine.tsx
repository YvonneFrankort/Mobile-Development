
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Todo } from '../types/Todo'


interface TaskLineProps {
    item: Todo,
    deleteTodo: (id: number) => void;
    toggleTodo: (id: number) => void;

}

export default function TaskLine({ item, deleteTodo, toggleTodo }: TaskLineProps) {
  
  let textStyle = styles.text;
  if (item.completed) {
    textStyle = styles.completed;
  }

  return (
    <View style={styles.taskline}>
      <TouchableOpacity onPress={() => toggleTodo(item.id)}>
        <Text style={textStyle}>{item.text}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => deleteTodo(item.id)}>
        <Text style={styles.deleteText}>Delete</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    taskline: {
        flexDirection: 'row',
        margin: 8,
        justifyContent: 'space-between',
        marginVertical: 10,
    },
    button: {
      backgroundColor: 'red',
      borderRadius: 8,
    },
    deleteText: {
      color: 'white',
      padding: 4,
    },
    text: {
      fontSize: 18,
    },
    completed: {
      fontSize: 18,
      textDecorationLine: 'line-through',
      color: 'gray',
    },
    
})