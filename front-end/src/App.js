
import './tailwind.css';
import './App.css'
import React, { useMemo, useState, useEffect } from "react";
import axios from 'axios';
import Table from "./components/Table";

function App() {
  // data state to store the Pokedex API data. Its initial value is an empty array
  const [data, setData] = useState([]);

  // Using useEffect to call the API once mounted and set the data
  useEffect(() => {
    (async () => {
      const result = await axios("https://pokeapi.co/api/v2/pokemon/");

      setData(result.data.results);
    })();
  }, []);

  console.log("data", data);
  const columns = useMemo(
    () => [
      {
        // first group - Pokedex results
        Header: "Pokedex",
        // First group columns
        columns: [
          {
            Header: "Name",
            accessor: "name"
          },
          {
            Header: "Type",
            accessor: "url"
          }
        ]
      },
    ],
    []
  );

  return (
    <div className="App">
      <div className="object-contain flex-wrap w-auto flex justify-center flex-col">
        <Table columns={columns} data={data} />
      </div>
    </div>
  );
}

export default App;