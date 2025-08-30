'use server';

import prisma from "@/lib/prisma";

export async function taskToComplete(taskId: number, userId: string) {
    const tsk = await prisma.tasks.findUnique(
        {
            where: {userId: userId, id: taskId}
        }
    )
    return tsk
}

export async function completeTask(taskId: number) {
    await prisma.tasks.update(
        {
            data: {
                completed: true,
            },
            where: {
                id: taskId
            }
        },
    )
}

interface UserDetails {
    name: string,
    email: string,
}

export async function getUserDetail(userId: string) {
    const user = await prisma.user.findUnique({where: {id: userId}})
    if (user) {
        return {name: user.name, email: user.email} as UserDetails;
    } else {
        return {name: "", email: ""} as UserDetails;
    }
}