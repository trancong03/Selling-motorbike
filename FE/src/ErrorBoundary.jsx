import React, { Component } from 'react';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, errorMessage: '' };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, info) {
        this.setState({ errorMessage: error.message });
        console.error('ErrorBoundary caught an error:', error, info);
    }

    render() {
        if (this.state.hasError) {
            return <h2>Something went wrong: {this.state.errorMessage}</h2>;
        }
        return this.props.children;
    }
}

export default ErrorBoundary;
