import { Outlet, createFileRoute } from "@tanstack/react-router";

// Layout route for the content-driven course area.
export const Route = createFileRoute("/_app/courses")({
  component: () => <Outlet />,
});
