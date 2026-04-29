import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { PasswordGate } from "./password-gate";

export const metadata: Metadata = {
  title: "Home Depot — Full Case Study — Ernest Son",
  description: "Password-protected full case study walkthrough.",
};

async function verifyAccess() {
  const cookieStore = await cookies();
  return cookieStore.get("hd_access")?.value === "true";
}

export default async function HomeDepotFullPage() {
  const hasAccess = await verifyAccess();

  if (hasAccess) {
    return (
      <div className="w-full max-w-[1440px] mx-auto px-10 md:px-30 lg:px-60 py-[80px]">
        <h1 className="text-[20px] md:text-[22px] lg:text-[24px] font-semibold tracking-tight text-text-primary">
          Home Depot — Full Case Study
        </h1>
        <p className="mt-[16px] text-[16px] md:text-[18px] lg:text-[20px] text-text-muted leading-snug">
          Full case study content is coming soon. Check back later for the complete walkthrough including sprint findings, prototype approaches, and usability results.
        </p>
      </div>
    );
  }

  return <PasswordGate />;
}
