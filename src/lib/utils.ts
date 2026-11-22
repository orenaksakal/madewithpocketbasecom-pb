import { type ClassValue, clsx } from "clsx";
import { customAlphabet } from "nanoid";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function getInitials(name?: string, email?: string) {
	const initials = name
		? `${name?.charAt(0)}${name?.charAt(1)}`.toUpperCase()
		: null;
	const initialsFromEmail = email
		? `${email?.charAt(0)}${email?.charAt(1)}`.toUpperCase()
		: null;

	return initials ?? initialsFromEmail;
}

export const generateId = (charCount: number) => {
	return customAlphabet("0123456789abcdefghijklmnopqrstuvwxyz", charCount)();
};
