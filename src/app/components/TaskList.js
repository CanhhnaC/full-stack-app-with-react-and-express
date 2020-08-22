import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { requestTaskCreation } from '../store/mutations';
import { Link } from 'react-router-dom';

export const TaskList = ({ tasks, name, createNewTask, id }) => (
  <div>
    <h3>{name}</h3>
    <div>
      {tasks.map((task) => (
        <Link key={task.id} to={`/task/${task.id}`}>
          <div>{task.name}</div>
        </Link>
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

const mapDispatchToProps = (dispatch, ownProps) => ({
  createNewTask(id) {
    dispatch(requestTaskCreation(id));
  },
});

export const ConnectedTaskList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskList);
