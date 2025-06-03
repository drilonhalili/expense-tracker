import {
  Frame,
  LifeBuoy,
  Map,
  PieChart,
  Send,
  UserCog,
  SquareTerminal
} from "lucide-react"

import { NavMain } from "@/components/Navigation/main"
import { NavSecondary } from "@/components/Navigation/secondary"
import { NavUser } from "@/components/Navigation/user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from "@/components/ui/sidebar"
import { useQuery } from "@tanstack/react-query"
import { userQueryOptions } from "@/lib/api"
import { IconDatabase, IconFileWord, IconInnerShadowTop, IconReport } from "@tabler/icons-react"
import { NavProjects } from "../Navigation/projects"
import { Link } from "@tanstack/react-router"
import { NavDocuments } from "../Navigation/documents"

const sidebarData = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg"
  },
  navMain: [
    {
      title: "Expenses",
      url: "/expenses",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Create Expense",
          url: "/create-expense"
        }
        // {
        //   title: "Starred",
        //   url: "#"
        // },
        // {
        //   title: "Settings",
        //   url: "#"
        // }
      ]
    },
    // {
    //   title: "Models",
    //   url: "#",
    //   icon: Bot,
    //   items: [
    //     {
    //       title: "Genesis",
    //       url: "#"
    //     },
    //     {
    //       title: "Explorer",
    //       url: "#"
    //     },
    //     {
    //       title: "Quantum",
    //       url: "#"
    //     }
    //   ]
    // },
    // {
    //   title: "Documentation",
    //   url: "#",
    //   icon: BookOpen,
    //   items: [
    //     {
    //       title: "Introduction",
    //       url: "#"
    //     },
    //     {
    //       title: "Get Started",
    //       url: "#"
    //     },
    //     {
    //       title: "Tutorials",
    //       url: "#"
    //     },
    //     {
    //       title: "Changelog",
    //       url: "#"
    //     }
    //   ]
    // },
    {
      title: "Profile",
      url: "/profile",
      icon: UserCog
      // items: [
      //   {
      //     title: "General",
      //     url: "#"
      //   },
      //   {
      //     title: "Team",
      //     url: "#"
      //   },
      //   {
      //     title: "Billing",
      //     url: "#"
      //   },
      //   {
      //     title: "Limits",
      //     url: "#"
      //   }
      // ]
    }
  ],
  navSecondary: [
    {
      title: "Support",
      url: "#",
      icon: LifeBuoy
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send
    }
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart
    },
    {
      name: "Travel",
      url: "#",
      icon: Map
    }
  ],
  documents: [
    {
      name: "Data Library",
      url: "#",
      icon: IconDatabase
    },
    {
      name: "Reports",
      url: "#",
      icon: IconReport
    },
    {
      name: "Word Assistant",
      url: "#",
      icon: IconFileWord
    }
  ]
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const {
    data: userDataResponse,
    isPending,
    error
  } = useQuery(userQueryOptions)

  const user = userDataResponse?.user ?? {
    name: "Loading...",
    email: "",
    avatar: "/avatars/default.jpg"
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
              <Link to="/dashboard">
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">Acme Inc.</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={sidebarData.navMain} />
        <NavDocuments items={sidebarData.documents} />
        <NavSecondary items={sidebarData.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  )
}
