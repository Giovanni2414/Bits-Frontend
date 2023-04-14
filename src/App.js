import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignIn from './pages/Components/SignIn'
import SignUp from './pages/Components/SignUp'
import HomeTest from './pages/Components/HomeTest';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={'/'} element={<SignIn />} />
        <Route path={'/SignUp'} element={<SignUp />} />
        <Route path={'/Home'} element={<HomeTest />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
