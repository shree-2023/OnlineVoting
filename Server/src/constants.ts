import dotenv from "dotenv";
// import ImageKit from "imagekit";
dotenv.config();

export const BASE_URL = process.env.BASE_URL as string;
export const PORT = process.env.PORT || 8000;
export const COMPLETE_URL = `${BASE_URL}:${PORT}`;
export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY as string;
export const CLIENT_URL = process.env.CLIENT_URL as string;
export const VALIDATION_MSGS = {
  NO_EMAIL: "NO EMAIL PROVIDED",
  NO_PASSWORD: "NO PASSWORD PROVIDED",
  NO_TOKEN: "NO TOKEN PROVIDED",
  NO_NAME: "NO NAME PROVIDED",
  VALIDATED: "VALIDATED",
};
export const VALIDATION_TYPES = {
  SIGNUP_REQ: "signupReq",
  LOGIN_REQ: "loginReq",
};
export const secret = new Uint8Array(Buffer.from(JWT_SECRET_KEY, "base64"));
export const CLIENT_AUTH_URL = process.env.CLIENT_AUTH_URL;
export const IMAGE_KIT_URL_ENDPOINT = process.env
  .IMAGE_KIT_URL_ENDPOINT as string;
export const IMAGE_KIT_PUBLIC_KEY = process.env.IMAGE_KIT_PUBLIC_KEY as string;
export const IMAGE_KIT_PRIVATE_KEY = process.env
  .IMAGE_KIT_PRIVATE_KEY as string;
// export const imagekit = new ImageKit({
//   urlEndpoint: IMAGE_KIT_URL_ENDPOINT,
//   publicKey: IMAGE_KIT_PUBLIC_KEY,
//   privateKey: IMAGE_KIT_PRIVATE_KEY,
// });
export const BASE_CLIENT_URL = process.env.BASE_CLIENT_URL;
export const NODE_ENV = process.env.NODE_ENV;