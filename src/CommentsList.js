import React from "react"

const CommentsList = ({
  index,
  author,
  comment,
  up,
  down,
  upClick,
  downClick
}) => {
  return (
    <div className="d-flex flex-column ">
      <div className="d-flex flex-row justify-content-between px-4">
        <div
          className="d-flex flex-row font-weight-bold"
          style={{ color: "#aaaaaa" }}
        >
          {index}.
          <div>
            {author}
            <div className="font-weight-normal" style={{ color: "#bbbbbb" }}>
              {comment}
            </div>
          </div>
        </div>
        <div
          className="d-flex flex-column justify-content-center font-weight-bold"
          style={{ color: "#999999", fontSize: "15px" }}
        >
          <div
            onClick={upClick}
            style={{ cursor: "pointer", width: "7.8rem" }}
            className="mb-1"
          >
            <i className="fas fa-thumbs-up mr-2" style={{ color: "green" }}></i>
            {up + " upvotes"}
          </div>
          <div
            onClick={downClick}
            style={{ cursor: "pointer", width: "7.8rem" }}
          >
            <i className="fas fa-thumbs-down mr-2" style={{ color: "red" }}></i>
            {down + " downvotes"}
          </div>
        </div>
      </div>
      <hr className="w-75 ml-5" />
    </div>
  )
}

export default CommentsList
