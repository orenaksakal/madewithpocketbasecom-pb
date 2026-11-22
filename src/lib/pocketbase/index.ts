import type { ListResult } from "pocketbase";
import PocketBase from "pocketbase";
import type { SitesResponse, TypedPocketBase } from "./types";

const POCKETBASE_URL = "https://api.madewithpocketbase.com";

// Singleton for client-side auth (browser only)
export const pocketbase = new PocketBase(POCKETBASE_URL) as TypedPocketBase;

// Factory for server-side requests (Cloudflare Workers require fresh client per request)
const createPocketBase = () =>
	new PocketBase(POCKETBASE_URL) as TypedPocketBase;

// Public API functions (no authentication required)
export interface PublicSitesParams {
	page?: number;
	perPage?: number;
	search?: string;
	sort?: string;
}

export const getPublicSites = async ({
	page = 1,
	perPage = 12,
	search = "",
	sort = "-created",
}: PublicSitesParams = {}): Promise<ListResult<SitesResponse>> => {
	const pb = createPocketBase();
	const filters: string[] = ["isPublished = true"];

	if (search.trim()) {
		const escapedSearch = search.replace(/'/g, "\\'");
		filters.push(
			`(name ~ '${escapedSearch}' || tags ~ '${escapedSearch}' || description ~ '${escapedSearch}')`,
		);
	}

	const filter = filters.join(" && ");

	const records = await pb.collection("sites").getList(page, perPage, {
		sort,
		filter,
	});
	return records;
};

export const getSiteBySlug = async (
	slug: string,
): Promise<SitesResponse | null> => {
	try {
		const pb = createPocketBase();
		const records = await pb.collection("sites").getList(1, 1, {
			filter: `slug = '${slug.replace(/'/g, "\\'")}' && isPublished = true`,
		});
		return records.items[0] || null;
	} catch {
		return null;
	}
};

export const getSiteById = async (
	id: string,
): Promise<SitesResponse | null> => {
	try {
		const pb = createPocketBase();
		const records = await pb.collection("sites").getList(1, 1, {
			filter: `id = '${id.replace(/'/g, "\\'")}' && isPublished = true`,
		});
		return records.items[0] || null;
	} catch {
		return null;
	}
};

export interface SubmitSiteData {
	name: string;
	slug: string;
	url: string;
	description: string;
	tagline?: string;
	category?: string;
	tags?: string;
	techStack?: string;
	github?: string;
}

export const submitSite = async (
	data: SubmitSiteData,
): Promise<SitesResponse> => {
	const pb = createPocketBase();
	const record = await pb.collection("sites").create({
		...data,
		isPublished: false, // Submissions are pending approval
		isFeatured: false,
	});
	return record;
};
