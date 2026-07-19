/**
 * Runs `next dev` and opens the browser once the server reports its URL.
 * Reads the URL from Next's own output, so it works even when port 3000
 * is busy and Next falls back to another port.
 */
import { spawn, exec } from "node:child_process";

const child = spawn("npx", ["next", "dev", "--turbopack"], {
  stdio: ["inherit", "pipe", "inherit"],
});

let opened = false;

child.stdout.on("data", (chunk) => {
  const text = chunk.toString();
  process.stdout.write(text);

  if (!opened) {
    const match = text.match(/Local:\s*(https?:\/\/\S+)/);
    if (match) {
      opened = true;
      const url = match[1];
      const cmd =
        process.platform === "darwin"
          ? `open ${url}`
          : process.platform === "win32"
            ? `start ${url}`
            : `xdg-open ${url}`;
      exec(cmd);
    }
  }
});

child.on("exit", (code) => process.exit(code ?? 0));
