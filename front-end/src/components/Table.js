
import React,{useState} from "react";
import { useTable, useFilters } from "react-table";

export default function Table({ columns, data }) {
  // Use the useTable Hook to send the columns and data to build the table
  const {
    getTableProps, // table props from react-table
    getTableBodyProps, // table body props from react-table
    headerGroups, // headerGroups if your table have groupings
    rows, // rows for the table based on the data passed
    prepareRow, // Prepare the row (this function need to called for each row before getting the row props)
    setFilter
  } = useTable({
    columns,
    data
  }, useFilters);
  const [filterInput, setFilterInput] = useState("");

  const handleFilterChange = e => {
    const value = e.target.value || undefined;
    setFilter("name", value); // Update the show.name filter. Now our table will filter and show only the rows which have a matching value
    setFilterInput(value);
  };

  /* 
    Render the UI for your table
    - react-table doesn't have UI, it's headless. We just need to put the react-table props from the Hooks, and it will do its magic automatically
  */
  return (
    <>
    <div className="py-2">
    <input
    className="h-8 w-64 font-normal text-black shadow appearance-none border border-black rounded px-2 leading-tight focus:outline-none focus:shadow-outline"
  value={filterInput}
  onChange={handleFilterChange}
  placeholder={"Search name"}
/>
</div>
<div className="flex justify-center">
    <table {...getTableProps()} className="table-auto w-1/2 ">
      <thead>
        {headerGroups.map(headerGroup => (
          <tr className="" {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th  className="px-4 py-2 border border-gray-400"{...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return <td className="border px-4 py-2" {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
    </div>
    </>
  );
}