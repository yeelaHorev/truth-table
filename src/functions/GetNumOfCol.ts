export const GetNumOfCol = (formula: string): string[] => {
  const columns: string[] = [...formula].filter((char) =>
    /[a-zA-Z]/.test(char)
  );

  // Remove duplicates
  const uniqueColumns = Array.from(new Set(columns));

  return uniqueColumns;
};
