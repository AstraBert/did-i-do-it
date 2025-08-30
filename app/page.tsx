import { auth } from "@/lib/auth";
import { headers } from "next/headers";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import {
  IconLockSquareRoundedFilled,
  IconBubblePlus,
  IconBrandGithub
} from "@tabler/icons-react";

export default async function page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <div className="flex min-h-screen flex-col">
      {/* Navigation */}
      <header className="border-b">
        <div className="container  flex h-16 items-center justify-between">
          <div className="flex items-center ">
            {/* <Lock size={24} className="text-primary" /> */}
            <span className="font-bold text-xl text-purple-400">Did-I-Do-It?</span>
          </div>
          <nav className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <ModeToggle />
              {session?.user ? (
                <a href="/personal">
                  <Button size="sm" className="bg-purple-300 dark:bg-purple-500 dark:hover:bg-white dark:hover:text-purple-500 dark:text-white text-black hover:bg-purple-500 hover:text-white shadow-lg">
                    Go to Your Personal Page
                  </Button>
                </a>
              ) : (
                <>
                  <Link href="/login">
                    <Button variant="outline" size="sm">
                      Log in
                    </Button>
                  </Link>
                  <Link href="/signup">
                    <Button size="sm">Sign up</Button>
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      </header>

      {/* Hero section */}
      <section className="py-20">
        <div className="container flex flex-col items-center text-center gap-6">
          <IconBubblePlus size={64} className="text-purple-300" />
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight max-w-3xl text-purple-300">
            {/* //Modern Authentication for Next.js Applications */}
            Did I Do It?
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            DIDI (short for Did I Do It?) is an application for people who always forget what tasks they completed and what they did not: you set a task, and when you mark it as done you get an email - so that you won't forget you did it! 
          </p>
          <div className="flex gap-4 mt-4">
            <Link href="/login">
              <Button size="lg" className=" bg-purple-300 dark:bg-purple-500 dark:hover:bg-white dark:hover:text-purple-500 dark:text-white text-black hover:bg-purple-500 hover:text-white shadow-2xl">
                Try It Out Now!
              </Button>
            </Link>
            <a
              target="_blank"
              href="https://github.com/AstraBert/did-i-do-it"
            >
              <Button size="lg" className="gap-2 bg-purple-300 dark:bg-purple-500 dark:hover:bg-white dark:hover:text-purple-500 dark:text-white text-black hover:bg-purple-500 hover:text-white shadow-2xl">
                Star on GitHub <IconBrandGithub size={18} />
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* CTA section */}

      {/* Footer */}
      <footer className="border-t py-10 mt-auto">
        <div className="container flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <IconLockSquareRoundedFilled size={20} className="font-bold text-purple-400" />
            <span className="font-bold">Did I Do It?</span>
          </div>
          <div className="flex gap-8">
            <a
              href="https://github.com/AstraBert"
              target="_blank"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Github
            </a>
            <a
              href="https://link.clelia.dev"
              target="_blank"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Social Media Platforms
            </a>
            <a
              href="mailto:astraberte9@gmail.com"
              target="_blank"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Contact
            </a>
          </div>
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} <a href="https://clelia.dev" target="_blank">Clelia Astra Bertelli</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
