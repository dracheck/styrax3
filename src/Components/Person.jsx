import React from 'react'

export default class Person extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <>
      <tr>
      <td>{this.props.name}</td>
      <td>{this.props.age}</td>
      <td>{this.props.sex}</td>
      <td>{this.props.updatedDate}</td>
      </tr>
      </>


    )
  }
}