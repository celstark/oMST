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

function fitTextToContainer(element, maxHeight, minSize = 12, maxSize = 48) {
    console.log(`Fitting to ${maxHeight}px, range ${minSize}-${maxSize}`);

    // DISABLE iOS text size adjustment
    element.style.webkitTextSizeAdjust = 'none';
    element.style.textSizeAdjust = 'none';

    let low = minSize;
    let high = maxSize;
    let bestFit = minSize;

    const originalHeight = element.style.height;
    const originalOverflow = element.style.overflow;
    const originalLineHeight = element.style.lineHeight; // Save original

    element.style.height = 'auto';
    element.style.overflow = 'visible';
    element.style.lineHeight = '1.2'; // ← FIX: Force consistent line-height

    while (low <= high) {
        const fontSize = Math.floor((low + high) / 2);
        element.style.fontSize = fontSize + 'px';
        
        void element.offsetWidth;
        const naturalHeight = element.offsetHeight;
        
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

    element.style.height = originalHeight;
    element.style.overflow = originalOverflow;
    // Don't restore line-height - keep it at 1.2
    
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
        stimulusContainer.style.maxWidth = isMobile ? '90%' : isTablet ? '80%' : '70%';
        
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
                minFontSize = 44;
                maxFontSize = 88;
            }
            
            const finalSize = fitTextToContainer(
                stimulusContainer, 
                stimulusAllocation, 
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
