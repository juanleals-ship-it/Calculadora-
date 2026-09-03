import React, { useState } from "react";

export default function App() {
  const [display, setDisplay] = useState("0");
  const [previous, setPrevious] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waiting, setWaiting] = useState(false);

  const inputNumber = (number) => {
    if (waiting) {
      setDisplay(number);
      setWaiting(false);
    } else {
      setDisplay(display === "0" ? number : display + number);
    }
  };

  const inputDecimal = () => {
    if (waiting) {
      setDisplay("0.");
      setWaiting(false);
      return;
    }

    if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  };

  const calculate = (a, b, op) => {
    switch (op) {
      case "+":
        return a + b;
      case "-":
        return a - b;
      case "×":
        return a * b;
      case "÷":
        return b === 0 ? "Error" : a / b;
      default:
        return b;
    }
  };

  const chooseOperator = (nextOperator) => {
    const inputValue = parseFloat(display);

    if (operator && waiting) {
      setOperator(nextOperator);
      return;
    }

    if (previous === null) {
      setPrevious(inputValue);
    } else {
      const result = calculate(previous, inputValue, operator);

      if (result === "Error") {
        setDisplay("Error");
        setPrevious(null);
        setOperator(null);
        setWaiting(true);
        return;
      }

      setDisplay(String(result));
      setPrevious(result);
    }

    setOperator(nextOperator);
    setWaiting(true);
  };

  const handleEquals = () => {
    if (operator === null || previous === null) return;

    const inputValue = parseFloat(display);
    const result = calculate(previous, inputValue, operator);

    setDisplay(String(result));
    setPrevious(null);
    setOperator(null);
    setWaiting(true);
  };

  const clear = () => {
    setDisplay("0");
    setPrevious(null);
    setOperator(null);
    setWaiting(false);
  };

  const toggleSign = () => {
    if (display === "0" || display === "Error") return;
    setDisplay(String(parseFloat(display) * -1));
  };

  const percentage = () => {
    if (display === "Error") return;
    setDisplay(String(parseFloat(display) / 100));
  };

  const deleteLast = () => {
    if (waiting || display === "Error") return;

    if (display.length === 1) {
      setDisplay("0");
    } else {
      setDisplay(display.slice(0, -1));
    }
  };

  const buttons = [
    { label: "AC", action: clear, type: "function" },
    { label: "⌫", action: deleteLast, type: "function" },
    { label: "%", action: percentage, type: "function" },
    { label: "÷", action: () => chooseOperator("÷"), type: "operator" },

    { label: "7", action: () => inputNumber("7") },
    { label: "8", action: () => inputNumber("8") },
    { label: "9", action: () => inputNumber("9") },
    { label: "×", action: () => chooseOperator("×"), type: "operator" },

    { label: "4", action: () => inputNumber("4") },
    { label: "5", action: () => inputNumber("5") },
    { label: "6", action: () => inputNumber("6") },
    { label: "-", action: () => chooseOperator("-"), type: "operator" },

    { label: "1", action: () => inputNumber("1") },
    { label: "2", action: () => inputNumber("2") },
    { label: "3", action: () => inputNumber("3") },
    { label: "+", action: () => chooseOperator("+"), type: "operator" },

    { label: "±", action: toggleSign, type: "function" },
    { label: "0", action: () => inputNumber("0") },
    { label: ".", action: inputDecimal },
    { label: "=", action: handleEquals, type: "equals" },
  ];

  return (
    <div style={styles.page}>
      <div style={styles.calculator}>
        <div style={styles.header}>
          <span>CALCULATOR</span>
          <span style={styles.status}>●</span>
        </div>

        <div style={styles.display}>
          <div style={styles.previous}>
            {previous !== null && `${previous} ${operator || ""}`}
          </div>
          <div style={styles.result}>{display}</div>
        </div>

        <div style={styles.buttons}>
          {buttons.map((button, index) => (
            <button
              key={index}
              onClick={button.action}
              style={{
                ...styles.button,
                ...(button.type === "operator"
                  ? styles.operator
                  : button.type === "function"
                  ? styles.function
                  : button.type === "equals"
                  ? styles.equals
                  : {}),
              }}
            >
              {button.label}
            </button>
          ))}
        </div>

        <div style={styles.footer}>MODIFIED • SIMPLE • FAST</div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background:
      "radial-gradient(circle at top, #26324a 0%, #101522 45%, #080b12 100%)",
    fontFamily: "Arial, Helvetica, sans-serif",
    padding: "20px",
    boxSizing: "border-box",
  },

  calculator: {
    width: "360px",
    maxWidth: "100%",
    padding: "22px",
    borderRadius: "28px",
    background: "rgba(20, 27, 42, 0.95)",
    boxShadow:
      "0 25px 60px rgba(0,0,0,0.5), inset 0 1px 1px rgba(255,255,255,0.08)",
    border: "1px solid rgba(255,255,255,0.08)",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    color: "#8e9bb5",
    fontSize: "12px",
    fontWeight: "bold",
    letterSpacing: "2px",
    marginBottom: "15px",
  },

  status: {
    color: "#35e59a",
    fontSize: "10px",
  },

  display: {
    height: "125px",
    padding: "20px",
    boxSizing: "border-box",
    borderRadius: "20px",
    background: "#090d16",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    marginBottom: "18px",
    overflow: "hidden",
    boxShadow: "inset 0 3px 10px rgba(0,0,0,0.45)",
  },

  previous: {
    color: "#65718a",
    fontSize: "15px",
    minHeight: "22px",
  },

  result: {
    color: "#f4f7ff",
    fontSize: "42px",
    fontWeight: "300",
    maxWidth: "100%",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },

  buttons: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "11px",
  },

  button: {
    height: "68px",
    border: "none",
    borderRadius: "18px",
    background: "#20293b",
    color: "#f2f5fb",
    fontSize: "21px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.15s ease",
    boxShadow: "0 5px 0 #151c2a",
  },

  function: {
    background: "#354157",
    color: "#b9c5da",
  },

  operator: {
    background: "#5b43d6",
    color: "#ffffff",
    boxShadow: "0 5px 0 #3e2c9b",
  },

  equals: {
    background: "#20c98a",
    color: "#071812",
    boxShadow: "0 5px 0 #13845c",
  },

  footer: {
    textAlign: "center",
    color: "#56647c",
    fontSize: "9px",
    letterSpacing: "2px",
    marginTop: "18px",
  },
};
