import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "right" | "center";
}

export const SectionHeading = ({
  eyebrow,
  title,
  description,
  align = "right",
}: SectionHeadingProps) => {
  return (
    <div
      className={cn(
        "space-y-3",
        align === "center" ? "mx-auto max-w-2xl text-center" : "text-right"
      )}
    >
      {eyebrow && (
        <p className="text-xs font-semibold uppercase tracking-[0.4em] text-oman-green/70">
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl font-black leading-tight text-oman-slate sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="text-base leading-relaxed text-oman-slate/70 sm:text-lg">
          {description}
        </p>
      )}
    </div>
  );
};
