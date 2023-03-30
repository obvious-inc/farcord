import "./polyfills";
import { render } from "react-dom";
import * as Sentry from "@sentry/react";
import App from "./app";
import "./reset.css";
import "./index.css";

const registerServiceWorker = () => {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("/service-worker.js");
    });
  }
};

const unregisterServiceWorker = () => {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.getRegistrations().then((registrations) => {
      for (let registration of registrations) registration.unregister();
    });
  }
};

if (process.env.NODE_ENV === "production") {
  Sentry.init({ dsn: process.env.SENTRY_DSN });
  registerServiceWorker();
} else {
  unregisterServiceWorker();
}

render(<App />, document.getElementById("app-mount"));
