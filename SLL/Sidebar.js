import React, { useEffect, useState } from "react";
import { Button, ListGroup, Offcanvas } from "react-bootstrap";
import { FaBars } from "react-icons/fa";
import firestore from "../firebase";

import "./style.css";

function LinkedListSidebar({ onLinkedListSelect }) {
  const [linkedListNames, setLinkedListNames] = useState([]);
  const [showSidebar, setShowSidebar] = useState(false);
  const [selectedLinkedList, setSelectedLinkedList] = useState(null);
  const [selectedName, setSelectedName] = useState(null);

  useEffect(() => {
    const fetchLinkedListNames = async () => {
      try {
        const querySnapshot = await firestore.collection("linkedLists").get();
        const names = querySnapshot.docs.map((doc) => doc.data().name);
        setLinkedListNames(names);
      } catch (error) {
        console.error("Error fetching linked list names:", error);
      }
    };

    fetchLinkedListNames();
  }, []);

  const handleLinkedListClick = (name) => {
    // Handle the click event for the selected linked list name
    console.log("Clicked on linked list:", name);

    // Fetch the selected linked list data from Firestore and update the state
    const fetchLinkedListData = async () => {
      try {
        const querySnapshot = await firestore
          .collection("linkedLists")
          .where("name", "==", name)
          .limit(1)
          .get();

        const data = querySnapshot.docs[0].data().data;
        setSelectedLinkedList(data);
        onLinkedListSelect(data); // Pass the selected linked list data to the parent component
        setSelectedName(name); // Update the selected name

      } catch (error) {
        console.error("Error fetching linked list data:", error);
      }
    };

    fetchLinkedListData();
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <>
      <Button className="sidebar-toggle" onClick={toggleSidebar}>
        <FaBars />
      </Button>
      <Offcanvas show={showSidebar} onHide={toggleSidebar}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Linked Lists</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ListGroup>
            {linkedListNames.map((name) => (
              <ListGroup.Item
                key={name}
                action
                onClick={() => handleLinkedListClick(name)}
                className={selectedName === name ? "active" : ""}
              >
                {name}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default LinkedListSidebar;
