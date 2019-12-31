import React, { useState } from "react";
import gql from "graphql-tag";
import { useLazyQuery } from "@apollo/react-hooks";

import "./App.css";

const GET_REPOS = gql`
  query Repos($login: String!) {
    user(login: $login) {
      repositories(first: 50) {
        edges {
          node {
            id
            name
          }
        }
      }
    }
  }
`;

function App() {
  const [username, setUsername] = useState("");
  const [getRepositories, { loading, error, data }] = useLazyQuery(GET_REPOS);

  return (
    <div>
      <h1>Search Repositories</h1>

      <div>
        <label for="username">GitHub Username: </label>
        <input
          id="username"
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />

        <button
          type="button"
          onClick={() => getRepositories({ variables: { login: username } })}
        >
          Search
        </button>
      </div>

      {loading && <span>Loading...</span>}

      {data && data.user.repositories.edges.length > 0 && (
        <div className="repoList">
          <h2>Repositories:</h2>
          {!loading &&
            !error &&
            data &&
            data.user.repositories.edges.map(repo => (
              <span>{repo.node.name}</span>
            ))}
        </div>
      )}

      {error && <span>Error fetching repositories.</span>}
    </div>
  );
}

export default App;
