import React from 'react'
import { useAppState } from '@/presentation/context/useAppDispatch'
import { TopBar } from '@/presentation/components/layout/TopBar'
import { SoundBanner } from '@/presentation/components/layout/SoundBanner'
import { ChairCard } from '@/presentation/components/chair/ChairCard'
import { TechCard } from '@/presentation/components/tech/TechCard'
import { QueuePanel } from '@/presentation/components/queue/QueuePanel'
import { DemoControls } from '@/presentation/components/demo/DemoControls'
import { useLanguage } from '@/shared/i18n'
import { Armchair, Users } from 'lucide-react'

export const DashboardPage: React.FC = () => {
  const { chairs, techs } = useAppState()
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <SoundBanner />

      <main className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Pedicure Chairs Section */}
            <section className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                  <Armchair className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold tracking-tight">{t.pedicureChairs}</h2>
                  <p className="text-sm text-muted-foreground">Monitor active sessions</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {chairs.map((chair) => (
                  <ChairCard key={chair.id} chair={chair} />
                ))}
              </div>
            </section>

            {/* Manicure Techs Section */}
            <section className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-success/10">
                  <Users className="h-5 w-5 text-success" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold tracking-tight">{t.manicureTechs}</h2>
                  <p className="text-sm text-muted-foreground">Team availability status</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {techs.map((tech) => (
                  <TechCard key={tech.id} tech={tech} />
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <QueuePanel />
            <DemoControls />

            {/* Quick Guide */}
            <div className="rounded-xl border bg-card p-6 shadow-sm">
              <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                Quick Guide
              </h3>
              <ul className="space-y-2 text-xs text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">1.</span>
                  <span>Click <strong>Start</strong> on any idle chair to begin timer</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">2.</span>
                  <span>Add customers to queue for manicure service</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">3.</span>
                  <span>Techs mark themselves ready when available</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">4.</span>
                  <span>Assign next customer to ready technician</span>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </main>
    </div>
  )
}
