import { addNewTask, updateTask } from './server';

(async function myFunc() {
  await addNewTask({
    name: 'My task',
    id: '123465',
  });
  await updateTask({
    id: '123465',
    name: 'Update my task',
  });
})();
