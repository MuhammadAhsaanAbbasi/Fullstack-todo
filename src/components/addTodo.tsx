"use client"
import React, { useState, useTransition } from 'react'
import { Input } from "@/components/ui/input"
import { Svg } from './send'
import { NewTodo } from '@/lib/drizzle'
import { useRouter } from 'next/navigation'
import { Circle } from './circle'
import { toast } from "sonner"

const AddTodo = () => {
    const [isPending, startTransition] = useTransition();
    const [isFetched, setisFetched] = useState(false)
    const router = useRouter()
    const isMutation = isFetched || isPending
    const [todo, setTodo] = useState<NewTodo>({ task: "" })

    const handleSubmit = async (e:any) => {
        setisFetched(true)
        try {
            if (todo.task) {
                const data = await fetch("/api/todo", {
                    method: "POST",
                    body: JSON.stringify({
                        task: todo.task
                    })
                })
                if (!data.ok) {
                    throw new Error("Please Provide a Task")
                } else {
                    toast("Todo Added Successfully", {
                        action: {
                            label: "X",
                            onClick: () => console.log("X"),
                        }
                    })
                    startTransition(() => {
                        router.refresh()
                    })
                }
            }
        } catch (err) {
            console.error((err as { message: string }).message)
        }
        setisFetched(false)
        setTodo({task:""})
    }
    return (
        <form className='flex absolute bottom-10 left-0 w-full px-6 lg:px-12 space-x-4'>
            <Input
            value={todo.task}
                onChange={(e) => setTodo({ task: e.target.value })}
                className='rounded-full py-3 px-5 border focus:outline-secondary' type="text" />
            <button
                type='button'
                disabled={isMutation}
                onClick={(e) => handleSubmit(e.preventDefault())}
                className='bg-gradient-to-tr from-red-500 to-orange-500 h-12 w-12 p-1 flex-none rounded-full flex justify-center items-center hover:scale-105 duration-300 disabled:hover:scale-100 disabled:cursor-not-allowed 
                ' >
                {isMutation ?
                    (<Circle />)
                    :
                    (<Svg />)
                }
            </button>
        </form>
    )
}

export default AddTodo