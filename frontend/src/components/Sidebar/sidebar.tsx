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
      title: "Dashboard",
      url: "/dashboard",
      icon: IconInnerShadowTop,
      isActive: true
    },
    {
      title: "Bank Income",
      url: "/bank-income",
      icon: SquareTerminal,
    },
    {
      title: "Expenses",
      url: "/expenses",
      icon: SquareTerminal,
    },
    {
      title: "Income",
      url: "/income",
      icon: SquareTerminal
    },
    {
      title: "Locations",
      url: "/locations",
      icon: Map,
      items: [
        {
          title: "Butel",
          url: "/locations/butel"
        },
        {
          title: "Kisella voda",
          url: "/locations/kisella-voda"
        },
        {
          title: "Chair",
          url: "/locations/chair"
        },
        {
          title: "Stadion",
          url: "/locations/stadion"
        },
        {
          title: "Emka",
          url: "/locations/emka"
        }
      ]
    },
    {
      title: "Profile",
      url: "/profile",
      icon: UserCog
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
      name: "Data",
      url: "/data",
      icon: Frame
    },
  ],
  documents: [
    {
      name: "Data",
      url: "/data",
      icon: IconDatabase
    },
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
