import React from 'react'
import { useAppState, useAppDispatch } from '@/presentation/context/useAppDispatch'
import { useLanguage } from '@/shared/i18n'
import { Card, CardContent, CardHeader, CardTitle } from '@/presentation/components/ui/card'
import { Button } from '@/presentation/components/ui/button'
import { Switch } from '@/presentation/components/ui/switch'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/presentation/components/ui/alert-dialog'
import { RotateCcw } from 'lucide-react'

export const DemoControls: React.FC = () => {
  const { settings } = useAppState()
  const dispatch = useAppDispatch()
  const { t } = useLanguage()

  const handleToggleDemo = () => {
    dispatch({
      type: 'DEMO_MODE_SET',
      payload: { enabled: !settings.demoMode },
    })
  }

  const handleResetAll = () => {
    dispatch({ type: 'RESET_ALL' })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t.demoControls}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
          <div className="space-y-0.5">
            <div className="text-sm font-medium">{t.demoMode}</div>
            <div className="text-xs text-muted-foreground">{t.demoModeDesc}</div>
          </div>
          <Switch checked={settings.demoMode} onCheckedChange={handleToggleDemo} />
        </div>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" className="w-full">
              <RotateCcw className="w-4 h-4 mr-2" />
              {t.resetAll}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{t.resetAll}</AlertDialogTitle>
              <AlertDialogDescription>
                {t.resetConfirm}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleResetAll}>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardContent>
    </Card>
  )
}
