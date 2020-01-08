import React from "react";
import ListItem from "../ListItem";
import "./styles.scss";

class DraggableList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sourceList: [
        { name: "Mazon", title: "Super Man" },
        { name: "Jack", title: "Iron Man" },
        { name: "Peter", title: "Spider Man" },
        { name: "Ben", title: "Bat Man" }
      ],
      targetList: [{ name: "Alien", title: "Predeator" }],
      draggingItem: null
    };
  }

  onDragOver = (e, palette) => {
    e.stopPropagation();
    e.preventDefault();
  };

  onDrop = (e, palette) => {
    console.log(`Dropped : ${palette}`);
    let updatedSoruceList;
    let updatedTargetList;
    const { sourceList, targetList, draggingItem } = this.state;
    if (palette === "SOURCE") {
      let index = targetList.findIndex(user => user.name === draggingItem.name);
      targetList.splice(index, 1);
      updatedTargetList = [...targetList];
      updatedSoruceList = [...sourceList, draggingItem];
    } else {
      let index = sourceList.findIndex(user => user.name === draggingItem.name);
      sourceList.splice(index, 1);
      updatedSoruceList = [...sourceList];
      updatedTargetList = [...targetList, draggingItem];
    }
    this.setState({
      sourceList: updatedSoruceList,
      targetList: updatedTargetList,
      draggingItem: null
    });
  };

  setDraggingItem = item => {
    console.log(`Dragging : ${item.name}`);
    this.setState({ draggingItem: item });
  };

  render() {
    const { sourceList, targetList } = this.state;
    return (
      <div className="list-container">
        <div className="list-wrap">
          <h4>Target </h4>
          <div
            className="user-list target"
            onDragOver={e => {
              this.onDragOver(e, "TARGET");
            }}
            onDrop={e => {
              this.onDrop(e, "TARGET");
            }}
          >
            {targetList.map(user => {
              const { name, title } = user;
              return (
                <ListItem
                  key={name}
                  name={name}
                  title={title}
                  onDragStart={() => this.setDraggingItem(user)}
                />
              );
            })}
          </div>
        </div>
        <div className="list-wrap">
          <h4>Source</h4>
          <div
            className="user-list source"
            onDragOver={e => {
              this.onDragOver(e, "SOURCE");
            }}
            onDrop={e => {
              this.onDrop(e, "SOURCE");
            }}
          >
            {sourceList.map(user => {
              const { name, title } = user;
              return (
                <ListItem
                  key={name}
                  name={name}
                  title={title}
                  onDragStart={() => this.setDraggingItem(user)}
                />
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default DraggableList;
