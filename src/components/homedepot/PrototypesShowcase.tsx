"use client";

import { ApplyFlowPrototype } from "./ApplyFlowPrototype";
import { ProfileBuilderPrototype } from "./ProfileBuilderPrototype";

export function PrototypesShowcase() {
  return (
    <div>
      <p className="text-[14px] italic text-text-muted mb-[16px]">
        Tap to explore
      </p>
      <div className="flex flex-col lg:flex-row gap-[40px] lg:gap-[60px] items-start justify-center">
        <div className="flex flex-col items-center">
          <ApplyFlowPrototype />
          <p className="mt-[12px] text-[14px] text-text-muted">Apply flow</p>
        </div>
        <div className="flex flex-col items-center">
          <ProfileBuilderPrototype />
          <p className="mt-[12px] text-[14px] text-text-muted">Profile builder</p>
        </div>
      </div>
    </div>
  );
}
