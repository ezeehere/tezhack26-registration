import { Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage";
import ProblemStatementsPage from "./pages/ProblemStatementsPage";
import RegisterPage from "./pages/RegisterPage";
import ChallengeJarPage from "./pages/ChallengeJarPage";
import TeamCallerPage from "./pages/TeamCallerPage";
import TeamAllocationsPage from "./pages/TeamAllocationsPage";






function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={<HomePage />}
      />
      <Route path="/problem-statements" element={<ProblemStatementsPage />} />
      <Route path="/challenge-jar" element={<ChallengeJarPage />} />
      <Route path="/team-caller" element={<TeamCallerPage />} />
      
      <Route
        path="/team-allocations"
        element={<TeamAllocationsPage />}
      />

      <Route
        path="/register"
        element={<RegisterPage />}
      />
    </Routes>
  );
}

export default App;