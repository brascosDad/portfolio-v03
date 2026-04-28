"use client";

import { ApplyFlowPrototype } from "./ApplyFlowPrototype";
import { ProfileBuilderPrototype } from "./ProfileBuilderPrototype";
import { Caption } from "../caption";

export function PrototypesShowcase() {
  return (
    <div>
      <div className="flex flex-col lg:flex-row gap-[40px] lg:gap-[60px] items-start justify-center">
        <div className="flex flex-col items-center w-full max-w-[360px]">
          <ApplyFlowPrototype />
          <Caption className="mt-[12px] w-full" label="Apply flow.">
            Tested whether surfacing job recency, company research signals, and remaining openings alongside the application increased candidate confidence. Prior research showed candidates couldn&rsquo;t tell if jobs were current or already filled.
          </Caption>
        </div>
        <div className="flex flex-col items-center w-full max-w-[360px]">
          <ProfileBuilderPrototype />
          <Caption className="mt-[12px] w-full">
            AI-assisted profile builder — strongest signal of the study
          </Caption>
        </div>
      </div>
    </div>
  );
}
