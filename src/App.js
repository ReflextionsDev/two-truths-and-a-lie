import React, { Component } from 'react'
import InputPrompt from './components/InputPrompt';
import './App.css';

const serverURL = "http://ad4d-108-53-232-66.ngrok.io";

async function postToServer(data, route) {
  const response = await fetch(`${serverURL}/${route}`, {
    method: "POST",
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "access-control-request-headers": "content-type",
      "x-Trigger": "CORS",
    },
    body: data
  });
  const pingResponse = await response.text();
  return pingResponse;
}

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      username: "",
      vote: 1,
      prompts: [
        {
          "name": "promptOne",
          prompt: "First",
          isLie: false
        },
        {
          "name": "promptTwo",
          prompt: "Second",
          isLie: true
        },
        {
          "name": "promptThree",
          prompt: "Third",
          isLie: false
        }
      ]
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
    // const newData = { ...this.state, }
    // newData.prompts[e.target.name].prompt = e.target.value
    // this.setState(newData)

    // Try refactoring
    const name = e.target.name
    const value = e.target.value
    let updatedPrompts = [...this.state.prompts]

    updatedPrompts = updatedPrompts.map((prompt) => {
      if (prompt.name === name) {
        return {
          ...prompt,
          prompt: value
        }
      }
      return {
        ...prompt
      }
    })
    this.setState({
      prompts: updatedPrompts
    })
  }

  handlePromptCheckbox = (e) => {
    const newData = { ...this.state }

    // Resets all checkboxes
    let prompts = Object.keys(newData.prompts)
    prompts.forEach(prompt => {
      newData.prompts[prompt].isLie = false
    })

    newData.prompts[e.target.name].isLie = e.target.checked
    this.setState(newData)
  }

  sendPrompt = async (e) => {
    const data = JSON.stringify({
      userName: this.state.username,
      prompts: this.state.prompts,
    })
    const response = await postToServer(data, 'prompt-submit')
    console.log(response)
  }

  sendVote = async (e) => {
    const data = JSON.stringify({
      userName: this.state.username,
      promptVote: this.state.vote,
    })
    const response = await postToServer(data, 'prompt-vote')
    console.log(response)
  }

  render() {
    return (
      <div className='App'>
        <h1>Two Truths and a Lie</h1>

        <label>Username: </label>
        <input
          name="username"
          value={this.state.username}
          onChange={this.handleUsernameChange}
        />
        <br />

        {this.state.prompts.map(({ name, prompt, isLie }, index) => {
          return (
            <InputPrompt
              key={`Input-Prompt-${index}`}
              nameProp={name}
              promptProp={prompt}
              isLieProp={isLie}
              handlePromptText={this.handlePromptChange}
            />
          )
        })}

        {/* <label>Prompt 1: </label>
        <input
          name="promptOne"
          value={this.state.prompts[0].prompt}
          onChange={this.handlePromptChange}
        />
        <input
          type="checkbox"
          name="promptOne"
          checked={this.state.prompts[0].isLie}
          onChange={this.handlePromptCheckbox}
        />
        <br /> */}

        {/* <label>Prompt 2: </label>
        <input
          name="promptTwo"
          value={this.state.prompts.promptTwo.prompt}
          onChange={this.handlePromptChange}
        />
        <input
          type="checkbox"
          name="promptTwo"
          checked={this.state.prompts.promptTwo.isLie}
          onChange={this.handlePromptCheckbox}
        />
        <br />

        <label>Prompt 3: </label>
        <input
          name="promptThree"
          value={this.state.prompts.promptThree.prompt}
          onChange={this.handlePromptChange}
        />
        <input
          type="checkbox"
          name="promptThree"
          checked={this.state.prompts.promptThree.isLie}
          onChange={this.handlePromptCheckbox}
        />
        <br /> */}

        <label>Vote </label>
        <input
          name="vote"
          type="number"
          value={this.state.vote}
          onChange={this.handleVoteChange}
        />
        <br />

        <button
          name="sendprompt"
          onClick={this.sendPrompt}
        >Send Prompt</button>
        <button
          name="sendvote"
          onClick={this.sendVote}
        > Send Vote</button>


      </div>
    )
  }
}

export default App;