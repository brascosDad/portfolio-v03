"use client";

import dynamic from "next/dynamic";
import { ReelPoster } from "@/components/yonas-media/reel/ReelPoster";

const YonasReel = dynamic(
  () => import("@/components/yonas-media/reel").then((m) => m.YonasReel),
  { ssr: false, loading: () => <ReelPoster /> },
);

export function YonasMediaHero() {
  return (
    <section className="w-full max-w-[1440px] mx-auto px-10 md:px-30 lg:px-60 pt-[60px] md:pt-[90px] lg:pt-[100px]">
      <div className="rounded-md overflow-hidden">
        <YonasReel />
      </div>
    </section>
  );
}
