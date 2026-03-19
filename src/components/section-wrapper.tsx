import { clsx } from "clsx";

interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export function SectionWrapper({ children, className, id }: SectionWrapperProps) {
  return (
    <section id={id} className={clsx("mx-auto max-w-6xl px-6 py-16 md:py-24", className)}>
      {children}
    </section>
  );
}
