import { FC } from "react";
import p5Types from "p5";
import Sketch from "react-p5";

export interface PixelatedVideoProps {
  pixelDimension: number;
}

export const PixelatedVideo: FC<PixelatedVideoProps> = ({ pixelDimension }) => {
  let video: p5Types.Element;
  const setup = (p5: p5Types, canvasParentRef: Element) => {
    p5.createCanvas(800, 600).parent(canvasParentRef);

    // call pixelDensity(1) to turn this off. Higher pixelDensity will result clear image.
    p5.pixelDensity(1);

    // Get the webcam feed
    video = p5.createCapture("VIDEO");

    // hide real-time video frame
    video.hide();

    // Disables drawing the stroke (outline).
    p5.noStroke();
  };

  const draw = (p5: p5Types) => {
    // Display background with color #A0A0A0
    p5.background("#A0A0A0");

    // Display image at x = 0, y = 0.
    // The image will automatically fill the canvas.
    p5.image(video, 0, 0);

    // Loads the pixel data for the display window into the pixels[] array.
    // Normally you would like to manipulate pixel data with pixels[] array or
    // use set() to do so, but in this example, what we want to achieve is put
    // a rect right on top of the video
    p5.loadPixels();

    // Loop through every pixelDimension
    // width and height should exist in p5.Element but missing in official defined type
    // We use casing as workaround
    for (let x = 0; x < (video as any).width; x += pixelDimension) {
      for (let y = 0; y < (video as any).height; y += pixelDimension) {
        // Because we had loaded the pixel, video.get() will retrieve the
        // target pixel's color.
        let colorFromVideo = p5.get(x, y);

        // Get the brightness from the rgba array
        p5.fill(colorFromVideo);

        // Draw a rect
        p5.rect(x, y, pixelDimension, pixelDimension);
      }
    }
  };

  return <Sketch setup={setup} draw={draw} />;
};
