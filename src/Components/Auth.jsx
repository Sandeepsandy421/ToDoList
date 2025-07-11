import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";

function Auth({ onLogin }) {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      {showLogin ? (
        <Login onLogin={onLogin} onSwitchToRegister={() => setShowLogin(false)} />
      ) : (
        <Register onSwitchToLogin={() => setShowLogin(true)} />
      )}
    </div>
  );
}

export default Auth;