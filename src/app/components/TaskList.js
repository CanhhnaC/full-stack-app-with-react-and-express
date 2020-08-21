import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { requestTaskCreation } from '../store/mutations';

export const TaskList = ({ tasks, name, createNewTask, id }) => (
  <div>
    <h3>{name}</h3>
    <div>
      {tasks.map((task) => (
        <div key={task.id}>
          {task.name}
          {task.id}
        </div>
      ))}
    </div>
    <button onClick={() => createNewTask(id)}>Add new</button>
  </div>
);

const mapStateToProps = (state, ownProps) => {
  let groupId = ownProps.id;
  return {
    name: ownProps.name,
    id: groupId,
    tasks: state.tasks.filter((task) => task.group === groupId),
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    createNewTask(id) {
      console.log('creating new task', id);
      dispatch(requestTaskCreation(id));
    },
  };
};

export const ConnectedTaskList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskList);
