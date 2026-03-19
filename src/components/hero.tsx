import Image from "next/image";

const photos = [
  {
    src: "/photos/ErnInProof.png",
    alt: "Ernest woodworking",
    style: { left: "50%", top: "135px", width: "168px", height: "168px", transform: "translateX(calc(-50% - 35px)) rotate(3deg)" },
  },
  {
    src: "/photos/RowingErn.png",
    alt: "Ernest rowing",
    style: { left: "60px", top: "257px", width: "120px", height: "120px", transform: "rotate(-4deg)" },
  },
  {
    src: "/photos/SingingErn.png",
    alt: "Ernest at a concert",
    style: { right: "60px", top: "345px", width: "96px", height: "96px", transform: "rotate(2deg)" },
  },
];

export function Hero() {
  return (
    <section
      className="relative w-full overflow-hidden bg-bg-primary"
      style={{ height: "600px" }}
    >
      {/* Background words */}
      <div
        className="absolute inset-0"
        style={{ paddingLeft: "60px", paddingRight: "60px" }}
      >
        {/* Row 1 */}
        <span
          className="absolute font-heading font-black select-none"
          style={{
            fontSize: "120px",
            lineHeight: 0.72,
            color: "#737373",
            opacity: 0.6,
            letterSpacing: "-0.02em",
            textBoxTrim: "both",
            textBoxEdge: "cap alphabetic",
            left: "60px",
            top: "193px",
          }}
        >
          Innovator
        </span>
        <span
          className="absolute font-heading font-black select-none"
          style={{
            fontSize: "120px",
            lineHeight: 0.72,
            color: "#737373",
            opacity: 0.6,
            letterSpacing: "-0.02em",
            textBoxTrim: "both",
            textBoxEdge: "cap alphabetic",
            right: "60px",
            top: "193px",
          }}
        >
          Researcher
        </span>

        {/* Row 2 */}
        <span
          className="absolute font-heading font-black select-none"
          style={{
            fontSize: "120px",
            lineHeight: 0.72,
            color: "#737373",
            opacity: 0.6,
            letterSpacing: "-0.02em",
            textBoxTrim: "both",
            textBoxEdge: "cap alphabetic",
            left: "170px",
            top: "265px",
          }}
        >
          Strategist
        </span>
        <span
          className="absolute font-heading font-black select-none"
          style={{
            fontSize: "120px",
            lineHeight: 0.72,
            color: "#737373",
            opacity: 0.6,
            letterSpacing: "-0.02em",
            textBoxTrim: "both",
            textBoxEdge: "cap alphabetic",
            right: "60px",
            top: "265px",
          }}
        >
          Designer
        </span>

        {/* Row 3 */}
        <span
          className="absolute font-heading font-black select-none"
          style={{
            fontSize: "120px",
            lineHeight: 0.72,
            color: "#737373",
            opacity: 0.6,
            letterSpacing: "-0.02em",
            textBoxTrim: "both",
            textBoxEdge: "cap alphabetic",
            left: "60px",
            top: "337px",
          }}
        >
          Builder
        </span>
        <span
          className="absolute font-heading font-black select-none"
          style={{
            fontSize: "120px",
            lineHeight: 0.72,
            color: "#737373",
            opacity: 0.6,
            letterSpacing: "-0.02em",
            textBoxTrim: "both",
            textBoxEdge: "cap alphabetic",
            right: "140px",
            top: "337px",
          }}
        >
          Collaborator
        </span>
      </div>

      {/* Photos */}
      {photos.map((photo) => (
        <div
          key={photo.src}
          className="absolute"
          style={photo.style}
        >
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            className="object-contain"
            sizes="300px"
          />
        </div>
      ))}

      {/* Bottom info bar */}
      <div
        className="absolute flex items-end justify-between"
        style={{
          left: "66px",
          width: "80%",
          top: "407px",
        }}
      >
        <span className="font-sans text-[20px] font-semibold text-text-primary" style={{ lineHeight: 0.72, textBoxTrim: "both", textBoxEdge: "cap alphabetic" }}>
          Ernest Son
        </span>
        <span className="font-sans text-[20px] font-semibold text-text-primary" style={{ lineHeight: 0.72, textBoxTrim: "both", textBoxEdge: "cap alphabetic" }}>
          Lead Designer
        </span>
        <span className="font-sans text-[20px] font-semibold text-text-primary" style={{ lineHeight: 0.72, textBoxTrim: "both", textBoxEdge: "cap alphabetic" }}>
          Atlanta, GA
        </span>
      </div>
    </section>
  );
}
