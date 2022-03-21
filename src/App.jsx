import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Places from './components/Places';
import Footer from './components/Footer';
import Blog from './components/Blog';
import Profile from './components/Profile';
import { Routes, Route } from 'react-router-dom';


function App() {
  return (
    <div className="App container font-main px-2 relative pb-20 min-h-screen">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/places" element={<Places />}></Route>
        <Route path="/blog" element={<Blog />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;