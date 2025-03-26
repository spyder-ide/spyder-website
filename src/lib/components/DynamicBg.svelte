<script>
  import { Canvas, Layer } from "svelte-canvas";

  export let width = 200;
  export let height = 200;
  export let stroke = 2;
  export let backgroundColor = [150];
  export let strokeColor = [255, 0, 0];
  export let strokeAlpha = 80;

  // Helper function for calculating control points
  const calculateControlPoints = (deg, x, y, distance, negative) => {
    distance *= negative ? -1 : 1;
    let cpx = x + distance * Math.cos((deg * Math.PI) / 180);
    let cpy = y + distance * Math.sin((deg * Math.PI) / 180);
    return [cpx, cpy];
  };

  // Main render function for svelte-canvas 1.2.1 - directly embedded
  const render = ({ context: ctx, width, height }) => {
    // Set canvas background
    ctx.fillStyle = `rgb(${backgroundColor.join(",")})`;
    ctx.fillRect(0, 0, width, height);

    // Set stroke style
    ctx.strokeStyle = `rgba(${strokeColor.join(",")}, ${strokeAlpha / 255})`;
    ctx.lineWidth = stroke;

    // Effect
    const startX = 0;
    const endX = width;
    const linesCount = 20;

    for (let line = 0; line <= linesCount; line++) {
      const startY = height / (line + 1);
      const endY = line;

      const distance = endX - startX;
      const k = distance / 0.3;

      const [cp1x, cp1y] = calculateControlPoints(45, startX, startY, k, false);
      const [cp2x, cp2y] = calculateControlPoints(-5 * line, endX, endY, k, true);

      // Draw the Bézier curve
      ctx.beginPath();
      ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, endX, endY);
      ctx.stroke();
      ctx.closePath();
    }
  };
</script>

<Canvas {width} {height}>
  <Layer {render} />
</Canvas>
