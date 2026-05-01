import React from 'react'
import { useLanguage, Language } from '@/shared/i18n'
import { Globe } from 'lucide-react'
import { cn } from '@/shared/utils/cn'

export const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage()

  const handleChange = (lang: Language) => {
    setLanguage(lang)
  }

  return (
    <div className="flex items-center gap-2">
      <Globe className="h-4 w-4 text-muted-foreground" />
      <div className="flex items-center gap-1 rounded-lg bg-muted p-1">
        <button
          onClick={() => handleChange('en')}
          className={cn(
            "px-3 py-1.5 text-xs font-medium rounded-md transition-all",
            language === 'en'
              ? 'bg-background text-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground'
          )}
        >
          EN
        </button>
        <button
          onClick={() => handleChange('vi')}
          className={cn(
            "px-3 py-1.5 text-xs font-medium rounded-md transition-all",
            language === 'vi'
              ? 'bg-background text-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground'
          )}
        >
          VI
        </button>
      </div>
    </div>
  )
}
