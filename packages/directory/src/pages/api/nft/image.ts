import type { NextApiRequest, NextApiResponse } from "next";
import config from "../../../../groupos.config";

type Data = {
  imagePath: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const githubUrl = `https://raw.githubusercontent.com/${config.githubRepo}/main/packages/directory/public/images/${req.query.fileName}.png`;
  res.status(200).json({ imagePath: githubUrl });
}
