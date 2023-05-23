import React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import './style.css';

function LinkedListNode({ value, hasNext }) {
  return (
    <div className="node">
      <div className="value">{value}</div>
      {hasNext && <FaArrowRight className="arrow" />}
    </div>
  );
}

function RenderSLL({ linkedList }) {
  let nodes = [];

  if (Array.isArray(linkedList)) {
    // If the linkedList prop is already an array, render it directly
    nodes = linkedList.map((value, index) => (
      <LinkedListNode
        key={index}
        value={value}
        hasNext={index !== linkedList.length - 1}
      />
    ));
  } else {
    // If the linkedList prop is a LinkedList instance, convert it to an array and render
    let current = linkedList.head;
    let index = 0;

    while (current) {
      nodes.push(
        <LinkedListNode
          key={index}
          value={current.value}
          hasNext={current.next !== null}
        />
      );
      current = current.next;
      index++;
    }
  }

  return (
    <div className="linked-list-container">
      <div className="linked-list">{nodes}</div>
    </div>
  );
}

export default RenderSLL;
