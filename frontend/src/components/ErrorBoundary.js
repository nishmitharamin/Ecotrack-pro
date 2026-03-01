import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Industrial Error Log:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-10 bg-slate-900 rounded-3xl border border-red-500/50 text-center">
          <h2 className="text-xl font-bold text-red-500">Component Offline</h2>
          <p className="text-slate-400 text-sm mt-2">The system encountered a runtime exception. Live data sync is temporarily suspended.</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-blue-600 rounded-full text-xs font-bold uppercase"
          >
            Attempt System Reboot
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;