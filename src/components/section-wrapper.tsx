import { clsx } from "clsx";

interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export function SectionWrapper({ children, className, id }: SectionWrapperProps) {
  return (
    <section id={id} className={clsx("w-full max-w-[1440px] mx-auto px-10 md:px-30 lg:px-60 py-16 md:py-24", className)}>
      {children}
    </section>
  );
}
