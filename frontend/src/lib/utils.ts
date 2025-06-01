import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Generates initials from a given name.
 * @param {string} name - The full name from which to extract initials.
 * @returns {string} - A string containing the initials in uppercase.
 */
export function getInitials(name: string) {
  const [givenName = "", familyName = ""] = name.split(" ")
  return `${givenName.charAt(0)}${familyName.charAt(0)}`.toUpperCase()
}
