import React from 'react';

export default function Toast({ message }) {
  return (
    <div className="toast">
      <span>✓</span>
      <span>{message}</span>
    </div>
  );
}