"use client";

import Image from "next/image";
import Link from "next/link";
import { AppStoreButton } from "@/components/CTAButton";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export function SpanishHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/es/calculadora-a-que-hora-salir" className="flex items-center gap-2.5" aria-label="Inicio de OnTimer en español">
          <Image src="/images/ontimer_1024x1024.png" alt="" width={34} height={34} className="rounded-xl" priority />
          <span className="text-xl font-semibold tracking-tight text-white">OnTimer</span>
        </Link>
        <nav aria-label="Navegación principal" className="flex items-center gap-3 sm:gap-5">
          <Link href="/es/calculadora-a-que-hora-salir" className="hidden text-sm font-medium text-zinc-400 hover:text-white sm:inline">Hora de salida</Link>
          <Link href="/es/calculadora-cuando-salir-al-aeropuerto" className="hidden text-sm font-medium text-zinc-400 hover:text-white md:inline">Aeropuerto</Link>
          <LanguageSwitcher />
        </nav>
      </div>
    </header>
  );
}

export function SpanishFooter() {
  return (
    <footer className="border-t border-zinc-800/60 bg-zinc-950">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 sm:grid-cols-[1fr_auto] sm:items-start sm:px-8">
        <div className="max-w-xl">
          <Link href="/es/calculadora-a-que-hora-salir" className="text-xl font-bold text-white">On<span className="text-green-500">Timer</span></Link>
          <p className="mt-3 text-sm leading-relaxed text-zinc-400">Alarmas persistentes y automáticas para los eventos de tu calendario. Diseñado para ayudarte a mantenerte puntual.</p>
          <div className="mt-5"><AppStoreButton size="sm" label="Descargar en App Store" location="es_footer" placement="above" /></div>
        </div>
        <div className="space-y-3 text-sm">
          <Link href="/es/calculadora-a-que-hora-salir" className="block text-zinc-400 hover:text-white">Calculadora de hora de salida</Link>
          <Link href="/es/calculadora-cuando-salir-al-aeropuerto" className="block text-zinc-400 hover:text-white">Calculadora para el aeropuerto</Link>
          <LanguageSwitcher compact />
        </div>
      </div>
    </footer>
  );
}
