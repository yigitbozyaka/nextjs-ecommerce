import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prismadb";
import { applyRateLimit } from '../../../middlewares/rateLimit';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const featureds = await prisma.featuredRVs.findMany({
    select: {
      id: true,
      rvId: true,
    },
  });

  let iterator: number;
  const rvs: any[] = [];
  for(iterator = 0; iterator < featureds.length; iterator++) {
    const rv = await prisma.rV.findUnique({
      where: {
        id: featureds[iterator].rvId,
      },
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
      },
    });
    rvs.push(rv);
  }

  await applyRateLimit(req, res, () => {
    res.status(200).json({ data: rvs });
  });
}
