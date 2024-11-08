import { StrictMode, Suspense } from "react";
import ReactDOM from "react-dom/client";
import SuspenseContent from "./containers/SuspenseContent";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./store";

// Render the app
const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <Suspense fallback={<SuspenseContent />}>
        <Provider store={store}>
          <App />
        </Provider>
      </Suspense>
    </StrictMode>,
  );
}
