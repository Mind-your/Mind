import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

<<<<<<< HEAD
import { AuthProvider } from "./context/authContext.jsx";
import { PsicologosProvider } from "./context/psicologos.jsx";
=======
import { AuthProvider } from './context/AuthContext.jsx';
import { PsicologosProvider } from "./context/Psicologos.jsx";
>>>>>>> e9fad7f3509b744706a069fdb2c58aa2c1b9ffc5


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <PsicologosProvider>
        <App />
      </PsicologosProvider>
    </AuthProvider>
  </StrictMode>,
)
