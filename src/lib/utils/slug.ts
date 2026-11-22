/**
 * Generates a URL-friendly slug from a string.
 * - Converts to lowercase
 * - Replaces spaces and special characters with hyphens
 * - Removes consecutive hyphens
 * - Trims hyphens from start and end
 */
export function generateSlug(text: string): string {
	return (
		text
			.toLowerCase()
			.trim()
			// Replace special characters and spaces with hyphens
			.replace(/[^\w\s-]/g, "")
			.replace(/[\s_]+/g, "-")
			// Remove consecutive hyphens
			.replace(/-+/g, "-")
			// Trim hyphens from start and end
			.replace(/^-+|-+$/g, "")
	);
}

/**
 * Generates a unique slug by appending a random suffix.
 * Useful when slug uniqueness needs to be guaranteed.
 */
export function generateUniqueSlug(text: string): string {
	const baseSlug = generateSlug(text);
	const suffix = Math.random().toString(36).substring(2, 8);
	return `${baseSlug}-${suffix}`;
}
