import clsx, { type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Class-name helper for the shared UI layer: clsx for conditionals, then
 * tailwind-merge so a caller-supplied `class` reliably overrides a component's
 * own defaults instead of racing them on source order.
 */
export function cx(...args: ClassValue[]) {
  return twMerge(clsx(...args));
}

export type { ClassValue };
