import { Outlet, createFileRoute } from "@tanstack/react-router";

// Layout route for the Projects section. Landing lives at
// _app.projects.index.tsx; detail pages render here via nested routes.
export const Route = createFileRoute("/_app/projects")({
  component: () => <Outlet />,
});
