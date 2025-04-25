import { useCallback } from "react";
import Particles from "react-tsparticles";
import { Engine } from "tsparticles-engine";
import { loadStarsPreset } from "tsparticles-preset-stars";

export default function StarBackground() {
  const star = useCallback(async (engine: Engine) => {
    await loadStarsPreset(engine);
  }, []);

  return (
    <Particles
      id="stars"
      init={star}
      options={{
        preset: "stars",
        background: {
          color: {
            value: "#18191a",
          },
        },
        fullScreen: {
          enable: true,
          zIndex: -1,
        },
        particles: {
          number: {
            value: 150,
            density: {
              enable: true,
              value_area: 800,
            },
          },
          shape: {
            type: "circle",
          },
          size: {
            value: 3,
            random: true,
            animation: {
              enable: true,
              speed: 2,
              minimumValue: 1,
            },
          },
          opacity: {
            value: 0.8,
            random: true,
            animation: {
              enable: true,
              speed: 1,
              minimumValue: 0.4,
            },
          },
          move: {
            enable: true,
            speed: 0.3,
            direction: "none",
            random: true,
            straight: false,
            outModes: {
              default: "out",
            },
            bounce: true,
          },
        },
      }}
    />
  );
}
