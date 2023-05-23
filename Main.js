import "./Main.css";

import React, { useState } from "react";

import { Form } from "react-bootstrap";

import SinglyLinkedList from "./SLL/SinglyLinkedList";

import DoublyLinkedList from "./DLL/DoublyLinkedList";

function Main() {
  const [type, setType] = useState("");
  const handleSelect = (event) => {
    setType(event.target.value);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12 text-center">
          {type && <h3 className="text-danger">{type}</h3>}
        </div>
        <div className="col-md-3"></div>
        <div className="col-md-6">
          <Form.Select aria-label="LinkedList type" onChange={handleSelect}>
            <option>Select the type of LinkedList</option>
            <option value="SinglyLinkedList">SinglyLinkedList</option>
            <option value="DoublyLinkedList">DoublyLinkedList</option>
          </Form.Select>
          {type === "SinglyLinkedList" && <SinglyLinkedList type={type} />}
          {type === "DoublyLinkedList" && <DoublyLinkedList type={type}/>}
        </div>
        <div className="col-md-4"></div>
      </div>
    </div>
  );
}

export default Main;
