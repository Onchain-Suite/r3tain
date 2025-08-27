import { type LucideIcon } from "lucide-react";

export interface Particle {
  left: string;
  top?: string;
  delay: number;
  width?: number;
  duration: number;
}

export interface FloatingIcon {
  icon: LucideIcon;
  left: string;
  top: string;
  delay: number;
  duration: number;
  scale: number;
}
