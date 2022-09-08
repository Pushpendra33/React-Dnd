import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import '@atlaskit/css-reset';
import styled from 'styled-components';
import { DragDropContext } from 'react-beautiful-dnd';
import Column from './column';

const Container = styled.div`
  display: flex;
`;

const App = () => {
  const [tasks, setTasks] = useState({
    'task-1': { id: 'task-1', content: 'Take out the garbage' },
    'task-2': { id: 'task-2', content: 'Watch my favorite show' },
    'task-3': { id: 'task-3', content: 'Charge my phone' },
    'task-4': { id: 'task-4', content: 'Cook dinner' },
  });
  const [columns, setColumns] = useState({
    'column-1': {
      id: 'column-1',
      title: 'To do',
      taskIds: ['task-1', 'task-2', 'task-4', 'task-3'],
    },
    'column-2': {
      id: 'column-2',
      title: 'In progress',
      taskIds: [],
    },
    'column-3': {
      id: 'column-3',
      title: 'Done',
      taskIds: [],
    },
  });
  const [columnOrder, setColumnOrder] = useState([
    'column-1',
    'column-2',
    'column-3',
  ]);

  const [homeIndex, setHomeIndex] = useState();
  // const [isDropDisabled, setIsDropDisabled] = useState(false);

  const onDragStart = (start) => {
    // console.log(index);
    const homeIndexTemp = columnOrder.indexOf(start.source.droppableId);
    setHomeIndex(homeIndexTemp);
    // if (index < homeIndex && index < homeIndex - 1) {
    //   setIsDropDisabled(true);
    // }
  };

  const onDragEnd = (result) => {
    setHomeIndex(null);
    const { destination, source, draggableId } = result;
    // debugger;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const home = columns[source.droppableId];
    const foreign = columns[destination.droppableId];

    if (home === foreign) {
      const newTaskIds = Array.from(home.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(0, 0, draggableId);

      const newHome = {
        ...home,
        taskIds: newTaskIds,
      };

      setColumns((columns) => ({
        ...columns,
        [newHome.id]: newHome,
      }));

      return;
    }

    // moving from one list to another
    const homeTaskIds = Array.from(home.taskIds);
    homeTaskIds.splice(source.index, 1);
    const newHome = {
      ...home,
      taskIds: homeTaskIds,
    };

    const foreignTaskIds = Array.from(foreign.taskIds);
    foreignTaskIds.splice(destination.index, 0, draggableId);
    const newForeign = {
      ...foreign,
      taskIds: foreignTaskIds,
    };

    setColumns((columns) => ({
      ...columns,
      [newHome.id]: newHome,
      [newForeign.id]: newForeign,
    }));
  };

  console.log('Home Index: ', homeIndex);
  return (
    <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
      <Container>
        {columnOrder.map((columnId, index) => {
          const column = columns[columnId];
          const tasked = column.taskIds.map((taskId) => {
            return tasks[taskId];
          });

          console.log('tasked are ', tasked);
          // debugger;

          var isDropDisabled = false;
          if (homeIndex > index && index < homeIndex - 1) {
            isDropDisabled = true;
          }
          // if (index < homeIndex && index < homeIndex - 1) {
          //   isDropDisabled = true;
          // }

          // console.log('isDropDisabled is : ', isDropDisabled);
          // console.log('index is: ', index);

          return (
            <Column
              key={column.id}
              column={column}
              tasks={tasked}
              isDropDisabled={isDropDisabled}
            />
          );
        })}
      </Container>
    </DragDropContext>
  );
};

export default App;

// var isDropDisabled = false;
// if (index < homeIndex && index < homeIndex - 1) {
//   isDropDisabled = true;
// }
