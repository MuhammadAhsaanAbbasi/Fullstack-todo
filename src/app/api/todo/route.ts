import { NextRequest,NextResponse } from "next/server";
import { todoTable, Todo, NewTodo, db } from "@/lib/drizzle";
import { sql } from "@vercel/postgres";
import { METHODS } from "http";
import { eq } from "drizzle-orm";


export async function GET(request:NextRequest){
    try{
        await sql`SELECT * FROM TODOS`
        const res = await db.select().from(todoTable)
        return NextResponse.json({data:res})
    }catch(err){
        console.log(err)
        return NextResponse.json((err as {message:string}).message)
    }
}

export async function POST(request:NextRequest){
    const req = await request.json()
    try{
        if(req.task){
            const res = await db.insert(todoTable).values({
                task: req.task 
            }).returning()
            return NextResponse.json({message:"Todo Added Succesfully"})
        }else{
            return NextResponse.json({message:"Please Provide a Task field"})
        }
    }catch(err){
        return NextResponse.json((err as {message:string}).message)
    }
}

export async function DELETE(request:NextRequest) {
    const req = await request.json()
    try{
        if(req.id){
            const res = await db.delete(todoTable).where(eq(todoTable.id, req.id)).returning()
            return NextResponse.json({message:`Todo Deleted Succesfully`,data:res}) 
        }else{
            return NextResponse.json({message:"Please Provide a Task field"}) 
        }
    }catch(err){
        return NextResponse.json((err as {message:string}).message)
    }
}