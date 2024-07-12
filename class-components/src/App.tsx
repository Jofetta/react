import './App.css';
import Page from './components/Page';

import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary
      fallback={<div className="fallback">Ooops, the App crashed</div>}
    >
      <Page />
    </ErrorBoundary>
  );
}

export default App;
