import React, { Component } from 'react';
import './App.css';
import './data.json';
import Person from './Components/Person'
import AddPersonForm from './Components/AddPersonForm';
import EditPersonForm from './Components/EditPersonForm'

const data = require('./data.json');

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      loading: true,
      data: [],
      asc: true,
      errors: null,
      errorsUpdate: null
    }
  }

  //kdyby data byla na serveru, pouzil bych fetch
  componentDidMount() {
    this.setState({
      data: data,
      loading: false
    })
  }

// Nenasel jsem nikde metodu abych mohl comparovat/sortovat podle nazvu row, tak jsem vicemene jen udelal hodne kondicionalu.
//jsem si ale docela jisty, ze nejaka takova metoda existuje :) priste bych volil unikatni sortovaci handleClick na kazdou row
  handleSortClick = (event) => {
    let newData = this.state.data
    let tableRowName = event.target.getAttribute('data-row')
    if(tableRowName === 'name') {
      if(this.state.asc === true) {
        newData.sort((a,b) =>  b.name.localeCompare(a.name))
        this.setState({
          data: newData,
          asc: false
        })} 
      else {
        newData.sort((a,b) =>  a.name.localeCompare(b.name))
        this.setState({
          data: newData,
          asc: true
        })} 
    } else if(tableRowName === 'age') {
      if(this.state.asc === true) {
        newData.sort((a,b) =>  b.age - a.age)
        this.setState({
          data: newData,
          asc: false
        })} 
      else {
        newData.sort((a,b) =>  a.age - b.age)
        this.setState({
          data: newData,
          asc: true
        })} 
    } else if(tableRowName ==='sex') {
      if(this.state.asc === true) {
        newData.sort((a,b) =>  b.sex.localeCompare(a.sex))
        this.setState({
          data: newData,
          asc: false
        })} 
      else {
        newData.sort((a,b) =>  a.sex.localeCompare(b.sex))
        this.setState({
          data: newData,
          asc: true
        })} 
    } else if(tableRowName ==='updatedDate') {
      if(this.state.asc === true) {
        newData.sort((a,b) =>  b.updatedDate.localeCompare(a.updatedDate))
        this.setState({
          data: newData,
          asc: false
        })} 
      else {
        newData.sort((a,b) =>  a.updatedDate.localeCompare(b.updatedDate))
        this.setState({
          data: newData,
          asc: true
        })} 

    }
  }

  handleSubmit = (event) => {
  event.preventDefault()
  this.setState({
    errors: null
  })

  let newName = event.target.name.value
  let newAge = Number(event.target.age.value) 
  let newSex = String(event.target.sex.value)
  let updatedDate = event.target.updatedDate.value

  let regExName = /\d+/g
  let regTestName = regExName.test(newName)

  if(regTestName === true || newName.length < 2 || newName.length > 10) {
    this.setState({
      errors: 'name'
    })
    return
  } else if(newAge > 129 || newAge <= 0) {
    this.setState({
      errors: 'age'
    })
    return
  } else if(newSex !== 'F' && newSex !== 'M' && newSex !== 'O') {
    this.setState({
      errors: 'sex'
    })
    return
  }

    let newPerson = {
      name: newName,
      age: newAge,
      sex: newSex,
      updatedDate: updatedDate
    }
    let newData = [...this.state.data, newPerson]
    this.setState({
      data: newData,
      errors: null
    })
  }

  //matchuju dle jmen, nemam ID
  handleSubmitEdit = (event) => {
    event.preventDefault()
    this.setState({
      errorsUpdated: null
    })
    let newName = event.target.name.value
    let newAge = Number(event.target.age.value) 
    let newSex = String(event.target.sex.value)
  
    let regExName = /\d+/g
    let regTestName = regExName.test(newName)
  
    if(regTestName === true || newName.length < 2 || newName.length > 10) {
      this.setState({
        errorsUpdated: 'name'
      })
      return
    } else if(newAge > 129 || newAge <= 0) {
      this.setState({
        errorsUpdated: 'age'
      })
      return
    } else if(newSex !== 'F' && newSex !== 'M' && newSex !== 'O') {
      this.setState({
        errorsUpdated: 'sex'
      })
      return
    }
  
    let newData = this.state.data
    newData.map(user => {
      if(user.name === event.target.name.value) {
        user.age = Number(event.target.age.value) 
        user.sex = event.target.sex.value 
        user.updatedDate = event.target.updatedDate.value
        }
      }
    )
    this.setState({
      data: newData
    })
  }


  render() {
    
    return (
    <div className="App">

      <table>
        <thead>
          <tr>
            <th data-row='name' onClick={this.handleSortClick}>Name</th>
            <th data-row='age' onClick={this.handleSortClick}>Age</th>
            <th data-row='sex' onClick={this.handleSortClick}>Sex</th>
            <th data-row='updatedDate' onClick={this.handleSortClick}>Updated date</th>
          </tr>

        </thead>
        <tbody>
        {
        this.state.data.map((person, index) => {
          return (
            < Person  key={index}
                      name={person.name} 
                      age={person.age} 
                      sex={person.sex}
                      updatedDate={person.updatedDate} 
              />
            
          
          )
        })
      }
      </tbody>
      </table>
      <br/>
      <hr/>
      <h2>Add new person</h2>
      <h3>
        {(this.state.errors) ? `There is an error in input field '${this.state.errors}'` : ""}
      </h3>
      <AddPersonForm handleSubmit={this.handleSubmit}/>
      <br/>
      <hr />
      <h2>Edit Person</h2>
      <h3>
        {(this.state.errorsUpdated) ? `There is an error in input field '${this.state.errorsUpdated}'` : ""}
      </h3>

      < EditPersonForm users={this.state.data}
                       handleSubmitEdit={this.handleSubmitEdit} 
        />


    </div>
    );
  }
}

export default App;

