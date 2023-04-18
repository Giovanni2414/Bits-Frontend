import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignIn from './pages/Components/SignIn'
import SignUp from './pages/Components/SignUp'
import VarxenPerformance from './pages/Components/VarxenPerformance';
import SessionPage from './pages/Components/SessionPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={'/'} element={<SignIn />} />
        <Route path={'/SignUp'} element={<SignUp />} />
        <Route path={'/VarxenPerformance/*'} element={<VarxenPerformance />}>
          <Route path='Session' element={<SessionPage />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
