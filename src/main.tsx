
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import IndoorNavigator from "./pages/IndoorNavigator.jsx";
import "./index.css";

// Ensure tab title is set even if cached HTML is stale
document.title = "TeAra Navigation";

const url = new URL(window.location.href);
const useIndoor = url.searchParams.get("indoor") === "1" || url.hash.includes("indoor");

createRoot(document.getElementById("root")!).render(useIndoor ? <IndoorNavigator /> : <App />);
  
