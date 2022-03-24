import { useState, useEffect } from "react";
import "./App.css";
import Drag from "./components/Example";
const defaultData = [
  { title: "To Do", items: ["Identify the implementation team."] },
  {
    title: "In Progress",
    items: [
      "Order the server hardware for production as well as test/quality assurance (QA).",
      "Order console machines.",
    ],
  },
  { title: "Done", items: ["Order console machines."] },
];
function App() {
  const [data, setData] = useState(defaultData);
  useEffect(() => {
    if (localStorage.getItem("List")) {
      console.log(localStorage.getItem("List"));
      setData(JSON.parse(localStorage.getItem("List")));
    } else {
      setData(defaultData);
    }
  }, [setData]);
  return (
    <div className="App">
      <Drag data={data} />
    </div>
  );
}

export default App;
