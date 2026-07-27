import { Outlet, createFileRoute } from "@tanstack/react-router";

// Layout route for the Python track. The track home lives in
// _app.learning.python.index.tsx; module routes render through this outlet.
export const Route = createFileRoute("/_app/learning/python")({
  component: () => <Outlet />,
});
