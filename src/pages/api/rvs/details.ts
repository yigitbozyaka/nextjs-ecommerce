import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prismadb";
import { applyRateLimit } from '../../../middlewares/rateLimit';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET")
  {
    const slug = req.query.slug as string;
    const rv = await prisma.rV.findUnique({
        where: {
            slug: slug,
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
          imgCount: true,
          exteriorColour: true,
          description1: true,
          description2: true,
          description3: true,
          description4: true,
          createdAt: true,
        },
      });
      
      await applyRateLimit(req, res, () => {
        res.status(200).json({ data: rv });
      });
  }
}
