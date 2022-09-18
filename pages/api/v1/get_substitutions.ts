import type { NextApiRequest, NextApiResponse } from "next";
import { withSentry } from "@sentry/nextjs";
import { substitutions } from "util/substitutions";
import { APICallResponse, Substitution, Day } from "types";

type ResponseData = {
  success: boolean;
  error?: string;
  todaySubstitutions?: Substitution[];
  tomorrowSubstitutions?: Substitution[];
};

export default withSentry(function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  return res.status(200).json({
    success: true,
    info: [
      process.env.APP_NEXT_PUBLIC_APP_STAGE,
      process.env.VERCEL_URL,
      process.env.APP_NEXT_PUBLIC_APP_STAGE == "LIVE"
        ? "https://" + process.env.VERCEL_URL + "/api/v1"
        : "http://localhost:3000/api/v1",
    ],
  });

  return substitutions.get((allSubstitutions: APICallResponse) => {
    if (!allSubstitutions.success)
      return res.status(200).json({
        success: true,
        error: allSubstitutions.error,
      });

    const todaySubstitutions = (
      (allSubstitutions.message as Substitution[]) || []
    )?.filter((substitution) => substitution.day === Day.Today);
    const tomorrowSubstitutions = (
      (allSubstitutions.message as Substitution[]) || []
    )?.filter((substitution) => substitution.day === Day.Tomorrow);

    return res.status(200).json({
      success: true,
      todaySubstitutions,
      tomorrowSubstitutions,
    });
  });
});

// supress "stalled requests" error
export const config = {
  api: {
    externalResolver: true,
  },
};
