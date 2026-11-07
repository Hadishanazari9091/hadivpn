# Hadex VPN for Windows

Initial Electron desktop controller for the official Tailscale Windows client.

## Requirements
- Windows 10/11
- Tailscale for Windows installed and signed in to the Hadex tailnet
- Node.js 22+ and npm

## Run from source
```powershell
cd windows-app
npm install
npm start
```

## Build installer
```powershell
npm run dist
```

The app discovers peers advertising exit-node capability through `tailscale status --json` and selects one with `tailscale set --exit-node=<IP>`. Disconnect uses `tailscale set --exit-node=`.

This is an early controller prototype, not a standalone VPN engine. The official Tailscale service remains responsible for the tunnel. Depending on Windows service permissions and installation mode, changing exit-node settings may require elevated privileges.

Never place OAuth secrets, Tailscale auth keys, or reusable credentials in this desktop app or repository.
