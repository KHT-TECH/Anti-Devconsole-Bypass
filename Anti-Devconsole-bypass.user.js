// ==UserScript==
// @name         Anti-Devconsole-Bypass
// @namespace    https://github.com/KHT-TECH/Anti-Devconsole-Bypass
// @version      1.0
// @description  Prevents disable-devtool from being loaded
// @author       KHT-TECH
// @match        * //IF YOU SEE THIS, CHANGE THIS TO YOUR URL U WANT TO DEBUG TO AVOID TO DO IT ON EVERY PAGE: E.g.: https://youtube.com/*
// @run-at       document-start
// ==/UserScript==

(function() {
    const observer = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
            for (const node of mutation.addedNodes) {
                if (node.tagName === 'SCRIPT') {
                    const src = node.src || '';
                    if (src.includes('disable-devtool')) {
                        console.log('Blocked script:', src);
                        node.remove();
                    }
                }
            }
        }
    });

    observer.observe(document.documentElement, {
        childList: true,
        subtree: true
    });

    // Override `appendChild` to block dynamic script injection
    const originalAppendChild = Element.prototype.appendChild;
    Element.prototype.appendChild = function (el) {
        if (el.tagName === 'SCRIPT' && el.src.includes('disable-devtool')) {
            console.log('Blocked dynamic script via appendChild:', el.src);
            return el;
        }
        return originalAppendChild.call(this, el);
    };
})();
