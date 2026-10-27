import {
  ArrowRight,
  BadgeCheck,
  Barcode,
  Boxes,
  Check,
  Cog,
  Droplets,
  Factory,
  Layers,
  LockKeyhole,
  Mail,
  MapPin,
  Package,
  PackageCheck,
  Paintbrush,
  Palette,
  Phone,
  Ruler,
  Shapes,
  ShieldCheck,
  Soup,
  Sprout,
  Stamp,
  Truck,
  UtensilsCrossed,
  Wheat,
  type LucideIcon,
} from "lucide-react";

export type IconName =
  | "codes"
  | "finish"
  | "lock"
  | "scale"
  | "shapes"
  | "palette"
  | "tool"
  | "mould"
  | "truck"
  | "pack"
  | "check"
  | "paint"
  | "agro"
  | "food"
  | "lube"
  | "shield"
  | "doc"
  | "phone"
  | "mail"
  | "pin"
  | "arrow"
  | "layers"
  | "stamp"
  | "wheat"
  | "boxes";

const icons: Record<IconName, LucideIcon> = {
  codes: Barcode,
  finish: Paintbrush,
  lock: LockKeyhole,
  scale: Ruler,
  shapes: Shapes,
  palette: Palette,
  tool: Cog,
  mould: Factory,
  truck: Truck,
  pack: Package,
  check: Check,
  paint: Paintbrush,
  agro: Sprout,
  food: UtensilsCrossed,
  lube: Droplets,
  shield: ShieldCheck,
  doc: Stamp,
  phone: Phone,
  mail: Mail,
  pin: MapPin,
  arrow: ArrowRight,
  layers: Layers,
  stamp: BadgeCheck,
  wheat: Wheat,
  boxes: Boxes,
};

/** Ambient loop applied to the icon. "none" keeps it still. */
export type IconMotion =
  | "none"
  | "spin"
  | "spin-slow"
  | "float"
  | "pulse"
  | "swing"
  | "travel";

const motionClass: Record<IconMotion, string> = {
  none: "",
  spin: "icon-spin",
  "spin-slow": "icon-spin-slow",
  float: "icon-float",
  pulse: "icon-pulse",
  swing: "icon-swing",
  travel: "icon-travel",
};

type IconTone = "default" | "brand" | "dark" | "muted";

const tones: Record<IconTone, string> = {
  default: "border-line bg-white text-ink",
  brand: "border-brand bg-brand text-white",
  dark: "border-white/20 bg-white/5 text-white",
  muted: "border-line bg-soft text-mid",
};

type AnimatedIconProps = {
  name: IconName;
  motion?: IconMotion;
  className?: string;
  strokeWidth?: number;
  /** Render inside a square tile (the house style for icons). */
  framed?: boolean;
  frameClassName?: string;
  /** Tile colours. Kept as a prop so tone never fights size utilities. */
  tone?: IconTone;
};

/**
 * Icon with an optional ambient loop. Motion is pure CSS (see globals.css), so
 * this stays a Server Component and costs no JavaScript.
 */
export function AnimatedIcon({
  name,
  motion = "none",
  className = "h-5 w-5",
  strokeWidth = 1.6,
  framed = false,
  frameClassName = "",
  tone = "default",
}: AnimatedIconProps) {
  const Icon = icons[name] ?? PackageCheck;

  const glyph = (
    <Icon aria-hidden className={`${className} ${motionClass[motion]}`} strokeWidth={strokeWidth} />
  );

  if (!framed) return glyph;

  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center border transition-colors duration-500 ${tones[tone]} ${frameClassName}`}
    >
      {glyph}
    </span>
  );
}

/** Application → icon mapping shared by cards, filters and detail pages. */
export const applicationIcons: Record<string, IconName> = {
  paint: "paint",
  agro: "agro",
  food: "food",
  lube: "lube",
};
