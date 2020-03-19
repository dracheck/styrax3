import React from 'react'

export default class AddPersonForm extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    // nevedel jsem presne jaky Date format to je a jakou funkci ho tedy mohu konvertovat
    return (
      <form onSubmit={this.props.handleSubmit} action="" method="GET">
        <input type="text" name="name" id="" placeholder="Enter name"/>
        <input type="number" name="age" id="" placeholder="Enter age"/>
        <input type="text" name="sex" id="" placeholder="Enter gender"/>
        <input hidden type="text" name="updatedDate" id="" readOnly value={Date.now()}/> 
        <input type="submit" value="Add new person"/>
      </form>

    )
  }
}