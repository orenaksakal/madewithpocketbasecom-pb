import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { siteConfig } from "@/lib/config";
import { submitSite } from "@/lib/pocketbase";
import { seo } from "@/lib/seo";
import { generateUniqueSlug } from "@/lib/utils/slug";

const submitSchema = z.object({
	name: z
		.string()
		.min(2, "Project name must be at least 2 characters")
		.max(100, "Project name must be under 100 characters"),
	url: z.string().url("Enter a valid URL (e.g., https://example.com)"),
	tagline: z
		.string()
		.max(200, "Tagline must be under 200 characters")
		.optional(),
	description: z
		.string()
		.min(20, "Tell us a bit more (at least 20 characters)")
		.max(1000, "Description must be under 1000 characters"),
	category: z
		.string()
		.max(100, "Category must be under 100 characters")
		.optional(),
	tags: z.string().max(300, "Tags must be under 300 characters").optional(),
	techStack: z
		.string()
		.max(200, "Tech stack must be under 200 characters")
		.optional(),
	github: z
		.string()
		.url("Enter a valid GitHub URL")
		.optional()
		.or(z.literal("")),
});

type SubmitFormValues = z.infer<typeof submitSchema>;

export const Route = createFileRoute("/_marketing/submit/")({
	component: SubmitPage,
	head: () => ({
		meta: seo({
			title: `Add Your Project | ${siteConfig.name}`,
			description:
				"Share your PocketBase project with the community. Add your website, app, or tool to our curated collection.",
			keywords:
				"submit project, pocketbase showcase, share project, pocketbase examples",
			url: "https://www.madewithpocketbase.com/submit",
		}),
		links: [
			{
				rel: "canonical",
				href: "https://www.madewithpocketbase.com/submit",
			},
		],
	}),
});

function SubmitPage() {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isSubmitted, setIsSubmitted] = useState(false);

	const form = useForm<SubmitFormValues>({
		resolver: zodResolver(submitSchema),
		defaultValues: {
			name: "",
			url: "",
			tagline: "",
			description: "",
			category: "",
			tags: "",
			techStack: "",
			github: "",
		},
	});

	const onSubmit = async (data: SubmitFormValues) => {
		setIsSubmitting(true);
		try {
			const slug = generateUniqueSlug(data.name);
			await submitSite({
				name: data.name,
				slug,
				url: data.url,
				tagline: data.tagline,
				description: data.description,
				category: data.category,
				tags: data.tags,
				techStack: data.techStack,
				github: data.github || undefined,
			});
			setIsSubmitted(true);
			toast.success("Project submitted! We'll review it shortly.");
		} catch {
			toast.error("Something went wrong. Please try again.");
		} finally {
			setIsSubmitting(false);
		}
	};

	if (isSubmitted) {
		return (
			<div className="mx-auto max-w-2xl py-8">
				<div className="rounded-2xl border bg-card p-10 text-center shadow-sm">
					<div className="mb-6 flex justify-center">
						<div className="flex size-20 items-center justify-center rounded-full bg-primary/10">
							<CheckCircle2 className="size-10 text-primary" />
						</div>
					</div>
					<h1 className="mb-3 font-heading text-3xl">Project Submitted</h1>
					<p className="mb-8 text-muted-foreground text-lg">
						Thanks for sharing your project! We'll review it and add it to the
						collection once approved.
					</p>
					<Link to="/">
						<Button size="lg" className="font-medium">
							Browse Projects
						</Button>
					</Link>
				</div>
			</div>
		);
	}

	return (
		<div className="mx-auto max-w-2xl py-8">
			<div className="mb-10 text-center">
				<h1 className="font-heading text-3xl sm:text-4xl">Add Your Project</h1>
				<p className="mt-3 text-muted-foreground text-lg">
					Share what you've built with PocketBase. We'd love to feature it.
				</p>
			</div>

			<div className="rounded-2xl border bg-card p-8 shadow-sm">
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Project Name</FormLabel>
									<FormControl>
										<Input placeholder="Acme App" {...field} />
									</FormControl>
									<FormDescription>What's your project called?</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="url"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Project URL</FormLabel>
									<FormControl>
										<Input placeholder="https://acme.app" {...field} />
									</FormControl>
									<FormDescription>
										Where can people find your project?
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="description"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Description</FormLabel>
									<FormControl>
										<Textarea
											placeholder="Tell us what your project does and how it uses PocketBase..."
											className="min-h-32 resize-none"
											{...field}
										/>
									</FormControl>
									<FormDescription>
										What does your project do? How do you use PocketBase?
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="tagline"
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										Tagline{" "}
										<span className="text-muted-foreground">(optional)</span>
									</FormLabel>
									<FormControl>
										<Input
											placeholder="A short, catchy description"
											{...field}
										/>
									</FormControl>
									<FormDescription>
										A brief one-liner that captures what your project does.
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="category"
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										Category{" "}
										<span className="text-muted-foreground">(optional)</span>
									</FormLabel>
									<FormControl>
										<Input
											placeholder="SaaS, Developer Tool, E-commerce..."
											{...field}
										/>
									</FormControl>
									<FormDescription>
										What type of project is this?
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="tags"
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										Tags{" "}
										<span className="text-muted-foreground">(optional)</span>
									</FormLabel>
									<FormControl>
										<Input
											placeholder="productivity, api, dashboard"
											{...field}
										/>
									</FormControl>
									<FormDescription>
										Comma-separated keywords to help others discover your
										project.
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="techStack"
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										Tech Stack{" "}
										<span className="text-muted-foreground">(optional)</span>
									</FormLabel>
									<FormControl>
										<Input
											placeholder="React, Tailwind, PocketBase"
											{...field}
										/>
									</FormControl>
									<FormDescription>
										What technologies power your project?
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="github"
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										GitHub URL{" "}
										<span className="text-muted-foreground">(optional)</span>
									</FormLabel>
									<FormControl>
										<Input
											placeholder="https://github.com/username/repo"
											{...field}
										/>
									</FormControl>
									<FormDescription>
										Share your source code if it's open source.
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>

						<Button
							type="submit"
							size="lg"
							className="w-full font-medium"
							disabled={isSubmitting}
						>
							{isSubmitting ? (
								<>
									<Loader2 className="mr-2 size-4 animate-spin" />
									Submitting...
								</>
							) : (
								<>
									<Send className="mr-2 size-4" />
									Submit Project
								</>
							)}
						</Button>
					</form>
				</Form>
			</div>

			<div className="mt-8 rounded-xl border bg-muted/20 p-6 text-center text-sm text-muted-foreground">
				<p>
					<strong>Submission guidelines:</strong> Projects must be live, use
					PocketBase, and be appropriate for all audiences. We'll capture a
					screenshot automatically.
				</p>
			</div>
		</div>
	);
}
