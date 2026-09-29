import React, { useState } from 'react';
import CanvasContainer from './components/CanvasContainer';
import LoginForm from './components/LoginForm';
import Toast from './components/Toast';

export default function App() {
  const [actionState, setActionState] = useState('idle'); // 'idle' | 'typing' | 'submitted'
  const [showToast, setShowToast] = useState(false);

  const handleTypingStart = () => {
    if (actionState !== 'submitted') setActionState('typing');
  };

  const handleTypingEnd = () => {
    if (actionState !== 'submitted') setActionState('idle');
  };

  const handleSubmitSuccess = () => {
    setActionState('submitted');
    setShowToast(true);
  };

  return (
    <main className="form-container">
      {/* 3D Robot Canvas */}
      <CanvasContainer actionState={actionState} />

      {/* Transparent Form Panel Overlay */}
      <LoginForm
        onTypingStart={handleTypingStart}
        onTypingEnd={handleTypingEnd}
        onSubmitSuccess={handleSubmitSuccess}
        isSubmitted={actionState === 'submitted'}
      />

      {/* Success Notification */}
      {showToast && <Toast message="Account registered successfully" />}
    </main>
  );
}