import { GET_TASKS} from '../actions/types';

export default function postReducer(state = [], action) {
  switch (action.type) {
      case GET_TASKS:
      return action.tasks;
    default:
      return state;
  }
}
