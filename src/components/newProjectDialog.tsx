import { open } from "@tauri-apps/api/dialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { listen } from "@tauri-apps/api/event";
import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api";
import { useToast } from "./ui/use-toast";

function NewProjectDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [selectedFolderPath, setSelectedFolderPath] = useState("");
  const btnText = selectedFolderPath ? selectedFolderPath : "Select Location";
  const { toast } = useToast();

  const handleSubmit = async () => {
    console.log("Create new project selected");
    try {
      await invoke("create_new_project", {
        folder_path: selectedFolderPath,
        project_name: projectName,
      });
      console.log("Project created");
      setIsOpen(false);
      toast({
        title: "Success",
        description: "Project Created",
      });
    } catch (err: any) {
      console.log("Error creating Project");

      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem creating the project",
      });
    }
  };

  const handleFolderSelect = async () => {
    try {
      const selected = await open({
        directory: true,
        multiple: false,
      });
      if (typeof selected === "string") {
        setSelectedFolderPath(selected);
      }
    } catch (err) {
      console.error("Error selecting directory:", err);
    }
  };

  useEffect(() => {
    const unlisten = listen("new-project-dialog", () => {
      setIsOpen(true);
    });

    return () => {
      unlisten.then((fn) => fn());
    };
  }, []);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {/* <DialogTrigger asChild>
        <Button variant="outline">New Project</Button>
      </DialogTrigger> */}
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New Project</DialogTitle>
          <DialogDescription>Get started on a new process</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Project Name
            </Label>
            <Input
              id="name"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="col-span-3"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="folderLocation" className="text-right">
              Destination
            </Label>
            <Button
              id="folderLocation"
              variant="outline"
              className="col-span-3"
              onClick={handleFolderSelect}
            >
              {btnText}
            </Button>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit}>
            Start
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default NewProjectDialog;
