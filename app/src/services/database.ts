import Database from "better-sqlite3";
import path from "path";

export const todoDB = new Database(
  path.join(process.cwd(), "db", "todo.db"),
  { readonly: false, fileMustExist: true }
);

export interface TodoList {
  id: string;
  item: string;
  status: string;
  created: string
};

export function insertTodo(item: string): TodoList {
    const id = crypto.randomUUID()
    const todo: TodoList = {id: id, item: item, status: status, created: created};
    const query = "insert into TODO_ITEMS (id, item, status, created) values (?, ?, ?, ?)"
    runQuery(todoDB, query, [todo.id, todo.item, todo.status, todo.created])
    return todo;
}

export function fetchTodo(): TodoList[] {
    return fetchAll(todoDB, "select id, item, status, created from TODO_ITEMS", []) as TodoList[];
}

export function deleteTodo(item: string) {
  runQuery(todoDB, "delete from TODO_ITEMS where item = ?", [item]);
} 

export const fetchAll = (db: InstanceType<typeof Database>, sql: string, params: any[] = []) => {
  return db.prepare(sql).all(...params);
};

export const fetchFirst = (db: InstanceType<typeof Database>, sql: string, params: any[] = []) => {
  return db.prepare(sql).get(...params);
};

export const runQuery = (
  db: InstanceType<typeof Database>,
  sql: string,
  params: any[] = []
) => {
  return db.prepare(sql).run(...params);
};