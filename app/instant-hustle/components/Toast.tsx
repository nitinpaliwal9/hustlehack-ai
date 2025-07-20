'use client';

import { useState, useEffect } from 'react';

type ToastProps = {
  message: string;
  type: 'success' | 'error' | 'info';
  isVisible: boolean;
  onClose: () => void;
};

export default function Toast({ message, type, isVisible, onClose }: ToastProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 2500);

      return () => clearTimeout(timer);
    }
    return undefined;
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  const getToastStyles = () => {
    switch (type) {
      case 'success':
        return 'bg-[#00FFC2] text-black border-[#00FFC2]';
      case 'error':
        return 'bg-red-500 text-white border-red-500';
      case 'info':
        return 'bg-[#7F5AF0] text-white border-[#7F5AF0]';
      default:
        return 'bg-[#00FFC2] text-black border-[#00FFC2]';
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return '✓';
      case 'error':
        return '✕';
      case 'info':
        return 'ℹ';
      default:
        return '✓';
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <div
        className={`${getToastStyles()} border rounded-lg px-4 py-3 shadow-lg transform transition-all duration-300 ${
          isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
        }`}
      >
        <div className="flex items-center space-x-2">
          <span className="text-lg font-bold">{getIcon()}</span>
          <span className="font-medium">{message}</span>
          <button
            onClick={onClose}
            className="ml-2 text-current opacity-70 hover:opacity-100 transition-opacity"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  );
} 