export const Logic = (
  formula: string,
  columns: string[],
  rows: (boolean | string)[][]
): boolean[] => {
  // Helper: evaluate a formula for one row
  const evaluate = (expr: string, row: (boolean | string)[]): boolean => {
    expr = expr
      .replace(/\s+/g, "") // remove all spaces
      .replace(/[~!¬]/g, "¬")
      .replace(/[&∧^]/g, "∧")
      .replace(/[|∨vV]/g, "∨")
      .replace(/->|→/g, "→")
      .replace(/<->|↔/g, "↔");

    // Handle parentheses recursively
    while (expr.includes("(")) {
      expr = expr.replace(/\(([^()]+)\)/g, (_, inner) =>
        evaluate(inner, row) ? "T" : "F"
      );
    }

    // Replace variables with actual boolean values
    columns.forEach((col, i) => {
      const val = row[i];
      if (typeof val === "boolean") {
        expr = expr.replace(new RegExp(`\\b${col}\\b`, "g"), val ? "T" : "F");
      }
    });

    // Handle negations (¬)
    expr = expr.replace(/¬+T|¬+F/g, (match) => {
      const negCount = (match.match(/¬/g) || []).length;
      const base = match.endsWith("T");
      return negCount % 2 === 0 ? (base ? "T" : "F") : base ? "F" : "T";
    });

    // Evaluate binary operators by precedence
    const applyOp = (a: string, op: string, b: string) => {
      const A = a === "T";
      const B = b === "T";
      switch (op) {
        case "∧":
          return A && B ? "T" : "F";
        case "∨":
          return A || B ? "T" : "F";
        case "→":
          return !A || B ? "T" : "F";
        case "↔":
          return A === B ? "T" : "F";
        default:
          throw new Error(`Unknown operator: ${op}`);
      }
    };

    // Keep applying until reduced to one value
    const operatorPattern = /(T|F)(↔|→|∧|∨)(T|F)/;
    while (operatorPattern.test(expr)) {
      expr = expr.replace(operatorPattern, (_, a, op, b) => applyOp(a, op, b));
    }

    // Final cleanup: single T/F
    if (expr.trim() === "T") return true;
    if (expr.trim() === "F") return false;

    throw new Error(`Unable to fully evaluate expression: ${expr}`);
  };

  // Compute result for each row
  const results = rows.map((row) => evaluate(formula, row));

  return results;
};
