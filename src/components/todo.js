import React, { useEffect, useState } from "react";
import "./style.css";

const getLocalData = () => {
  const items = localStorage.getItem("todolist");
  if (items) {
    // console.log(items);
    return JSON.parse(items);
  } else {
    return [];
  }
};
const Todo = () => {
  const [inputData, setInputData] = useState("");
  const [items, setItems] = useState(getLocalData());
  const [isEdititem, setIsEditItem] = useState("");
  const [toggleButton, setToggleButton] = useState(false);

  //functions
  const addItem = () => {
    if (!inputData) {
      alert("PLEASE ENTER SOME ITEM");
    } else if (inputData && toggleButton) {
      setItems(
        items.map((item) => {
          if (item.id === isEdititem) {
            return { ...item, name: inputData };
          } else {
            return item;
          }
        })
      );
      setInputData("");
      setIsEditItem(null);
      setToggleButton(false);
    } else {
      const myNewInputData = { id: new Date().getTime(), name: inputData };
      setItems([...items, myNewInputData]);
      setInputData("");
    }
  };

  //edit todo
  const editItem = (id) => {
    const item_todo_edited = items.find((item) => {
      return item.id === id;
    });
    // console.log(item_todo_edited);
    setInputData(item_todo_edited.name);
    setIsEditItem(id);
    setToggleButton(true);
  };

  //delete todo
  const deleteItem = (id) => {
    const updatedList = items.filter((item) => {
      return id !== item.id;
    });
    setItems(updatedList);
  };
  const removeAll = () => {
    setItems([]);
  };
  useEffect(() => {
    localStorage.setItem("todolist", JSON.stringify(items));
  }, [items]);
  document.addEventListener("keypress", function (e) {
    // console.log(e);
    if (e.key === "Enter" && inputData) {
      addItem();
    }
  });
  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img src="./images/todo.svg" alt="todologo" />
            <figcaption>Start typing your list✍️</figcaption>
          </figure>
          <div className="addItems">
            <input
              className="form-control"
              type="text"
              placeholder="✨ Add Item"
              value={inputData}
              onChange={(e) => {
                setInputData(e.target.value);
              }}
            ></input>
            {toggleButton ? (
              <i
                className="far fa-edit add-btn"
                onClick={() => {
                  addItem();
                }}
              ></i>
            ) : (
              <i
                className="fa fa-plus add-btn"
                onClick={() => {
                  addItem();
                }}
              ></i>
            )}
          </div>
          <div className="showItems">
            {items.map((item) => {
              return (
                <div className="eachItem" key={item.id}>
                  <h3>{item.name}</h3>
                  <div className="todo-btn">
                    <i
                      className="far fa-edit add-btn"
                      onClick={() => {
                        editItem(item.id);
                      }}
                    ></i>
                    <i
                      className="far fa-trash-alt  add-btn"
                      onClick={() => {
                        deleteItem(item.id);
                      }}
                    ></i>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="showItems">
            <button
              className="btn effect04"
              data-sm-link-text="Remove All"
              onClick={() => {
                removeAll();
              }}
            >
              <span>Check List</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Todo;
