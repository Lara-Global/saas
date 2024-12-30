import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 dark:bg-dark-primary dark:text-dark-primary-foreground dark:hover:bg-dark-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 dark:bg-dark-destructive dark:text-dark-destructive-foreground dark:hover:bg-dark-destructive/90",
        outline: "border border-input border-purple-600 bg-background hover:bg-purple-600 hover:border-purple-600 hover:text-white-foreground dark:bg-purple-600 dark:text-dark-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 dark:bg-dark-secondary dark:text-dark-secondary-foreground",
        ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-dark-accent dark:hover:text-dark-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline dark:text-dark-primary dark:hover:text-dark-primary-foreground",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
