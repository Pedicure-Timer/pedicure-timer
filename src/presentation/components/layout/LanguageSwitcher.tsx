import React from 'react'
import { useLanguage, Language } from '@/shared/i18n'
import { Button } from '@/presentation/components/ui/button'
import { cn } from '@/shared/utils/cn'

export const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage()

  const handleChange = (lang: Language) => {
    setLanguage(lang)
  }

  return (
    <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
      <Button
        onClick={() => handleChange('en')}
        variant={language === 'en' ? 'default' : 'ghost'}
        size="sm"
        className={cn(
          "text-xs font-medium",
          language === 'en' ? '' : 'hover:bg-background'
        )}
      >
        EN
      </Button>
      <Button
        onClick={() => handleChange('vi')}
        variant={language === 'vi' ? 'default' : 'ghost'}
        size="sm"
        className={cn(
          "text-xs font-medium",
          language === 'vi' ? '' : 'hover:bg-background'
        )}
      >
        VI
      </Button>
    </div>
  )
}
