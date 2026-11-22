export const seo = ({
	title,
	description,
	keywords,
	image,
	url,
	creator = "@orenaksakal",
	type = "website",
}: {
	title: string;
	description?: string;
	image?: string;
	keywords?: string;
	url?: string;
	creator?: string;
	type?: "website" | "article";
}) => {
	const tags = [
		{ title },
		{ name: "description", content: description },
		{ name: "keywords", content: keywords },
		// Twitter Card meta tags
		{ name: "twitter:title", content: title },
		{ name: "twitter:description", content: description },
		{ name: "twitter:creator", content: creator },
		{ name: "twitter:site", content: creator },
		// Open Graph meta tags
		{ property: "og:type", content: type },
		{ property: "og:site_name", content: "Made with PocketBase" },
		{ property: "og:title", content: title },
		{ property: "og:description", content: description },
		...(url ? [{ property: "og:url", content: url }] : []),
		...(image
			? [
					{ name: "twitter:image", content: image },
					{ name: "twitter:card", content: "summary_large_image" },
					{ property: "og:image", content: image },
					{ property: "og:image:width", content: "1200" },
					{ property: "og:image:height", content: "630" },
					{ property: "og:image:alt", content: title },
				]
			: []),
	];

	return tags;
};

export const generateStructuredData = (data: object) => {
	return {
		type: "application/ld+json",
		children: JSON.stringify(data),
	};
};
