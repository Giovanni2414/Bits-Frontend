import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignIn from './pages/Components/SignIn'
import HomeTest from './pages/Components/HomeTest';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={'/'} element={<SignIn />} />
        <Route path={'/Home'} element={<HomeTest />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
