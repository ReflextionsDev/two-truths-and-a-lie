import React, { Component } from 'react'
import './App.css';

const serverURL = "http://ad4d-108-53-232-66.ngrok.io";

async function getFromServer() {
    const response = await fetch(`${serverURL}/prompt-poll`, {
        method: "GET",
        mode: "cors",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "access-control-request-headers": "content-type",
            "x-Trigger": "CORS",
        }
    })
    return await response.json()
}

export class Results extends Component {

    constructor(props) {
        super(props)
        this.state = {
            "currentPrompt": {
                "userName": "",
                "prompts": {
                    "promptOne": {
                        "prompt": "",
                        "isLie": false
                    },
                    "promptTwo": {
                        "prompt": "",
                        "isLie": false
                    },
                    "promptThree": {
                        "prompt": "",
                        "isLie": false
                    }
                }
            },
            "promptVotes": {
                "1": 0,
                "2": 0,
                "3": 0
            },
            "colors": {
                "1": '',
                "2": '',
                "3": ''
            },
            "showLie": false
        }
    }

    getPoll = async () => {
        const response = await getFromServer()
        console.log(response)
        this.setState(response)
    }

    showLie = () => {
        this.setState({ "showLie": !this.state.showLie }, () => {

            // Set the color of prompts to red or green based on truthiness
            if (this.state.showLie === true) {
                this.setState({
                    "colors": {
                        "1": (this.state.currentPrompt.prompts.promptOne.isLie ? 'red' : 'lightgreen'),
                        "2": (this.state.currentPrompt.prompts.promptTwo.isLie ? 'red' : 'lightgreen'),
                        "3": (this.state.currentPrompt.prompts.promptThree.isLie ? 'red' : 'lightgreen')
                    }
                })
            } else {
                this.setState({
                    "colors": {
                        "1": 'black',
                        "2": 'black',
                        "3": 'black'
                    }
                })
            }

            // console log if the class voted correctly or not
            // get prompt that is lie
            // check if that prompt has the most votes

            // get prompts{obj} where, isLie: true

           
            const prompts = this.state.currentPrompt.prompts
            let liePrompt = ''
            
            // console.log(prompts)

            for (const prompt in prompts) {
                // console.log(`${prompt}: ${prompts[prompt].isLie}`)
                if (prompts[prompt].isLie === true) {
                    liePrompt = prompt
                    break
                }
            }

            console.log(`${liePrompt} is the lie.`)

            // working here
            // reduce to get the highest votes?



        })
    }

    render() {
        return (
            <div className='App'>
                <hr />
                <div>Username: {this.state.currentPrompt.userName}</div>
                <div>Prompt 1: {this.state.currentPrompt.prompts.promptOne.prompt}</div>
                <div>Prompt 2: {this.state.currentPrompt.prompts.promptTwo.prompt}</div>
                <div>Prompt 3: {this.state.currentPrompt.prompts.promptThree.prompt}</div>
                <div style={{ color: this.state.colors[1] }}>
                    Vote 1: {this.state.promptVotes[1]}</div>
                <div style={{ color: this.state.colors[2] }}>
                    Vote 2: {this.state.promptVotes[2]}</div>
                <div style={{ color: this.state.colors[3] }}>
                    Vote 3: {this.state.promptVotes[3]}</div>
                <button onClick={this.getPoll}>Get Poll</button>
                <button onClick={this.showLie}>Show Lie</button>

            </div>
        )
    }
}

export default Results