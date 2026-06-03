# Farcaster Frames v2 Canvas Engine

In the mid-2026 decentralized social landscape, **Farcaster Frames v2** has completely redefined contextual user interactions. Frames have evolved from static image-button turn-based flows into immersive, embedded HTML5/React mini-applications running inside mobile clients like Warpcast.

This repository provides a professional-grade, flat-structured boilerplate for engineering responsive Frame v2 applications. It includes client-side SDK initialization, reactive canvas drawing logic, and Web3 injection parameters for execution directly within social feeds.

## Core Architecture
- **Frame SDK Synchronization:** Implements immediate client-side handshake logic with parent Farcaster containers using the `@farcaster/frame-sdk`.
- **EIP-1193 Provider Integration:** Native hooks to request actions from the user's connected Farcaster wallet environment (e.g., in-app signing and token transfers).
- **Secure Event Context:** Verification utilities to parse authenticated user context schemas, including user profile metadata, theme settings, and interaction state.

## Getting Started
1. Install project dependencies: `npm install`
2. Specify your deployment domain canvas URL within `.env`.
3. Launch the Next.js production development engine: `npm run dev`

## Dependencies
- `@farcaster/frame-sdk`
- `ethers` or `viem`
- `react` / `next`
