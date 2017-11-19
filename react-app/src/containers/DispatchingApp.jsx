import React, {Component} from 'react'
import TeamForm from "../forms/TeamForm";
import TeamRepository from "./teams/TeamRepository";

class DispatchingApp extends Component {
    render(){
        return (
            <div>
                Hello world!
                <TeamRepository/>
            </div>
        )
    }
}

export default DispatchingApp