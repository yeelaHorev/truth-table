export const GetRows = (numVars: number): (boolean)[][] => {
  const rows: (boolean)[][] = [];
  const totalRows = 2 ** numVars;

  for (let i = 0; i < totalRows; i++) {
    const row: (boolean)[] = [];
    for (let j = 0; j < numVars; j++) {
      // Use bitmask to get the value for each variable
      row.push(Boolean((i >> (numVars - j - 1)) & 1));
    }
    rows.push(row);
  }

  return rows;
};
