import { Outlet, createFileRoute } from "@tanstack/react-router";

// Layout route for the Roadmap section. Home lives at _app.roadmap.index.tsx;
// nested track routes render here.
export const Route = createFileRoute("/_app/roadmap")({
  component: () => <Outlet />,
});
