"use client";
import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";

const Loading = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 3.0; // Set the video speed to 3x
    }
  }, []);

  return (
    <main
      className={cn(
        "m-auto flex min-h-screen items-center justify-center bg-white",
      )}
    >
      <video autoPlay muted ref={videoRef} className="h-96 w-96">
        <source src="/assets/animation/animate_in_dark.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </main>
  );
};

export default Loading;
