class Node {
    constructor(value) {
      this.value = value;
      this.prev = null;
      this.next = null;
    }
  }
  
  class LinkedList {
    constructor() {
      this.head = null;
      this.tail = null;
      this.count = 0;
      this.message = '';
    }
  
    push(value) {
      const newNode = new Node(value);
      if (this.head === null) {
        this.head = newNode;
        this.tail = newNode;
      } else {
        newNode.prev = this.tail;
        this.tail.next = newNode;
        this.tail = newNode;
      }
      this.count++;
      this.message = `Successfully pushed value: ${value}`;
      // return newNode;
    }
  
    insertAt(value, index) {
      if (index < 0 || index > this.count) {
        this.message = 'Index out of bounds';
        throw new Error(this.message);
      }
      if (index === 0) {
        const newNode = new Node(value);
        newNode.next = this.head;
        if (this.head) {
          this.head.prev = newNode;
        }
        this.head = newNode;
        if (this.tail === null) {
          this.tail = newNode;
        }
      } else if (index === this.count) {
        this.push(value);
      } else {
        const newNode = new Node(value);
        let current = this.head;
        for (let i = 0; i < index - 1; i++) {
          current = current.next;
        }
        newNode.prev = current;
        newNode.next = current.next;
        current.next.prev = newNode;
        current.next = newNode;
      }
      this.count++;
      this.message = `Successfully inserted value: ${value} at index: ${index}`;
    }
  
    delete(value) {
      let current = this.head;
      while (current) {
        if (current.value === value) {
          if (current === this.head) {
            this.head = current.next;
            if (this.head) {
              this.head.prev = null;
            }
            if (current === this.tail) {
              this.tail = null;
            }
          } else if (current === this.tail) {
            this.tail = current.prev;
            this.tail.next = null;
          } else {
            current.prev.next = current.next;
            current.next.prev = current.prev;
          }
          this.count--;
          this.message = `Successfully deleted value: ${value}`;
          return;
        }
        current = current.next;
      }
      this.message = `Value not found: ${value}`;
      throw new Error(this.message);
    }
  

updateValueAt(index, value) {
    if (index < 0 || index >= this.count) {
      this.message = 'Index out of bounds';
      throw new Error(this.message);
    }
    let current = this.head;
    for (let i = 0; i < index; i++) {
      current = current.next;
    }
    current.value = value;
    this.message = `Successfully updated value at index ${index}`;
  }
  
  getElementAt(index) {
    if (index < 0 || index >= this.count) {
      this.message = 'Index out of bounds';
      throw new Error(this.message);
    }
    let current = this.head;
    for (let i = 0; i < index; i++) {
      current = current.next;
    }
    this.message = `Element at index ${index} is ${current.value}`;
    return current.value;
  }
  
  getIndex(value) {
    let current = this.head;
    let index = 0;
    while (current) {
      if (current.value === value) {
        this.message = `Index of value ${value} is ${index}`;
        return index;
      }
      current = current.next;
      index++;
    }
    this.message = `Value not found: ${value}`;
    throw new Error(this.message);
  }
  
  getSize() {
    this.message = `Size of the linked list is ${this.count}`;
    return this.count;
  }
  
  clear() {
    this.head = null;
    this.tail = null;
    this.count = 0;
    this.message = 'Linked list cleared';
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
  
  
  