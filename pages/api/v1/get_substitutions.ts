import type { NextApiRequest, NextApiResponse } from "next";
import { withSentry } from "@sentry/nextjs";
import { substitutions } from "util/substitutions";
import { Substitution, Day } from "types";

type ResponseData = {
  success: boolean;
  error?: string;
  todaySubstitutions?: Substitution[];
  tomorrowSubstitutions?: Substitution[];
};

export default withSentry(function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  return substitutions.get((allSubstitutions) => {
    const todaySubstitutions = (
      allSubstitutions as unknown as Substitution[]
    ).filter((substitution) => substitution.day === Day.Today);
    const tomorrowSubstitutions = (
      allSubstitutions as unknown as Substitution[]
    ).filter((substitution) => substitution.day === Day.Tomorrow);

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
