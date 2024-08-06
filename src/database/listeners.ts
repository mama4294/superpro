import { listen } from "@tauri-apps/api/event";
import { useEffect } from "react";
import { invoke } from "@tauri-apps/api";
import { open } from "@tauri-apps/api/dialog";

export function EventListener() {
  useEffect(() => {
    const unlisten = listen("open-file", async () => {
      const selected = await open({
        multiple: false,
        filters: [
          {
            name: "SQLite Database",
            extensions: ["sqlite"],
          },
        ],
      });

      if (selected) {
        // Use `invoke` to call the Tauri command
        invoke("open_file_dialog", { file_path: selected })
          .then((response) => {
            console.log("File dialog response:", response);
          })
          .catch((error) => {
            console.error("Error invoking Tauri command:", error);
          });
      }
    });

    return () => {
      unlisten.then((unlistenFn) => unlistenFn());
    };
  }, []);

  // useEffect(() => {
  //   const setupListener = async () => {
  //     const unlisten = await listen("open-file", async () => {
  //       try {
  //         const selected = await open({
  //           multiple: false,
  //           filters: [
  //             {
  //               name: "Project",
  //               extensions: ["txt", "mm"],
  //             },
  //           ],
  //         });

  //         console.log("File Selected");
  //       } catch (error) {
  //         console.error("Failed to open file:", error);
  //       }
  //     }
  //   );

  //     return () => {
  //       unlisten();
  //     };
  //   };

  //   const unlistenPromise = setupListener();

  //   return () => {
  //     unlistenPromise.then((unlisten) => unlisten && unlisten());
  //   };
  // }, []);

  return null;
}
