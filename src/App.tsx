import { ThemeListener, ThemeProvider } from "@/components/theme-provider";
import Editor from "./Editor";

const App = () => {
  return (
    <ThemeProvider>
      <ThemeListener />
      <Editor />
    </ThemeProvider>
  );
};

export default App;
