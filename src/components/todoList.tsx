"use client"
import { Todo } from '@/lib/drizzle'
import { useRouter } from 'next/navigation'
import React, { FC, useEffect, useState, useTransition } from 'react'
import { MdDelete } from "react-icons/md";
import { toast } from "sonner"

const getData = async () => {
    try {
        const data = await fetch("http://localhost:3000/api/todo", {
            method: "GET",
            cache: "no-store",
            headers: {
                "Content-Type": "application/json"
            }
        })
        const result = await data.json()
        // console.log(result)
        return result
    } catch (err) {
        console.error((err as { message: string }).message)
    }
}


const TodoList = () => {
    const [resData, setResData] = useState<{ data: Todo[] }>()
    useEffect(() => {
        async function fetchData() {
            const res: { data: Todo[] } = await getData()
            setResData(res)
        }
        fetchData()
    })
    const [isPending, startTransition] = useTransition();
    const [isFetched, setisFetched] = useState(false)
    const router = useRouter()
    const isMutation = isFetched || isPending
    const deleteTodo = async (id: number) => {
        setisFetched(true)
        try {
            const data = await fetch("/api/todo", {
                method: "DELETE",
                body: JSON.stringify({ id })
            })
            if (!data.ok) {
                throw new Error("Please Provide a Task")
            } else {
                toast("Todo Deleted Successfully", {
                    action: {
                        label: "X",
                        onClick: () => console.log("X"),
                    },
                })
                startTransition(() => {
                    router.refresh()
                })
            }
        } catch (err) {
            console.error((err as { message: string }).message)
        }
        setisFetched(false)
    }
    return (
        <div className='max-h-96 overflow-auto w-full space-y-5 absolute top-10 px-4 right-0'>
            {resData?.data.map((item) => (
                <div key={item.id} className='bg-white/65 text-black w-full p-6 flex items-center justify-between gap-5 rounded-md'>
                    <div className='flex items-center gap-x-2'>
                        <div className='h-3.5 w-3.5 rounded-full bg-gradient-to-tr from-red-500 to-orange-500'></div>
                        <p className='text-xl font-semibold'>{item.task}</p>
                    </div>
                    <button
                        onClick={() => deleteTodo(item.id)
                        }
                        className="">
                        <MdDelete className='h-12 w-12 p-1 flex-none flex justify-center items-center hover:scale-105 duration-300 text-red-500' />
                    </button>
                </div>
            ))}
        </div>
    )
}

export default TodoList
