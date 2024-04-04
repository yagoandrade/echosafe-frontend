"use client";
import { isHardwareAccelerationEnabled } from "@/lib/utils";
import { MeshGradientRenderer } from "@johnn-e/react-mesh-gradient";
import { useEffect, useState } from "react";

function LandingPageGradientBackground() {
  const [hardwareAcceleration, setHardwareAcceleration] = useState(false);

  useEffect(() => {
    const fetchHardwareAcceleration = async () => {
      const result: boolean = await isHardwareAccelerationEnabled();
      setHardwareAcceleration(result);
    };

    fetchHardwareAcceleration();
  }, []); // Empty dependency array means this runs on mount only

  return hardwareAcceleration ? (
    <MeshGradientRenderer
      className="gradient fixed left-0 top-0 h-screen w-full opacity-20 [mask-image:linear-gradient(to_bottom,transparent,white_20%,white,transparent)]"
      colors={[
        "#90d7ff",
        "#f8f4f2",
        "#b29fd4",
        "#cc47a6",
        "#fdc85b",
        "#fea856",
        "#f73d4b",
      ]}
      wireframe={false}
    />
  ) : null;
}

export default LandingPageGradientBackground;
