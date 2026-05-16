interface ContainerProps {
  children: React.ReactNode
  className?: string
}

export function Container({ children, className }: ContainerProps) {
  return (
    <div
      className={`mx-auto w-full max-w-container px-4 sm:px-8 lg:px-16 ${className ?? ''}`}
    >
      {children}
    </div>
  )
}
