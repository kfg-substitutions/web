import type { NextApiRequest, NextApiResponse } from "next";
import ERROR_CODES from "util/errorCodes";

type ResponseData = {
  success: boolean;
  error?: string;
  token?: string;
};

const LOGIN_CONFIG = {
  username: process.env.ADMIN_LOGIN_USERNAME,
  password: process.env.ADMIN_LOGIN_PASSWORD,
  token: process.env.ADMIN_LOGIN_TOKEN,
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== "POST")
    return res.status(405).json({
      success: false,
      error: ERROR_CODES.WRONG_METHOD,
    });

  if (!req.body.username || !req.body.password)
    return res.status(400).json({
      success: false,
      error: ERROR_CODES.MISSING_CREDENTIALS,
    });

  if (
    req.body.username !== LOGIN_CONFIG.username ||
    req.body.password !== LOGIN_CONFIG.password
  )
    return res.status(401).json({
      success: false,
      error: ERROR_CODES.INVALID_CREDENTIALS,
    });

  res.status(200).json({ success: true, token: LOGIN_CONFIG.token });
}
