"use client"

import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('mousemove', handleMouseMove)
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setIsMobileMenuOpen(false)
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-purple-900 text-white overflow-x-hidden">
      <Head>
        <title>MyDelux.Ge - Gaming Hosting</title>
        <meta name="description" content="Gaming Server Hosting საქართველოში" />  
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Mouse Follower */}
      <div 
        className="fixed w-6 h-6 bg-purple-500/20 rounded-full pointer-events-none z-50 transition-transform duration-100 ease-out hidden md:block"
        style={{
          left: mousePosition.x - 12,
          top: mousePosition.y - 12,
        }}
      />

      {/* Optimized Background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-purple-400 to-blue-400 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              opacity: Math.random() * 0.2 + 0.1,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${Math.random() * 2 + 2}s`,
            }}
          />
        ))}
      </div>

      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-black/95 backdrop-blur-lg py-3 shadow-lg shadow-purple-500/10' 
          : 'bg-transparent py-4 md:py-6'
      }`}>
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div 
            className="flex items-center space-x-3 cursor-pointer" 
            onClick={() => scrollToSection('hero')}
          >
            <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              MyDelux.Ge
            </span>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            {['მთავარი', 'სერვისები', 'კონტაქტი'].map((item, index) => (
              <button 
                key={item} 
                onClick={() => scrollToSection(['hero', 'pricing', 'contact'][index])}
                className="relative text-gray-300 hover:text-white transition-all duration-200 font-medium px-3 py-2 group"
              >
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-blue-400 group-hover:w-full transition-all duration-300"></span>
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <Link 
              href="https://csdelux.ge" 
              target="_blank"
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-4 py-2 rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-lg shadow-purple-500/25 text-sm hidden sm:block"
            >
              პანელი
            </Link>

            {/* Mobile Menu Button */}
            <button 
              onClick={toggleMobileMenu}
              className="md:hidden flex flex-col space-y-1 w-6 h-6 justify-center items-center relative z-60"
            >
              <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${
                isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''
              }`}></span>
              <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${
                isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
              }`}></span>
              <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${
                isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
              }`}></span>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden absolute top-full left-0 w-full bg-black/95 backdrop-blur-lg border-t border-white/10 transition-all duration-300 ${
          isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        }`}>
          <div className="container mx-auto px-4 py-6 space-y-4">
            {['მთავარი', 'სერვისები', 'კონტაქტი'].map((item, index) => (
              <button 
                key={item} 
                onClick={() => scrollToSection(['hero', 'pricing', 'contact'][index])}
                className="block w-full text-left text-lg text-gray-300 hover:text-white py-3 border-b border-white/10 last:border-b-0 transition-all duration-200 font-medium"
              >
                {item}
              </button>
            ))}
            <Link 
              href="https://csdelux.ge" 
              target="_blank"
              className="block w-full text-center bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-6 py-3 rounded-xl font-semibold transition-all duration-300 mt-4"
            >
              პანელი
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 md:pt-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-blue-900/20"></div>
        
        <div className="relative z-10 text-center container mx-auto px-4">
          <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-black mb-6 leading-tight">
            <span className="bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent block">
              Mydelux.Ge
            </span>
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent block text-2xl md:text-4xl lg:text-5xl xl:text-6xl mt-2">
              Game Server Hosting
            </span>
          </h1>

          <p className="text-base md:text-lg lg:text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed px-4">
            აირჩიეთ საუკეთესო პაკეტი და დაიწყეთ თამაში.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center mb-12 px-4">
            <button 
              onClick={() => scrollToSection('pricing')}
              className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg shadow-purple-500/30 text-base"
            >
              სერვისების ნახვა
            </button>
            
            <button 
              onClick={() => scrollToSection('contact')}
              className="w-full sm:w-auto bg-white/10 backdrop-blur-lg border border-white/20 hover:border-white/40 px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 text-base"
            >
              დაგვიკავშირდით
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 max-w-2xl mx-auto px-4">
            {[
              { value: '1000 FPS', label: 'მაქსიმალური წარმადობა' },
              { value: '24/7', label: 'მხარდაჭერა' },
              { value: '100%', label: 'საიმედოობა' }
            ].map((stat, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-4 transition-all duration-300 hover:scale-105">
                <div className="text-lg md:text-xl font-black text-purple-400 mb-1">{stat.value}</div>
                <div className="text-gray-400 text-xs md:text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 md:py-20 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-4">
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                პაკეტები
              </span>
            </h2>
            <p className="text-base md:text-lg text-gray-400 max-w-xl mx-auto">
              აირჩიეთ თქვენთვის შესაფერისი პაკეტი
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {[
              { 
                players: '16 მოთამაშე', 
                price: '10₾', 
                features: ['FTP წვდომა', 'WEB პანელი', 'FPS 1000', 'გაგრძელება']
              },
              { 
                players: '20 მოთამაშე', 
                price: '12₾', 
                popular: true, 
                features: ['FTP წვდომა', 'WEB პანელი', 'FPS 1000', 'გაგრძელება']
              },
              { 
                players: '24 მოთამაშე', 
                price: '15₾', 
                features: ['FTP წვდომა', 'WEB პანელი', 'FPS 1000', 'გაგრძელება']
              },
              { 
                players: '32 მოთამაშე', 
                price: '20₾', 
                features: ['FTP წვდომა', 'WEB პანელი', 'FPS 1000', 'გაგრძელება']
              }
            ].map((plan, index) => (
              <div key={index} className={`relative bg-white/5 backdrop-blur-lg border rounded-xl p-4 transition-all duration-300 hover:scale-105 ${
                plan.popular 
                  ? 'border-purple-500/50 shadow-lg shadow-purple-500/20' 
                  : 'border-white/10'
              }`}>
                
                {plan.popular && (
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-3 py-1 text-xs font-bold rounded-full">
                      პოპულარული
                    </div>
                  </div>
                )}

                <div className="text-center mb-4">
                  <div className="text-base md:text-lg font-bold text-white mb-1">{plan.players}</div>
                  <div className="text-xl md:text-2xl font-black text-purple-400">
                    {plan.price}
                  </div>
                </div>

                <ul className="space-y-2 mb-4">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center space-x-2 text-gray-300">
                      <div className="w-1.5 h-1.5 bg-green-400 rounded-full flex-shrink-0"></div>
                      <span className="text-xs">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link 
                  href="https://www.facebook.com/goga.goglika1235" 
                  target="_blank"
                  className="block w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 py-2 rounded-lg font-semibold transition-all duration-300 text-center text-sm"
                >
                  შეკვეთა
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Server Info */}
      <section className="py-16 md:py-20 relative">
        <div className="container mx-auto px-4">
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-4 md:p-6 max-w-3xl mx-auto">
            <div className="text-center mb-4 md:mb-6">
              <h2 className="text-2xl md:text-3xl font-black mb-3">
                <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  სერვერის ინფორმაცია
                </span>
              </h2>
              <p className="text-gray-400 text-xs md:text-sm">
                სერვერის შესაძენად დაგვიკავშირდით
              </p>
            </div>

            <div className="bg-black/30 backdrop-blur-lg border border-white/10 rounded-xl p-3 md:p-4 mb-4">
              <div className="text-center">
                <div className="text-purple-400 mb-1 text-sm">სერვერის IP</div>
                <code className="text-base md:text-lg font-mono text-white bg-white/10 px-3 py-2 rounded-lg">
                  185.139.57.247
                </code>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                { icon: '🚀', title: 'Instant Setup', desc: 'სერვერი მზადაა 5 წუთში' },
                { icon: '🛡️', title: 'DDoS Protection', desc: 'სრული დაცვა' },
              ].map((item, index) => (
                <div key={index} className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-lg p-3 transition-all duration-300 hover:scale-105">
                  <div className="flex items-center space-x-3">
                    <div className="text-xl">{item.icon}</div>
                    <div>
                      <div className="font-semibold text-purple-400 text-sm">{item.title}</div>
                      <div className="text-gray-400 text-xs">{item.desc}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-4">
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                კონტაქტი
              </span>
            </h2>
            <p className="text-base md:text-lg text-gray-400">
              დაგვიკავშირდით სერვერის შესაძენად
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
            {[
              { 
                name: 'გოგა', 
                phone: '+995 591 10 01 88',
                fbLink: 'https://www.facebook.com/goga.goglika1235',
                color: 'from-purple-500 to-blue-500'
              },
              { 
                name: 'სუნელა', 
                phone: '+995 598 89 14 87',
                fbLink: 'https://www.facebook.com/sector.sector.5205',
                color: 'from-blue-500 to-purple-500'
              }
            ].map((contact, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-4 md:p-6 transition-all duration-300 hover:scale-105">
                <div className="text-center">
                  <div className={`w-14 h-14 md:w-16 md:h-16 bg-gradient-to-r ${contact.color} rounded-xl mx-auto mb-3 md:mb-4 flex items-center justify-center text-lg md:text-xl font-black`}>
                    {contact.name.charAt(0)}
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-white mb-2 md:mb-3">{contact.name}</h3>
                  <div className="text-base md:text-lg font-mono text-purple-400 bg-white/5 rounded-lg px-3 py-2 mb-3 md:mb-4 border border-white/10">
                    {contact.phone}
                  </div>
                  <div className="space-y-2">
                    <button 
                      onClick={() => window.open(`tel:${contact.phone}`)}
                      className="w-full bg-green-500/20 border border-green-400/30 hover:bg-green-500/30 py-2 rounded-lg font-semibold transition-all duration-300 text-sm"
                    >
                      📞 ზარის დარეკვა
                    </button>
                    <button 
                      onClick={() => window.open(contact.fbLink, '_blank')}
                      className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded-lg font-semibold transition-all duration-300 text-sm"
                    >
                      📘 Facebook
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black/50">
        <div className="container mx-auto px-4 py-6 md:py-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-3 md:mb-4">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
              <span className="text-lg font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                MyDelux.Ge
              </span>
            </div>
            <p className="text-gray-400 text-xs md:text-sm mb-3 md:mb-4">
              Gaming Server Hosting
            </p>
            <div className="text-gray-500 text-xs">
              © 2025 MyDelux.Ge - ყველა უფლება დაცულია
            </div>
          </div>
        </div>
      </footer>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  )
}