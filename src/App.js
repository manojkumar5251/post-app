import React from "react"
import CommentsList from "./CommentsList"
import Axios from "axios"

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

  componentDidMount() {
    this.fetchComments()
  }

  fetchComments = () => {
    Axios.get("/comments.json")
      .then(res => this.setState({ comments: res.data ? res.data : {} }))
      .catch(err => console.log(err))
  }

  render() {
    return (
      <div className="container d-flex flex-column w-50 mt-3 p-5 rounded">
        {Object.values(this.state.comments).map((comments, i) => {
          return (
            <CommentsList
              index={i + 1}
              author={comments.author}
              comment={comments.comment}
              up={comments.up}
              down={comments.down}
            />
          )
        })}
      </div>
    )
  }
}
