import React, { useState } from 'react';

function TopStories() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [topStories, setTopStories] = useState([]);

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
          setTopStories(jsonifiedResponse.results)//Because the topStories are stored in a property of the response called results, we update the topStories state to be jsonifiedResponse.results.
          setIsLoaded(true)
        })
      .catch((error) => {
        setError(error)
        setIsLoaded(true)
      });
    }, [])//Since we've passed in an empty array dependency, this useEffect() hook will run once, after our component is first rendered.

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