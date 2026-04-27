"use client";

import { ApplyFlowPrototype } from "./ApplyFlowPrototype";
import { ProfileBuilderPrototype } from "./ProfileBuilderPrototype";

export function PrototypesShowcase() {
  return (
    <div>
      <div className="flex flex-col lg:flex-row gap-[40px] lg:gap-[60px] items-start justify-center">
        <div className="flex flex-col items-center">
          <ApplyFlowPrototype />
          <p className="mt-[12px] text-[12px] md:text-[14px] lg:text-[16px] text-text-muted">Apply flow</p>
        </div>
        <div className="flex flex-col items-center">
          <ProfileBuilderPrototype />
          <p className="mt-[12px] text-[12px] md:text-[14px] lg:text-[16px] text-text-muted">AI-assisted profile builder — strongest signal of the study</p>
        </div>
      </div>
    </div>
  );
}
