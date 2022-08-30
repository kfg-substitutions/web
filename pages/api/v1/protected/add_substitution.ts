import type { NextApiRequest, NextApiResponse } from "next";
import { withSentry } from "@sentry/nextjs";
import { substitutions } from "util/substitutions";
import ERROR_CODES from "util/errorCodes";
import { Substitution } from "types";

type ResponseData = {
  success: boolean;
  message?: string;
  error?: string;
};

function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  if (req.method !== "POST")
    return res.status(405).json({
      success: false,
      error: ERROR_CODES.WRONG_METHOD,
    });

  if (!req.body.substitution)
    return res.status(400).json({
      success: false,
      error: ERROR_CODES.MISSING_ARGUMENTS,
    });

  const substitution = req.body.substitution as Substitution;

  substitutions.add(substitution, (result) => {
    res.status(200).json(result);
  });
}

// supress "stalled requests" error
export const config = {
  api: {
    externalResolver: true,
  },
};

export default withSentry(handler);
