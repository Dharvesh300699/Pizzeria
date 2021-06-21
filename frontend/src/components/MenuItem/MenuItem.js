import React from "react"
import "./MenuItem.css"

const MenuItem = ({ title, clicked, image, description }) => {
  return (
    <div className="col m-2 menu-item">
      <p className="text-center fs-4 fw-normal py-1 py-sm-2 my-2">{title}</p>
      <img className="menu-image" src={image} alt={title} />
      <p className="text-center fw-lighter">{description}</p>
      <div className="row">
        <div className="col text-center mb-3">
          <button type="button" className="btn btn-first" onClick={clicked}>
            VIEW ALL
          </button>
        </div>
      </div>
    </div>
  )
}

export default MenuItem
