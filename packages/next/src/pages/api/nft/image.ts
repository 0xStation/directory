import type { NextApiRequest, NextApiResponse } from "next";
import config from "../../../../groupos.config";

type Data =
  | {
      success: false;
      error: string;
    }
  | {
      success: true;
      imageUrl: string;
    };

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (!config.githubRepo) {
    return res
      .status(500)
      .json({ success: false, error: "Missing `githubRepo` in config" });
  }
  const fileName = req.query.fileName;
  if (!fileName) {
    return res
      .status(500)
      .json({ success: false, error: "Missing `fileName` query parameter" });
  }
  const githubUrl = `https://raw.githubusercontent.com/${config.githubRepo}/main/packages/next/public/images/${req.query.fileName}`;
  res.status(200).json({ success: true, imageUrl: githubUrl });
}
