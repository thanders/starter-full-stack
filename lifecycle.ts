import { closeDb } from "./db/db.ts";

export const controller = new AbortController();

let isShuttingDown = false;

export function setupGracefulShutdown() {
  const handleShutdown = () => {
    if (isShuttingDown) return;
    
    isShuttingDown = true;
    console.log("\n👋 Shutting down server...");
    
    closeDb();
    controller.abort();
    
    setTimeout(() => Deno.exit(0), 100);
  };

  Deno.addSignalListener("SIGINT", handleShutdown);
  Deno.addSignalListener("SIGTERM", handleShutdown);
}