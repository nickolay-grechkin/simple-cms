import "./App.css";
import { ContentLayout } from "./components/ContentLayout";
import { Main } from "./components/Main";
import { SchemaLayout } from "./components/ScreenLayout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />}>
          <Route index element={<div>Home Content</div>} />
          <Route path="schema" element={<SchemaLayout />} />
          <Route path="content" element={<ContentLayout />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
