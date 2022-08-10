import type { NextApiRequest, NextApiResponse } from "next";
import { todaySubstitutions, tomorrowSubstitutions } from "util/substitutions";
import { Substitution } from "types";

type ResponseData = {
  success: boolean;
  error?: string;
  token?: string;
  todaySubstitutions?: Substitution[];
  tomorrowSubstitutions?: Substitution[];
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  res.status(200).json({
    success: true,
    todaySubstitutions: todaySubstitutions.get(),
    tomorrowSubstitutions: tomorrowSubstitutions.get(),
  });
}
