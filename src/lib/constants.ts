import { StaticImageData } from "next/image";
import pfp1 from "../../public/pfps/1.png";
import pfp2 from "../../public/pfps/2.png";
import pfp3 from "../../public/pfps/3.png";
import pfp4 from "../../public/pfps/4.png";

export const PFP_MAP = {
  0: pfp1,
  1: pfp2,
  2: pfp3,
  3: pfp4,
} as { [key: number]: StaticImageData };

export const emptyImage =
  "https://station-images.nyc3.digitaloceanspaces.com/c3e5a9f4-3ba1-4ec2-a88a-a82f54c2ef42.svg";
