'use client'

import { useTheme } from 'next-themes'
import { Toaster as Sonner, ToasterProps } from 'sonner'

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      position="bottom-center"
      toastOptions={{
        className: 'portfolio-sonner-toast',
      }}
      className="toaster group portfolio-sonner"
      style={
        {
          '--normal-bg': 'var(--popover)',
          '--normal-text': 'var(--popover-foreground)',
          '--normal-border': 'var(--border)',
          '--success-bg': 'color-mix(in oklch, var(--card) 82%, var(--accent) 18%)',
          '--success-text': 'var(--foreground)',
          '--success-border': 'color-mix(in oklch, var(--accent) 58%, var(--border) 42%)',
          '--error-bg': 'color-mix(in oklch, var(--card) 82%, var(--destructive) 18%)',
          '--error-text': 'var(--foreground)',
          '--error-border': 'color-mix(in oklch, var(--destructive) 58%, var(--border) 42%)',
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster }
