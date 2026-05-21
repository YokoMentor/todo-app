'use server'
import { fetchTodo, Todo } from "./src/services/database";

export const getTodo = async(): Promise<Todo> => {
  const allAdvice = fetchTodo();
  return allAdvice;
}