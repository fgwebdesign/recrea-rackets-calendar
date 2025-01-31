"use client"

import React, { useEffect, useState } from "react"
import { Calendar, Home, CircleUser, LandPlot, LogOut, ChevronsUpDown, Trophy, LayoutDashboard, LineChart } from "lucide-react"
import { User } from '@supabase/supabase-js'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar" 
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { MOCK_TOURNAMENTS } from "@/mocks/tournaments"

export function AppSidebar() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  
  const availableTournaments = MOCK_TOURNAMENTS.filter(t => t.status === "open").length

  const links = [
    {
      title: "Inicio",
      href: "/dashboard",
      icon: LayoutDashboard
    },
    {
      title: "Inscribirme en un Torneo",
      href: "/tournaments",
      icon: Trophy,
      highlight: true,
      badge: availableTournaments
    },
    {
      title: "Mis Partidos",
      href: "/my-matches",
      icon: Calendar
    },
    {
      title: "Mis Torneos",
      href: "/my-tournaments",
      icon: Trophy
    },
    {
      title: "Posiciones",
      href: "/standings",
      icon: LineChart
    }
  ]

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        setUser(user)
      }
    })
  }, [])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2">
          <Image
            src="/assets/logo_padel_manager.png"
            alt="Logo"
            width={40}
            height={40}
          />
          <span className="font-semibold text-lg">Rackets Calendar</span>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarMenu>
            {links.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton 
                  asChild
                  className={item.highlight ? 
                    "bg-green-50 hover:bg-green-100 text-green-700 group font-medium" : 
                    undefined
                  }
                >
                  <Link href={item.href} className="relative">
                    <item.icon className={`h-4 w-4 ${
                      item.highlight ? "text-green-600" : ""
                    }`} />
                    <span className={item.highlight ? "text-green-700" : ""}>
                      {item.title}
                    </span>
                    {item.badge && (
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center">
                        <div className="flex h-5 items-center justify-center rounded-full bg-green-100 px-2.5 text-xs font-medium text-green-700">
                          {item.badge}
                        </div>
                      </div>
                    )}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton size="lg">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src={user?.user_metadata?.avatar_url} />
                    <AvatarFallback>{user?.email?.charAt(0).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">
                      {user?.user_metadata?.full_name || user?.email || 'Usuario'}
                    </span>
                    <span className="truncate text-xs text-gray-500">
                      {user?.email}
                    </span>
                  </div>
                  <ChevronsUpDown className="ml-auto h-4 w-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="right"
                className="w-[--radix-dropdown-menu-trigger-width]"
              >
                  <DropdownMenuItem onClick={() => router.push('/profile')}>
                    <CircleUser className="mr-2 h-4 w-4" />
                    Perfil
                  </DropdownMenuItem>
                   <DropdownMenuSeparator />
                  <DropdownMenuItem onSelect={handleSignOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Cerrar sesión</span>
                  </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
} 