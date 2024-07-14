import './App.css';
import MainPage from './pages/MainPage';
import NotFoundPage from './pages/NotFoundPage';
import DetailPage from './pages/DetailPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary
      fallback={<div className="fallback">Ooops, the App crashed</div>}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />}>
            <Route path="pokemon/:id" element={<DetailPage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
