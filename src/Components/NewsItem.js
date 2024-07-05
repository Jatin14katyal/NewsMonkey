import React from "react";

const NewsItem = (props) => {
  let { title, description, imageUrl, url, author, date } = props;
  return (
    <div className="my-3 newsitem-card">
      <div className="card">
        <img
          src={
            !imageUrl
              ? "https://cdn.ndtv.com/common/images/ogndtv.png"
              : imageUrl
          }
          className="card-img-top"
          alt="..."
        />
        <div className="card-body card-body-siz">
          <h5 className="card-title text-light">
            {title} <span className="badge badge-primary">Primary</span>
          </h5>
          <p className="card-text">{description}...</p>
          <p className="card-text ">
            <small className="text-light">
              By {!author ? "unknown" : author} on{" "}
              {new Date(date).toGMTString()}
            </small>
          </p>

          <a href={url} className="btn btn sm btn-dark">
            Read More
          </a>
        </div>
      </div>
    </div>
  );
};

export default NewsItem;
