import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from "../../../libs/prismadb";

interface RV {
  price: number;
  year: number;
  make: string;
  model: string;
  type: string;
  status: string;
  length: string;
  fuelType: string;
  odometer: number;
  weight: number;
  sleeps: number;
  slideOuts: number;
  vin: string;
  imgCount: number;
  exteriorColour: string;
  description1: string;
  description2: string;
  description3: string;
  description4: string;
}

type Data = {
  success: boolean;
  message: string;
  id?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "POST") {
    res.status(405).json({ success: false, message: "Method not allowed!" });
  }

  if (req.method === "POST") {
    const {
      price,
      year,
      make,
      model,
      type,
      status,
      length,
      fuelType,
      odometer,
      weight,
      sleeps,
      slideOuts,
      vin,
      imgCount,
      exteriorColour,
      description1,
      description2,
      description3,
      description4
    } = req.body as RV;

    const response = await prisma.rV.create({
        data: {
            price,
            year,
            make,
            model,
            type,
            status,
            length,
            fuelType,
            odometer,
            weight,
            sleeps,
            slideOuts,
            vin,
            imgCount,
            exteriorColour,
            description1,
            description2,
            description3,
            description4,
            slug: make.toLowerCase().replaceAll(' ', '-') + "-" + model.toLowerCase().replaceAll(' ', '-'),
        },
    })

    const id = response.id;

    res.status(200).json({ success: true, message: "RV created successfully!", id: id });

  }
}
