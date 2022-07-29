import "./App.css";
import "antd/dist/antd.css";
import PopulateTable from "./PopulateTable";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useRoutes,
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <PopulateTable />
      </Router>
    </div>
  );
}

export default App;
