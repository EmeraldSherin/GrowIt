import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import Splash from "./components/Splash";

import Login from "./pages/Login";
import Register from "./pages/Register";

import Dashboard from "./pages/Dashboard";
import Activities from "./pages/Activities";
import CalendarPage from "./pages/CalendarPage";
import Analytics from "./pages/Analytics";
import Goals from "./pages/Goals";

// How long the splash stays fully visible before it starts fading,
// and how long the fade itself takes, in ms.
const SPLASH_HOLD = 1800;
const SPLASH_FADE = 450;

function App() {

  const [showSplash, setShowSplash] = useState(true);
  const [splashLeaving, setSplashLeaving] = useState(false);

  useEffect(() => {
    const leaveTimer = setTimeout(() => setSplashLeaving(true), SPLASH_HOLD);
    const hideTimer = setTimeout(
      () => setShowSplash(false),
      SPLASH_HOLD + SPLASH_FADE
    );

    return () => {
      clearTimeout(leaveTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  return (

    <BrowserRouter>

      {showSplash && <Splash leaving={splashLeaving} />}

      <Routes>

        {/* ============================= */}
        {/* PUBLIC ROUTES */}
        {/* ============================= */}

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />


        {/* ============================= */}
        {/* PROTECTED APPLICATION */}
        {/* ============================= */}

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >

          <Route
            index
            element={<Dashboard />}
          />

          <Route
            path="activities"
            element={<Activities />}
          />

          <Route
            path="calendar"
            element={<CalendarPage />}
          />

          <Route
            path="analytics"
            element={<Analytics />}
          />

          <Route
            path="goals"
            element={<Goals />}
          />

        </Route>

      </Routes>

    </BrowserRouter>

  );
}

export default App;