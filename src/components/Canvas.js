import { useMemo } from 'react';
// import { BlurFilter, TextStyle, Application, Assets, Graphics, RenderTexture, Point } from 'pixi.js';
// import { Application, Assets, Graphics, Sprite, RenderTexture, Point } from 'pixi.js';
// import { Stage, Container, Sprite, Text } from '@pixi/react';


const Canvas = () => {
    // Assets.add({ alias: 'Canvas1', src: './images/Canvas1.png' });
    // Assets.add({ alias: 'Canvas2', src: './images/Canvas2.png' });

    // Assets.backgroundLoad('Canvas1')

    return (
      <div className="canvas--div">
        <img className="canvas--image" src='./images/Canvas1.png' />
      </div>
    );
  };
  
  
export default Canvas;