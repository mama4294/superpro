import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import NewProjectDialog from "./components/newProjectDialog";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";

function Editor() {
  const [greetMsg, setGreetMsg] = useState<string[]>([""]);
  const [name, setName] = useState("");

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    setGreetMsg(await invoke("greet", { name }));
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <Input value={name} onChange={(e) => setName(e.target.value)} />
      {greetMsg.map((item) => (
        <p>{item}</p>
      ))}

      <NewProjectDialog />
      <Button onClick={greet}>Greet</Button>
      <h1 className="text-3xl font-bold">SuperPro</h1>
    </div>
  );
}

export default Editor;
