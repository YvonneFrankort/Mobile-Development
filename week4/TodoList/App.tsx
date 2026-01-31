import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import { Todo } from './types/Todo';
import { TouchableOpacity } from 'react-native';
import { useEffect } from 'react';
import TaskLine from './components/TaskLine';



export default function App() {

  const [newTask, setNewTask] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
  const loadTodos = async () => {
    try {
      const storedTodos = await AsyncStorage.getItem('todos');
      if (storedTodos !== null) {
        setTodos(JSON.parse(storedTodos));
      }
    } catch (error) {
      console.log(error);
    }
  };
  loadTodos();
}, []);


  useEffect(() => {
  const saveTodos = async () => {
    try {
      await AsyncStorage.setItem('todos', JSON.stringify(todos));
    } catch (error) {
      console.log(error);
    }
  };
  saveTodos();
}, [todos]);


  const addTodo = (text: string) => {
  const newTodo: Todo = {
    id: Date.now(),
    text,
    completed: false,
  };
  setTodos(prev => [...prev, newTodo]);
};


  const toggleTodo = (id: number) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } 
        : todo
      )
    );
  };


  const deleteTodo = (id: number) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };


  return (
  <View style={styles.container}>
    <Text style={styles.title}>Todo list</Text>

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
          addTodo(newTask)
          setNewTask('')
        }}
      >
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </View>

    {todos.map(todo => (
      <TaskLine
        key={todo.id}
        item={todo}
        deleteTodo={deleteTodo}
        toggleTodo={toggleTodo}
      />
    ))}
  </View>
)
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
