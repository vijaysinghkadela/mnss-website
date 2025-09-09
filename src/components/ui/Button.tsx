import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'
import { ButtonHTMLAttributes, forwardRef } from 'react'

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer relative overflow-hidden group',
  {
    variants: {
      variant: {
        primary: 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 focus:ring-blue-500 shadow-lg hover:shadow-xl transform hover:-translate-y-1 active:translate-y-0',
        secondary: 'bg-gradient-to-r from-slate-600 to-slate-700 text-white hover:from-slate-700 hover:to-slate-800 focus:ring-slate-500 shadow-lg hover:shadow-xl transform hover:-translate-y-1 active:translate-y-0',
        accent: 'bg-gradient-to-r from-amber-500 to-amber-600 text-white hover:from-amber-600 hover:to-amber-700 focus:ring-amber-500 shadow-lg hover:shadow-xl transform hover:-translate-y-1 active:translate-y-0',
        success: 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white hover:from-emerald-600 hover:to-emerald-700 focus:ring-emerald-500 shadow-lg hover:shadow-xl transform hover:-translate-y-1 active:translate-y-0',
        outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50 hover:border-blue-700 focus:ring-blue-500 bg-transparent',
        ghost: 'text-slate-600 hover:text-blue-600 hover:bg-blue-50 focus:ring-blue-500 bg-transparent',
        link: 'text-blue-600 underline-offset-4 hover:underline focus:ring-blue-500 bg-transparent p-0'
      },
      size: {
        sm: 'px-4 py-2 text-sm h-9',
        md: 'px-6 py-3 text-base h-11',
        lg: 'px-8 py-4 text-lg h-13',
        xl: 'px-10 py-5 text-xl h-15'
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
