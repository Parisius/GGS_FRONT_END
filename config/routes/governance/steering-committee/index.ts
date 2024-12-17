import { createRoutes } from "@adebsa2401/routes-tree-builder";
export const SteeringCommitteeRoutes = createRoutes({
  index: "/dashboard/governance/steering-committee",
  archives: "/dashboard/governance/steering-committee/archives",
  session: (id) => ({
    _basePath: `/dashboard/governance/steering-committee/${id}`,
    index: "/",
  }),
});
