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
      comments: {
        author: "manoj",
        comment: "manoj",
        up: 1,
        down: 2
      }
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

  uploadComments = () => {
    let { author, comment } = this.state
    if (author === "" || comment === "") {
      return
    }

    let data = { author, comment, up: 0, down: 0 }
    this.setState({ uploading: true })
    Axios.post("/comments.json", data)
      .then(res => {
        this.setState(state => {
          return {
            uploading: false,
            author: "",
            comment: "",
            comments: {
              ...state.comments,
              [res.data.name]: data
            }
          }
        })
        console.log(this.state.comments)
      })
      .catch(err => {
        this.setState({
          uploading: false,
          author: "",
          comment: ""
        })
        console.log(err)
      })
  }

  upClick = index => {
    let comments = { ...this.state.comments }
    index = Object.keys(comments)[index]
    console.log(index)
    comments[index].up = comments[index].up + 1
    this.setState({ comments })
    Axios.patch("/comments.json", { [index]: comments[index] })
      .then(res => {})
      .catch(err => {
        console.log(err)
      })
  }

  downClick = index => {
    let comments = { ...this.state.comments }
    index = Object.keys(comments)[index]
    console.log(index)
    comments[index].down = comments[index].down + 1
    this.setState({ comments })
    Axios.patch("/comments.json", { [index]: comments[index] })
      .then(res => {})
      .catch(err => {
        console.log(err)
      })
  }

  render() {
    return (
      <div className="container d-flex flex-column w-50 mt-3 p-5 rounded">
        <input
          value={this.state.author}
          onChange={e => this.setState({ author: e.target.value })}
          className="form-control font-weight-bold mb-3"
          placeholder="Author"
        />
        <textarea
          value={this.state.comment}
          onChange={e => this.setState({ comment: e.target.value })}
          className="form-control font-weight-bold"
          rows="3"
          placeholder="Type a Comment"
        ></textarea>
        <button
          onClick={this.uploadComments}
          type="button"
          className="btn btn-danger mt-3 align-self-end font-weight-bold"
        >
          {this.state.uploading ? (
            <div className="spinner-border" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          ) : (
            "Post Comment"
          )}
        </button>
        <div className="w-100 mt-3 py-3">
          {Object.values(this.state.comments).map((comments, i) => {
            return (
              <CommentsList
                key={i}
                index={i + 1}
                author={comments.author}
                comment={comments.comment}
                up={comments.up}
                down={comments.down}
                upClick={() => this.upClick(i)}
                downClick={() => this.downClick(i)}
              />
            )
          })}
        </div>
      </div>
    )
  }
}
