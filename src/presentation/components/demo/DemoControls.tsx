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
import { RotateCcw, Settings, Zap, AlertTriangle, Layers3 } from 'lucide-react'

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

  const handleLoadSampleState = () => {
    dispatch({ type: 'LOAD_SAMPLE_STATE' })
  }

  return (
    <Card className="shadow-elevated">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted">
            <Settings className="w-4 h-4 text-foreground" />
          </div>
          {t.demoControls}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* Demo Mode Toggle */}
        <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50 border border-border">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-background">
              <Zap className="h-5 w-5 text-warning" />
            </div>
            <div className="space-y-0.5">
              <div className="text-sm font-medium">{t.demoMode}</div>
              <div className="text-xs text-muted-foreground">{t.demoModeDesc}</div>
            </div>
          </div>
          <Switch
            checked={settings.demoMode}
            onCheckedChange={handleToggleDemo}
            className="data-[state=checked]:bg-warning"
          />
        </div>

        {/* Reset All Button */}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" className="w-full h-10 shadow-sm">
              <RotateCcw className="w-4 h-4 mr-2" />
              {t.resetAll}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-destructive/10">
                  <AlertTriangle className="h-6 w-6 text-destructive" />
                </div>
                <AlertDialogTitle className="text-xl">{t.resetAll}</AlertDialogTitle>
              </div>
              <AlertDialogDescription className="text-base">
                {t.resetConfirm}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleResetAll} className="bg-destructive hover:bg-destructive/90">
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <Button variant="secondary" className="w-full h-10 shadow-sm" onClick={handleLoadSampleState}>
          <Layers3 className="w-4 h-4 mr-2" />
          {t.loadSampleState}
        </Button>
      </CardContent>
    </Card>
  )
}
