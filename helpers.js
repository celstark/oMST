let activeBtn = null;

function handlePress(e) {
    const wrapper = e.target.closest('.image-btn-wrapper');
    if (!wrapper) return;

    const btn = wrapper.querySelector('.image-btn');
    const origSrc = btn.dataset.orig || btn.src;
    const pressedSrc = btn.dataset.pressed || origSrc.replace('.png', '_pressed.png');

    btn.dataset.orig = origSrc;
    btn.dataset.pressed = pressedSrc;

    btn.src = pressedSrc;
    wrapper.classList.add('pressed');

    activeBtn = btn;  // remember which button is pressed
}

function handleRelease() {
    if (!activeBtn) {
        return; // nothing to release
    }
    const wrapper = activeBtn.closest('.image-btn-wrapper');
    activeBtn.src = activeBtn.dataset.orig;
    wrapper.classList.remove('pressed');

    activeBtn = null; // reset
}

function setupButtonListeners() {
    document.addEventListener('mouseover', handlePress, true);
    document.addEventListener('mouseleave', handleRelease, true);
    document.addEventListener('touchstart', handlePress, { passive: true });
    document.addEventListener('touchend', handleRelease);
    document.addEventListener('mouseup', handleRelease);
}

function cleanupButtonListeners () {
    document.removeEventListener('mouseover', handlePress, true);
    document.removeEventListener('mouseleave', handleRelease, true);
    document.removeEventListener('touchstart', handlePress);
    document.removeEventListener('touchend', handleRelease);
    document.removeEventListener('mouseup', handleRelease);
}

function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
}

async function fitTextToContainer(element, maxHeight, minSize = 12, maxSize = 48) {
    console.log(`Fitting to ${maxHeight}px, range ${minSize}-${maxSize}`);

    // Wait for fonts to load
    await document.fonts.ready;

    // DISABLE iOS text size adjustment
    element.style.webkitTextSizeAdjust = 'none';
    element.style.textSizeAdjust = 'none';

    // Save original styles
    const originalStyles = {
        height: element.style.height,
        overflow: element.style.overflow,
        lineHeight: element.style.lineHeight,
        transition: element.style.transition,
        whiteSpace: element.style.whiteSpace,
        visibility: element.style.visibility
    };

    // Ensure element is visible and layout-ready
    element.style.height = 'auto';
    element.style.overflow = 'visible';
    element.style.lineHeight = '1.2';
    element.style.transition = 'none'; // Disable transitions during measurement
    element.style.visibility = 'hidden'; // Hidden but still takes up space for measurement
    
    // Force multiple reflows to ensure accurate measurement
    const forceReflow = () => {
        void element.offsetHeight;
        void element.scrollHeight;
        void element.clientHeight;
        return new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
    };

    let low = minSize;
    let high = maxSize;
    let bestFit = minSize;

    while (low <= high) {
        const fontSize = Math.floor((low + high) / 2);
        element.style.fontSize = fontSize + 'px';
        
        // Wait for layout to stabilize
        await forceReflow();
        
        // Take multiple measurements and use the maximum
        const measurements = [];
        for (let i = 0; i < 3; i++) {
            void element.offsetWidth; // Force reflow
            measurements.push(element.offsetHeight);
        }
        const naturalHeight = Math.max(...measurements);
        
        console.log(`  Testing ${fontSize}px: natural height = ${naturalHeight}px (max: ${maxHeight}px)`);
        
        if (naturalHeight <= maxHeight) {
            bestFit = fontSize;
            low = fontSize + 1;
        } else {
            high = fontSize - 1;
        }
    }

    element.style.fontSize = bestFit + 'px';
    console.log(`  Final: ${bestFit}px`);

    // Restore original styles (except line-height)
    element.style.height = originalStyles.height;
    element.style.overflow = originalStyles.overflow;
    element.style.transition = originalStyles.transition;
    element.style.visibility = originalStyles.visibility;
    
    return bestFit;
}

function fitIntroOutroToScreen(isMobile, isTablet, smallScreen) {
    const container = document.querySelector('.jspsych-content');
    if (!container) return;

    const totalHeight = window.visualViewport ? 
        window.visualViewport.height : window.innerHeight;

    const stimulusContainer = document.querySelector('.intro') || document.querySelector('#jspsych-html-button-response-stimulus .prompt_text');
    const buttonContainer = document.querySelector('#jspsych-html-button-response-btngroup') || document.querySelector('.jspsych-btn');
    const promptContainer = document.querySelector('.jspsych-content > p.prompt_text:not(.intro)');

    if (!stimulusContainer || !buttonContainer) {
        console.warn('Intro/outro elements not found');
        return;
    }

    const buttonHeight = buttonContainer.offsetHeight;
    const margin = isMobile ? 60 : 80;
    const availableHeight = totalHeight - buttonHeight - margin;
    const stimulusAllocation = availableHeight * 0.90;
    const promptAllocation = availableHeight * 0.10;

    console.log('Available space:', {
        totalHeight,
        buttonHeight,
        margin,
        availableHeight,
        stimulusAllocation
    });

    // Style STIMULUS - but don't set fixed height yet
    if (stimulusContainer) {
        stimulusContainer.style.overflow = 'visible'; // Critical for measurement
        stimulusContainer.style.height = 'auto'; // Let it size naturally
        stimulusContainer.style.boxSizing = 'border-box';
        stimulusContainer.style.margin = '0 auto';
        stimulusContainer.style.textAlign = 'center';
        stimulusContainer.style.padding = '20px';
        stimulusContainer.style.maxWidth = isMobile ? '90%' : isTablet ? '90%' : '70%';
        
        requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            let minFontSize, maxFontSize;
            if (isMobile) {
                minFontSize = 32;
                maxFontSize = 96;
            } else if (isTablet) {
                minFontSize = 36;
                maxFontSize = 96;
            } else if (smallScreen) {
                minFontSize = 24;
                maxFontSize = 56;
            } else {
                minFontSize = 32;
                maxFontSize = 88;
            }
            
            const finalSize = fitTextToContainer(
                stimulusContainer, 
                stimulusAllocation - 40, 
                minFontSize, 
                maxFontSize
            );
            
            console.log('Stimulus fitted to:', finalSize);
            
            // Now apply final styling
            stimulusContainer.style.height = stimulusAllocation + 'px';
            stimulusContainer.style.overflow = 'hidden';
        });
        });
    }

    // Similar for prompt
    if (promptContainer && promptAllocation > 20) {
        promptContainer.style.overflow = 'visible';
        promptContainer.style.height = 'auto';
        promptContainer.style.boxSizing = 'border-box';
        promptContainer.style.margin = '0 auto';
        promptContainer.style.textAlign = 'center';
        promptContainer.style.padding = '10px 20px';
        
        requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            let minFontSize, maxFontSize;
            if (isMobile) {
                minFontSize = 24;
                maxFontSize = 48;
            } else if (isTablet) {
                minFontSize = 28;
                maxFontSize = 56;
            } else if (smallScreen) {
                minFontSize = 28;
                maxFontSize = 56;
            } else {
                minFontSize = 32;
                maxFontSize = 64;
            }
            
            fitTextToContainer(promptContainer, promptAllocation, minFontSize, maxFontSize);
            container.classList.add('ready');
            promptContainer.style.height = promptAllocation + 'px';
            promptContainer.style.overflow = 'hidden';
        });
        });
    }
}

function calculateSideBySideCanvasSize(isMobile, isTablet, smallScreen) {
    const totalWidth = window.visualViewport ? 
        window.visualViewport.width : window.innerWidth;

    // Define horizontal space allocation for each device type
    let widthPercent;
    if (isMobile) {
        widthPercent = 0.90; // 90% of screen width
    } else if (isTablet) {
        widthPercent = 0.80; // 80% of screen width
    } else if (smallScreen) {
        widthPercent = 0.50; // 70% of screen width
    } else { // desktop
        widthPercent = 0.40; // 60% of screen width
    }

    // Calculate canvas width
    const canvasWidth = totalWidth * widthPercent;

    // Calculate canvas height (2:1 ratio - width:height)
    // Since we have 2 square images side by side, the canvas is 2x wider than tall
    // So height = width / 2
    const canvasHeight = canvasWidth / 1.8;

    console.log('Canvas size calculated:', {
        device: isMobile ? 'mobile' : isTablet ? 'tablet' : smallScreen ? 'laptop' : 'desktop',
        widthPercent,
        canvasWidth,
        canvasHeight
    });

    // jsPsych canvas_size is [height, width]
    return [Math.floor(canvasHeight), Math.floor(canvasWidth)];
}

function fitSideBySideToScreen(isMobile, isTablet, smallScreen) {
    const container = document.querySelector('.jspsych-content');
    if (!container) return;

    const totalHeight = window.offsetHeight ? 
        window.offsetHeight : window.innerHeight;

    // Find the actual elements (using ID selectors, not class!)
    const canvasStimulusContainer = document.querySelector('#jspsych-canvas-button-response-stimulus');
    const buttonContainer = document.querySelector('#jspsych-canvas-button-response-btngroup');
    const promptContainer = document.querySelector('.prompt_text');

    if (!canvasStimulusContainer || !buttonContainer) {
        console.warn('Side-by-side elements not found');
        return;
    }

    console.log('Fitting side-by-side prompt text');

    // Measure actual heights
    const canvasHeight = canvasStimulusContainer.offsetHeight;
    const buttonHeight = buttonContainer.offsetHeight;
    const margin = isMobile ? 40 : 60;

    // Calculate remaining space for prompt
    const promptHeight = totalHeight - canvasHeight - buttonHeight - margin;

    console.log('Space allocation:', {
        totalHeight,
        canvasHeight,
        buttonHeight,
        promptHeight,
        margin
    });

    // Style and fit prompt text
    if (promptContainer && promptHeight > 20) {
        const finalHeight = Math.max(promptHeight, 40) + 'px';

        promptContainer.style.height = finalHeight + 'px';
        promptContainer.style.overflow = 'hidden';
        promptContainer.style.boxSizing = 'border-box';
        promptContainer.style.margin = '10 auto';
        promptContainer.style.textAlign = 'center';
        promptContainer.style.justifyContent = 'space-between';
        promptContainer.style.padding = '10px 20px'
        
        // Fit text to available space
        if (typeof fitTextToContainer === 'function') {
        let minFontSize, maxFontSize;
        if (isMobile) {
            minFontSize = 36;
            maxFontSize = 96;
            } else if (isTablet) {
            minFontSize = 40;
            maxFontSize = 80;
            } else if (smallScreen) {
            minFontSize = 32;
            maxFontSize = 64;
            } else { // desktop
            minFontSize = 32;
            maxFontSize = 64;
            }
        fitTextToContainer(promptContainer, promptHeight * 0.85, minFontSize, maxFontSize);
        container.classList.add('ready');
        }
    }
}

function getDeviceType() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const isPortrait = height > width;
  
  // Calculate aspect ratio (always longer side / shorter side)
  const aspectRatio = Math.max(width, height) / Math.min(width, height);
  
  const screenSize = Math.max(width, height);
  const mobile = [true, false, false];
  const tablet = [false, true, false];
  const laptop = [false, false, true];
  const desktop = [false, false, false];
  
  console.log("width: " + width);
  console.log("height: " + height);
  console.log("aspect ratio: " + aspectRatio.toFixed(2));
  
  // Very large screens are desktops
  if (screenSize >= 1920) {
    console.log("desktop");
    return desktop;
  }
  
  // Laptop range (typically 13-15 inch displays)
  if (screenSize >= 1366 && screenSize < 1920) {
    // Large tablets in portrait can reach this size, use aspect ratio
    if (isPortrait && aspectRatio >= 1.3 && aspectRatio <= 1.6) {
      console.log("tablet (large)");
      return tablet;
    }
    console.log("laptop");
    return laptop;
  }
  
  // Medium screens (tablets vs small laptops)
  if (screenSize >= 1024 && screenSize < 1366) {
    if (isPortrait) {
      console.log("tablet");
      return tablet;
    } else {
      console.log("laptop");
      return laptop;
    }
  }
  
  // Small to medium screens - THIS IS THE KEY RANGE
  // Use aspect ratio to distinguish phones from tablets
  if (screenSize >= 768 && screenSize < 1024) {
    // Phones have more elongated screens (taller/narrower)
    // aspectRatio >= 1.7 suggests a phone
    if (aspectRatio >= 1.7) {
      console.log("mobile (large phone)");
      return mobile;
    } else {
      console.log("tablet (small)");
      return tablet;
    }
  }
  
  // Smaller screens - but check aspect ratio still
  if (screenSize < 768) {
    // Small tablets might be here with squarer aspect ratios
    if (aspectRatio < 1.5 && screenSize >= 600) {
      console.log("tablet (very small)");
      return tablet;
    }
    console.log("mobile");
    return mobile;
  }
  
  // Fallback
  console.log("desktop");
  return desktop;
}