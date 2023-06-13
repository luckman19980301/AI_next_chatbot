'use client'

import * as React from 'react'

import { cn } from '@/lib/utils'
import { Button, type ButtonProps } from '@/components/ui/button'
import { IconGitHub, IconSpinner } from '@/components/ui/icons'
import { useClerk } from '@clerk/nextjs'

interface LoginButtonProps extends ButtonProps {
  text?: string
}

export function LoginButton({
  className,
  text = 'Login with GitHub',
  ...props
}: LoginButtonProps) {
  const [isLoading, setIsLoading] = React.useState(false)
  const clerk = useClerk()

  return (
    <Button
      variant="outline"
      onClick={() => {
        setIsLoading(true)
        clerk.openSignIn({})
      }}
      disabled={isLoading}
      className={cn(className)}
      {...props}
    >
      {isLoading ? (
        <IconSpinner className="mr-2 animate-spin" />
      ) : (
        <IconGitHub className="mr-2" />
      )}
      {text}
    </Button>
  )
}
