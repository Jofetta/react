import React from 'react'
import './App.css'
import Page from './components/Page'

import ErrorBoundary from './components/ErrorBoundary'

class App extends React.Component {
  render() {
    return (
      <ErrorBoundary
        fallback={<div className="fallback">Ooops, the App crashed</div>}
      >
        <Page />
      </ErrorBoundary>
    )
  }
}

export default App
