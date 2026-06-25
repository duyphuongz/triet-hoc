import { RouterProvider } from "react-router-dom";

import { Providers } from "./providers";
import { router } from "./router";
import { ThemeProvider } from "./ThemeProvider";
import { AtmosphereBackground } from "./AtmosphereBackground";

export function App() {
  return (
    <ThemeProvider>
      <Providers>
        <AtmosphereBackground />
        <RouterProvider router={router} />
      </Providers>
    </ThemeProvider>
  );
}

