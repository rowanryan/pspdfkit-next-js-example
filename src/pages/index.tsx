import React, { useEffect, useRef } from "react";

export default function App() {
    const containerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const container = containerRef.current;

        (async function () {
            const PSPDFKitModule = await import("pspdfkit");
            const PSPDFKitInstance = PSPDFKitModule.default;

            if (PSPDFKitInstance && container) {
                PSPDFKitInstance.unload(container);
                const instance = await PSPDFKitInstance.load({
                    container,
                    document: "/document.pdf",
                    baseUrl: `${window.location.protocol}//${window.location.host}/`,
                });

                const defaultItems = PSPDFKitInstance.defaultToolbarItems;
                console.log(defaultItems);

                instance.setToolbarItems([
                    { type: "sidebar-thumbnails" },
                    { type: "pager" },
                    { type: "zoom-in" },
                    { type: "zoom-out" },
                    { type: "pan" },
                    { type: "signature" },
                    { type: "export-pdf" },
                ]);
            }
        })();
    }, []);

    return <div ref={containerRef} style={{ height: "100vh" }} />;
}
