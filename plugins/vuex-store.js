import {createStore} from '~/store';

export default ({app}) => {
  app.store = createStore();
};
