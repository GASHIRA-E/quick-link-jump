import { createRoot } from "react-dom/client";
import { Popup } from "./Popup";

// DOMContentLoadedイベントを待ってからReactアプリを初期化
document.addEventListener("DOMContentLoaded", () => {
  console.log("Quick Link Jump popup loaded");

  const container = document.getElementById("root");
  if (container) {
    const root = createRoot(container);
    root.render(<Popup />);
  }
});

export {};
