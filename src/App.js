import React, { Component } from 'react'
import './App.css';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      username: "",
      vote: 1,
      prompts: {
        prompt1: {
          text: "",
          isLie: false
        },
        prompt2: {
          text: "",
          isLie: false
        },
        prompt3: {
          text: "",
          isLie: false
        }
      }
    }
  }

  handleUsernameChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleVoteChange = (e) => {
    const num = Number(e.target.value)
    if (num === 1 || num === 2 || num === 3) {
      console.log("passed")
      this.setState({
        [e.target.name]: num
      })
    }
  }

  handlePromptChange = (e) => {
    const newData = {
      ...this.state,
      // prompts: {
      //   ...this.state.prompts,
      //   [e.target.name]: {
      //     text: e.target.value,
      //     isLie: false
      //   }
      // }
    }
    newData.prompts[e.target.name].text = e.target.value
    this.setState(newData)
  }

  handlePromptCheckbox = (e) => {
    const newData = { ...this.state }

    // Trying to reset all checkboxes to false first

    // console.log(Object.keys(newData.prompts))
    // console.log(newData.prompts)

    // let prompts = Object.keys(newData.prompts)
    // prompts.map((prompt) => {
    //   const newPrompt = prompt
    //   console.log(newPrompt.isLie)
    //   console.log("test", newData.prompt)
    //   return newPrompt
    // })
   

    newData.prompts[e.target.name].isLie = e.target.checked
    this.setState(newData)
  }

  handleFormSubmit = (e) => {
    e.preventDefault()
  }

  render() {
    return (
      <div className='App'>
        <h1>Two Truths and a Lie</h1>

        <form onSubmit={this.handleFormSubmit}>
          <label>Username: </label>
          <input
            name="username"
            value={this.state.username}
            onChange={this.handleUsernameChange}
          />
          <br />

          <label>Prompt 1: </label>
          <input
            name="prompt1"
            value={this.state.prompts.prompt1.text}
            onChange={this.handlePromptChange}
          />
          <input
            type="checkbox"
            name="prompt1"
            value={this.state.prompts.prompt1.isLie}
            onChange={this.handlePromptCheckbox}
          />
          <br />

          <label>Prompt 2: </label>
          <input
            name="prompt2"
            value={this.state.prompts.prompt2.text}
            onChange={this.handlePromptChange}
          />
          <input
            type="checkbox"
            name="prompt2"
            value={this.state.prompts.prompt1.isLie}
            onChange={this.handlePromptCheckbox}
          />
          <br />

          <label>Prompt 3: </label>
          <input
            name="prompt3"
            value={this.state.prompts.prompt3.text}
            onChange={this.handlePromptChange}
          />
          <input
            type="checkbox"
            name="prompt3"
            value={this.state.prompts.prompt1.isLie}
            onChange={this.handlePromptCheckbox}
          />
          <br />

          <label>Vote </label>
          <input
            name="vote"
            type="number"
            value={this.state.vote}
            onChange={this.handleVoteChange}
          />
          <br />

          <button>Send Prompt</button>
          <button>Send Vote</button>
        </form>

      </div>
    )
  }
}

export default App;