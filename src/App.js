import React from 'react';
import { HashRouter, BrowserRouter } from "react-router-dom";
import AppRouter from './routes/AppRouter';

function App() {
  return (
    <HashRouter>
      <AppRouter />
    </HashRouter>
  );
}
export default App;