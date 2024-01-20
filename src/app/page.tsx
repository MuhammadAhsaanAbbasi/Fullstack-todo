import AddTodo from '@/components/addTodo'
import TodoList from '@/components/todoList'
import Image from 'next/image'

import React from 'react'


export default async function Home() {
  return (
<div className='w-full h-screen bg-gradient-to-tr from-pink-500 to-orange-500 justify-center px-4 flex items-center'>
      {/* Mobile */}
      <div className='rounded-3xl px-2 relative  w-full max-w-md min-w-[280px] h-[520px] my-16
     shadow-2xl bg-gradient-to-tr from-white/30 to-white/20 backdropFilter'>
        {/* Todos */}
        <TodoList />
        {/* Input */}
        <AddTodo />
        {/* Mobile bottom bar */}
        <div className='h-1 min-w-[150px] w-4/12 rounded-full  bg-slate-900 absolute bottom-4 left-[50%] -translate-x-[50%]'></div>
      </div>
    </div>
  )
}
