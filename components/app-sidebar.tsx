"use client";

import * as React from "react";
import {
  IconHome,
  IconUserCheck,
  IconSettings,
  IconUserCircle,
  IconBrandGithub,
  IconBubblePlus,
  IconLibraryPlus
} from "@tabler/icons-react";

import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { user } from "@prisma/client";

const data = {
  navMain: [
    {
      title: "Personal Space",
      url: "/personal",
      icon: IconUserCheck,
    },
    {
      title: "Create a Task",
      url: "/personal/add",
      icon: IconLibraryPlus,
    },
    {
      title: "Account",
      url: "/personal/account",
      icon: IconUserCircle,
    },
    {
      title: "Settings",
      url: "/personal/setting",
      icon: IconSettings,
    },
  ],
  navSecondary: [
    {
      title: "Home",
      url: "/",
      icon: IconHome,
    },
    {
      title: "GitHub",
      url: "https://github.com/AstraBert/did-i-do-it",
      icon: IconBrandGithub,
    },
  ],
};

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  user: user;
}

export function AppSidebar({ user, ...props }: AppSidebarProps) {
  if (!user) {
    throw new Error("AppSidebar requires a user but received undefined.");
  }
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="/">
                <IconBubblePlus className="!size-5 text-purple-400" />
                <span className="text-base font-semibold text-purple-400">Did I Do It?</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavDocuments items={data.documents} /> */}
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
