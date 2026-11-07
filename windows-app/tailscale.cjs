const { execFile } = require("node:child_process");
const fs = require("node:fs");

function findTailscale() {
  const candidates = [
    pathFromEnv("ProgramFiles", "Tailscale", "tailscale.exe"),
    pathFromEnv("ProgramFiles(x86)", "Tailscale", "tailscale.exe")
  ].filter(Boolean);
  for (const candidate of candidates) if (fs.existsSync(candidate)) return candidate;
  return "tailscale.exe";
}
function pathFromEnv(root, ...parts) {
  return root ? require("node:path").join(root, ...parts) : null;
}
function run(args) {
  const binary = findTailscale();
  return new Promise((resolve, reject) => {
    execFile(binary, args, { windowsHide: true, timeout: 15000, maxBuffer: 2 * 1024 * 1024 }, (error, stdout, stderr) => {
      if (error) {
        const detail = (stderr || stdout || error.message || "").trim();
        reject(new Error(detail || "Tailscale command failed. Make sure Tailscale is installed and run Hadex VPN with the required Windows permissions."));
      } else resolve(stdout.trim());
    });
  });
}
async function getStatus() {
  const raw = await run(["status", "--json"]);
  const data = JSON.parse(raw);
  const peers = Object.values(data.Peer || {});
  const exitNodes = peers
    .filter(p => p.ExitNodeOption === true && p.Online !== false && p.TailscaleIPs?.length)
    .map(p => ({ name: p.HostName || p.DNSName || "Tailscale device", ip: p.TailscaleIPs[0], online: p.Online !== false }));
  const self = data.Self || {};
  return {
    connected: Boolean(self.Online),
    selfName: self.HostName || "This device",
    exitNode: data.ExitNodeStatus?.ID || null,
    exitNodes
  };
}
async function connect(ip) {
  if (typeof ip !== "string" || !/^100\.(?:[0-9]{1,3})\.(?:[0-9]{1,3})\.(?:[0-9]{1,3})$/.test(ip)) {
    throw new Error("Invalid Tailscale IPv4 address.");
  }
  await run(["set", "--exit-node=" + ip]);
  return getStatus();
}
async function disconnect() {
  await run(["set", "--exit-node="]);
  return getStatus();
}
module.exports = { getStatus, connect, disconnect };
