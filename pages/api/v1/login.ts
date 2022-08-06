import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  success: boolean;
  error?: string;
  token?: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  res.status(200).json({ success: true, token: "123123123" });
}
