import { useReducer } from 'react';
import { Todo } from '../types/Todo';

// Actions the reducer can handle
type Action =
  | { type: 'ADD_TODO'; text: string }
  | { type: 'TOGGLE_TODO'; id: number }
  | { type: 'DELETE_TODO'; id: number };


function todosReducer(state: Todo[], action: Action): Todo[] {
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, { id: Date.now(), text: action.text, completed: false }];

    case 'TOGGLE_TODO':
      return state.map(todo =>
        todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
      );

    case 'DELETE_TODO':
      return state.filter(todo => todo.id !== action.id);

    default:
      return state;
  }
}


export function useTodos() {
  const [todos, dispatch] = useReducer(todosReducer, []);

  const addTodo = (text: string) => dispatch({ type: 'ADD_TODO', text });
  const toggleTodo = (id: number) => dispatch({ type: 'TOGGLE_TODO', id });
  const deleteTodo = (id: number) => dispatch({ type: 'DELETE_TODO', id });

  return { todos, addTodo, toggleTodo, deleteTodo };
}
