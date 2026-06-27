"use client";

import { motion } from "framer-motion";
import { Radio, Youtube, Heart, Music, MessageCircle, ChevronDown, Tv, Volume2, VolumeX, Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState, useRef, useCallback } from "react";

function TwitchIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714z"/>
    </svg>
  );
}

function TelegramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0h-.056zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
    </svg>
  );
}

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
  const [twitchParent] = useState(() =>
    typeof window !== "undefined" ? window.location.hostname : ""
  );
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [audioPaused, setAudioPaused] = useState(false);
  const [showAudioPrompt, setShowAudioPrompt] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);

  const stopAudio = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      setAudioPlaying(false);
      setAudioPaused(true);
    }
  }, []);

  const startAudio = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.loop = true;
      audioRef.current.volume = 0.6;
      audioRef.current.play().then(() => {
        setAudioPlaying(true);
        setAudioPaused(false);
        setShowAudioPrompt(false);
      }).catch(() => {
        // Autoplay blocked by browser
      });
    }
  }, []);

  const toggleAudio = useCallback(() => {
    if (audioPlaying) {
      stopAudio();
    } else {
      startAudio();
    }
  }, [audioPlaying, stopAudio, startAudio]);

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

  // Auto-stop audio when user interacts with Twitch or YouTube sections
  const handleStreamActivate = () => {
    stopAudio();
  };

  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden && audioRef.current && !audioRef.current.paused) {
        audioRef.current.pause();
        setAudioPlaying(false);
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0e27] text-white overflow-x-hidden">
      {/* Hidden audio element */}
      <audio ref={audioRef} src="/radio-audio.mp3" preload="auto" />

      {/* ===== AUDIO PROMPT OVERLAY ===== */}
      {showAudioPrompt && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={startAudio}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
            className="bg-[#0d1233] border border-indigo-500/30 rounded-2xl p-8 sm:p-12 text-center max-w-md mx-auto shadow-2xl shadow-indigo-500/10 cursor-pointer hover:border-indigo-400/50 transition-colors"
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-600/30"
            >
              <Volume2 className="h-10 w-10 text-white" />
            </motion.div>
            <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Radio Cristo Unidos
            </h3>
            <p className="text-blue-200/70 mb-6 text-sm sm:text-base">
              Toca para escuchar nuestra programación musical
            </p>
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition-colors">
              <Play className="h-5 w-5" />
              Escuchar Radio
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* ===== FLOATING AUDIO PLAYER ===== */}
      {!showAudioPrompt && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="fixed bottom-20 left-1/2 -translate-x-1/2 z-40 sm:left-4 sm:translate-x-0"
        >
          <div className={`flex items-center gap-3 px-4 py-2.5 rounded-full shadow-xl backdrop-blur-md border transition-all duration-300 ${
            audioPlaying
              ? "bg-indigo-900/80 border-indigo-500/30 shadow-indigo-500/20"
              : "bg-[#0d1233]/80 border-indigo-500/10"
          }`}>
            {audioPlaying && (
              <div className="flex items-end gap-[2px] h-5">
                {[1, 2, 3, 4].map((i) => (
                  <motion.div
                    key={i}
                    className="w-[3px] rounded-full bg-orange-400"
                    animate={{
                      height: [4, 12 + i * 3, 6, 14 + i * 2],
                    }}
                    transition={{
                      duration: 0.6 + i * 0.15,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </div>
            )}
            <button
              onClick={toggleAudio}
              className="w-9 h-9 rounded-full bg-indigo-600 hover:bg-indigo-500 flex items-center justify-center transition-colors"
              aria-label={audioPlaying ? "Pausar audio" : "Reproducir audio"}
            >
              {audioPlaying ? (
                <Pause className="h-4 w-4 text-white" />
              ) : (
                <VolumeX className="h-4 w-4 text-white/70" />
              )}
            </button>
            <span className="text-xs text-blue-200/60 hidden sm:block max-w-[140px] truncate">
              {audioPlaying ? "Reproduciendo..." : "Audio en pausa"}
            </span>
          </div>
        </motion.div>
      )}

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
            <a href="#envivo" className="text-blue-200/70 hover:text-indigo-400 transition-colors">En Vivo</a>
            <a href="#video" className="text-blue-200/70 hover:text-indigo-400 transition-colors">Video</a>
            <a href="#nosotros" className="text-blue-200/70 hover:text-indigo-400 transition-colors">Nosotros</a>
            <Button
              asChild
              size="sm"
              variant="outline"
              className="border-sky-500/40 text-sky-400 hover:bg-sky-500/10 hover:text-sky-300 gap-2"
            >
              <a href="https://web.telegram.org/a/#-1002412078258" target="_blank" rel="noopener noreferrer">
                <TelegramIcon className="h-4 w-4" />
                <span className="hidden lg:inline">Telegram</span>
              </a>
            </Button>
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

          {/* Mobile menu buttons */}
          <div className="md:hidden flex items-center gap-2">
            <Button
              asChild
              size="sm"
              variant="outline"
              className="border-sky-500/40 text-sky-400 hover:bg-sky-500/10"
            >
              <a href="https://web.telegram.org/a/#-1002412078258" target="_blank" rel="noopener noreferrer">
                <TelegramIcon className="h-4 w-4" />
              </a>
            </Button>
            <Button
              asChild
              size="sm"
              className="bg-indigo-600 hover:bg-indigo-500 text-white"
            >
              <a href="https://www.youtube.com/@cristounidos" target="_blank" rel="noopener noreferrer">
                <Youtube className="h-4 w-4" />
              </a>
            </Button>
          </div>
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
            <a href="#envivo" onClick={handleStreamActivate} className="flex items-center gap-2 px-4 py-2 rounded-full bg-red-600/90 backdrop-blur-sm text-sm font-semibold hover:bg-red-500 transition-colors">
              <span
                className={`w-2.5 h-2.5 rounded-full ${isLive ? "bg-white animate-pulse" : "bg-red-300"}`}
              />
              EN VIVO
            </a>
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
              <a href="#video" onClick={handleStreamActivate}>
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

      {/* ===== TWITCH EN VIVO SECTION ===== */}
      <section id="envivo" className="py-16 sm:py-24 bg-[#0a0e27] relative">
        {/* Subtle background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px] -z-10" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-600/20 border border-red-500/30 text-red-400 text-sm font-semibold mb-4">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              TRANSMISIÓN EN VIVO
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-500 bg-clip-text text-transparent">
                Twitch En Vivo
              </span>
            </h2>
            <p className="text-blue-200/60 text-base sm:text-lg max-w-2xl mx-auto">
              Sintoniza nuestra transmisión en vivo las 24 horas. Música cristiana, alabanzas y la palabra de Dios sin interrupción.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7 }}
          >
            <Card className="bg-[#0d1233]/80 border border-purple-500/20 overflow-hidden shadow-2xl shadow-purple-900/10">
              <CardContent className="p-0">
                <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
                  {twitchParent && (
                    <iframe
                      className="absolute inset-0 w-full h-full"
                      src={`https://player.twitch.tv/?channel=cristounidos&parent=${twitchParent}&muted=false`}
                      title="Radio Cristo Unidos - Twitch Live"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  )}
                  {/* Overlay to intercept clicks when audio is playing */}
                  {audioPlaying && (
                    <div
                      className="absolute inset-0 z-10 bg-black/40 flex flex-col items-center justify-center gap-3 cursor-pointer hover:bg-black/50 transition-colors backdrop-blur-[2px]"
                      onClick={handleStreamActivate}
                    >
                      <div className="w-14 h-14 rounded-full bg-purple-600/90 flex items-center justify-center shadow-lg">
                        <Play className="h-7 w-7 text-white ml-1" />
                      </div>
                      <span className="text-sm text-white/90 font-medium">Toca para activar el stream</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Twitch CTA */}
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
              className="bg-purple-600 hover:bg-purple-500 text-white font-bold text-base px-8 gap-3 shadow-lg shadow-purple-600/20"
            >
              <a href="https://www.twitch.tv/cristounidos" target="_blank" rel="noopener noreferrer">
                <TwitchIcon className="h-5 w-5" />
                Seguir en Twitch — @cristounidos
              </a>
            </Button>
          </motion.div>
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
                  {/* Overlay to intercept clicks when audio is playing */}
                  {audioPlaying && (
                    <div
                      className="absolute inset-0 z-10 bg-black/40 flex flex-col items-center justify-center gap-3 cursor-pointer hover:bg-black/50 transition-colors backdrop-blur-[2px]"
                      onClick={handleStreamActivate}
                    >
                      <div className="w-14 h-14 rounded-full bg-red-600/90 flex items-center justify-center shadow-lg">
                        <Play className="h-7 w-7 text-white ml-1" />
                      </div>
                      <span className="text-sm text-white/90 font-medium">Toca para ver el video</span>
                    </div>
                  )}
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

      {/* ===== FLOATING TELEGRAM BUTTON ===== */}
      <a
        href="https://web.telegram.org/a/#-1002412078258"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 bg-sky-500 hover:bg-sky-400 text-white p-4 rounded-full shadow-lg shadow-sky-500/30 transition-all duration-300 hover:scale-110 group"
        aria-label="Contactar por Telegram"
      >
        <TelegramIcon className="h-6 w-6" />
        <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-white text-neutral-900 text-sm font-semibold px-3 py-1.5 rounded-lg shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          Escríbenos por Telegram
        </span>
      </a>

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
              <a
                href="https://www.twitch.tv/cristounidos"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-200/50 hover:text-purple-400 text-sm transition-colors flex items-center gap-2"
              >
                <TwitchIcon className="h-4 w-4" /> Twitch En Vivo
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
                className="border-purple-500/40 text-purple-400 hover:bg-purple-500/10 hover:text-purple-300 gap-2"
              >
                <a href="https://www.twitch.tv/cristounidos" target="_blank" rel="noopener noreferrer">
                  <TwitchIcon className="h-4 w-4" />
                  @cristounidos
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="sm"
                className="border-sky-500/40 text-sky-400 hover:bg-sky-500/10 hover:text-sky-300 gap-2"
              >
                <a href="https://web.telegram.org/a/#-1002412078258" target="_blank" rel="noopener noreferrer">
                  <TelegramIcon className="h-4 w-4" />
                  @cristounidos
                </a>
              </Button>
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