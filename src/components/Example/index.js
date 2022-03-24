import React, { useState, useRef, useEffect } from "react";
import "./style.css";
import { AiOutlinePlus } from "react-icons/ai";
import { RiDeleteBin5Line } from "react-icons/ri";

function DragNDrop({ data }) {
  const [list, setList] = useState(data);
  const [dragging, setDragging] = useState(false);
  const [textarea, settextarea] = useState(null);
  const [newtask, setnewtask] = useState("");

  useEffect(() => {
    setList(data);
  }, [setList, data]);

  const dragItem = useRef();
  const dragItemNode = useRef();

  const handletDragStart = (e, item) => {
    console.log("Starting to drag", item);
    console.log("Starting to drag e.target", e.target, e);
    dragItemNode.current = e.target;
    dragItemNode.current.addEventListener("dragend", handleDragEnd);
    dragItem.current = item;

    setTimeout(() => {
      setDragging(true);
    }, 0);
  };
  const handleDragEnter = (e, targetItem) => {
    console.log("Entering a drag target", targetItem, dragItem.current);
    if (dragItemNode.current !== e.target) {
      console.log("Target is NOT the same as dragged item");
      setList((oldList) => {
        console.log(oldList);
        let newList = JSON.parse(JSON.stringify(oldList));
        console.log(newList);
        newList[targetItem.grpI].items.splice(
          targetItem.itemI,
          0,
          newList[dragItem.current.grpI].items.splice(
            dragItem.current.itemI,
            1
          )[0]
        );

        dragItem.current = targetItem;
        return newList;
      });
    }
  };
  const handleDragEnd = (e) => {
    setDragging(false);
    dragItem.current = null;
    dragItemNode.current.removeEventListener("dragend", handleDragEnd);
    dragItemNode.current = null;
  };
  const getStyles = (item) => {
    if (
      dragItem.current.grpI === item.grpI &&
      dragItem.current.itemI === item.itemI
    ) {
      return "dnd-item current";
    }
    return "dnd-item";
  };

  const onhandleadd = (id) => {
    settextarea(id);
  };

  const handleaddig = (id) => {
    setList((oldList) => {
      let newttast = JSON.parse(JSON.stringify(oldList));
      console.log(newttast);
      newttast[id] = {
        title: [...oldList[id].title],
        items: [...oldList[id].items, newtask],
      };
      console.log(newttast);
      setnewtask("");
      return newttast;
    });
  };

  const handledelete = (grpid, itemid) => {
    setList((oldList) => {
      let newttast = JSON.parse(JSON.stringify(oldList));

      newttast[grpid] = {
        title: [...oldList[grpid].title],
        items: newttast[grpid].items.filter((x, i) => i !== itemid),
      };
      console.log(newttast);
      return newttast;
    });
  };
  if (list) {
    return (
      <div className="drag-n-drop">
        {list.map((grp, grpI) => (
          <div
            key={grp.title}
            onDragEnter={
              dragging && !grp.items.length
                ? (e) => handleDragEnter(e, { grpI, itemI: 0 })
                : null
            }
            className="dnd-group"
          >
            <div className="group-heading">
              <div className="title">
                <span className="count">{grp.items.length}</span>
                <span className="name">{grp.title}</span>
              </div>
              <div className="add" onClick={() => onhandleadd(grpI)}>
                <AiOutlinePlus />
              </div>
            </div>
            {textarea == grpI ? (
              <>
                <textarea
                  id="task"
                  name="task"
                  rows="5"
                  cols="33"
                  placeholder="Enter task"
                  value={newtask}
                  onChange={(e) => setnewtask(e.target.value)}
                />
                <div className="btn">
                  <button
                    className="textadd"
                    disabled={!newtask}
                    onClick={() => handleaddig(grpI)}
                  >
                    Add
                  </button>
                  <button
                    className="textcancel"
                    onClick={() => settextarea(-1)}
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : null}
            {grp.items.map((item, itemI) => (
              <div
                draggable
                key={item}
                onDragStart={(e) => handletDragStart(e, { grpI, itemI })}
                onDragEnter={
                  dragging
                    ? (e) => {
                        handleDragEnter(e, { grpI, itemI });
                      }
                    : null
                }
                className={dragging ? getStyles({ grpI, itemI }) : "dnd-item"}
              >
                <div className="itemcontainer">
                  <div className="itemdata">
                    <div
                      className="box"
                      style={{
                        backgroundColor:
                          grpI == 0 ? "red" : grpI == 1 ? "yellow" : "green",
                      }}
                    ></div>
                    <div className="itemname">{item}</div>
                  </div>
                  <div
                    onClick={() => handledelete(grpI, itemI)}
                    className="itemdelete"
                  >
                    <RiDeleteBin5Line />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  } else {
    return null;
  }
}

export default DragNDrop;
