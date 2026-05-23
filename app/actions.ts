'use server'
import { TodoList, insertTodo, fetchTodo, deleteTodo, fetchAtciveItems, clearCompleted, updateTodo } from "./src/services/database";

export const addToList = async (item: string): Promise<TodoList> => {
    return insertTodo(item)
  }

export const getTodos = async(): Promise<TodoList[]> => {
  return fetchTodo();
}

export const deleteTodoItem = async(id: string) => {
    deleteTodo(id);
}

export const countItemsLeft = async(): Promise<number> => {
    return fetchAtciveItems().length;
}

export const clearCompletedItems = async(status: string) => {
    clearCompleted(status);
}

export const updateTodoItem = async(id: string, status: string) => {
  if(status === 'Active') {
    updateTodo(id, 'Completed')
  } else {
    updateTodo(id, 'Active')
  }
}