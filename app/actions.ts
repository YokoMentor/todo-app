'use server'
import { TodoList, insertTodo, fetchTodo, deleteTodo, fetchAtciveItems, clearCompleted, updateTodo } from "./src/services/database";

export const addToList = async (item: string): Promise<TodoList> => {
    return insertTodo(item)
  }

export const getTodos = async(status: string): Promise<TodoList[]> => {
  const items = fetchTodo();

  if(status === 'All'){
    return items;
  } else if (status === 'Active') {
    const activeItems = items.filter(item => item.status === 'Active');
    return activeItems;
  } else if(status === 'Completed') {
    const completedItems = items.filter(item => item.status === 'Completed');
    return completedItems;
  }
  return [];
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



