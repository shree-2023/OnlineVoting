import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();
prisma
  .$connect()
  .then(() => {
    console.log("connected to db");
  })
  .catch((err: any) => {
    console.log({ msg: "Error connecting to db", err });
  });