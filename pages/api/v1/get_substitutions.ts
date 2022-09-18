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
      process.env.NEXT_PUBLIC_STAGE,
      process.env.AWS_REGION,
      process.env.AWS_ACCESS_KEY_ID,
      process.env.AWS_SECRET_ACCESS_KEY,
      process.env.AWS_DYNAMODB_TABLE,
      process.env.ADMIN_LOGIN_EMAIL,
      process.env.ADMIN_LOGIN_PASSWORD,
      process.env.ADMIN_LOGIN_TOKEN,
      process.env.SENTRY_IGNORE_API_RESOLUTION_ERROR,
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
