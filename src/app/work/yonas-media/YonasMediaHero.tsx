"use client";

import dynamic from "next/dynamic";
import { ReelPoster } from "@/components/yonas-media/reel/ReelPoster";

const YonasPrototype = dynamic(
  () => import("@/components/yonas-media/reel").then((m) => m.YonasPrototype),
  { ssr: false, loading: () => <ReelPoster /> },
);

export function YonasMediaHero() {
  return (
    <section className="w-full max-w-[1440px] mx-auto px-10 md:px-30 lg:px-60 pt-[60px] md:pt-[90px] lg:pt-[100px]">
      <div
        className="overflow-hidden"
        style={{
          border: "15px solid #8a8a8c",
          background: "#8a8a8c",
          borderRadius: 20,
        }}
      >
        <YonasPrototype />
      </div>
    </section>
  );
}
