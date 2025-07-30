// src/analytics.ts
import ReactGA from "react-ga4";

export const initGA = () => {
  ReactGA.initialize("G-WJ8BXYEEG3"); // Replace with your Measurement ID
};

export const trackEvent = (action: string, category: string, label?: string) => {
  ReactGA.event({
    category,
    action,
    label,
  });
};
