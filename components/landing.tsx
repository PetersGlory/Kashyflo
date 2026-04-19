'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, TrendingUp, PieChart, Shield, Zap, Clock, BarChart3 } from 'lucide-react'

export default function Landing() {
  const features = [
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Add expenses in under 3 seconds with our optimized interface'
    },
    {
      icon: TrendingUp,
      title: 'Smart Splitting',
      description: 'Automatically distribute your salary into customizable budget categories'
    },
    {
      icon: PieChart,
      title: 'Visual Analytics',
      description: 'See spending patterns with beautiful charts and weekly insights'
    },
    {
      icon: Shield,
      title: 'Offline First',
      description: 'Your data stays on your device. Works perfectly without internet'
    },
    {
      icon: Clock,
      title: 'Rent Tracker',
      description: 'Track rent savings with countdown to payment day'
    },
    {
      icon: BarChart3,
      title: 'Smart Alerts',
      description: 'Get notified when you\'re overspending or running low'
    }
  ]

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border sticky top-0 z-50 bg-background/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/kashyflo-logo.png" alt="Kashyflo" className="w-8 h-8" />
            <span className="text-2xl font-bold text-foreground">Kashyflo</span>
          </div>
          <Link href="/settings">
            <Button>Get Started</Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl sm:text-6xl font-bold text-foreground text-balance">
              Smart Budget Splitting for Nigerian Earners
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground max-w-2xl mx-auto text-balance">
              Stop wondering where your money goes. Track expenses, split your salary intelligently, and never run out of money again.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Link href="/">
              <Button size="lg" className="w-full sm:w-auto">
                Open App
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link href="#features">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                Learn More
              </Button>
            </Link>
          </div>

          {/* Hero Image Placeholder */}
          <div className="mt-16 relative">
            <div className="bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl p-8 sm:p-12 border border-border">
              <div className="bg-white/5 rounded-lg h-64 sm:h-96 flex items-center justify-center">
                <div className="text-center">
                  <BarChart3 className="w-16 h-16 text-primary mx-auto mb-4 opacity-50" />
                  <p className="text-muted-foreground">Interactive dashboard preview</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 sm:py-32 bg-card/50 border-y border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground">
              Everything You Need
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Built for Nigerian salary earners who want to take control of their finances
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => {
              const Icon = feature.icon
              return (
                <div key={feature.title} className="bg-background border border-border rounded-xl p-6 space-y-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 sm:py-32">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground text-center mb-16">
            How It Works
          </h2>

          <div className="space-y-8">
            {[
              {
                step: '1',
                title: 'Set Your Salary',
                description: 'Enter your monthly salary and Kashyflo automatically splits it into smart budget categories'
              },
              {
                step: '2',
                title: 'Track Expenses',
                description: 'Add expenses in seconds with our lightning-fast interface. Categorize and track instantly'
              },
              {
                step: '3',
                title: 'Monitor & Adjust',
                description: 'View analytics, get alerts, and adjust your budget based on real spending patterns'
              },
              {
                step: '4',
                title: 'Plan Ahead',
                description: 'Track rent savings, see weekly trends, and plan for your financial goals'
              }
            ].map((item) => (
              <div key={item.step} className="flex gap-6 items-start">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary text-white font-bold text-lg">
                    {item.step}
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 sm:py-32 bg-gradient-to-br from-primary to-secondary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <h2 className="text-4xl sm:text-5xl font-bold">
            Ready to Master Your Money?
          </h2>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            Join thousands of Nigerians who are taking control of their finances with Kashyflo.
          </p>
          <Link href="/">
            <Button size="lg" variant="secondary" className="text-primary hover:text-primary">
              Start Tracking Now
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-background py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-2">
              <img src="/kashyflo-logo.png" alt="Kashyflo" className="w-6 h-6" />
              <span className="font-semibold text-foreground">Kashyflo</span>
            </div>
            <p className="text-muted-foreground text-sm text-center sm:text-right">
              Smart budgeting for Nigerian salary earners. Made with care in Nigeria.
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
}
