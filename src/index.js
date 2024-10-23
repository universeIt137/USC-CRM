import React from 'react';
import ReactDOM from 'react-dom';  // Use react-dom instead of react-dom/client
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import AuthProvider from './contexts/AuthProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root')  // This is the React 17 way of rendering the app
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
