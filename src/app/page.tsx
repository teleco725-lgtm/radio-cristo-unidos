"use client";

import { motion } from "framer-motion";
import { Radio, Youtube, Heart, Music, MessageCircle, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" },
  }),
};

function AnimatedRadioWaves() {
  const [bars] = useState(() =>
    Array.from({ length: 5 }, (_, i) => ({
      height: 16 + Math.random() * 24,
      delay: i * 0.2,
      duration: 0.8 + Math.random() * 0.6,
    }))
  );

  return (
    <div className="flex items-end gap-1 h-10">
      {bars.map((bar, i) => (
        <motion.div
          key={i}
          className="w-1.5 rounded-full bg-orange-400"
          animate={{
            height: [bar.height * 0.4, bar.height, bar.height * 0.6, bar.height],
          }}
          transition={{
            duration: bar.duration,
            repeat: Infinity,
            delay: bar.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

export default function RadioPage() {
  const [scrollY, setScrollY] = useState(0);
  const [isLive, setIsLive] = useState(true);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsLive((prev) => !prev);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0e27] text-white overflow-x-hidden">
      {/* ===== HEADER / NAVBAR ===== */}
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          backgroundColor: scrollY > 60 ? "rgba(10,14,39,0.92)" : "transparent",
          backdropFilter: scrollY > 60 ? "blur(16px)" : "none",
          borderBottom: scrollY > 60 ? "1px solid rgba(99,102,241,0.2)" : "none",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <a
            href="https://www.youtube.com/@cristounidos"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 group"
          >
            <img
              src="/radio-logo.png"
              alt="Radio Cristo Unidos Logo"
              className="h-10 w-10 rounded-full object-cover ring-2 ring-indigo-500/50 group-hover:ring-indigo-400 transition-all"
            />
            <div className="flex flex-col">
              <span className="text-sm sm:text-base font-bold tracking-wide text-indigo-400 group-hover:text-indigo-300 transition-colors">
                CRISTO UNIDOS
              </span>
              <span className="text-[10px] sm:text-xs text-blue-300/60 tracking-widest uppercase">
                Radio en Vivo
              </span>
            </div>
          </a>

          {/* Nav links */}
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#inicio" className="text-blue-200/70 hover:text-indigo-400 transition-colors">Inicio</a>
            <a href="#video" className="text-blue-200/70 hover:text-indigo-400 transition-colors">Video</a>
            <a href="#nosotros" className="text-blue-200/70 hover:text-indigo-400 transition-colors">Nosotros</a>
            <Button
              asChild
              size="sm"
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold gap-2"
            >
              <a href="https://www.youtube.com/@cristounidos" target="_blank" rel="noopener noreferrer">
                <Youtube className="h-4 w-4" />
                YouTube
              </a>
            </Button>
          </nav>

          {/* Mobile menu button */}
          <Button
            asChild
            size="sm"
            className="md:hidden bg-indigo-600 hover:bg-indigo-500 text-white"
          >
            <a href="https://www.youtube.com/@cristounidos" target="_blank" rel="noopener noreferrer">
              <Youtube className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </header>

      {/* ===== HERO SECTION ===== */}
      <section id="inicio" className="relative min-h-screen flex items-center justify-center pt-16">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/radio-hero.png')" }}
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e27]/70 via-[#0a0e27]/40 to-[#0a0e27]" />

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mb-6"
          >
            <img
              src="/radio-logo.png"
              alt="Radio Cristo Unidos"
              className="w-28 h-28 sm:w-36 sm:h-36 mx-auto rounded-full object-cover ring-4 ring-indigo-500/40 shadow-2xl shadow-indigo-500/20"
            />
          </motion.div>

          <motion.h1
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight mb-4"
          >
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-500 bg-clip-text text-transparent">
              Radio Cristo Unidos
            </span>
          </motion.h1>

          <motion.p
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-lg sm:text-xl md:text-2xl text-blue-100/80 mb-2 font-light"
          >
            Tu Estación de Fe y Esperanza
          </motion.p>

          <motion.div
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="flex items-center justify-center gap-3 mb-10"
          >
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-red-600/90 backdrop-blur-sm text-sm font-semibold">
              <span
                className={`w-2.5 h-2.5 rounded-full ${isLive ? "bg-white animate-pulse" : "bg-red-300"}`}
              />
              EN VIVO
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-900/30 backdrop-blur-sm text-sm border border-indigo-500/20">
              <AnimatedRadioWaves />
            </div>
          </motion.div>

          <motion.div
            custom={4}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              asChild
              size="lg"
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-base px-8 gap-2 shadow-lg shadow-indigo-600/25"
            >
              <a href="#video">
                <Radio className="h-5 w-5" />
                Ver Transmisión
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-purple-500/50 text-purple-400 hover:bg-purple-500/10 font-semibold text-base px-8 gap-2"
            >
              <a href="https://www.youtube.com/@cristounidos" target="_blank" rel="noopener noreferrer">
                <Youtube className="h-5 w-5" />
                Canal de YouTube
              </a>
            </Button>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="h-8 w-8 text-indigo-400/60" />
          </motion.div>
        </div>
      </section>

      {/* ===== FEATURES STRIP ===== */}
      <section className="relative bg-[#0d1233] border-y border-indigo-500/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <FeatureItem
              icon={<Music className="h-6 w-6 text-indigo-400" />}
              title="Música Cristiana"
              desc="Alabanzas y adoración 24/7"
            />
            <FeatureItem
              icon={<MessageCircle className="h-6 w-6 text-purple-400" />}
              title="Mensajes de Fe"
              desc="Palabra inspiradora para tu vida"
            />
            <FeatureItem
              icon={<Heart className="h-6 w-6 text-orange-400" />}
              title="Comunidad"
              desc="Conectados por el amor de Cristo"
            />
          </div>
        </div>
      </section>

      {/* ===== VIDEO SECTION ===== */}
      <section id="video" className="py-16 sm:py-24 bg-[#0a0e27]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">
              <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Nuestra Transmisión
              </span>
            </h2>
            <p className="text-blue-200/60 text-base sm:text-lg max-w-2xl mx-auto">
              Disfruta de nuestros programas, alabanzas y mensajes de fe directamente desde nuestro canal de YouTube.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7 }}
          >
            <Card className="bg-[#0d1233]/80 border border-indigo-500/20 overflow-hidden shadow-2xl shadow-indigo-900/10">
              <CardContent className="p-0">
                <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    src="https://www.youtube-nocookie.com/embed/Asn8ugRbEZQ?si=uHKdIdF-aFas63eQ&start=1"
                    title="Radio Cristo Unidos - YouTube Video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* YouTube CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 text-center"
          >
            <Button
              asChild
              size="lg"
              className="bg-red-600 hover:bg-red-500 text-white font-bold text-base px-8 gap-3 shadow-lg shadow-red-600/20"
            >
              <a href="https://www.youtube.com/@cristounidos" target="_blank" rel="noopener noreferrer">
                <Youtube className="h-5 w-5" />
                Suscríbete a @cristounidos en YouTube
              </a>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* ===== ABOUT SECTION ===== */}
      <section id="nosotros" className="py-16 sm:py-24 bg-[#0d1233]/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center"
          >
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                <span className="bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
                  Sobre Nosotros
                </span>
              </h2>
              <Separator className="bg-indigo-500/20 mb-6" />
              <p className="text-blue-100/80 leading-relaxed mb-4">
                <strong className="text-indigo-400">Radio Cristo Unidos</strong> es más que una estación de radio — es una comunidad de creyentes unidos por la fe en Jesucristo. Nuestra misión es llevar un mensaje de esperanza, amor y redención a cada hogar.
              </p>
              <p className="text-blue-200/60 leading-relaxed mb-6">
                A través de la música cristiana, enseñanzas bíblicas y testimonios de fe, buscamos ser una luz en tu día a día. Nos encuentras en vivo las 24 horas, los 7 días de la semana.
              </p>
              <Button
                asChild
                className="bg-purple-600 hover:bg-purple-500 text-white font-semibold gap-2"
              >
                <a href="https://www.youtube.com/@cristounidos" target="_blank" rel="noopener noreferrer">
                  <Youtube className="h-4 w-4" />
                  Ver en YouTube
                </a>
              </Button>
            </div>
            <div className="relative">
              <div className="rounded-2xl overflow-hidden ring-2 ring-indigo-500/20 shadow-xl">
                <img
                  src="/radio-hero.png"
                  alt="Radio Cristo Unidos"
                  className="w-full h-auto object-cover"
                />
              </div>
              {/* Decorative glow */}
              <div className="absolute -inset-4 bg-indigo-500/5 rounded-3xl blur-2xl -z-10" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="mt-auto bg-[#0a0e27] border-t border-indigo-500/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Brand */}
            <div className="flex flex-col items-center md:items-start gap-3">
              <div className="flex items-center gap-3">
                <img
                  src="/radio-logo.png"
                  alt="Logo"
                  className="h-10 w-10 rounded-full object-cover ring-2 ring-indigo-500/30"
                />
                <span className="font-bold text-indigo-400 text-lg">Cristo Unidos</span>
              </div>
              <p className="text-blue-200/50 text-sm text-center md:text-left">
                Tu estación de fe y esperanza. Música cristiana y mensajes inspiradores las 24 horas.
              </p>
            </div>

            {/* Links */}
            <div className="flex flex-col items-center gap-2">
              <h4 className="font-semibold text-blue-100 mb-1">Enlaces</h4>
              <a
                href="https://www.youtube.com/@cristounidos"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-200/50 hover:text-indigo-400 text-sm transition-colors flex items-center gap-2"
              >
                <Youtube className="h-4 w-4" /> Canal de YouTube
              </a>
              <a href="#inicio" className="text-blue-200/50 hover:text-indigo-400 text-sm transition-colors">
                Inicio
              </a>
              <a href="#video" className="text-blue-200/50 hover:text-indigo-400 text-sm transition-colors">
                Transmisión
              </a>
              <a href="#nosotros" className="text-blue-200/50 hover:text-indigo-400 text-sm transition-colors">
                Nosotros
              </a>
            </div>

            {/* Contact */}
            <div className="flex flex-col items-center md:items-end gap-2">
              <h4 className="font-semibold text-blue-100 mb-1">Síguenos</h4>
              <Button
                asChild
                variant="outline"
                size="sm"
                className="border-red-600/40 text-red-400 hover:bg-red-600/10 hover:text-red-300 gap-2"
              >
                <a href="https://www.youtube.com/@cristounidos" target="_blank" rel="noopener noreferrer">
                  <Youtube className="h-4 w-4" />
                  @cristounidos
                </a>
              </Button>
            </div>
          </div>

          <Separator className="bg-indigo-900/50 mb-6" />

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-blue-200/40 text-xs">
            <p>&copy; {new Date().getFullYear()} Radio Cristo Unidos. Todos los derechos reservados.</p>
            <p className="flex items-center gap-1">
              Hecho con <Heart className="h-3 w-3 text-red-500 fill-red-500" /> por la comunidad de fe
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ===== Sub-components ===== */

function FeatureItem({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="flex flex-col items-center gap-2 p-4">
      <div className="w-12 h-12 rounded-full bg-indigo-500/10 flex items-center justify-center mb-1">
        {icon}
      </div>
      <h3 className="font-semibold text-blue-100 text-base">{title}</h3>
      <p className="text-blue-200/60 text-sm">{desc}</p>
    </div>
  );
}