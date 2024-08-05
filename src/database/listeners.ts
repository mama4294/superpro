import { listen } from "@tauri-apps/api/event";
import { useEffect } from "react";
import { open } from "@tauri-apps/api/dialog";

export function EventListener() {
  useEffect(() => {
    const setupListener = async () => {
      const unlisten = await listen("open-file", async () => {
        try {
          const selected = await open({
            multiple: false,
            filters: [
              {
                name: "Project",
                extensions: ["txt", "mm"],
              },
            ],
          });

          console.log("File Selected");
        } catch (error) {
          console.error("Failed to open file:", error);
        }
      });

      return () => {
        unlisten();
      };
    };

    const unlistenPromise = setupListener();

    return () => {
      unlistenPromise.then((unlisten) => unlisten && unlisten());
    };
  }, []);

  return null;
}
