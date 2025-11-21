import adhkar from "./adhkarData.js";

function AdhkarList() {
  return (
    <div>
      <h2>Daily Adhkar</h2>

      {adhkar.map((item) => (
        <p key={item.id}>{item.text}</p>
      ))}
    </div>
  );
}

export default AdhkarList;
