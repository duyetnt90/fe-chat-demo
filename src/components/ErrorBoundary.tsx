import React, { Component, ReactNode } from 'react';

interface ErrorBoundaryState {
    hasError: boolean;
    error: Error | null;
}

interface ErrorBoundaryProps {
    children: ReactNode;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: any) {
        console.error("Error caught by boundary:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
                    <div className="text-center p-4 bg-white rounded shadow" style={{ maxWidth: '500px' }}>
                        <h2 className="text-danger mb-3">Oops! Something went wrong</h2>
                        <p className="text-muted mb-4">
                            We're sorry, but something unexpected happened. Please try refreshing the page.
                        </p>
                        <div className="mb-3">
                            <strong>Error:</strong> {this.state.error?.message}
                        </div>
                        <button
                            className="btn btn-primary me-2"
                            onClick={() => window.location.reload()}
                        >
                            Reload Page
                        </button>
                        <button
                            className="btn btn-outline-secondary"
                            onClick={() => this.setState({ hasError: false, error: null })}
                        >
                            Try Again
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;