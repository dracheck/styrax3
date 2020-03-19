import React from 'react'

export default class EditPersonForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedUser: '',
      ageInput: '',
      sexInput: ''
    }
  }

  handleUserChange = (event) => {
    console.log(this.props)
    let userObject = null
    let userAge = null
    let userSex = null
    this.props.users.map(user => {
      if(user.name === event.target.value) {
        userObject = user
        userAge = user.age
        userSex = user.sex
      }
    })
    this.setState({
      selectedUser: userObject,
      ageInput: userAge,
      sexInput: userSex
    })
  }

  handleAgeInputChange = (event) => {
    this.setState({
      ageInput: event.target.value
    })
    console.log(event.target.value)
  }

  handleSexInputChange = (event) => {
    this.setState({
      sexInput: event.target.value
    })
  }

  render() {
    // nevedel jsem presne jaky Date format to je a jakou funkci ho tedy mohu konvertovat
    return (
      <form onSubmit={this.props.handleSubmitEdit} action="" method="GET">
        <select onChange={this.handleUserChange} name="name" id="">
          {
            this.props.users.map((user, index) => {
              return (
                <option key={index} value={user.name}>{user.name}</option>
              )
            })
          }
        </select>
        <input type="number" name="age" id="" placeholder="Enter age" onChange={this.handleAgeInputChange} value={this.state.ageInput}/>
        <input type="text" name="sex" id="" placeholder="Enter gender" onChange={this.handleSexInputChange} value={this.state.sexInput}/>
        <input hidden type="text" name="updatedDate" id="" readOnly value={Date.now()}/> 
        <input type="submit" value="Edit person"/>
      </form>

    )
  }
}