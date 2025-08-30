import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

async function getServerUser() {
    const data = await auth.api.getSession({
    headers: await headers()
});
    return data; 
}

export async function GetData() {
    // Extract and process form data
    const userData = await getServerUser()
    
    let userId: string = ""

    if (userData != null) {
        userId = userData.user.id
    } else {
        return []
    }

    return await prisma.tasks.findMany(
        {
            where: {userId: userId}
        }
    )
}