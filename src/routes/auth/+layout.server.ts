import type { LayoutServerLoad } from "./$types";

export const load:LayoutServerLoad = async ({ locals, parent }) => {
   const parentData = await parent();
   console.log("Layout Server Load - Parent Data:", parentData);
}