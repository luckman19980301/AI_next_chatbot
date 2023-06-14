import { ClerkLoaded, ClerkLoading, SignUp } from '@clerk/nextjs'

import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { ExternalLink } from '@/components/external-link'
import { IconSpinner } from '@/components/ui/icons'

export default function Page() {
  return (
    <div className="flex h-full min-h-screen flex-col items-center justify-center">
      <div className="space-y-4">
        <ClerkLoading>
          <div className="flex items-center text-sm text-muted-foreground">
            <IconSpinner className="mr-2 h-5 w-5" /> Loading...
          </div>
        </ClerkLoading>
        <ClerkLoaded>
          <SignUp
            appearance={{
              elements: {
                card: 'shadow rounded-lg border border-border',
                formFieldInput:
                  'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
                formButtonPrimary: cn(buttonVariants(), 'normal-case'),
                footerAction: 'text-sm',
                footerActionLink:
                  'text-primary font-medium hover:underline hover:text-primary',
                identityPreview: 'rounded-md',
                identityPreviewEditButton: 'text-primary',
                otpCodeFieldInput: 'text-primary focus:border-b-primary',
                formResendCodeLink: 'text-primary font-medium'
              }
            }}
          />
          <p className="hidden px-2 text-center text-xs leading-normal text-muted-foreground sm:block">
            Open source AI chatbot app built with{' '}
            <ExternalLink href="https://nextjs.org">Next.js</ExternalLink> and{' '}
            <ExternalLink href="https://vercel.com/storage/kv">
              Vercel KV
            </ExternalLink>
            .
          </p>
        </ClerkLoaded>
      </div>
    </div>
  )
}
