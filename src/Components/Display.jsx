
export default function Display({ value }) {
  return (
    <div
      id="display"
      className="display bg-dark text-white px-3 py-2 text-end fs-5 rounded"
      style={{ minHeight: "3rem", lineHeight: "1.2", overflowX: "auto" }}
    >
      {value}
    </div>
  );
}
