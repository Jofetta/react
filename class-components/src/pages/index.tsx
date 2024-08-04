import { ThemeProvider } from '../context/ThemeContext';
import ErrorBoundary from '../components/ErrorJHandling/ErrorBoundary';
import MainPage from './MainPage/MainPage';
import { Provider } from 'react-redux';
import { store } from '../store/store';

function Home() {
  return (
    <>
      <Provider store={store}>
        <ThemeProvider>
          <ErrorBoundary
            fallback={<div className="fallback">Ooops, the App crashed</div>}
          >
            <MainPage />
          </ErrorBoundary>
        </ThemeProvider>
      </Provider>
    </>
  );
}

export default Home;
