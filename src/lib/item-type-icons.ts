import {
  Code,
  Sparkles,
  Terminal,
  StickyNote,
  File,
  Image,
  Link,
  Folder,
  type LucideIcon,
} from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  Code,
  Sparkles,
  Terminal,
  StickyNote,
  File,
  Image,
  Link,
  Folder,
};

export function getTypeIcon(name: string | null | undefined): LucideIcon {
  if (name && ICONS[name]) return ICONS[name];
  return Folder;
}

export function hexWithAlpha(hex: string | null | undefined, alpha: number): string | undefined {
  if (!hex) return undefined;
  const h = hex.replace("#", "");
  if (h.length !== 6) return hex;
  const a = Math.round(alpha * 255)
    .toString(16)
    .padStart(2, "0");
  return `#${h}${a}`;
}
