const { spawn } = require("child_process");
const fs = require("fs");
const path = require("path");

const DOT_NEXT = path.join(process.cwd(), ".next");
const useTurbo = process.argv.includes("--turbo");

function cleanNextDir() {
  if (fs.existsSync(DOT_NEXT)) {
    try {
      fs.rmSync(DOT_NEXT, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 });
      console.log("\x1b[36m[dev-runner] Cleared .next cache.\x1b[0m");
    } catch (err) {
      console.warn("\x1b[33m[dev-runner] Could not completely remove .next (files may be briefly locked), proceeding...\x1b[0m");
    }
  }
}

function startDev() {
  cleanNextDir();

  const args = ["dev"];
  if (useTurbo) {
    args.push("--turbopack");
  }

  console.log(`\x1b[32m[dev-runner] Starting Next.js (${args.join(" ")})...\x1b[0m`);

  // Run next executable via npx or node_modules/.bin/next
  const child = spawn("npx", ["next", ...args], {
    shell: true,
    stdio: ["inherit", "pipe", "pipe"],
  });

  let restarting = false;

  const handleOutput = (data, isError = false) => {
    const text = data.toString();
    if (isError) {
      process.stderr.write(text);
    } else {
      process.stdout.write(text);
    }

    // Detect file corruption ENOENT manifest crash
    const isManifestCorruption =
      text.includes("_buildManifest.js.tmp") ||
      (text.includes("ENOENT") && text.includes(".next") && text.includes(".tmp"));

    if (isManifestCorruption && !restarting) {
      restarting = true;
      console.log(
        "\n\x1b[31m[dev-runner] Detected corrupted .next cache/manifest! Auto-cleaning and restarting server...\x1b[0m\n"
      );

      // Kill the broken next process
      try {
        if (process.platform === "win32") {
          spawn("taskkill", ["/pid", child.pid.toString(), "/f", "/t"]);
        } else {
          child.kill("SIGKILL");
        }
      } catch (e) {}
    }
  };

  child.stdout.on("data", (data) => handleOutput(data, false));
  child.stderr.on("data", (data) => handleOutput(data, true));

  child.on("close", (code) => {
    if (restarting) {
      setTimeout(() => {
        startDev();
      }, 1000);
    } else if (code !== 0 && code !== null) {
      console.log(`\x1b[33m[dev-runner] Next dev stopped with code ${code}.\x1b[0m`);
    }
  });

  child.on("error", (err) => {
    console.error("\x1b[31m[dev-runner] Process error:\x1b[0m", err);
  });
}

// Forward exit signals
["SIGINT", "SIGTERM"].forEach((signal) => {
  process.on(signal, () => {
    process.exit(0);
  });
});

startDev();
