import React, { useEffect, useRef, useState } from 'react'
import { useLanguage, Language } from '@/shared/i18n'
import { Globe, Check } from 'lucide-react'
import { cn } from '@/shared/utils/cn'

export const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage, t } = useLanguage()
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (!rootRef.current) return
      if (!rootRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handlePointerDown)
    return () => document.removeEventListener('mousedown', handlePointerDown)
  }, [])

  const handleChange = (lang: Language) => {
    setLanguage(lang)
    setOpen(false)
  }

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-haspopup="menu"
        aria-expanded={open}
        className={cn(
          'flex h-11 w-11 items-center justify-center rounded-2xl border border-border/70 bg-card shadow-sm transition-all hover:bg-secondary',
          open && 'ring-2 ring-ring ring-offset-2'
        )}
      >
        <Globe className="h-4 w-4 text-foreground" />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-[calc(100%+0.5rem)] z-50 min-w-40 overflow-hidden rounded-2xl border border-border/70 bg-card p-1 shadow-elevated"
        >
          {(['en', 'vi'] as Language[]).map((lang) => {
            const active = language === lang
            const label = lang === 'en' ? t.languageEnglish : t.languageVietnamese
            return (
              <button
                key={lang}
                type="button"
                role="menuitemradio"
                aria-checked={active}
                onClick={() => handleChange(lang)}
                className={cn(
                  'flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm transition-colors',
                  active
                    ? 'bg-primary/10 text-primary font-semibold'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                )}
              >
                <span>{label}</span>
                {active ? <Check className="h-4 w-4" /> : null}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
