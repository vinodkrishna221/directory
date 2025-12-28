"use client";

import { motion } from "framer-motion";
import { ArrowRight, Search, Zap, Shield, Users, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useEffect, useState } from "react";

// --- Components ---

function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled
          ? "bg-black/50 backdrop-blur-md border-b border-white/10 py-4"
          : "bg-transparent py-6"
        }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <span className="font-bold text-white text-lg">S</span>
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
            StudentDir
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
          <Link href="#" className="hover:text-white transition-colors">Directory</Link>
          <Link href="#" className="hover:text-white transition-colors">Features</Link>
          <Link href="#" className="hover:text-white transition-colors">Departments</Link>
          <Link href="#" className="hover:text-white transition-colors">About</Link>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-white/10 hidden sm:flex">
            Log In
          </Button>
          <Button className="bg-white text-black hover:bg-gray-200 rounded-full px-6 shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] transition-shadow duration-300">
            Join Now
          </Button>
        </div>
      </div>
    </nav>
  );
}

function FloatingNode({
  x,
  y,
  delay,
  icon: Icon,
  label,
}: {
  x: string;
  y: string;
  delay: number;
  icon: any;
  label: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.5, type: "spring" }}
      className="absolute items-center gap-3 hidden md:flex"
      style={{ top: y, left: x }}
    >
      <div className="relative">
        <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl animate-pulse" />
        <div className="relative w-12 h-12 bg-black/80 backdrop-blur-md border border-white/10 rounded-full flex items-center justify-center shadow-2xl">
          <Icon className="w-5 h-5 text-blue-400" />
        </div>
      </div>
      <div className="bg-black/60 backdrop-blur-sm border border-white/5 px-3 py-1 rounded-full text-xs text-gray-300 font-medium">
        {label}
      </div>
    </motion.div>
  );
}

function FeatureCard({
  icon: Icon,
  title,
  desc,
  delay,
}: {
  icon: any;
  title: string;
  desc: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className="group relative p-8 rounded-3xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition-all duration-300 hover:bg-white/[0.05] overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative z-10">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gray-800 to-black border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
          <Icon className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-xl font-semibold text-white mb-3">{title}</h3>
        <p className="text-gray-400 leading-relaxed">{desc}</p>
      </div>
    </motion.div>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-blue-500/30">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden pt-20">
        {/* Background Effects */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-purple-600/30 rounded-full blur-[120px]" />
          <div className="absolute bottom-[10%] right-[20%] w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px]" />
          <div className="absolute top-[40%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/5 rounded-full opacity-30" />
          <div className="absolute top-[40%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/5 rounded-full opacity-40" />
          <div className="absolute top-[40%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-white/5 rounded-full opacity-50" />
        </div>

        {/* Floating Nodes */}
        <FloatingNode x="15%" y="30%" delay={0.2} icon={Users} label="Networking" />
        <FloatingNode x="80%" y="25%" delay={0.4} icon={Globe} label="Community" />
        <FloatingNode x="10%" y="70%" delay={0.6} icon={Search} label="Discovery" />
        <FloatingNode x="85%" y="65%" delay={0.8} icon={Shield} label="Privacy" />

        {/* Main Content */}
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge variant="outline" className="mb-6 border-white/20 px-4 py-1.5 text-sm bg-white/5 backdrop-blur-sm text-gray-300 rounded-full">
              ✨ The Future of Campus Connections
            </Badge>

            <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-8">
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-gray-500">
                Unlock Your
              </span>
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                Network's Potential
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
              Connect with peers, discover mentors, and collaborate on projects.
              The ultimate student directory platform built for the modern campus.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="h-14 px-8 text-base bg-white text-black hover:bg-gray-200 rounded-full shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all hover:scale-105">
                Get Started Now
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 text-base text-white border-white/20 bg-white/5 hover:bg-white/10 rounded-full hover:border-white/40 transition-all">
                Explore Directory <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Bottom Fade */}
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black to-transparent" />
      </section>

      {/* Stats Section */}
      <section className="py-20 border-y border-white/10 bg-white/[0.02]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { label: "Students", value: "2,000+" },
              { label: "Departments", value: "12" },
              { label: "Connections", value: "50k+" },
              { label: "Projects", value: "150+" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-gray-500 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-32 relative">
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
              Everything you need to grow
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              Powerful tools to manage your academic profile and connect with the right people.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <FeatureCard
              icon={Search}
              title="Smart Search"
              desc="filtering by skills, department, and interests to find exactly who you're looking for."
              delay={0.1}
            />
            <FeatureCard
              icon={Shield}
              title="Verified Profiles"
              desc="Official college email verification ensures a trusted and secure community for everyone."
              delay={0.2}
            />
            <FeatureCard
              icon={Zap}
              title="Instant Connect"
              desc="Direct messaging and project collaboration requests with just one click."
              delay={0.3}
            />
          </div>
        </div>

        {/* Background Mesh */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-6xl opacity-20 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/30 via-transparent to-transparent" />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10 text-center text-gray-500 text-sm">
        <p>© 2024 Student Directory. All rights reserved.</p>
      </footer>
    </main>
  );
}
