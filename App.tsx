import React from 'react';
import ErrorBoundary from './components/ErrorBoundary';
import VideoEditor from './components/VideoEditor';
import './style.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Editor</h1>
      </header>

      <main>
        <ErrorBoundary fallback={<>Duh!</>}>
          <VideoEditor />
        </ErrorBoundary>
      </main>
    </div>
  );
}

export default App;
