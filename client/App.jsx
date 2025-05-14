import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import Home from "./Home";
import Second from "./Second";
import Third from "./Third";

export default function App() {
return (
<Router>
  <div className="min-h-screen flex flex-col">
    <main className="flex-grow">
      <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/second" element={<Second />} />
          <Route path="/login" element={<Third />} />
      </Routes>
    </main>
  </div>
</Router>
);
}
