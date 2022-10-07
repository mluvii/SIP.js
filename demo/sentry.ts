import { init, captureEvent, setTag, SeverityLevel } from "@sentry/browser";
import { BrowserTracing } from "@sentry/tracing";
declare const SENTRY_DSN: string;

init({
  dsn: SENTRY_DSN,
  integrations: [new BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0
});

const getSipJsSeverity = (level: "debug" | "log" | "warn" | "error"): SeverityLevel => {
  switch (level) {
    case "error":
    case "log":
    case "debug":
      return level;
    case "warn":
      return "warning";
    default:
      return "info";
  }
};

export const sendSipJsLog = (
  level: "debug" | "log" | "warn" | "error",
  category: string,
  label: string | undefined,
  content: string
) => {
  setTag("ClientLogType", "SipJs");
  captureEvent({
    level: getSipJsSeverity(level),
    message: content,
    extra: { category, label }
  });
};
