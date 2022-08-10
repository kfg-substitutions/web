import type { NextApiRequest, NextApiResponse } from "next";
import { todaySubstitutions, tomorrowSubstitutions } from "util/substitutions";
import { Day } from "types";
import ERROR_CODES from "util/errorCodes";

type ResponseData = {
  success: boolean;
  message?: string;
  error?: string;
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

  if (!req.body.day || !req.body.id)
    return res.status(400).json({
      success: false,
      error: ERROR_CODES.MISSING_ARGUMENTS,
    });

  const day = req.body.day as Day;
  const id = req.body.id as number;

  const result =
    day === "today"
      ? todaySubstitutions.remove(id)
      : tomorrowSubstitutions.remove(id);

  res.status(200).json(result);
}
