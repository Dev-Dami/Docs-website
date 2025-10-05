// Enhanced DYMS documentation JavaScript

document.addEventListener('DOMContentLoaded', function() {
    
    // Add copy buttons to code blocks
    const codeBlocks = document.querySelectorAll('pre > code');
    codeBlocks.forEach(function(codeBlock) {
        const pre = codeBlock.parentElement;
        const copyButton = document.createElement('button');
        copyButton.className = 'md-clipboard md-icon';
        copyButton.title = 'Copy to clipboard';
        copyButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z" /></svg>';
        
        copyButton.addEventListener('click', function() {
            navigator.clipboard.writeText(codeBlock.textContent).then(function() {
                copyButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" /></svg>';
                setTimeout(function() {
                    copyButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z" /></svg>';
                }, 2000);
            });
        });
        
        pre.style.position = 'relative';
        pre.appendChild(copyButton);
    });
    
    // Add interactive elements to code playgrounds
    const playgrounds = document.querySelectorAll('.code-playground');
    playgrounds.forEach(function(playground) {
        const runButton = document.createElement('button');
        runButton.className = 'md-button md-button--primary run-button';
        runButton.textContent = 'Run This Code';
        runButton.style.marginTop = '1rem';
        
        runButton.addEventListener('click', function() {
            // For demonstration - in a real implementation, this could
            // integrate with a DYMS web interpreter or show execution steps
            alert('In a full implementation, this would run the DYMS code!\\n\\nFor now, copy the code and run it locally with:\\ngo run . filename.dy');
        });
        
        playground.appendChild(runButton);
    });
    
    // Add smooth scrolling to anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Highlight current section in navigation
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            const id = entry.target.getAttribute('id');
            if (entry.isIntersecting) {
                const navLink = document.querySelector(`nav a[href="#${id}"]`);
                if (navLink) {
                    document.querySelectorAll('nav a').forEach(function(link) {
                        link.classList.remove('current-section');
                    });
                    navLink.classList.add('current-section');
                }
            }
        });
    });
    
    document.querySelectorAll('h1[id], h2[id], h3[id]').forEach(function(heading) {
        observer.observe(heading);
    });
    
    // Add version selector functionality (placeholder)
    const versionDisplay = document.createElement('div');
    versionDisplay.className = 'version-display';
    versionDisplay.innerHTML = '<span class="version-badge">v0.5.0</span>';
    versionDisplay.style.cssText = 'position: fixed; top: 70px; right: 20px; z-index: 1000; font-size: 0.8rem;';
    document.body.appendChild(versionDisplay);
    
});

// Add custom CSS via JavaScript for dynamic elements
const customStyles = `
    .run-button {
        background: #10B981 !important;
        border: 1px solid #10B981 !important;
        padding: 8px 16px !important;
        color: white !important;
        font-weight: 500 !important;
        cursor: pointer !important;
    }
    
    .run-button:hover {
        opacity: 0.9 !important;
    }
    
    .md-clipboard {
        position: absolute !important;
        top: 8px !important;
        right: 8px !important;
        width: 24px !important;
        height: 24px !important;
        background: #F3F4F6 !important;
        border: 1px solid #E5E7EB !important;
        cursor: pointer !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
    }
    
    .md-clipboard:hover {
        background: #F9FAFB !important;
    }
    
    .md-clipboard svg {
        width: 16px !important;
        height: 16px !important;
        fill: #6B7280 !important;
    }
    
    .version-badge {
        background: #10B981;
        color: white;
        padding: 4px 8px;
        font-size: 0.75rem;
        font-weight: 500;
        border: 1px solid #10B981;
    }
    
    .current-section {
        color: #2DD4BF !important;
        font-weight: 600 !important;
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = customStyles;
document.head.appendChild(styleSheet);