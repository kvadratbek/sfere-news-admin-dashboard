import { createRoot } from "react-dom/client";
import { StoreProvider, ThemeProvider } from "./providers";
// import { AppRouter } from "./routers/app-router";
import { Toaster } from "sonner";
import "./styles/style.css";
import { AppRouterProtector } from "./routers/app-router-protected";

createRoot(document.getElementById("root")!).render(
  <StoreProvider>
    <ThemeProvider>
      <>
        <Toaster position="bottom-right" theme="system" />
        <AppRouterProtector/>
      </>
    </ThemeProvider>
  </StoreProvider>
);
