import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

const Container = styled.div`
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
  background-color: ${(props) =>
    props.isDragDisabled
      ? 'lightgrey'
      : props.isDragging
      ? 'lightgreen'
      : 'white'};
`;

function Task(props) {
  const isDragDisabled = props.task.id === 'task-1';
  // debugger;
  return (
    <Draggable
      draggableId={props.task.id}
      index={props.index}
      isDragDisabled={isDragDisabled}
    >
      {(provided, snapshot) => (
        <Container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          innerRef={provided.innerRef}
          isDragging={snapshot.isDragging}
          isDragDisabled={isDragDisabled}
        >
          {props.task.content}
        </Container>
      )}
    </Draggable>
  );
}

export default Task;

// tasks: [
//   { id: 'task-1', content: 'Take out the garbage' },
//   { id: 'task-2', content: 'Watch my favorite show' },
//   { id: 'task-3', content: 'Charge my phone' },
//   { id: 'task-4', content: 'Cook dinner' },
// ],
