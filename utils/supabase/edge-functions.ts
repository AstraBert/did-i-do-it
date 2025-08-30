'use server'

import { createClient } from "@/utils/supabase/server";

export async function sendEmail(email: string, name: string, taskTitle: string, taskDescription: string, taskNumber: number): Promise<boolean> {
    const supabase = await createClient()
    
    const { data, error } = await supabase.functions.invoke("send-email", {
        body: {
            html: `<h3>Hey there ${name}!</h3>\n<p>You are receiving this email because you did it! You completed your Task ${taskNumber}: ${taskTitle}.${taskDescription !== "" ? ` Your task description: '${taskDescription}'` : ''}</p>\n<br>\n<p>Congrats on doing it and all the very best,</p>\n<br>\n<p>Did-You-Do-It Bot</p>\n`, 
            to: email, 
            subject: `Hey ${name}, you did it!`
        }
    })
    
    if (error) {
        console.error("An error occurred:", error)
        return false
    }
    
    return true
}