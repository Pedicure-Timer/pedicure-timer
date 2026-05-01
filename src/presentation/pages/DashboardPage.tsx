import React from 'react'
import { useAppState } from '@/presentation/context/useAppDispatch'
import { TopBar } from '@/presentation/components/layout/TopBar'
import { SoundBanner } from '@/presentation/components/layout/SoundBanner'
import { ChairCard } from '@/presentation/components/chair/ChairCard'
import { TechCard } from '@/presentation/components/tech/TechCard'
import { QueuePanel } from '@/presentation/components/queue/QueuePanel'
import { DemoControls } from '@/presentation/components/demo/DemoControls'

export const DashboardPage: React.FC = () => {
  const { chairs, techs } = useAppState()

  return (
    <div className="min-h-screen bg-gray-50">
      <TopBar />
      <SoundBanner />

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <section>
              <h2 className="text-xl font-bold mb-4">Pedicure Chairs</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {chairs.map((chair) => (
                  <ChairCard key={chair.id} chair={chair} />
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4">Manicure Techs</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {techs.map((tech) => (
                  <TechCard key={tech.id} tech={tech} />
                ))}
              </div>
            </section>
          </div>

          <div className="space-y-6">
            <QueuePanel />
            <DemoControls />
          </div>
        </div>
      </div>
    </div>
  )
}
