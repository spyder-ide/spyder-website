<script>
  import { Canvas, Layer } from 'svelte-canvas';

  export let width = 200;
  export let height = 200;
  export let stroke = 2;
  export let backgroundColor = [150];
  export let strokeColor = [255, 0, 0];
  export let strokeAlpha = 80;
  export let linesCount = 9;
  export let effectType = "bezier";

  // Helper function for calculating control points
  $: calculateControlPoints = (deg, x, y, distance, negative) => {
    distance *= negative ? -1 : 1;
    let cpx = x + distance * Math.cos(deg * Math.PI / 180);
    let cpy = y + distance * Math.sin(deg * Math.PI / 180);
    return [cpx, cpy];
  }

  // Main render function for svelte-canvas 1.2.1 - directly embedded
  $: render = ({ context: ctx, width, height }) => {
    // Set canvas background
    ctx.fillStyle = `rgb(${backgroundColor.join(',')})`;
    ctx.fillRect(0, 0, width, height);
    
    // Set stroke style
    ctx.strokeStyle = `rgba(${strokeColor.join(',')}, ${strokeAlpha / 255})`;
    ctx.lineWidth = stroke;

    // BEZIER EFFECT
    if (effectType === "bezier") {
      const startX = 0;
      const baseStartY = height / 3;
      const endX = width;
      const endY = 0;
      
      for (let a = 0; a <= linesCount; a++) {
        const startY = a * 25;
        
        const distance = endX - startX;
        const k = distance / 3; // Control point distance
        
        // Calculate control points for start (45 degrees)
        const [cp1x, cp1y] = calculateControlPoints(45, startX, startY, k, false);

        // Calculate control points for end (-10a degrees)
        const [cp2x, cp2y] = calculateControlPoints(-10 * a, endX, endY, k, true);

        // Draw the Bézier curve
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, endX, endY);
        ctx.stroke();
      }
    } 
    // LINES EFFECT
    else if (effectType === "lines") {
      // Generate a simple noise function
      const noise = (x) => Math.sin(x) * Math.cos(x * 2.1) * Math.sin(x * 1.7);
      
      // Calculate spacing between lines to distribute evenly
      const lineSpacing = height / (linesCount + 1);

      for (let i = 1; i <= linesCount; i++) {
        // Reset these values at the start of each line
        let prevX = -10;
        let prevY = 0;

        // Create varied offsets for each line
        let lineOffset = i * 0.7;

        // Base Y position - evenly distribute lines
        const baseY = lineSpacing * i;
        
        ctx.beginPath();
        
        // Draw each line point by point
        for (let x = -10; x <= width + 10; x += 5) {
          // Create wavy effect using noise function
          const noiseValue = noise(x * 0.01 + lineOffset);
          const noiseScale = height / (linesCount * 2);
          let y = baseY + noiseValue * noiseScale;

          if (x === -10) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
          
          prevX = x;
          prevY = y;
        }
        
        ctx.stroke();
      }
    }
  }
</script>

<Canvas {width} {height}>
  <Layer {render} />
</Canvas>
