const bars = Array(12).fill(0);

export function Spinner({
  color = "rgba(255, 255, 255, 0.65)",
  size = 16,
}: Readonly<{
  color?: string;
  size?: number;
}>) {
  return (
    <div
      className="wrapper"
      style={
        {
          ["--spinner-size"]: `${size}px`,
          ["--spinner-color"]: color,
        } as React.CSSProperties
      }
    >
      <div className="spinner">
        {bars.map((_, i) => (
          <div className="bar" key={`spinner-bar-${i}`} />
        ))}
      </div>
    </div>
  );
}
