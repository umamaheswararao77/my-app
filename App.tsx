import "./global.css";
import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";

type Screen = 'login' | 'register' | 'home';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('login');
  const [userEmail, setUserEmail] = useState('');

  const handleLogin = (identifier: string, password: string) => {
    if (identifier && password) {
      setUserEmail(identifier);
      setCurrentScreen('home');
    } else {
      alert("Please enter both your name/email and password.");
    }
  };

  const handleRegister = (name: string, email: string, password: string) => {
    alert("Registration Successful! Please login.");
    setUserEmail(email);
    setCurrentScreen('login');
  };

  const handleLogout = () => {
    setCurrentScreen('login');
    setUserEmail('');
  };

  const goToRegister = () => {
    setCurrentScreen('register');
  };

  const goToLogin = () => {
    setCurrentScreen('login');
  };

  return (
    <>
      <StatusBar style="dark" />
      {currentScreen === 'home' && (
        <Home onLogout={handleLogout} />
      )}
      {currentScreen === 'login' && (
        <Login onLogin={handleLogin} onRegister={goToRegister} />
      )}
      {currentScreen === 'register' && (
        <Register onRegister={handleRegister} onBackToLogin={goToLogin} />
      )}
    </>
  );
}