# Hadex VPN

Personal VPN controller for Windows and Android, initially using the existing Tailscale tailnet and GitHub Actions exit-node experiment.

## Current architecture
- **Windows:** Hadex desktop controller (Electron) talks to the locally installed Tailscale CLI. The Tailscale service remains the VPN engine.
- **Android:** companion-app integration plan. The official Tailscale Android app remains responsible for the VPN tunnel and system VPN permission.
- **Exit node:** current GitHub Actions runner is temporary (up to the workflow timeout) and is for testing only.

## Repository layout
- `.github/workflows/`: GitHub Actions exit-node experiments.
- `windows-app/`: initial Windows desktop controller.
- `android-app/`: Android integration plan and constraints.

## Security
Never put Tailscale OAuth client secrets, OAuth secret values, auth keys, or reusable device credentials in source code, app packages, or commits.

## Important limitation
A GitHub-hosted Actions runner is ephemeral and not a reliable always-on VPN server. The current setup is a personal prototype, not a production-grade or persistent VPN service.
