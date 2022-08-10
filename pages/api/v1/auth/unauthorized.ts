import type { NextApiRequest, NextApiResponse } from "next";
import ERROR_CODES from "util/errorCodes";

type ResponseData = {
  success: boolean;
  error: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  res.status(401).json({ success: false, error: ERROR_CODES.UNAUTHORIZED });
}
