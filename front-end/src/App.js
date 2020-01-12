
import './tailwind.css';
import './App.css'
import React, { useMemo, useState, useEffect } from "react";
import axios from 'axios';
import Table from "./components/Table";
import { useFilters } from 'react-table';
import title from './title.png'

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
    <div className="bg-gray-700 h-screen">
      <div className=" mx-auto block bg-orange-500 h-16">
        <img src={title} style={{height:'100px',width:'300px'}} className="bg-fixed mx-auto"></img>
      </div>
    <div className=" App container mx-auto border border-gray-400 my-8 bg-white h-full bg-gray-200" style={{maxHeight:'84vh',minHeight:'60vh'}}>
      <div className=" object-contain flex-wrap w-auto flex justify-center flex-col overflow-y-auto" >
        <Table columns={columns} data={data} />
      </div>
    </div>
    </div>
  );
}

export default App;