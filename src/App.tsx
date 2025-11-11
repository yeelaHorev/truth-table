import { useState } from "react";
import { GetNumOfCol, GetRows, Logic } from "./functions";
import { TruthTable } from "./components";
import { logicSymbols } from "./consts";
import "./App.css";

function App() {
  const [columns, setColumns] = useState<string[]>([]);
  const [rows, setRows] = useState<boolean[][]>([]);
  const [formula, setFormula] = useState<string>("");

  const addSymbol = (symbol: string) => setFormula((prev) => prev + symbol);

  const updateColumns = () => {
    const vars = GetNumOfCol(formula);
    const newRows = GetRows(vars.length);
    try {
      const resultColumn = Logic(formula, vars, newRows);
      const updatedRows = newRows.map((row, i) => [...row, resultColumn[i]]);
      setColumns([...vars, formula]);
      setRows(updatedRows);
    } catch (err: any) {
      alert("זה זוועה זה לא טענה מה עשית");
    }
  };

  return (
    <>
      <div className="truth-table-container">
        <form
          onSubmit={(e) => {
            e.preventDefault(); // prevent page reload
            updateColumns(); // call your submit function
          }}
        >
          <div id="title-and-input">
            <h2>Truth Table Generator:</h2>
            <input
              id="formula"
              type="text"
              value={formula}
              onChange={(e) => setFormula(e.target.value)}
              placeholder="Enter formula..."
              className="truth-table-input"
            />
          </div>

          <div className="symbol-buttons">
            {logicSymbols.map((v) => (
              <button type="button" key={v} onClick={() => addSymbol(v)}>
                {v}
              </button>
            ))}
            <button type="submit" id="submit-button">
              Submit
            </button>
          </div>
        </form>
      </div>
      {columns.length ? (
        <TruthTable columns={columns} rows={rows} />
      ) : (
        <div className="formula-vocabulary">
          <h2>write some teana!</h2>
          <h2>Keyboard Shortcuts:</h2>
          <ul>
            <ol>
              <b>!</b> = ¬
            </ol>
            <ol>
              <b>&</b> = ∧
            </ol>
            <ol>
              <b>|</b> = ∨
            </ol>
            <ol>
              <b>→</b> = →
            </ol>
            <ol>
              <b>↔</b> = ↔
            </ol>
          </ul>
        </div>
      )}
    </>
  );
}

export default App;
