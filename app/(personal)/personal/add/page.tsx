"use client"

import { useActionState } from "react"
import { PushData } from "@/app/(personal)/personal/add/action"
import { IconSignLeft, IconLoader, IconPlus } from "@tabler/icons-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, XCircle } from "lucide-react"

interface ActionState {
  success?: boolean
  message?: string
  error?: string
}

export default function AddFeedingPage() {
  const [state, formAction, isPending] = useActionState<ActionState, FormData>(PushData, {})

  return (
    <div className="flex items-center justify-center min-h-full p-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="dark:text-purple-300 text-purple-400">Create a Task</CardTitle>
          <CardDescription>Fill out the following fields to add a new task!</CardDescription>
        </CardHeader>

        {/* Success Banner */}
        {state.success && (
          <div className="px-6">
            <Alert className="border-green-200 bg-green-50">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">
                {state.message || "Task added successfully!"}
              </AlertDescription>
            </Alert>
          </div>
        )}

        {/* Error Banner */}
        {state.error && (
          <div className="px-6">
            <Alert className="border-red-200 bg-red-50">
              <XCircle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-800">{state.error}</AlertDescription>
            </Alert>
          </div>
        )}

        <form action={formAction}>
          <CardContent>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="title" className="dark:text-purple-300 text-purple-400 font-semibold">Title</Label>
                <Input id="title" type="text" name="title" placeholder="An Awesome Task" required disabled={isPending} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description" className="dark:text-purple-300 text-purple-400 font-semibold">Notes</Label>
                <Input
                  id="description"
                  type="text"
                  name="description"
                  placeholder="I have to do this task"
                  disabled={isPending}
                />
              </div>
            </div>
          </CardContent>
          <br />
          <CardFooter className="flex-col gap-2">
            <Button type="submit" className="w-full bg-purple-300 dark:bg-purple-500 dark:hover:bg-white dark:hover:text-purple-500 dark:text-white text-black hover:bg-purple-500 hover:text-white shadow-lg" disabled={isPending}>
              {isPending ? <IconLoader /> : <IconPlus />}
              {isPending ? "Adding task..." : "Add the task!"}
            </Button>
            <Link href="/personal">
              <Button type="button" className="w-full bg-purple-300 dark:bg-purple-500 dark:hover:bg-white dark:hover:text-purple-500 dark:text-white text-black hover:bg-purple-500 hover:text-white shadow-lg" variant="secondary" disabled={isPending}>
                <IconSignLeft/>
                Back to your personal space
              </Button>
            </Link>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
