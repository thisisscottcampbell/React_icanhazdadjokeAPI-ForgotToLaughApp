import React, { Component } from 'react';
import axios from 'axios';
import Joke from './Joke'

class JokeList extends Component {

  static defaultProps = {
    numJokesToGet: 10
  }

state = { jokes: [] }

  componentDidMount = async() => {
  let jokes = [];
  while (jokes.length < this.props.numJokesToGet) {
    let res = await axios.get("https://icanhazdadjoke.com/", { 
      headers: { Accept: "application/json" }
    });
    jokes.push(res.data.joke)
  } 
  this.setState({ jokes: jokes })
}

  render() {
    const jk = this.state.jokes.map(jk => (
      <Joke joke={jk} /> 
    ));
    return (
      <div className="JokeList">
        <h1>Joke Nah</h1>
        {jk}
      </div>
    );
  }
}

export default JokeList;