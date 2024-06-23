import { prismaSingleton } from "@repo/prisma";

export const listDevices = async (name?: string) => {
  let filter;
  if (name) {
    filter = { where: { name } };
  }
  try {
    // If no filter, we should apply some pagination, not implemented here
    const result = await prismaSingleton.devices.findMany(filter);
    return result;
  } catch (error) {
    console.log(error);
  }
};
