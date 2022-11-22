import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const data = JSON.parse(req.body);

  const savedCourse = await prisma.course.create({ data });
  res.json(savedCourse);
};
