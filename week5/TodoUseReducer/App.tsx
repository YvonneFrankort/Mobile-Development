import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import TaskLine from './components/TaskLine';
import { useTodos } from './hooks/useTodo';

export default function App() {
  const { todos, addTodo, toggleTodo, deleteTodo } = useTodos();
  const [newTask, setNewTask] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todo List</Text>

      <View style={styles.inputRow}>
        <TextInput
          value={newTask}
          onChangeText={setNewTask}
          placeholder="Enter a new task"
          style={styles.input}
        />
        <TouchableOpacity
          style={styles.saveButton}
          onPress={() => {
            if (!newTask.trim()) return;
            addTodo(newTask);
            setNewTask('');
          }}
        >
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>

      {todos.map(todo => (
        <TaskLine
          key={todo.id}
          item={todo}
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightblue',
    justifyContent: 'flex-start',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  input: {
    flex: 1, 
    backgroundColor: 'white', 
    padding: 12, 
    borderRadius: 8, 
    marginRight: 10, 
    borderWidth: 1, 
    borderColor: '#ccc',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: 'darkblue',
  }, 
  saveButton: {
    backgroundColor: 'green',
    padding: 12,
    paddingVertical: 12,
    borderRadius: 8,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    
  },
  inputRow: {
    flexDirection: 'row',
    marginBottom: 20,
    marginTop: 20,
    alignItems: 'center',
  },
});
