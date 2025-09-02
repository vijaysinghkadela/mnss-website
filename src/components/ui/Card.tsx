import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  gradient?: string;
}

export function Card({
  children,
  className,
  hover = false,
  gradient,
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300",
        hover && "hover:shadow-lg hover:-translate-y-1 hover:scale-105",
        gradient && `bg-gradient-to-br ${gradient}`,
        className
      )}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn("mb-4", className)}>{children}</div>;
}

export function CardContent({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn("", className)}>{children}</div>;
}

export function CardFooter({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mt-4 pt-4 border-t border-gray-100", className)}>
      {children}
    </div>
  );
}
