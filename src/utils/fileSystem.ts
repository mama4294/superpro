import { open, save } from "@tauri-apps/api/dialog";
import { writeTextFile } from "@tauri-apps/api/fs";

export async function saveToFile(data: string, filePath: string) {
  try {
    if (filePath) {
      // If the user selected a file path, write the content to that path
      await writeTextFile(filePath, data);
      console.log("File saved successfully!");
    } else {
      console.log("File save canceled.");
    }
  } catch (error) {
    console.error("Error saving file:", error);
  }
}

// export const saveToFile = (data: string, fileName: string) => {
//   console.log("Save to file");
//   console.log(data);
//   const blob = new Blob([data], { type: "text/plain;charset=utf-8" });
//   saveAs(blob, fileName);
// };

export const loadFromFile = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      resolve(event.target?.result as string);
    };
    reader.onerror = (error) => {
      reject(error);
    };
    reader.readAsText(file);
  });
};

export const getFolderLocation = async () => {
  try {
    const selected = await open({
      directory: true,
      multiple: false,
    });
    if (typeof selected === "string") {
      return selected;
    }
  } catch (err) {
    console.error("Error selecting directory:", err);
  }
};
