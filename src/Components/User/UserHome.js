import React,{Component} from 'react'
import SimpleTable from './Table'
import Comform from './Comform'

class UserHome extends Component {
      state={
        characters : [
          {
            name: 'Name 1',
            category: 'IT',
            complaint: 'Loreum ipsun is a simple dummy text',
            compID: 'GWL052',
            status: 'solved',
          },
          {
            name: 'Name 2',
            category: 'IT',
            complaint: 'Loreum ipsun is a simple dummy text',
            compID: 'GWL052',
            status: 'solved',
          },
        ]
      }


      removeCharacter = (index) => {
        const {characters} = this.state
        this.setState({
          characters:characters.filter((characters,id) =>{
            return id !== index
          })
        })
      }

      handleSubmit = character => {
        this.setState({ characters: [...this.state.characters, character] })
      }
    
    render() { 
        return (
            <div>
                <SimpleTable characters={this.state.characters} removeCharacter={this.removeCharacter}/>
                <Comform  handleSubmit={this.handleSubmit} />
            </div>
        );  
    }
}

export default UserHome;