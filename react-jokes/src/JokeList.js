import React, { Component } from 'react';
import axios from 'axios';
import Joke from './Joke'
import './JokeList.css'
import uuid from "uuid/v4";

class JokeList extends Component {

  static defaultProps = {
    numJokesToGet: 10,
    loading: false
  }

state = { jokes: JSON.parse(window.localStorage.getItem("jokes") || "[]") }

seenJokes = new Set(this.state.jokes.map(j => j.text));

  componentDidMount = async() => {
    if(this.state.jokes.length === 0) this.getJokes();
  }

  getJokes = async () => {
    try {
    let jokes = [];
     while //this is the case
            (jokes.length < this.props.numJokesToGet)
            //go do this:
        {
              let res = await axios.get("https://icanhazdadjoke.com/", { 
                headers: { Accept: "application/json" }
              });
              let newJoke = res.data.joke;
              if(!this.seenJokes.has(newJoke)) {
                jokes.push({id: uuid(), text: newJoke, votes: 0})
              } else {
                console.log("FOUND A DUPE!");
                console.log(newJoke);
              }
        } 
    //regardless, do this
    this.setState(
      st => ({
        loading: false,
        jokes: [...st.jokes, ...jokes]
      }),
      () =>
        window.localStorage.setItem( "jokes", JSON.stringify(this.state.jokes))
    );
    } catch (e) {
      alert(e);
      this.setState({ loading: false })
    }
  }

  handleClick = () => {
    this.setState({ loading: true}, this.getJokes)
  }

  handleVote = (id, delta) => {
    this.setState(st => ({
        jokes: st.jokes.map(j => 
          j.id === id ? {...j, votes: j.votes + delta } : j 
        )
      }),
      () => window.localStorage.setItem("jokes", JSON.stringify(this.state.jokes))
    )
  }

  render() {
    if(this.state.loading) {
      return (
        <div className='JokeList-spinner'>
          <i className='far fa-8x fa-laugh fa-spin' />
          <h1 className='JokeList-title'>Loading...</h1>
        </div>
      )
    }
    let sortJokes = this.state.jokes.sort((a,b) => b.votes - a.votes)
    return (
      <div className="JokeList">
        <div className='JokeList-sidebar'>
          <h1 className='JokeList-title'>
            <span>Dad</span> Jokes
          </h1>
          <img src='https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg' alt='nah'/>
          <button className='JokeList-getmore' onClick={this.handleClick}>
            More Jokes
          </button>
        </div>
        <div className="JokeList-jokes">
          {sortJokes.map(j => (
            <Joke 
              key={j.id} 
              votes={j.votes} 
              text={j.text}
              upvote={() => this.handleVote(j.id, 1)}
              downvote={() => this.handleVote(j.id, -1)}
             />
          ))}
        </div>
      </div>
    );
  }
}

export default JokeList;