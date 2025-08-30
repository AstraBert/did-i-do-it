'use client';

import { IconCircleCheck, IconMailCheck, IconMailExclamation } from '@tabler/icons-react';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Button,
} from "@/components/ui/button"
import { completeTask, getUserDetail, taskToComplete } from "./action";
import { sendEmail } from '@/utils/supabase/edge-functions';

export function isValidUUID(uuid: string): boolean {
  return uuid.length == 32
}

interface Task {
  id: number
  userId: string
  title: string
  content: string
  completed: boolean
  createdAt: Date | null
}

export default function CompleteTaskPage() {
  const searchParams = useSearchParams();
  const userIdParam = searchParams.get('userId');
  const taskIdParam = searchParams.get('taskId')
  const [task, setTask] = useState<Task | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [emailSent, setEmailSent] = useState<null | boolean>(null);

  const completeAndSend = async (userId: string, taskTitle: string, taskDescription: string, taskNumber: number) => {
    await completeTask(taskNumber)
    const userDetails = await getUserDetail(userId)
    if (userDetails.email === "") {
        setEmailSent(false)
        return
    }
    const emailAddress = userDetails.email
    const userName = userDetails.name
    const success = await sendEmail(emailAddress, userName, taskTitle, taskDescription, taskNumber)
    setTimeout(() => setEmailSent(success), 1000)
    setEmailSent(null)
    return
  }

  useEffect(() => {
    if (userIdParam && taskIdParam) {
            
      const userId = userIdParam;
      if (userId === "" || !(isValidUUID(userId))) {
        setError('Invalid user ID');
        return;
      }

      const taskId = parseInt(taskIdParam);
            
      if (isNaN(taskId)) {
        setError('Invalid task ID');
        return;
      }

      setLoading(true);
      setError(null);
            
      taskToComplete(taskId, userId)
        .then((task) => {
          if (task) {
            setTask(task);
          } else {
            setError('Unable to load your task');
          }
        })
        .catch((err) => {
          setError('Failed to load user details: ' + err.message);
          console.error(err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [userIdParam, taskIdParam]);

  if (!userIdParam) {
    return <div>Please provide a user ID</div>;
  }

  if (!taskIdParam) {
    return <div>Please provide a task ID</div>;
  }
    
  if (loading) {
    return <div>Loading task...</div>;
  }
    
  if (error) {
    return <div>Error: {error}</div>;
  }
    
  if (!task) {
    return <div>Task not found</div>;
  }

  return (
    <div className="min-h-screen p-6 md:p-8 lg:p-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-center">
          <Card className="w-full max-w-md shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg dark:text-purple-300 text-purple-400 mb-2">
                Mark Task {task.id} As Completed
              </CardTitle>
              <CardAction>
                <a href="/personal">
                  <Button className="bg-purple-300 dark:bg-purple-500 dark:hover:bg-white dark:hover:text-purple-500 dark:text-white text-black hover:bg-purple-500 hover:text-white shadow-lg px-6 py-3 text-base">
                    Back to your Personal Space
                  </Button>
                </a>
              </CardAction>
              <CardDescription className="text-sm">
                Confirm you want to mark the task below as completed: you will receive an email to confirm that yes, you did it!
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0 pb-6">
              <div className="space-y-3">
                <div>
                  <span className="text-sm font-semibold dark:text-purple-300 text-purple-400 block mb-2">
                    Title:
                  </span>
                  <p className="text-sm text-gray-800 dark:text-gray-200 leading-relaxed">
                    {task.title}
                  </p>
                </div>
                                    
                <div>
                  <span className="text-sm font-semibold dark:text-purple-300 text-purple-400 block mb-2">
                    Notes:
                  </span>
                  <p className="text-sm text-gray-800 dark:text-gray-200 leading-relaxed">
                    {task.content || "No notes"}
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="pt-0">
              <Button
                className="bg-purple-300 dark:bg-purple-500 dark:hover:bg-white dark:hover:text-purple-500 dark:text-white text-black hover:bg-purple-500 hover:text-white shadow-lg px-6 py-3 text-base w-full"
                onClick={() => completeAndSend(userIdParam, task.title, task.content, task.id)}
              >
                {emailSent && <IconMailCheck />}
                {emailSent === null && <IconCircleCheck />}
                {!emailSent && typeof emailSent === "boolean" && <IconMailExclamation/>}
                {emailSent && "Email Successfully sent!"}
                {emailSent === null && "Complete Now"}
                {!emailSent && typeof emailSent === "boolean" && "There was an error sending your email"}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}