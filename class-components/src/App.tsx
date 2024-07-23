import './App.scss';
import MainPage from './pages/MainPage/MainPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import DetailPage from './pages/DetailPage/DetailPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import ErrorBoundary from './components/ErrorJHandling/ErrorBoundary';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
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
    </ThemeProvider>
  );
}

export default App;
