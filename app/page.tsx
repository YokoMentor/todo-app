'use client'
import { useState, useEffect, ChangeEvent } from 'react';
import styles from './page.module.css';
import { addToList, getTodos, deleteTodoItem, updateTodoItem } from './actions'
import { TodoList } from './src/services/database'

export default function Page() {
  const darkBgStyle = `${styles.bg_dark} flex flex-col min-h-screen justify-center items-center bg-bg-dark bg-no-repeat bg-contain`;
  const lightBgStyle = `${styles.bg_light} flex flex-col min-h-screen justify-center items-center bg-bg-light bg-no-repeat bg-contain`;

  const [darkTheme, setDarkTheme] = useState(true);
  const [themeSwitch, setThemeSwitch] = useState(true);
  const [todoItem, setTodoItem] = useState('');
  const [toDoList, setTodoList] = useState<TodoList[]>([]);

  useEffect(() => {
    const init = async () =>  {
    const items = await getTodos();
    setTodoList(items);
  }
  init();
  }, [])
  
  function handleThemeSwitcher() {
    if (themeSwitch) {
      setDarkTheme(true);
    } else {
      setDarkTheme(false);
    }
    setThemeSwitch(!themeSwitch);
  }

  function handleTodoItemChange(event: ChangeEvent<HTMLInputElement>){
    event.preventDefault();
    setTodoItem(event.target.value);
  }

  function handleSubmit(event:React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const init = async () =>  {
      await addToList(todoItem);
      const items = await getTodos();
      setTodoList(items);
      setTodoItem(''); //clearing item after submit
    }
    init();
    }

  async function handleDelete(id: string) {
    await deleteTodoItem(id);
    const items = await getTodos();
    setTodoList(items);
  };

  async function toggleChecked(id: string, status: string) {
    await updateTodoItem(id, status);
    const items = await getTodos();
    setTodoList(items);
  }

  return (
    <div className={`${darkTheme ? darkBgStyle : lightBgStyle}`}>
      <div className='flex flex-col justify-center items-center w-[328px]'>
        <div className='flex justify-between items-baseline w-full mb-6'>
          <h1 className='font-bold text-[28px] text-white tracking-[.32em]'>TODO</h1>
          <button className={`${darkTheme ? styles.icon_moon : styles.icon_sun} w-[20px] h-[20px] bg-no-repeat bg-center bg-contain`} onClick={handleThemeSwitcher}></button>
        </div>
        <form className='flex items-center w-full bg-bg-container rounded-md h-[48px] mb-4' onSubmit={handleSubmit}>
          <div className='border border-disabled rounded-full w-[20px] h-[20px] ml-5 mr-3'></div>
          <input  type="text" placeholder='Create a new todo...' value={todoItem} className='text-text-dark text-xs focus:outline-none focus:text-hover' onChange={handleTodoItemChange} />
        </form>
        <div className='divide-solid divide-disabled divide-y-1 w-full rounded-md overflow-hidden text-xs text-hover'>
          <ul>
            {toDoList.map((todo, index) => (
              <li key={index}>
                <div className='flex items-center w-full bg-bg-container h-[48px] has-checked:line-through has-checked:text-disabled cursor-pointer justify-between'>
                  <label htmlFor={index.toString()} className='flex items-center'>
                    <div className='relative flex items-center justify-center'>
                      <input type="checkbox" checked={(todo.status!=='Active')} onChange={_=>toggleChecked(todo.id, todo.status)} name="action" id={index.toString()} className="peer w-[20px] h-[20px] ml-5 mr-3 rounded-full appearance-none border border-disabled cursor-pointer" />
                      <span className={`${styles.icon_check} bg-center absolute w-[20px] h-[20px] ml-5 mr-3 rounded-full opacity-0 peer-checked:opacity-100`}></span>
                    </div>
                    {todo.item}
                  </label>
                  <button className={`${styles.icon_cross} w-[12px] h-[12px] bg-no-repeat bg-center bg-contain mr-5`} onClick={_=>handleDelete(todo.id)}></button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
