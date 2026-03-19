import { clsx } from "clsx";

interface PlaceholderImageProps {
  label?: string;
  aspect?: "video" | "square" | "wide";
  className?: string;
}

export function PlaceholderImage({
  label = "Image",
  aspect = "video",
  className,
}: PlaceholderImageProps) {
  return (
    <div
      className={clsx(
        "flex items-center justify-center rounded-lg bg-border text-text-muted text-sm",
        aspect === "video" && "aspect-video",
        aspect === "square" && "aspect-square",
        aspect === "wide" && "aspect-[2/1]",
        className
      )}
    >
      {label}
    </div>
  );
}
