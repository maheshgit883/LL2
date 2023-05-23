class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.count = 0; 
    this.message = ""; 
  }

  push(value) {
    const newNode = new Node(value);
    if (!this.head) {
      this.head = newNode;
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = newNode;
    }
    this.count++; 
    this.message = `Successfully pushed value: ${value}`; 
  }

  insertAt(value, index) {
    const newNode = new Node(value);
    if (index === 0) {
      newNode.next = this.head;
      this.head = newNode;
    } else {
      let current = this.head;
      let prev = null;
      let currentIndex = 0;

      while (current && currentIndex < Number(index)) {
        prev = current;
        current = current.next;
        currentIndex++;
      }
      if (currentIndex === Number(index)) {
        if (prev) {
          prev.next = newNode;
        } else {
          this.head = newNode;
        }
        newNode.next = current;
        this.count++; 
        this.message = `Successfully inserted value: ${value} at index: ${index}`; // Set success message
      } else {
        this.message = "Invalid index."; 
      }
    }
  }

  delete(value) {
    let current = this.head;
    let prev = null;
    while (current) {
      if (current.value === value) {
        if (prev) {
          prev.next = current.next;
        } else {
          this.head = current.next;
        }
        this.count--; 
        this.message = `Successfully deleted value: ${value}`;
        return;
      }
      prev = current;
      current = current.next;
    }
    this.message = `Value not found: ${value}`;
  }

  updateValueAt(index, newValue) {
    let current = this.head;
    let currentIndex = 0;
    while (current && currentIndex < Number(index)) {
      current = current.next;
      currentIndex++;
    }

    if (currentIndex === Number(index) && current) {
      current.value = newValue;
      this.message = `Successfully updated value at index: ${index}`; 
    } else {
      this.message = "Invalid index."; 
    }
  }

  getElementAt(index) {
    let current = this.head;
    let currentIndex = 0;

    while (current && currentIndex < Number(index)) {
      current = current.next;
      currentIndex++;
    }

    if (currentIndex === Number(index) && current) {
      this.message = `Element at index ${index}: ${current.value}`; // Set success message
    } else {
      this.message = "Invalid index."; // Set error message
    }
  }

  getIndex(value) {
    let current = this.head;
    let currentIndex = 0;
    while (current) {
      if (current.value === value) {
        this.message = `Index of value ${value}: ${currentIndex}`; 
        return;
      }
      current = current.next;
      currentIndex++;
    }
    this.message = `Value ${value} not found in the list.`; 
  }

  getSize() {
    this.message = `Size of the list: ${this.count}`;
  }

  clear() {
    this.head = null;
    this.count = 0;
    this.message = "List cleared.";
  }

  linkedListToArray() {
    const arr = [];
    let current = this.head;
    while (current) {
      arr.push(current.value);
      current = current.next;
    }
    return arr;
  }
}

export default LinkedList;
