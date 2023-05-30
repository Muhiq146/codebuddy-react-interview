import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Posts from './pages/Posts';
import MultistepForm from './pages/MultistepForm';
import Seats from './pages/Seats';

const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<MultistepForm />} />
      <Route path="/posts" element={<Posts />} />
      <Route path="/seats" element={<Seats />} />
    </Routes>
  </BrowserRouter>
);

export default Router;
