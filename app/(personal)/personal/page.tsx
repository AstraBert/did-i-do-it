import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { GetData } from "@/app/(personal)/personal/action"
import { IconPlus, IconCheck } from "@tabler/icons-react"

export default async function MainPage() {
  const data = (await GetData()) ?? []
  const notCompleteTasks = data.filter(task => !task.completed)

  return (
    <div className="min-h-screen p-6 md:p-8 lg:p-12">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="flex justify-center">
          <h1 className="text-3xl font-bold dark:text-purple-300 text-purple-400">Your Tasks</h1>
        </div>

        <br />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {notCompleteTasks.map((dataPoint) => (
            <Card key={dataPoint.id} className="w-full shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg dark:text-purple-300 text-purple-400 mb-2">{dataPoint.title}</CardTitle>
                <CardDescription className="text-sm">
                  {(dataPoint.createdAt ?? new Date()).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </CardDescription>
                <CardAction>
                    <a href={`/personal/complete?taskId=${dataPoint.id}&userId=${dataPoint.userId}`}>
                    <Button className="bg-purple-300 dark:bg-purple-500 dark:hover:bg-white dark:hover:text-purple-500 dark:text-white text-black hover:bg-purple-500 hover:text-white shadow-lg px-6 py-3 text-base">
                        <IconCheck />
                        Complete Task {dataPoint.id}
                    </Button>
                    </a>
                </CardAction>
              </CardHeader>
              <CardContent className="pt-0 pb-6">
                <div className="space-y-3">
                  <div>
                    <span className="text-sm font-semibold dark:text-purple-300 text-purple-400 block mb-2">
                      Notes:
                    </span>
                    <p className="text-sm text-gray-800 dark:text-gray-200 leading-relaxed">
                      {dataPoint.content || "No notes"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <br />
        <br />

        <div className="flex flex-col items-center space-y-8 pt-8">
          {/* Summary Card - Properly spaced */}
          <Card className="max-w-sm w-full shadow-lg">
            <CardContent className="p-8 text-center">
              <p className="text-sm dark:text-purple-300 text-purple-400 font-semibold mb-3">Total Tasks</p>
              <p className="text-4xl font-bold dark:text-purple-300 text-purple-400">{notCompleteTasks.length}</p>
            </CardContent>
          </Card>

          <br />
          <br />

          {/* Create Task Button - Well separated */}
          <a href="/personal/add">
            <Button className="bg-purple-300 dark:bg-purple-500 dark:hover:bg-white dark:hover:text-purple-500 dark:text-white text-black hover:bg-purple-500 hover:text-white shadow-lg px-6 py-3 text-base">
              <IconPlus className="mr-2" />
              Create a New Task
            </Button>
          </a>
        </div>
      </div>
    </div>
  )
}
