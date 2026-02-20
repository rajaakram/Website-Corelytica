import { useEffect, useState, useRef } from 'react'
import { Github, BarChart3, TrendingUp, Database, Activity, PieChart, ArrowUpRight, Sparkles } from 'lucide-react'

// Animated counter hook
function useCountUp(end: number, duration: number = 2000) {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return

    let startTime: number
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      setCount(Math.floor(easeOutQuart * end))
      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }
    requestAnimationFrame(animate)
  }, [isVisible, end, duration])

  return { count, ref }
}

// Floating data bar component
function DataBar({ height, delay, color }: { height: string; delay: string; color: string }) {
  return (
    <div
      className={`w-3 md:w-4 rounded-full origin-bottom animate-bar-grow ${color}`}
      style={{
        height,
        animationDelay: delay,
        animationFillMode: 'backwards',
      }}
    />
  )
}

// Floating circle component
function FloatingCircle({ size, top, left, delay, color }: { size: string; top: string; left: string; delay: string; color: string }) {
  return (
    <div
      className={`absolute rounded-full ${color} opacity-20 animate-float blur-xl`}
      style={{
        width: size,
        height: size,
        top,
        left,
        animationDelay: delay,
      }}
    />
  )
}

// Stat card component
function StatCard({ icon: Icon, value, suffix, label, delay }: { icon: any; value: number; suffix: string; label: string; delay: string }) {
  const { count, ref } = useCountUp(value, 2500)

  return (
    <div
      className="glass-card p-6 hover:bg-white/10 transition-all duration-300 hover:scale-105 group opacity-0 animate-slide-up"
      style={{ animationDelay: delay, animationFillMode: 'forwards' }}
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="p-2 rounded-lg bg-corelytica-500/20 text-corelytica-400 group-hover:bg-corelytica-500/30 transition-colors">
          <Icon size={20} />
        </div>
        <span className="text-sm text-slate-400">{label}</span>
      </div>
      <div className="flex items-baseline gap-1">
        <span ref={ref} className="text-3xl md:text-4xl font-bold text-white">
          {count.toLocaleString()}
        </span>
        <span className="text-xl text-corelytica-400 font-semibold">{suffix}</span>
      </div>
    </div>
  )
}

// Mini chart component
function MiniChart() {
  const points = [20, 45, 30, 60, 45, 80, 65, 90, 75, 100, 85, 95]
  const maxValue = Math.max(...points)
  const minValue = Math.min(...points)
  const range = maxValue - minValue

  const pathData = points
    .map((point, index) => {
      const x = (index / (points.length - 1)) * 200
      const y = 100 - ((point - minValue) / range) * 80 - 10
      return `${index === 0 ? 'M' : 'L'} ${x} ${y}`
    })
    .join(' ')

  return (
    <svg viewBox="0 0 200 100" className="w-full h-24">
      <defs>
        <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#a78bfa" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
        <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d={`${pathData} L 200 100 L 0 100 Z`}
        fill="url(#areaGradient)"
        className="animate-fade-in"
      />
      <path
        d={pathData}
        fill="none"
        stroke="url(#lineGradient)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="animate-dash"
        style={{
          strokeDasharray: 1000,
          strokeDashoffset: 1000,
          animation: 'dash 2s ease-out forwards',
        }}
      />
      {points.map((point, index) => {
        const x = (index / (points.length - 1)) * 200
        const y = 100 - ((point - minValue) / range) * 80 - 10
        return (
          <circle
            key={index}
            cx={x}
            cy={y}
            r="3"
            fill="#a78bfa"
            className="animate-fade-in"
            style={{ animationDelay: `${index * 100 + 500}ms` }}
          />
        )
      })}
    </svg>
  )
}

// Pie chart component
function AnimatedPieChart() {
  return (
    <div className="relative w-32 h-32">
      <svg viewBox="0 0 100 100" className="transform -rotate-90">
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="none"
          stroke="#1e293b"
          strokeWidth="12"
        />
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="none"
          stroke="#8b5cf6"
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray="150 251"
          className="animate-dash"
          style={{
            strokeDasharray: '251',
            strokeDashoffset: '251',
            animation: 'dash 1.5s ease-out forwards',
          }}
        />
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="none"
          stroke="#a78bfa"
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray="75 251"
          className="animate-dash"
          style={{
            strokeDasharray: '251',
            strokeDashoffset: '251',
            animation: 'dash 1.5s ease-out 0.3s forwards',
          }}
        />
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="none"
          stroke="#c4b5fd"
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray="50 251"
          className="animate-dash"
          style={{
            strokeDasharray: '251',
            strokeDashoffset: '251',
            animation: 'dash 1.5s ease-out 0.6s forwards',
          }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <Database size={24} className="text-corelytica-400" />
      </div>
    </div>
  )
}

function App() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="min-h-screen relative overflow-hidden data-grid">
      {/* Animated gradient background */}
      <div 
        className="fixed inset-0 pointer-events-none transition-all duration-1000 ease-out"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(139, 92, 246, 0.15), transparent 40%)`,
        }}
      />

      {/* Floating geometric shapes */}
      <FloatingCircle size="300px" top="10%" left="5%" delay="0s" color="bg-corelytica-600" />
      <FloatingCircle size="200px" top="60%" left="80%" delay="2s" color="bg-purple-600" />
      <FloatingCircle size="150px" top="30%" left="85%" delay="4s" color="bg-indigo-600" />
      <FloatingCircle size="250px" top="70%" left="10%" delay="1s" color="bg-violet-600" />

      {/* Main content */}
      <main className="relative z-10 container mx-auto px-4 py-8 md:py-16 min-h-screen flex flex-col">
        {/* Header */}
        <header className="flex justify-between items-center mb-16 opacity-0 animate-fade-in" style={{ animationFillMode: 'forwards' }}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-corelytica-500 to-purple-600 flex items-center justify-center glow-purple">
              <BarChart3 size={24} className="text-white" />
            </div>
            <span className="text-xl font-bold text-white">Corelytica</span>
          </div>
          <a
            href="https://github.com/rajaakram/Website-Corelytica"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-lg glass hover:bg-white/10 transition-all duration-300 hover:scale-105 group"
          >
            <Github size={20} className="text-slate-300 group-hover:text-white transition-colors" />
            <span className="text-slate-300 group-hover:text-white transition-colors hidden sm:inline">GitHub</span>
          </a>
        </header>

        {/* Hero Section */}
        <section className="flex-1 flex flex-col items-center justify-center text-center mb-16">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 opacity-0 animate-slide-up" style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}>
            <Sparkles size={16} className="text-corelytica-400" />
            <span className="text-sm text-slate-300">Data-Driven Insights</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 opacity-0 animate-slide-up" style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}>
            <span className="text-white">Transform Data Into</span>
            <br />
            <span className="gradient-text">Intelligence</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mb-12 opacity-0 animate-slide-up" style={{ animationDelay: '600ms', animationFillMode: 'forwards' }}>
            Advanced analytics platform for modern businesses. Unlock the power of your data with AI-driven insights and real-time visualization.
          </p>

          {/* Coming Soon Badge */}
          <div className="relative mb-16 opacity-0 animate-slide-up" style={{ animationDelay: '800ms', animationFillMode: 'forwards' }}>
            <div className="absolute inset-0 bg-corelytica-500 blur-2xl opacity-20 rounded-full" />
            <div className="relative px-8 py-4 rounded-2xl glass border-corelytica-500/30 glow-purple">
              <span className="text-2xl md:text-3xl font-bold gradient-text">Coming Soon</span>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl">
            <StatCard icon={Database} value={50} suffix="M+" label="Data Points" delay="1000ms" />
            <StatCard icon={TrendingUp} value={99} suffix="%" label="Accuracy" delay="1200ms" />
            <StatCard icon={Activity} value={10} suffix="ms" label="Response" delay="1400ms" />
            <StatCard icon={PieChart} value={500} suffix="+" label="Integrations" delay="1600ms" />
          </div>
        </section>

        {/* Data Visualization Section */}
        <section className="grid md:grid-cols-3 gap-6 mb-16">
          {/* Chart Card */}
          <div className="md:col-span-2 glass-card p-6 opacity-0 animate-slide-up" style={{ animationDelay: '1800ms', animationFillMode: 'forwards' }}>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-corelytica-500/20">
                  <TrendingUp size={20} className="text-corelytica-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Real-time Analytics</h3>
                  <p className="text-sm text-slate-400">Live data processing</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-emerald-400">
                <ArrowUpRight size={18} />
                <span className="font-semibold">+24.5%</span>
              </div>
            </div>
            <MiniChart />
            <div className="flex justify-between mt-4 text-xs text-slate-500">
              <span>00:00</span>
              <span>06:00</span>
              <span>12:00</span>
              <span>18:00</span>
              <span>24:00</span>
            </div>
          </div>

          {/* Pie Chart & Data Bars */}
          <div className="space-y-6">
            <div className="glass-card p-6 flex items-center justify-center opacity-0 animate-slide-up" style={{ animationDelay: '1900ms', animationFillMode: 'forwards' }}>
              <AnimatedPieChart />
            </div>
            
            <div className="glass-card p-6 opacity-0 animate-slide-up" style={{ animationDelay: '2000ms', animationFillMode: 'forwards' }}>
              <h4 className="text-sm text-slate-400 mb-4">Data Distribution</h4>
              <div className="flex items-end justify-between h-20 gap-2">
                <DataBar height="40%" delay="2.2s" color="bg-corelytica-400" />
                <DataBar height="70%" delay="2.3s" color="bg-corelytica-500" />
                <DataBar height="55%" delay="2.4s" color="bg-corelytica-400" />
                <DataBar height="90%" delay="2.5s" color="bg-corelytica-600" />
                <DataBar height="65%" delay="2.6s" color="bg-corelytica-500" />
                <DataBar height="80%" delay="2.7s" color="bg-corelytica-400" />
                <DataBar height="45%" delay="2.8s" color="bg-corelytica-500" />
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {[
            { icon: Database, title: 'Big Data Processing', desc: 'Handle petabytes of data effortlessly' },
            { icon: Activity, title: 'Live Monitoring', desc: 'Real-time dashboard updates' },
            { icon: TrendingUp, title: 'Predictive Analytics', desc: 'AI-powered forecasting' },
            { icon: PieChart, title: 'Custom Reports', desc: 'Tailored to your needs' },
          ].map((feature, index) => (
            <div
              key={index}
              className="glass-card p-5 hover:bg-white/10 transition-all duration-300 hover:scale-105 group opacity-0 animate-slide-up"
              style={{ animationDelay: `${2200 + index * 100}ms`, animationFillMode: 'forwards' }}
            >
              <feature.icon size={24} className="text-corelytica-400 mb-3 group-hover:scale-110 transition-transform" />
              <h4 className="text-white font-semibold mb-1">{feature.title}</h4>
              <p className="text-sm text-slate-400">{feature.desc}</p>
            </div>
          ))}
        </section>

        {/* Footer */}
        <footer className="text-center opacity-0 animate-fade-in" style={{ animationDelay: '2600ms', animationFillMode: 'forwards' }}>
          <div className="glass inline-flex items-center gap-6 px-6 py-3 rounded-full">
            <span className="text-sm text-slate-400">
              © {new Date().getFullYear()} Corelytica. All rights reserved.
            </span>
            <span className="text-slate-600">|</span>
            <a
              href="https://github.com/rajaakram/Website-Corelytica"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-corelytica-400 hover:text-corelytica-300 transition-colors flex items-center gap-1"
            >
              <Github size={14} />
              GitHub
            </a>
          </div>
        </footer>
      </main>
    </div>
  )
}

export default App
