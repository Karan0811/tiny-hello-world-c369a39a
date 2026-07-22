import { Outlet, createFileRoute } from "@tanstack/react-router";

// Layout route for the Learning section. Home lives at
// _app.learning.index.tsx; nested category/module/lesson routes render here.
export const Route = createFileRoute("/_app/learning")({
  component: () => <Outlet />,
});