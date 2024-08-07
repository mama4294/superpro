import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import NewProjectDialog from "./components/newProjectDialog";
import SaveProjectButton from "./components/save";

function Editor() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    setGreetMsg(await invoke("greet", { name }));
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <NewProjectDialog />
      <SaveProjectButton />
      <h1 className="text-3xl font-bold">SuperPro</h1>
    </div>
  );
}

export default Editor;
