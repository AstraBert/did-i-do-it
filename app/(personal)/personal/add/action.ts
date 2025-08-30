"use server"

import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

interface ActionState {
  success?: boolean
  message?: string
  error?: string
}

async function getServerUser() {
    const data = await auth.api.getSession({
    headers: await headers()
});
    return data; 
}

export async function PushData(prevState: ActionState, formData: FormData): Promise<ActionState> {
  try {
    // Extract and process form data
    const userData = await getServerUser()
    
    let userId: string = ""

    if (userData != null) {
        userId = userData.user.id
    } else {
        return {error: "Impossible to retrieve current user"}
    }
    
    const data = {
      title: formData.get("title") as string,
      content: formData.get("description") as string,
      userId: userId,
    }

    // Validate required fields
    if (!data.title) {
      return {
        error: "Please provide the title of the task",
      }
    }

    // Validate that at least one food type is selected
    if (!data.content) {
      data.content = ""
    }

    // Insert data into Prisma
    await prisma.tasks.create({
        data: {
            userId: data.userId,
            title: data.title,
            content: data.content,
            completed: false,
            createdAt: new Date()
        }
    })

    // Return success state
    return {
      success: true,
      message: "Task added successfully!",
    }
  } catch (error) {
    console.error("Unexpected error:", error)
    return {
      error: "An unexpected error occurred. Please try again.",
    }
  }
}
