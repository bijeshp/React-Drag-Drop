import React from "react";
import "./styles.scss";

const ListItem = props => {
  const { name, title, onDragStart } = props;
  return (
    <div className="list-item" draggable onDragStart={onDragStart}>
      <div className="avatar"> </div>
      <div className="content">
        <h5 className="name">{name}</h5>
        <h5 className="title">{title}</h5>
      </div>
    </div>
  );
};

export default ListItem;
