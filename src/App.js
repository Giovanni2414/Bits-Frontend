import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./pages/Components/SignIn";
import SignUp from "./pages/Components/SignUp";
import VarxenPerformance from "./pages/Components/VarxenPerformance";
import SessionPage from "./pages/Components/SessionPage";
import EditSessionPage from "./pages/Components/EditSessionPage";
import { AxiosInterceptor } from "./utils/axios";

function App() {
  return (
    <BrowserRouter>
      <AxiosInterceptor>
        <Routes>
          <Route path={"/"} element={<SignIn />} />
          <Route path={"/SignUp"} element={<SignUp />} />
          <Route path={"/VarxenPerformance/*"} element={<VarxenPerformance />}>
            <Route path="Session" element={<SessionPage />} />
            <Route
              path="EditSession/:sessionId"
              element={<EditSessionPage />}
            />
          </Route>
        </Routes>
      </AxiosInterceptor>
    </BrowserRouter>
  );
}

export default App;
