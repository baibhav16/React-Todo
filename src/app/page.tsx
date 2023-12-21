"use client"
import React, { useState , useEffect } from 'react'

const page = () => {
  const [title, settitle] = useState("")
  const [mainTask, setmainTask] = useState([])
  useEffect(() => {
    // Load tasks from localStorage when the component mounts
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setmainTask(savedTasks);
  }, []);

  useEffect(() => {
    // Save tasks to localStorage whenever they are updated
    localStorage.setItem('tasks', JSON.stringify(mainTask));
  }, [mainTask]);
  const submitHandler = (e)=>{
    e.preventDefault()
    if (!title.trim()) {
      alert("Task title cannot be empty!");
      return;
    }
    setmainTask([...mainTask,{title}])
    console.log(title)
    settitle("")
    console.log(mainTask)
  };
  const completeHandler = (i) => {
    let copyTask = [...mainTask];
    copyTask[i].completed = true;
    setmainTask(copyTask);
  };
  const deleteHandler = (i)=>{
    let copytask = [...mainTask]
    copytask.splice(i,1)
    setmainTask(copytask)
  }

  let renderTask = <h2>No Task Available</h2>
  if(mainTask.length>0){
  renderTask = mainTask.map((t,i)=>{
return (
<li key={i} className='flex items-center justify-between mb-3 py-3 px-3 bg-white'>
    <div className='flex items-center justify-between mb-3 w-2/3 '>
      <h5 className={`text-2xl font-semibold ${t.completed ? 'line-through text-green-500' : ''}`}>
        {i+1}. {t.title }
      </h5>
    </div> 
    <div>
      <button
        onClick={() => completeHandler(i)}
        className='bg-green-400 text-white px-4 py-2 rounded font-bold mr-2'
        disabled={t.completed}
      >
        Complete
      </button>
      <button
        onClick={() => deleteHandler(i)}
        className='bg-red-400 text-white px-4 py-2 rounded font-bold'
      >
        Delete
      </button>
    </div>
  </li>
 
);
    })}
  return (
   <>
   <h1 className='bg-black text-white p-5 text-center font-bold text-5xl'>Todo list</h1>
  
   <form className='text-center' onSubmit={submitHandler}>
    <input type="text" 
    className='text-2xl border-zinc-800 border-2 m-5 px-4 py-2'
    placeholder='Enter Title'
    value={title}
    onChange={(e)=>{
      settitle(e.target.value)
    }}
    />
    <button className='bg-black text-white text-2xl margin-10 rounded px-4 py-3 font-bold'>Add Task</button>
   </form>
   <hr />
   <div className='p-8 bg-slate-200'>
<ul>{renderTask}</ul>
   </div>
   </>
  )
 
}

export default page
