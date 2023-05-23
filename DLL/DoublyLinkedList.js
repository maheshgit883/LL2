import React, { useState } from 'react';
import Select from 'react-select';
import LinkedList from './LinkedListOp';
import LinkedListSidebar from "./Sidebar";
import RenderDLL from './Render';
import './style.css';
import firestore from "../firebase";


const Operations = [
  { label: " ", value: " " },
  { label: "Create", value: 1 },
  { label: "Push", value: 2 },
  { label: "Insert At", value: 3 },
  { label: "Delete", value: 4 },
  { label: "Update the value of", value: 5 },
  { label: "Get Element at", value: 6 },
  { label: "Get Index of", value: 7 },
  { label: "Get Size", value: 8 },
  { label: "Clear", value: 9 },
];

function DoublyLinkedList(props) {
  const [selectedOperation, setSelectedOperation] = useState(0);
  const [value, setValue] = useState("");
  const [index, setIndex] = useState("");
  const [linkedList, setLinkedList] = useState(() => new LinkedList());
  const [errorMessage, setErrorMessage] = useState("");
  const [linkedListName, setLinkedListName] = useState("");
  const [linkedListIndex, setLinkedListIndex] = useState("");
  const [selectedLinkedList, setSelectedLinkedList] = useState(null);

  const saveLinkedListToFirestore =async () => {
    const arr = linkedList.linkedListToArray();
    const docRef = firestore.collection("linkedLists").doc();
    
    // Store the generated document ID as the linkedListIndex
    setLinkedListIndex(docRef.id);
      // Check if the name already exists
      const nameExists = await firestore.collection("linkedLists").where("name", "==", linkedListName)
      .get()
      .then((querySnapshot) => !querySnapshot.empty)
      .catch((error) => {
        console.error("Error checking name existence:", error);
        return false;
      });
      if (nameExists) {
        setErrorMessage("The name already exists. Please choose a different name.");
        return;
      }
      try {
        await docRef.set({
          name: linkedListName,
          data: arr,
          type: props.type,
        });
    
        console.log("LinkedList saved to Firestore with doc id:", docRef.id);
        
      } catch (error) {
        console.error("Error saving LinkedList to Firestore:", error);
    
    }};
    const updateLinkedListDataInFirestore = () => {
      const newData = linkedList.linkedListToArray();
    
      if (linkedListIndex) {
        console.log("newData:", newData);
    
        const docRef = firestore.collection("linkedLists").doc(linkedListIndex);
    
        if (newData) {
          console.log("Updating linkedList data in Firestore:", newData);
    
          docRef
            .update({
              data: newData,
            })
            .then(() => {
              console.log("LinkedList data updated in Firestore!");
            })
            .catch((error) => {
              console.error("Error updating LinkedList data in Firestore:", error);
            });
        } else {
          console.error("Updated data is undefined. Cannot update data in Firestore.");
        }
      } else {
        console.error("LinkedList index is not set. Cannot update data in Firestore.");
      }
    };
  const handleOperationChange = (selectedOption) => {
    setSelectedOperation(selectedOption.value);
  };
  const handleNameChange = (event) => {
    setLinkedListName(event.target.value);
  };
  const handleValueChange = (event) => {
    setValue(event.target.value);
  };

  const handleIndexChange = (event) => {
    setIndex(event.target.value);
  };
  const handleLinkedListSelection = (linkedList) => {
    setSelectedLinkedList(linkedList);
  };

  const handleOperationSubmit = () => {
    try {
        if (selectedOperation === 1) {
        if (linkedListName.trim() === "") {
          setErrorMessage("Please enter a name");
          return;
        }
        const linkedList = new LinkedList();
        linkedList.name = linkedListName; 
        setLinkedList(linkedList);
        saveLinkedListToFirestore();
        console.log(linkedList);
      }
      else if (selectedOperation === 2) {
        if (value.trim() === "") {
          setErrorMessage("Please enter a value");
          return;
        }
        linkedList.push(value);
        console.log(linkedList);
        updateLinkedListDataInFirestore();
      } else if (selectedOperation === 3) {
        if (value.trim() === "" || index.trim() === "") {
          setErrorMessage("Please enter both value and index");
          return;
        }
        linkedList.insertAt(value, index);
        updateLinkedListDataInFirestore();
      } else if (selectedOperation === 4) {
        if (value.trim() === "") {
          setErrorMessage("Please enter an value");
          return;
        }
        linkedList.delete(value);
        updateLinkedListDataInFirestore();
      } else if (selectedOperation === 5) {
        if (index.trim() === "" || value.trim() === "") {
          setErrorMessage("Please enter both index and new value");
          return;
        }
        linkedList.updateValueAt(index, value);
        updateLinkedListDataInFirestore();
      } else if (selectedOperation === 6) {
        if (index.trim() === "") {
          setErrorMessage("Please enter an index");
          return;
        }
        linkedList.getElementAt(index);
      } else if (selectedOperation === 7) {
        if (value.trim() === "") {
          setErrorMessage("Please enter a value");
          return;
        }
        linkedList.getIndex(value);
      } else if (selectedOperation === 8) {
        linkedList.getSize();
        setSelectedOperation('');
      } else if (selectedOperation === 9) {
        linkedList.clear();
        updateLinkedListDataInFirestore();
        setSelectedOperation(0);
      } 
      setErrorMessage("");
      setValue("");
      setIndex("");
      setLinkedListName("");
    } catch (error) {
      console.error("An error occurred:", error);
      setErrorMessage("An error occurred");
    }
    
  };

  return (
    <div>
      <LinkedListSidebar onLinkedListSelect={handleLinkedListSelection} />
    <div className="container">
      <div className="row">
        <div className="col-md-3"></div>
        <div className="col-md-6 operation-container">
          <Select
            options={Operations}
            placeholder="Select Operation from menu"
            onChange={handleOperationChange}
          />
   
          <div className="input-group">
          {selectedOperation === 1 && (
              <>
                <input
                  type="text"
                  placeholder="Enter Name for LinkedList"
                  value={linkedListName}
                  onChange={handleNameChange}
                  className="input-field"
                />
              </>
            )}
            {selectedOperation === 2 && (
              <input
                type="text"
                placeholder="Enter Value"
                value={value}
                onChange={handleValueChange}
                className="input-field"
              />
            )}
            {selectedOperation === 3 && (
              <>
                <input
                  type="text"
                  placeholder="Enter Value"
                  value={value}
                  onChange={handleValueChange}
                  className="input-field"
                />
                <input
                  type="text"
                  placeholder="Enter Index"
                  value={index}
                  onChange={handleIndexChange}
                  className="input-field"
                />
              </>
            )}
            {selectedOperation === 4 && (
              <>
                <input
                  type="text"
                  placeholder="Enter value"
                  value={value}
                  onChange={handleValueChange}
                  className="input-field"
                />
              </>
            )}
            {selectedOperation === 5 && (
              <>
                <input
                  type="text"
                  placeholder="Enter Index"
                  value={index}
                  onChange={handleIndexChange}
                  className="input-field"
                />
                <input
                  type="text"
                  placeholder="Enter New Value"
                  value={value}
                  onChange={handleValueChange}
                  className="input-field"
                />
              </>
            )}
            {selectedOperation === 6 && (
              <>
                <input
                  type="text"
                  placeholder="Enter Index"
                  value={index}
                  onChange={handleIndexChange}
                  className="input-field"
                />
              </>
            )}
            {selectedOperation === 7 && (
              <>
                <input
                  type="text"
                  placeholder="Enter Value"
                  value={value}
                  onChange={handleValueChange}
                  className="input-field"
                />
              </>
            )}
            
          </div>
          <button onClick={handleOperationSubmit} className="submit-button">
            Submit
          </button>
          {errorMessage && <div className="error-message">{errorMessage}</div>}
          {linkedList.message && (
            <div className="message">{linkedList.message}</div>
          )}
          <RenderDLL linkedList={linkedList} />
          {selectedLinkedList && (
        <RenderDLL linkedList={selectedLinkedList} />
      )}       
        </div>

        <div className="col-md-3"></div>
      </div>
      </div>
    </div>
  );
}


export default DoublyLinkedList;
