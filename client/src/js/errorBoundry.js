import React from 'react';
import { Jumbotron } from 'react-bootstrap';

class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false, error:'' };
    }
  
    componentDidCatch(error, info) {
      // Display fallback UI
      this.setState({ 
          hasError: true,
          error: error
     });
      // You can also log the error to an error reporting service
    //   logErrorToMyService(error, info);
    }
  
    render() {
      if (this.state.hasError) {
        // You can render any custom fallback UI
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