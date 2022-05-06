import { Todo } from '../interface/todo';

/* export let arrayTodo: Todo[] = [];

export function add(todo: string): Promise<Todo> {
  return new Promise((res, rej) => {
    setTimeout(() => {
      const newTodo: Todo = {
        title: todo,
        id: arrayTodo.length + 1,
        completed: false,
      };
      arrayTodo.push(newTodo);
      res(newTodo);
    }, 2000);
  });
}

export function get(): Promise<Todo[]> {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res(arrayTodo);
    }, 2000);
  });
}

export function update(newTodo: Partial<Todo>, id: number): Promise<Todo> {
  return new Promise((res, rej) => {
    setTimeout(() => {
      arrayTodo = arrayTodo.map((todo) =>
        todo.id == id ? { ...todo, ...newTodo } : todo
      );
      const updatedTodo = arrayTodo.find((todo) => todo.id == id);
      if (updatedTodo) {
        res(updatedTodo);
      } else {
        rej('todo non trovato');
      }
    }, 2000);
  });
} */

let todos: Todo[] = [];

export function get(): Promise<Todo[]> {
  return new Promise((risposta, rej) => {
    setTimeout(() => {
      risposta(todos);
    }, 2000);
  });
}
export function aggiungi(p: Omit<Todo, 'id'>): Promise<Todo> {
  return new Promise((risposta, rej) => {
    setTimeout(() => {
      const newTodo: Todo = { ...p, id: todos.length + 1 };
      todos.push(newTodo);
      risposta(newTodo);
    }, 2000);
  });
}
export function update(valore: Partial<Todo>, id: number): Promise<Todo> {
  return new Promise((risposta, rej) => {
    setTimeout(() => {
      todos = todos.map((p) => (p.id == id ? { ...p, ...valore } : p));
      const updatedTodo = todos.find((p) => p.id == id);
      if (updatedTodo) {
        risposta(updatedTodo);
      } else {
        rej('error');
      }
    }, 2000);
  });
}
