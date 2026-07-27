import { ResourcePanel } from "@/features/learning/components";
import { pythonResources } from "@/config/python";

export function PythonResourcePanel() {
  return <ResourcePanel resources={pythonResources} />;
}
