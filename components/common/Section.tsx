interface SectionProps {
  children: React.ReactNode
  className?: string
  as?: 'section' | 'div' | 'article'
}

export function Section({ children, className, as: Tag = 'section' }: SectionProps) {
  return (
    <Tag className={`py-12 md:py-16 lg:py-20 ${className ?? ''}`}>
      {children}
    </Tag>
  )
}
