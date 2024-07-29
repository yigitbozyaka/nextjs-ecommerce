import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prismadb";
import { applyRateLimit } from '../../../middlewares/rateLimit';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const rvs = await prisma.rV.findMany({
    select: {
      id: true,
      price: true,
      year: true,
      make: true,
      model: true,
      type: true,
      status: true,
      length: true,
      fuelType: true,
      odometer: true,
      weight: true,
      sleeps: true,
      slideOuts: true,
      vin: true,
      exteriorColour: true,
      slug: true,
      createdAt: true,
    },
  });
  await applyRateLimit(req, res, () => {
    res.status(200).json({ data: rvs });
  });
}
