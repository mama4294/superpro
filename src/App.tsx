import { ThemeListener, ThemeProvider } from "@/components/theme-provider";
import Editor from "./Editor";
import { EventListener } from "./database/listeners";
import { Toaster } from "@/components/ui/toaster";

const App = () => {
  return (
    <ThemeProvider>
      <ThemeListener />
      <EventListener />
      <Editor />
      <Toaster />
    </ThemeProvider>
  );
};

export default App;
