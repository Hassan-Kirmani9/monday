const styles = {
  global: {
    "html, body": {
      backgroundColor: "whiteAlpha.900",
      color: "whiteAlpha.900",
    },
    svg: {
      cursor: "pointer",
    },
    ".table": {
      border: "0.5px solid #bcbcbc",
    },
    ".tr": {
      display: "flex",
      width: "fit-content",
    },
    ".th, .td": { boxShadow: "inset 0 0 0 0.5px #bcbcbc" },
    ".th": {
      position: "relative",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: "black",
     fontFamily: 'Figtree, Roboto, Noto Sans Hebrew, Noto Kufi Arabic, Noto Sans JP, sans-serif',
      padding: "0.5rem",
      fontWeight: "light",
      fontSize: "14px",
      textTransform: "uppercase",
      textAlign: "center",
    },
    ".td > input": {
      m: "1",
      padding: "0.2rem",
      bg: "transparent",
      maxW: "100%",
    },
    ".date-wrapper": {
      display: "flex",
      alignItems: "center",
      w: "100%",
      h: "100%",
    },
    ".resizer": {
      position: "absolute",
      opacity: 0,
      top: 0,
      right: 0,
      h: "100%",
      w: "5px",
      bg: "#27bbff",
      cursor: "col-resize",
      userSelect: "none",
      touchAction: "none",
      borderRadius: "6px",
    },
    ".resizer.isResizing": {
      bg: "#2eff31",
      opacity: 1,
    },
    "*:hover > .resizer": {
      opacity: 1,
    },
  },
};

export default styles;
