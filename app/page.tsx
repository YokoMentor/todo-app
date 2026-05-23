'use client'
import { useState, useEffect, ChangeEvent } from 'react';
import styles from './page.module.css';
import { addToList, getTodos, deleteTodoItem, updateTodoItem } from './actions'
import { TodoList } from './src/services/database'

export default function Page() {
  const darkBgStyle = `${styles.bg_dark} relative flex flex-col min-h-screen justify-center items-center bg-bg-dark bg-no-repeat bg-contain`;
  const lightBgStyle = `${styles.bg_light} relative flex flex-col min-h-screen justify-center items-center bg-bg-light bg-no-repeat bg-contain`;

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
      <div className='absolute top-10 flex flex-col justify-center items-center w-[328px]'>
        <div className='flex justify-between items-baseline w-full mb-6'>
          <h1 className='font-bold text-[28px] text-white tracking-[.32em]'>TODO</h1>
          <button className={`${darkTheme ? styles.icon_moon : styles.icon_sun} w-[20px] h-[20px] bg-no-repeat bg-center bg-contain cursor-pointer`} onClick={handleThemeSwitcher}></button>
        </div>
        <form className='flex items-center w-full bg-bg-container rounded-md h-[48px] mb-4' onSubmit={handleSubmit}>
          <div className='border border-primary-purple rounded-full w-[20px] h-[20px] ml-5 mr-3'></div>
          <input  type="text" placeholder='Create a new todo...' value={todoItem} className='placeholder-txt-default text-xs focus:outline-none focus:placeholder-txt-hover' onChange={handleTodoItemChange} />
        </form>
        <div className='w-full rounded-md overflow-hidden text-xs divide-primary-purple divide-y-1'>
          <ul className='divide-primary-purple divide-y-1'>
            {toDoList.map((todo, index) => (
              <li key={index}>
                <div className='flex items-center w-full bg-bg-container h-[52px] text-txt-hover has-checked:line-through has-checked:text-primary-purple justify-between'>
                  <label htmlFor={index.toString()} className='flex items-center'>
                    <div className='relative flex items-center justify-center cursor-pointer'>
                      <input type="checkbox" checked={(todo.status!=='Active')} onChange={_=>toggleChecked(todo.id, todo.status)} name="action" id={index.toString()} className="peer w-[20px] h-[20px] ml-5 mr-3 rounded-full appearance-none border border-primary-purple" />
                      <span className={`${styles.icon_check} bg-center absolute w-[20px] h-[20px] ml-5 mr-3 rounded-full opacity-0 peer-checked:opacity-100`}></span>
                    </div>
                    {todo.item}
                  </label>
                  <button className={`${styles.icon_cross} w-[12px] h-[12px] bg-no-repeat bg-center bg-contain mr-5 cursor-pointer`} onClick={_=>handleDelete(todo.id)}></button>
                </div>
              </li>
            ))}
          </ul>
          <div className='flex items-center w-full bg-bg-container h-[52px] has-checked:line-through has-checked:text-primary-purple justify-between text-txt-default'>
            <button className='ml-5'>5 items left</button>
            <button className='mr-5 focus:text-txt-active hover:text-txt-hover cursor-pointer'>Clear Completed</button>
          </div>
        </div>
        <div className='rounded-md text-sm text-txt-default flex items-center justify-center w-full bg-bg-container h-[52px] mt-4'>
          <button className='focus:text-txt-active hover:text-txt-hover cursor-pointer'>All</button>
          <button className='mx-5 text-txt-active hover:text-txt-hover cursor-pointer'>Active</button>
          <button className='focus:text-txt-active hover:text-txt-hover cursor-pointer'>Completed</button>
        </div>
      </div>
    </div>
  );
}
