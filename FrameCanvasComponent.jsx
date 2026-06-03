"use client";

import { useEffect, useState, useRef } from "react";
import sdk from "@farcaster/frame-sdk";

/**
 * @notice Core Front-End Render Interface for a Farcaster v2 Frame Canvas app.
 */
export default function FrameCanvasComponent() {
    const [isSdkReady, setIsSdkReady] = useState(false);
    const [context, setContext] = useState(null);
    const canvasRef = useRef(null);

    useEffect(() => {
        const initializeFrameV2 = async () => {
            console.log("[Frame v2] Initiating handshake with Warpcast client...");
            
            // Fetch frame application execution context parameters from client container
            const frameContext = await sdk.context;
            setContext(frameContext);

            // Trigger the mandatory initialization signal to display the view layer canvas
            sdk.actions.ready();
            setIsSdkReady(true);
            console.log("[Frame v2] Handshake completed successfully.");
        };

        if (typeof window !== "undefined") {
            initializeFrameV2();
        }
    }, []);

    // Draw interaction graphics to the HTML5 context
    useEffect(() => {
        if (isSdkReady && canvasRef.current) {
            const ctx = canvasRef.current.getContext("2d");
            ctx.fillStyle = "#7C65C1"; // Farcaster Brand Color Accent
            ctx.fillRect(10, 10, 280, 130);
            
            ctx.fillStyle = "#FFFFFF";
            ctx.font = "16px sans-serif";
            ctx.fillText("Frames v2 Canvas Active", 30, 75);
        }
    }, [isSdkReady]);

    const triggerInAppTx = async () => {
        if (!isSdkReady) return;
        console.log("[Wallet Action] Invoking token transfer via client container injection...");
        
        try {
            // Initiates native wallet prompts seamlessly inside the social feed frame interface
            await sdk.actions.signTypedData({
                domain: { name: "FramesV2App", version: "1", chainId: 8453 },
                types: { Message: [{ name: "content", type: "string" }] },
                primaryType: "Message",
                message: { content: "Verify Frame Canvas Interaction" }
            });
            console.log("[Success] Transaction or signature approved by client wallet container.");
        } catch (err) {
            console.error("[Wallet Error] Action dismissed by user:", err.message);
        }
    };

    return (
        <div style={{ padding: "20px", textAlign: "center", fontFamily: "sans-serif" }}>
            <h2>Farcaster Mini-dApp Canvas</h2>
            <canvas ref={canvasRef} width="300" height="150" style={{ border: "2px solid #7C65C1", borderRadius: "8px" }} />
            <div style={{ marginTop: "15px" }}>
                <button onClick={triggerInAppTx} style={{ backgroundColor: "#7C65C1", color: "white", border: "none", padding: "10px 20px", borderRadius: "5px", cursor: "pointer" }}>
                    Execute In-Frame Action
                </button>
            </div>
            {context && <p style={{ fontSize: "12px", color: "gray" }}>Interacting as FID: {context.user?.fid}</p>}
        </div>
    );
}
