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
import { RotateCcw, Zap, AlertTriangle, Layers3, SlidersHorizontal } from 'lucide-react'

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
        <div className="flex items-start justify-between gap-4">
          <CardTitle className="flex items-center gap-3 text-lg">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <SlidersHorizontal className="w-4 h-4" />
            </div>
            <div>
              <div className="text-base font-bold">{t.demoControls}</div>
              <div className="text-xs text-muted-foreground font-normal">{t.demoControlsHint}</div>
            </div>
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="rounded-2xl border border-border/70 bg-muted/25 p-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-warning/10 text-warning">
                <Zap className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm font-semibold">{t.demoMode}</div>
                <div className="text-xs text-muted-foreground">{t.demoModeDesc}</div>
              </div>
            </div>
            <Switch
              checked={settings.demoMode}
              onCheckedChange={handleToggleDemo}
              className="data-[state=checked]:bg-warning"
            />
          </div>
        </div>

        {/* Reset All Button */}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" className="w-full h-11 shadow-sm rounded-2xl">
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
              <AlertDialogCancel>{t.cancel}</AlertDialogCancel>
              <AlertDialogAction onClick={handleResetAll} className="bg-destructive hover:bg-destructive/90">
                {t.confirm}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <Button variant="secondary" className="w-full h-11 shadow-sm rounded-2xl" onClick={handleLoadSampleState}>
          <Layers3 className="w-4 h-4 mr-2" />
          {t.loadSampleState}
        </Button>
      </CardContent>
    </Card>
  )
}
