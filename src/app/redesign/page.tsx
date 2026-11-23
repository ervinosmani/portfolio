import { permanentRedirect } from "next/navigation";

/**
 * The former editorial preview is no longer a separate public experience.
 * Keep existing inbound links working by sending visitors to the canonical homepage.
 */
export default function LegacyRedesignPage() {
  permanentRedirect("/");
}
