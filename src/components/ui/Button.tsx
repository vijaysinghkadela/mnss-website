import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'
import { ButtonHTMLAttributes, forwardRef } from 'react'

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-lg font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
  primary: 'bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:from-primary-600 hover:to-primary-700 focus:ring-primary-500 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 tracking-tight',
        secondary: 'bg-gradient-to-r from-secondary-500 to-secondary-600 text-white hover:from-secondary-600 hover:to-secondary-700 focus:ring-secondary-500 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5',
        accent: 'bg-gradient-to-r from-accent-500 to-accent-600 text-white hover:from-accent-600 hover:to-accent-700 focus:ring-accent-500 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5',
        outline: 'border-2 border-primary-500 text-primary-600 hover:bg-primary-50 focus:ring-primary-500',
        ghost: 'text-gray-600 hover:text-primary-600 hover:bg-primary-50 focus:ring-primary-500',
        link: 'text-primary-600 underline-offset-4 hover:underline focus:ring-primary-500'
      },
      size: {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-5 py-3 text-base',
  xl: 'px-6 py-4 text-lg'
      }
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md'
    }
  }
)

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
