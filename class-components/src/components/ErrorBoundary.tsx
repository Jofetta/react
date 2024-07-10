import React, { ErrorInfo } from 'react';

interface ErrorBoundaryPropsTypes {
  children: React.ReactNode;
  fallback: React.ReactNode;
}

interface ErrorBoundaryStateTypes {
  hasError: boolean;
}

interface ErrorBoundaryTypes {
  errorBoundaryState: ErrorBoundaryStateTypes;
  errorBoundaryProps: ErrorBoundaryPropsTypes;
  fallback: React.ReactNode;
}

export default class ErrorBoundary extends React.Component<
  ErrorBoundaryPropsTypes,
  ErrorBoundaryStateTypes
> {
  fallback: React.ReactNode;

  constructor(props: ErrorBoundaryTypes) {
    super(props.errorBoundaryProps);
    this.state = { hasError: false };
    this.fallback = props.fallback;
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.fallback;
    }

    return this.props.children;
  }
}
