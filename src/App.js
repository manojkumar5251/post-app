import React from "react"
import CommentsList from "./CommentsList"

export default class App extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      uploading: false,
      author: "",
      comment: "",
      comments: { author: "manoj", comment: "manoj", up: 1, down: 2 }
    }
  }
  render() {
    return (
      <div className="container d-flex flex-column w-50 mt-3 p-5 rounded">
        {
          <CommentsList
            index={1}
            author={this.state.comments.author}
            comment={this.state.comments.comment}
            up={this.state.comments.up}
            down={this.state.comments.down}
          />
        }
      </div>
    )
  }
}
