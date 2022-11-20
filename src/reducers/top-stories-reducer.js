import * as c from '../actions/ActionTypes';

const topStoriesReducer = (state, action) => {
  switch (action.type) {

    case c.GET_TOP_STORIES_SUCCESS:
      return {
        ...state, 
        isLoaded: true,
        topStories: action.topStories
      };//Our new action returns a new state object: we use JavaScript's spread syntax to make a copy of the state object, and we specify that isLoaded is set to true and the topStories property is set to action.topStories — the payload we've passed into our action.

    case c.GET_TOP_STORIES_FAILURE:
      return {
        ...state,
        isLoaded: true,
        error: action.error
      };

    default:
      throw new Error(`There is no action matching ${action.type}.`);
  }
};

export default topStoriesReducer;