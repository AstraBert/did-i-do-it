import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";

export function SiteHeader() {
  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1 dark:text-purple-300 text-purple-400" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-base font-medium dark:text-purple-300 text-purple-400">Personal Space</h1>
        <div className="ml-auto flex items-center gap-2">
          <Button asChild size="sm" className="bg-purple-300 dark:bg-purple-500 dark:hover:bg-white dark:hover:text-purple-500 dark:text-white text-black hover:bg-purple-500 hover:text-white shadow-lg">
            <a
              href="https://github.com/AstraBert/did-i-do-it"
              rel="noopener noreferrer"
              target="_blank"
              className="dark:text-foreground"
            >
              GitHub
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
}
