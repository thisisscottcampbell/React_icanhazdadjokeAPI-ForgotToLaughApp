import React, { Component } from 'react';

class Joke extends Component {
  render() {
    return (
      <div>
        {this.props.joke}
      </div>
    );
  }
}

export default Joke;