import { PrismaClient } from "@prisma/client";
import { JWT_SECRET_KEY } from "../constants.js";

export default async function generateToken(user:PrismaClient){
    const token=jwt.sign(
    {
        email: user?.email,
        id: user?.id,
        name: user?.name,
        imageUrl: user?.imageUrl,
      },
      JWT_SECRET_KEY,
      { expiresIn: "7d" }
    );
    return token;
}