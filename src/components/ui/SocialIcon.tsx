import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import type { Social } from "@/content/site";

export function SocialIcon({ label }: { label: Social["label"] }) {
  if (label === "GitHub") return <FaGithub aria-hidden />;
  if (label === "LinkedIn") return <FaLinkedin aria-hidden />;
  return <FaXTwitter aria-hidden />;
}
