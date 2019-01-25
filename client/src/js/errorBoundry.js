import React from 'react';
import { Jumbotron } from 'react-bootstrap';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: '' };
  }

  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({
      hasError: true,
      error: error
    });
  
  }

  render() {
    if (this.state.hasError) {
      return (
        <Jumbotron>
          <h1>Oops</h1>
          <h3> Something went wrong. :(</h3>
          <p>
            {this.state.error}
          </p>

        </Jumbotron>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary