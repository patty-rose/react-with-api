import React, { useReducer, useEffect } from 'react';
import topStoriesReducer from './../reducers/top-stories-reducer';
import { getTopStoriesFailure, getTopStoriesSuccess } from './../actions/index';

const initialState = {//initial state for the useReducer hook.
  isLoaded: false,
  topStories: [],
  error: null
};

function TopStories() {
  const [state, dispatch] = useReducer(topStoriesReducer, initialState);

  useEffect(() => {
    fetch(`https://api.nytimes.com/svc/topstories/v2/home.json?api-key=${process.env.REACT_APP_API_KEY}`)
      .then(response => {
        if (!response.ok) {//a catch block with fetch() will only catch internal server errors — not issues like a 404 error code-- need to add in additional error checking here either from API response error handling or status.ok
          throw new Error (`${response.status}: ${response.statusText}`);
        } else {
          return response.json()//Once the API call is complete, the response will be converted to JSON.
        }
      })
      .then((jsonifiedResponse) => {//Then, once it's been converted, we'll have our results. If all went well, we call setTopStories() with the top stories data and set isLoaded to true by calling setIsLoaded(true). 
        //create an action and then dispatch it:
        const action = getTopStoriesSuccess(jsonifiedResponse.results)
        dispatch(action);//Because the topStories are stored in a property of the response called results, we update the topStories state to be jsonifiedResponse.results.
      })
    .catch((error) => {
      //create an action and then dispatch it:
      const action = getTopStoriesFailure(error.message)
      dispatch(action);
    });
  }, [])//Since we've passed in an empty array dependency, this useEffect() hook will run once, after our component is first rendered.

  const { error, isLoaded, topStories } = state;//destructure error, isLoaded, and topStories from the state variable.

  if (error) {
    return <h1>Error: {error}</h1>;
  } else if (!isLoaded) {
    return <h1>...Loading...</h1>;
  } else {
    return (
      <React.Fragment>
        <h1>Top Stories</h1>
        <ul>
          {topStories.map((article, index) =>
            <li key={index}>
              <h3>{article.title}</h3>
              <p>{article.abstract}</p>
            </li>
          )}
        </ul>
      </React.Fragment>
    );
  }
}

export default TopStories;

//STEPS:
// First, we need to import useReducer from React. We'll also need to remove the useState import since we're no longer using it.
// Next, we need to import the two action creators that we'll use to generate our actions: getTopStoriesFailure and getTopStoriesSuccess.
// Next, outside of the TopStories component, we create our initial state that will be added as an argument to the useReducer() hook. We could instead put the initial state in a separate file, or even in top-stories-reducer.js, and import it into TopStories.js. Whatever you do, you should be consistent across your entire application.
// We remove the three useState() statements and replace them with a useReducer() hook, passing in the initialState and topStoriesReducer. We save the state and dispatch function that's returned from the useReducer() hook in the variables state and dispatch; remember that we can call these variables anything so long as it is descriptive of what it represents.
// Later in the useEffect() hook and API call logic, when we receive a successful response or a failure response, we use either of our two action creator functions to generate an action, and then we dispatch that action using the dispatch() function.
// Finally, the last step in this refactor is to destructure the error, isLoaded, and topStories variables from the state variable.