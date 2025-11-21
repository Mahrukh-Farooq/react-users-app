import "./App.css";
import Counter from "./Counter.jsx";
import AdhkarList from "./AdhkarList.jsx";
import ItemList from "./components/ItemList.jsx";

function App() {
  return (
    <>
      <h1
        style={{ color: "purple" }}
        className="page-title"
      >
        My Islamic App
      </h1>
      
      {/* CRUD Interface Section */}
      <ItemList />

      {/* Your existing prayer time containers */}
      <div className="container-wrapper">
        <div className="container container1">
          <h2 style={{ color: "purple" }}>Fajr</h2>
          <Counter />
          <AdhkarList />
        </div>

        <div className="container container2">
          <h2 style={{ color: "purple" }}>Dhuhr</h2>
          <Counter />
          <AdhkarList />
        </div>

        <div className="container container3">
          <h2 style={{ color: "purple" }}>Asr</h2>
          <Counter />
          <AdhkarList />
        </div>

        <div className="container container4">
          <h2 style={{ color: "purple" }}>Maghrib</h2>
          <Counter />
          <AdhkarList />
        </div>

        <div className="container container5">
          <h2 style={{ color: "purple" }}>Isha</h2>
          <Counter />
          <AdhkarList />
        </div>
      </div>
    </>
  );
}

export default App;
