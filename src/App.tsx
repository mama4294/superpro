import { ThemeListener, ThemeProvider } from "@/components/theme-provider";
import Editor from "./Editor";
import { EventListener } from "./database/listeners";

const App = () => {
  return (
    <ThemeProvider>
      <ThemeListener />
      <EventListener />
      <Editor />
    </ThemeProvider>
  );
};

export default App;
