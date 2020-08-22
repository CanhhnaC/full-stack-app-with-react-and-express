import React from 'react';
import { connect } from 'react-redux';

import { ConnectedTaskList } from './TaskList';

export const Dashboard = ({ groups }) => {
  return (
    <div>
      <h2>Dashboard</h2>
      {groups.map((group) => (
        <ConnectedTaskList key={group.id} name={group.name} id={group.id} />
      ))}
    </div>
  );
};

const mapStateToProps = ({ groups }) => ({ groups });

export const ConnectedDashboard = connect(mapStateToProps)(Dashboard);
