"use client"
import { PropsWithChildren } from 'react'
import {ConvexReactClient} from "convex/react"
import { ClerkProvider } from '@clerk/nextjs'
import {ConvexProviderWithClerk} from 'convex/react-clerk'
import { useAuth } from '@clerk/clerk-react'

const convex =new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!)
function ConvexClientProvider({children}: PropsWithChildren) {
  return (
   <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
        <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
            {children}
        </ConvexProviderWithClerk>
   </ClerkProvider>
  )
}

export default ConvexClientProvider