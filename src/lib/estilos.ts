import { cn } from "./cn";

export const contenedor = "mx-auto w-full max-w-[1280px] px-4 md:px-9";

export const APP_URL = import.meta.env.VITE_APP_URL ?? "http://localhost:5173";

const botonBase =
  "inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-control px-5 text-sm font-semibold uppercase tracking-[0.7px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/25";

export const boton = {
  primary: cn(botonBase, "bg-primary text-white shadow-soft hover:bg-primary-hover"),
  outline: cn(botonBase, "border border-border-strong bg-card text-foreground hover:bg-subtle"),
  accent: cn(botonBase, "bg-accent text-accent-foreground hover:bg-accent-hover"),
};
