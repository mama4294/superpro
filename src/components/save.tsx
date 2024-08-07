// import { useStore } from "@/Store";
import { saveToFile } from "@/utils/fileSystem";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";

function SaveProjectButton() {
  const { toast } = useToast();

  //Zustland

  // const filepath = useStore((state) => state.filePath);
  // const data = useStore((state) => state);

  const handleSubmit = () => {
    console.log("Save clicked");
    // console.log("Filepath: ", filepath);
    // try {
    //   console.log("Data: ", data);
    //   const jsonData = JSON.stringify(data);
    //   saveToFile(jsonData, filepath);
    //   toast({
    //     title: "Success",
    //     description: "The project was saved",
    //   });
    //   console.log("filepath: ", filepath);
    // } catch (error) {
    //   toast({
    //     variant: "destructive",
    //     title: "Uh oh! Something went wrong.",
    //     description: "There was a problem saving the project",
    //   });
    // }
  };

  return <Button onClick={handleSubmit}>Save</Button>;
}

export default SaveProjectButton;
