import React from 'react'
import { useAppState } from '@/presentation/context/useAppDispatch'
import { TopBar } from '@/presentation/components/layout/TopBar'
import { SoundBanner } from '@/presentation/components/layout/SoundBanner'
import { ChairCard } from '@/presentation/components/chair/ChairCard'
import { TechCard } from '@/presentation/components/tech/TechCard'
import { QueuePanel } from '@/presentation/components/queue/QueuePanel'
import { DemoControls } from '@/presentation/components/demo/DemoControls'
import { EventLogPanel } from '@/presentation/components/demo/EventLogPanel'
import { useLanguage } from '@/shared/i18n'
import { Armchair, Users, Sparkles, Clock3 } from 'lucide-react'

export const DashboardPage: React.FC = () => {
  const { chairs, techs } = useAppState()
  const { t } = useLanguage()

  const runningCount = chairs.filter((chair) => chair.status === 'running').length
  const seatedCount = chairs.filter((chair) => chair.status === 'assigned').length
  const readyTechCount = techs.filter((tech) => tech.status === 'ready').length

  return (
    <div className="min-h-screen relative overflow-hidden">
      <TopBar />
      <SoundBanner />

      <main className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-5 sm:py-8 lg:py-10">
        <section className="mb-8 overflow-hidden rounded-[2rem] border border-border/70 bg-card/80 shadow-elevated backdrop-blur-sm">
          <div className="p-5 sm:p-8 lg:p-10">
            <div className="space-y-5">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                <Sparkles className="h-3.5 w-3.5" />
                {t.dashboardHeroBadge}
              </div>
              <div className="space-y-3">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-balance">
                  {t.dashboardHeroTitle}
                </h2>
                <p className="max-w-2xl text-sm sm:text-base text-muted-foreground leading-7">
                  {t.dashboardHeroDescription}
                </p>
              </div>

              <div className="flex flex-wrap gap-3 text-sm">
                <div className="flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-secondary-foreground">
                  <Clock3 className="h-4 w-4 text-primary" />
                  {t.dashboardRunningChairs(runningCount)}
                </div>
                <div className="flex items-center gap-2 rounded-full bg-accent/10 px-4 py-2 text-foreground">
                  <Armchair className="h-4 w-4 text-accent" />
                  {t.dashboardSeatedChairs(seatedCount)}
                </div>
                <div className="flex items-center gap-2 rounded-full bg-success/10 px-4 py-2 text-foreground">
                  <Users className="h-4 w-4 text-success" />
                  {t.dashboardReadyTechs(readyTechCount)}
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1.55fr)_minmax(360px,0.95fr)] gap-6 sm:gap-8 items-start">
          <div className="space-y-8">
            <section className="space-y-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary ring-1 ring-primary/10">
                    <Armchair className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">{t.pedicureChairs}</h2>
                    <p className="text-sm text-muted-foreground">{t.pedicureChairsDescription}</p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                {chairs.map((chair) => (
                  <ChairCard key={chair.id} chair={chair} />
                ))}
              </div>
            </section>

            <section className="space-y-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-success/10 text-success ring-1 ring-success/10">
                    <Users className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">{t.manicureTechs}</h2>
                    <p className="text-sm text-muted-foreground">{t.manicureTechsDescription}</p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-4 sm:gap-5">
                {techs.map((tech) => (
                  <TechCard key={tech.id} tech={tech} />
                ))}
              </div>
            </section>
          </div>

          <aside className="space-y-6 xl:sticky xl:top-24">
            <QueuePanel />
            <DemoControls />
            <EventLogPanel />

            <div className="rounded-3xl border border-border/70 bg-card/90 p-5 sm:p-6 shadow-elevated">
              <h3 className="flex items-center gap-2 text-base font-semibold">
                <div className="h-2.5 w-2.5 rounded-full bg-primary" />
                {t.quickGuideTitle}
              </h3>
              <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                {t.quickGuideSteps.map((step, index) => (
                  <li key={step} className="flex items-start gap-3 rounded-2xl bg-muted/35 px-3 py-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                      {index + 1}
                    </span>
                    <span className="leading-6 text-foreground/80">{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </main>
    </div>
  )
}
