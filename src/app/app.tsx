import { createRoot } from "react-dom/client";
import { StoreProvider, ThemeProvider } from "./providers";
import { AppRouter } from "./routers/app-router";
import { Toaster } from "sonner";
import "./styles/style.css";

createRoot(document.getElementById("root")!).render(
  <StoreProvider>
    <ThemeProvider>
      <>
        <Toaster position="bottom-right" theme="system" />
        <AppRouter />
      </>
    </ThemeProvider>
  </StoreProvider>
);
