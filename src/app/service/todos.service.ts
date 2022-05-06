import { Todo } from '../interface/todo';

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
