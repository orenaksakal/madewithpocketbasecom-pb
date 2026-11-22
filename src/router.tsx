import {
	QueryCache,
	QueryClient,
	QueryClientProvider,
} from "@tanstack/react-query";
import {
	createRouter as createTanStackRouter,
	ErrorComponent,
	type ErrorComponentProps,
	Link,
} from "@tanstack/react-router";
import { Loader } from "@/components/loader";
import { Button } from "@/components/ui/button";
import { routes } from "@/lib/config";
import { routeTree } from "@/routeTree.gen";

const NotFoundComponent = () => (
	<div className="flex min-h-screen w-full flex-col items-center justify-center gap-12 px-4">
		<h1 className="font-heading text-4xl">404</h1>
		<p className="text-center text-lg">
			The page you are looking for does not exist.
		</p>
		<Link to={routes.marketing.main}>
			<Button>Go back to home</Button>
		</Link>
	</div>
);

const CatchBoundaryComponent = ({ error }: ErrorComponentProps) => {
	console.error(error);

	return (
		<div className="flex min-h-screen w-full flex-col items-center justify-center gap-12 px-4">
			<h1 className="font-heading text-4xl">{error.name}</h1>
			<p className="text-center text-lg">{error.message}</p>

			<Link to={routes.marketing.main}>
				<Button>Go to Home</Button>
			</Link>

			<ErrorComponent error={error} />
		</div>
	);
};

export const queryClient = new QueryClient({
	queryCache: new QueryCache({
		onError: (error, query) => {
			// Only show error toasts for queries that have already been displayed
			if (query.state.data !== undefined) {
				console.error(`Query error [${query.queryKey}]:`, error);
			}
		},
	}),
	defaultOptions: {
		queries: {
			staleTime: 60 * 1000,
			retry: (failureCount, error) => {
				// Don't retry on 401/403 errors
				if (error instanceof Error && error.message.includes("401"))
					return false;
				if (error instanceof Error && error.message.includes("403"))
					return false;
				return failureCount < 3;
			},
			retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
			refetchOnWindowFocus: false,
		},
		mutations: {
			retry: 1,
		},
	},
});

export const getRouter = () => {
	const router = createTanStackRouter({
		routeTree,
		defaultPreload: "intent",
		scrollRestoration: true,
		defaultPreloadStaleTime: 0,
		defaultStructuralSharing: true,
		context: { queryClient },
		defaultErrorComponent: CatchBoundaryComponent,
		defaultPendingComponent: Loader,
		defaultNotFoundComponent: NotFoundComponent,
		Wrap: ({ children }) => (
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		),
	});
	return router;
};

declare module "@tanstack/react-router" {
	interface Register {
		router: ReturnType<typeof getRouter>;
	}
}
