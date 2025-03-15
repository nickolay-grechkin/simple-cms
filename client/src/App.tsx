import "./App.css";
import { ContentLayout } from "./pages/ContentLayout";
import { Main } from "./pages/Main";
import { SchemaLayout } from "./pages/SchemaLayout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />}>
          <Route path="schema" element={<SchemaLayout />} />
          <Route path="content" element={<ContentLayout />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
