import React from 'react'

export type ButtonProps = {
  callback: () => void
}
class SearchButton extends React.Component {
  handleClick: () => void
  constructor(props: ButtonProps) {
    super(props)
    this.handleClick = () => props.callback()
  }
  render() {
    return (
      <button className="search-button" onClick={this.handleClick}>
        Search
      </button>
    )
  }
}

export default SearchButton
