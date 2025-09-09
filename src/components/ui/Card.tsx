import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  hover?: boolean
  gradient?: string
  variant?: 'default' | 'elevated' | 'outlined' | 'glass'
}

export function Card({ 
  children, 
  className, 
  hover = false, 
  gradient, 
  variant = 'default' 
}: CardProps) {
  const variantClasses = {
    default: 'bg-white border border-slate-200 shadow-sm',
    elevated: 'bg-white border-0 shadow-lg',
    outlined: 'bg-transparent border-2 border-slate-200 shadow-none',
    glass: 'bg-white/80 backdrop-blur-sm border border-white/20 shadow-lg'
  }

  return (
    <div
      className={cn(
        'rounded-2xl p-6 transition-all duration-300 group',
        variantClasses[variant],
        hover && 'hover:shadow-xl hover:-translate-y-2 hover:scale-[1.02]',
        gradient && `bg-gradient-to-br ${gradient}`,
        className
      )}
    >
      {children}
    </div>
  )
}

export function CardHeader({ 
  children, 
  className 
}: { 
  children: ReactNode
  className?: string 
}) {
  return (
    <div className={cn('mb-6 space-y-1', className)}>
      {children}
    </div>
  )
}

export function CardContent({ 
  children, 
  className 
}: { 
  children: ReactNode
  className?: string 
}) {
  return (
    <div className={cn('space-y-4', className)}>
      {children}
    </div>
  )
}

export function CardFooter({ 
  children, 
  className 
}: { 
  children: ReactNode
  className?: string 
}) {
  return (
    <div className={cn('mt-6 pt-6 border-t border-slate-100', className)}>
      {children}
    </div>
  )
}
