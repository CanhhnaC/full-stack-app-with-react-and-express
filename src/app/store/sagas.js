import { take, put, select } from 'redux-saga/effects';
import uuid from 'uuid';
import axios from 'axios';
import { history } from './history';

import * as mutations from './mutations';

const url = 'http://localhost:7777';

export function* taskCreationSaga() {
  while (true) {
    const { groupID } = yield take(mutations.REQUEST_TASK_CREATION);
    const ownerID = yield select((state) => state.session.id);
    const taskID = uuid();
    let mutation = mutations.createTask(taskID, groupID, ownerID);

    const { res } = yield axios.post(url + '/task/new', {
      task: {
        id: taskID,
        group: groupID,
        owner: ownerID,
        isComplete: false,
        name: 'New Task',
      },
    });
    yield put(mutation);
  }
}

export function* taskModificationSaga() {
  while (true) {
    const task = yield take([
      mutations.SET_TASK_GROUP,
      mutations.SET_TASK_NAME,
      mutations.SET_TASK_COMPLETE,
    ]);

    axios.post(url + `/task/update`, {
      task: {
        id: task.taskID,
        group: task.groupID,
        name: task.name,
        isComplete: task.isComplete,
      },
    });
  }
}

export function* userAuthenticationSaga() {
  while (true) {
    const { username, password } = yield take(
      mutations.REQUEST_AUTHENTICATE_USER
    );
    try {
      const { data } = yield axios.post(url + '/authenticate', {
        username,
        password,
      });
      if (!data) {
        throw new Error();
      }
      console.log('authenticated', data.state);

      yield put(mutations.setState(data.state));
      yield put(
        mutations.processAuthenticateUser(mutations.AUTHENTICATED, {
          id: 'U1', // todo... get ID from response
          token: data.token,
        })
      );
      history.push(`/dashboard`);
    } catch (e) {
      console.log("can't auth");
      yield put(mutations.processAuthenticateUser(mutations.NOT_AUTHENTICATED));
    }
  }
}
