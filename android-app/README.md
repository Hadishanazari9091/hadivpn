# Hadex VPN for Android

Android companion app plan for the existing Tailscale-based personal network.

## Important integration constraint
The current architecture uses the official Tailscale Android VPN engine. Android does not provide a supported public API for a third-party app to silently control another VPN app's exit-node selection. A companion app can check whether Tailscale is installed and open it, but the user must complete Android's VPN permission and select the exit node in the Tailscale app.

## Phase 1
- Build a small Hadex-branded companion UI.
- Detect/open the official Tailscale app.
- Show setup instructions and the expected exit-node device name.
- Do not collect or store Tailscale credentials or auth keys.

## Later options
1. Keep the official Tailscale app as the tunnel engine and use Hadex as a guided launcher.
2. If a fully integrated Android VPN UI is required, evaluate a maintained Tailscale-supported integration path or a separately operated WireGuard control plane. Do not assume the Windows CLI integration can be reused on Android.
