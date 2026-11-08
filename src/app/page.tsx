import { redirect } from "next/navigation";

// The dev server uses locale prefixes. In the static export, postbuild
// replaces this entry with the complete English homepage from out/en/.
export default function IndexPage() {
  redirect("/en/");
}
