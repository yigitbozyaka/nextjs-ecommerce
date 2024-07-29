import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from "@/libs/prismadb";
import { applyRateLimit } from '../../../middlewares/rateLimit';

type Data = {
  success: boolean;
  data: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "GET") {
    const rvs = await prisma.featuredRVs.findMany({
      select: {
        id: true,
        rvId: true,
      },
    });
    res.status(200).json({ success: true, data: rvs as any });
  }

  if (req.method === "POST") {
    const { id, newId } = req.body;
    const rv = await prisma.featuredRVs.findUnique({
      where: {
        id: id,
      },
    });

    try {
      if (rv) {
        await prisma.featuredRVs.update({
          where: {
            id: id,
          },
          data: {
            rvId: newId,
          },
        });
        await applyRateLimit(req, res, () => {
          res
            .status(200)
            .json({ success: true, data: "Featured Rv updated successfully!" });
        });
      } else {

        await prisma.featuredRVs.create({
          data: {
            rv: {
              connect: {
                id: id,
              },
            },
          },
        });

        await applyRateLimit(req, res, () => {
          res.status(200).json({ success: true, data: "Featured Heavy created successfully!" });
        });
      }
    } catch (err) {
      console.error(err);
      await applyRateLimit(req, res, () => {
        res.status(500).json({ success: false, data: "Internal Server Error" });
      });
    }
  }
}
