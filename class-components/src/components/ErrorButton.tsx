import React from 'react';

export default class ErrorButton extends React.Component {
  state = { isClicked: false };

  throwError() {
    this.setState({ isClicked: true });
  }
  render() {
    if (this.state.isClicked) {
      throw new Error('User generated an error');
    } else {
      return (
        <button
          className="search-button error-button"
          onClick={() => this.throwError()}
        >
          Throw an Error
        </button>
      );
    }
  }
}
