import { createRoot } from "react-dom/client";
import Options from "./Options";

// DOMContentLoadedイベントを待ってからReactアプリを初期化
document.addEventListener("DOMContentLoaded", () => {
  console.log("Quick Link Jump options loaded");

  const container = document.getElementById("root");
  if (container) {
    const root = createRoot(container);
    root.render(<Options />);
  }
});

export {};
