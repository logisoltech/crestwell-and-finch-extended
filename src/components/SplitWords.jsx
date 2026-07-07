export default function SplitWords({ text, wordClass = "gsap-word" }) {
  return text.split(/(\s+)/).map((part, index) => {
    if (/^\s+$/.test(part)) {
      return part;
    }

    return (
      <span
        key={`${part}-${index}`}
        className="gsap-word-wrap"
        style={{
          display: "inline-block",
          overflow: "hidden",
          verticalAlign: "top",
        }}
      >
        <span
          className={wordClass}
          style={{ display: "inline-block", willChange: "transform, opacity" }}
        >
          {part}
        </span>
      </span>
    );
  });
}
