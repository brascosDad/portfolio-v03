import type { CSSProperties, ReactNode } from "react";

const DARK = "#2C2C2A";
const BUTTON_BG = "#696969";
const FIELD_BORDER = "#B4B2A9";
const MUTED = "#888780";

const fontStack: CSSProperties = { fontFamily: "var(--font-roboto)" };

function StatusBar() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "6px 12px 4px",
        fontSize: "8px",
        color: DARK,
        opacity: 0.5,
      }}
    >
      <span style={{ fontWeight: 500 }}>9:41</span>
      <svg width="14" height="7" viewBox="0 0 14 7" fill="none" aria-hidden>
        <rect x="0.5" y="0.5" width="11" height="6" rx="1.2" stroke={DARK} strokeWidth="0.8" />
        <rect x="2" y="2" width="8" height="3" fill={DARK} />
        <rect x="12.2" y="2.5" width="1.2" height="2" rx="0.3" fill={DARK} />
      </svg>
    </div>
  );
}

function ScreenHeader({ title, subtext }: { title: string; subtext: string }) {
  return (
    <div style={{ marginBottom: "10px" }}>
      <div style={{ fontSize: "11px", fontWeight: 500, color: DARK, marginBottom: "3px" }}>{title}</div>
      <div style={{ fontSize: "9px", color: MUTED, lineHeight: 1.35 }}>{subtext}</div>
    </div>
  );
}

function FieldLabel({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        fontSize: "8px",
        textTransform: "uppercase",
        letterSpacing: "0.04em",
        color: MUTED,
        marginBottom: "3px",
      }}
    >
      {children}
    </div>
  );
}

function InputField({ label, value, placeholder }: { label: string; value?: string; placeholder?: string }) {
  return (
    <div style={{ marginBottom: "7px" }}>
      <FieldLabel>{label}</FieldLabel>
      <div
        style={{
          border: `1px solid ${FIELD_BORDER}`,
          borderRadius: "4px",
          padding: "5px 7px",
          fontSize: "9px",
          color: value ? DARK : MUTED,
          minHeight: "18px",
          display: "flex",
          alignItems: "center",
        }}
      >
        {value ?? placeholder ?? ""}
      </div>
    </div>
  );
}

function TextareaField({ label, placeholder }: { label: string; placeholder: string }) {
  return (
    <div style={{ marginBottom: "7px" }}>
      <FieldLabel>{label}</FieldLabel>
      <div
        style={{
          border: `1px solid ${FIELD_BORDER}`,
          borderRadius: "4px",
          padding: "5px 7px",
          fontSize: "9px",
          color: MUTED,
          minHeight: "32px",
          lineHeight: 1.4,
        }}
      >
        {placeholder}
      </div>
    </div>
  );
}

function PrimaryButton({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        background: BUTTON_BG,
        color: "white",
        fontSize: "9px",
        fontWeight: 500,
        padding: "7px 0",
        borderRadius: "5px",
        textAlign: "center",
        marginTop: "4px",
      }}
    >
      {children}
    </div>
  );
}

function ProgressDots({ total, filled }: { total: number; filled: number }) {
  return (
    <div style={{ display: "flex", gap: "4px", justifyContent: "flex-start", marginBottom: "10px" }}>
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          style={{
            width: "5px",
            height: "5px",
            borderRadius: "50%",
            background: i < filled ? DARK : FIELD_BORDER,
          }}
        />
      ))}
    </div>
  );
}

function Checkbox({ label, checked, muted }: { label: string; checked?: boolean; muted?: boolean }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "6px",
        padding: "4px 0",
        fontSize: "9px",
        color: muted ? MUTED : DARK,
        fontStyle: muted ? "italic" : "normal",
      }}
    >
      {!muted && (
        <div
          style={{
            width: "10px",
            height: "10px",
            border: `1px solid ${checked ? DARK : FIELD_BORDER}`,
            borderRadius: "2px",
            background: checked ? DARK : "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          {checked && (
            <svg width="6" height="6" viewBox="0 0 6 6" fill="none" aria-hidden>
              <path d="M1 3L2.5 4.5L5 1.5" stroke="white" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </div>
      )}
      <span style={{ marginLeft: muted ? "16px" : 0 }}>{label}</span>
    </div>
  );
}

function NavBar() {
  const items = ["Home", "Search", "Saved", "Profile"];
  return (
    <div
      style={{
        borderTop: `1px solid ${FIELD_BORDER}`,
        display: "flex",
        padding: "6px 0",
        marginTop: "10px",
      }}
    >
      {items.map((item, i) => (
        <div
          key={item}
          style={{
            flex: 1,
            textAlign: "center",
            fontSize: "7px",
            color: i === 0 ? DARK : MUTED,
            fontWeight: i === 0 ? 500 : 400,
            textTransform: "uppercase",
            letterSpacing: "0.04em",
          }}
        >
          {item}
        </div>
      ))}
    </div>
  );
}

function JobResults() {
  const jobs = [
    { title: "Electrician", company: "Reliable Heating & Air" },
    { title: "HVAC Technician", company: "Cool Air Solutions" },
    { title: "General Laborer", company: "Apex Contracting" },
  ];
  return (
    <>
      {jobs.map((job) => (
        <div
          key={job.title}
          style={{
            border: `1px solid ${FIELD_BORDER}`,
            borderRadius: "5px",
            padding: "7px 8px",
            marginBottom: "6px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "6px",
          }}
        >
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: "9px", fontWeight: 500, color: DARK, lineHeight: 1.2 }}>{job.title}</div>
            <div
              style={{
                fontSize: "8px",
                color: MUTED,
                lineHeight: 1.3,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {job.company}
            </div>
          </div>
          <div
            style={{
              fontSize: "8px",
              border: `1px solid ${DARK}`,
              color: DARK,
              borderRadius: "3px",
              padding: "3px 7px",
              flexShrink: 0,
            }}
          >
            View
          </div>
        </div>
      ))}
    </>
  );
}

function Phone({ children }: { children: ReactNode }) {
  return (
    <div
      className="w-full"
      style={{
        maxWidth: "220px",
        border: `1.5px solid ${DARK}`,
        borderRadius: "16px",
        background: "white",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <StatusBar />
      <div style={{ padding: "6px 12px 10px", display: "flex", flexDirection: "column", flex: 1 }}>{children}</div>
    </div>
  );
}

function FlowArrow() {
  return (
    <div
      className="flex items-center justify-center"
      style={{ color: MUTED, fontSize: "14px", padding: "4px 0", lineHeight: 1 }}
      aria-hidden
    >
      <span className="md:hidden">↓</span>
      <span className="hidden md:inline">→</span>
    </div>
  );
}

function ScreenCounter({ children }: { children: ReactNode }) {
  return (
    <div style={{ fontSize: "9px", color: MUTED, textAlign: "center", marginTop: "6px" }}>{children}</div>
  );
}

function ColumnLabel({ title, descriptor }: { title: string; descriptor: string }) {
  return (
    <div style={{ marginBottom: "16px" }}>
      <div style={{ fontSize: "12px", fontWeight: 500, color: DARK, marginBottom: "3px" }}>{title}</div>
      <div style={{ fontSize: "11px", color: MUTED, lineHeight: 1.4 }}>{descriptor}</div>
    </div>
  );
}

function Caption({ children }: { children: ReactNode }) {
  return (
    <p style={{ fontSize: "11px", color: MUTED, lineHeight: 1.5, marginTop: "14px", maxWidth: "260px" }}>{children}</p>
  );
}

function PhoneWithCounter({ counter, children }: { counter: string; children: ReactNode }) {
  return (
    <div className="flex flex-col items-center w-full max-w-[220px] md:flex-1 md:basis-0 md:min-w-0">
      <Phone>{children}</Phone>
      <ScreenCounter>{counter}</ScreenCounter>
    </div>
  );
}

function SharedJobsScreen({ withProgressDots }: { withProgressDots?: { total: number; filled: number } }) {
  return (
    <>
      {withProgressDots && <ProgressDots total={withProgressDots.total} filled={withProgressDots.filled} />}
      <ScreenHeader title="Jobs near you" subtext="Marietta, GA" />
      <JobResults />
      <NavBar />
    </>
  );
}

export function OnboardingWireframes() {
  return (
    <section style={{ margin: "2.5rem 0", ...fontStack }} className="lg:pb-32">
      <div className="lg:scale-[1.1] lg:origin-top-left">
        <div
          style={{
            fontSize: "11px",
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            color: MUTED,
            marginBottom: "24px",
          }}
        >
          Early competing prototypes — onboarding flow
        </div>

        <div className="flex flex-col gap-12">
        {/* Proto A — Ultra-short */}
        <div>
          <ColumnLabel title="A — Ultra-short" descriptor="One screen to collect everything. Fastest path to jobs." />

          <div className="flex flex-col items-center gap-1 md:flex-row md:items-center md:justify-start md:gap-2 md:gap-x-3">
            <PhoneWithCounter counter="Screen 1 of 2">
              <ScreenHeader title="Get started" subtext="Tell us a bit about yourself." />
              <InputField label="Email" placeholder="you@example.com" />
              <InputField label="Password" placeholder="••••••••" />
              <TextareaField label="What are you good at?" placeholder="e.g. electrical wiring, HVAC install..." />
              <InputField label="Where are you based?" value="Marietta, GA" />
              <PrimaryButton>Find jobs →</PrimaryButton>
            </PhoneWithCounter>

            <FlowArrow />

            <PhoneWithCounter counter="Screen 2 of 2 — shared">
              <SharedJobsScreen />
            </PhoneWithCounter>
          </div>

          <Caption>
            <span style={{ display: "block" }}>
              <strong>Risk:</strong> results may feel generic without detailed profile data.
            </span>
            <span style={{ display: "block", marginTop: "8px" }}>
              <strong>Benefit:</strong> near-zero drop-off before the candidate sees value.
            </span>
          </Caption>
        </div>

        {/* Proto B — Standard */}
        <div>
          <ColumnLabel title="B — Standard" descriptor="Four focused screens. Builds a stronger profile before results." />

          <div className="flex flex-col items-center gap-1 md:flex-row md:items-center md:justify-start md:gap-2 md:gap-x-3">
            <PhoneWithCounter counter="Screen 1 of 4">
              <ProgressDots total={4} filled={1} />
              <ScreenHeader title="Create your account" subtext="Step 1 of 3 before you see jobs." />
              <InputField label="Email" placeholder="you@example.com" />
              <InputField label="Password" placeholder="••••••••" />
              <PrimaryButton>Next</PrimaryButton>
            </PhoneWithCounter>

            <FlowArrow />

            <PhoneWithCounter counter="Screen 2 of 4">
              <ProgressDots total={4} filled={2} />
              <ScreenHeader title="What's your trade?" subtext="Select all that apply." />
              <Checkbox label="Electrician" checked />
              <Checkbox label="Plumber" />
              <Checkbox label="HVAC" />
              <Checkbox label="Carpentry" />
              <Checkbox label="General Labor" />
              <Checkbox label="+ 18 more" muted />
              <PrimaryButton>Next</PrimaryButton>
            </PhoneWithCounter>

            <FlowArrow />

            <PhoneWithCounter counter="Screen 3 of 4">
              <ProgressDots total={4} filled={3} />
              <ScreenHeader title="Tell us about your electrical work" subtext="Helps match you to the right jobs." />
              <InputField label="Years of experience" value="8 years" />
              <TextareaField label="What are you best at?" placeholder="e.g. commercial wiring, panel installs..." />
              <TextareaField label="What sets you apart?" placeholder="e.g. licensed in GA and TN..." />
              <PrimaryButton>Next</PrimaryButton>
            </PhoneWithCounter>

            <FlowArrow />

            <PhoneWithCounter counter="Screen 4 of 4 — shared">
              <SharedJobsScreen withProgressDots={{ total: 4, filled: 4 }} />
            </PhoneWithCounter>
          </div>

          <Caption>
            <span style={{ display: "block" }}>
              <strong>Risk:</strong> higher drop-off before results.
            </span>
            <span style={{ display: "block", marginTop: "8px" }}>
              <strong>Benefit:</strong> richer profile from day one, better job matching quality.
            </span>
          </Caption>
        </div>
      </div>
        <p
          style={{
            fontSize: "11px",
            color: MUTED,
            lineHeight: 1.5,
            marginTop: "32px",
            fontStyle: "italic",
          }}
        >
          Competing prototype pairs were also developed and tested for profile building and job application. Details available on request.
        </p>
      </div>
    </section>
  );
}
