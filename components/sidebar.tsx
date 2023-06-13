'use client'

import * as React from 'react'
import { signOut } from '@auth/nextjs/client'
import { type Session } from '@auth/nextjs/types'

import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet'
import { ThemeToggle } from '@/components/theme-toggle'
import { IconSidebar } from '@/components/ui/icons'

export interface SidebarProps {
  session?: Session
  children?: React.ReactNode
}

export function Sidebar({ session, children }: SidebarProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" className="-ml-2 h-9 w-9 p-0">
          <IconSidebar className="h-6 w-6" />
          <span className="sr-only">Toggle Sidebar</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="inset-y-0 flex h-auto w-[300px] flex-col p-0">
        <SheetHeader className="p-4">
          <SheetTitle className="text-sm">Chat History</SheetTitle>
        </SheetHeader>
        {children}
        <div className="flex items-center p-4">
          <ThemeToggle />
          {session?.user && (
            <Button
              variant="ghost"
              onClick={() => signOut()}
              className="ml-auto"
            >
              Logout
            </Button>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
