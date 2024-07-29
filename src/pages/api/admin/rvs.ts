import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from "@/libs/prismadb";
import { applyRateLimit } from '../../../middlewares/rateLimit';

interface RV {
  id: string;
  price?: number;
  year?: number;
  make?: string;
  model?: string;
  type?: string;
  status?: string;
  length?: string;
  fuelType?: string;
  odometer?: number;
  weight?: number;
  sleeps?: number;
  slideOuts?: number;
  vin?: string;
  imgCount?: number;
  exteriorColour?: string;
  description1?: string | null;
  description2?: string | null;
  description3?: string | null;
  description4?: string | null;
  createdAt?: Date;
}

type Data = {
  success: boolean;
  data: RV[] | RV | string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "GET") {
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
        imgCount: true,
        exteriorColour: true,
        description1: true,
        description2: true,
        description3: true,
        description4: true,
        createdAt: true,
      },
    });
    res.status(200).json({ success: true, data: rvs });
  }

  if (req.method === "POST")
  {
    const { id, price, year, make, model, type, status, length, fuelType, odometer, weight, sleeps, slideOuts, vin, imgCount, exteriorColour, description1, description2, description3, description4 } = req.body as RV;
    
    const rv = await prisma.rV.findUnique({
      where: {
        id: id,
      },
    })

    if (rv) {
      const updatedRV = await prisma.rV.update({
        where: {
          id: id,
        },
        data: {
          price: price,
          year: year,
          make: make,
          model: model,
          type: type,
          status: status,
          length: length,
          fuelType: fuelType,
          odometer: odometer,
          weight: weight,
          sleeps: sleeps,
          slideOuts: slideOuts,
          vin: vin,
          imgCount: imgCount,
          exteriorColour: exteriorColour,
          description1: description1,
          description2: description2,
          description3: description3,
          description4: description4,
        },
      });
      await applyRateLimit(req, res, () => {
        res.status(200).json({ success: true, data: updatedRV });
      });
    } else {
      await applyRateLimit(req, res, () => {
        res.status(400).json({ success: false, data: "RV not found" });
      });
    }

  }

  if (req.method === "DELETE"){
    const { id } = req.body as RV;
    const rv = await prisma.rV.findUnique({
      where: {
        id: id,
      },
    })

    if (rv) {
      const deletedRV = await prisma.rV.delete({
        where: {
          id: id,
        },
      });
      await applyRateLimit(req, res, () => {
        res.status(200).json({ success: true, data: deletedRV });
      });
    } else {
      await applyRateLimit(req, res, () => {
        res.status(400).json({ success: false, data: "RV not found" });
      });
    }
  }
}
