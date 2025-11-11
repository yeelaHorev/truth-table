import React from "react";
import "../style/TruthTable.css";

interface TruthTableProps {
  columns: string[]; // column headers
  rows: (string | boolean)[][]; // each row is an array of values
}

export const TruthTable: React.FC<TruthTableProps> = ({ columns, rows }) => {
  return (
    <div className="truth-table-wrapper">
      <table className="truth-table">
        <thead>
          <tr>
            {columns.map((col, i) => (
              <th key={i}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => {
                console.log(cell);
                return (
                  <td key={j} className={cell ? "cell-true" : "cell-false"}>
                    {cell ? "T" : "F"}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
