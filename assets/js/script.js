// Wrist & Pocket Studio — Client-side scripts
(function () {
    'use strict';

    document.addEventListener('DOMContentLoaded', function () {
        initTagFilters();
        initLanguageTracker();
        initTiltEffects();
        initLightbox();
        initServiceWorker();
    });

    /**
     * Registers the PWA Service Worker (only in production / non-localhost)
     */
    function initServiceWorker() {
        if ('serviceWorker' in navigator && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
            var swPath = '/sw.js';
            navigator.serviceWorker.register(swPath).then(function (registration) {
                console.log('ServiceWorker registered with scope: ', registration.scope);
            }).catch(function (error) {
                console.error('ServiceWorker registration failed: ', error);
            });
        }
    }

    /**
     * Initializes Language preference tracking on click
     */
    function initLanguageTracker() {
        var langLinks = document.querySelectorAll('.lang-switch[data-lang]');
        langLinks.forEach(function (link) {
            link.addEventListener('click', function () {
                var selectedLang = this.getAttribute('data-lang');
                if (selectedLang) {
                    localStorage.setItem('preferred_lang', selectedLang.toLowerCase());
                }
            });
        });
    }

    /**
     * Initializes Vanilla JS game-tag filtering on the blog feed page
     */
    function initTagFilters() {
        var filterButtons = document.querySelectorAll('.btn-filter');
        var newsCards = document.querySelectorAll('.news-card');
        
        if (!filterButtons.length || !newsCards.length) return;

        filterButtons.forEach(function (button) {
            button.addEventListener('click', function () {
                var selectedTag = this.getAttribute('data-tag');

                filterButtons.forEach(function (btn) {
                    btn.classList.remove('active');
                });
                this.classList.add('active');

                newsCards.forEach(function (card) {
                    var cardTagsStr = card.getAttribute('data-tags') || '';
                    var cardTags = cardTagsStr.split(',').map(function (t) { return t.trim(); });

                    if (selectedTag === 'all' || cardTags.indexOf(selectedTag) !== -1) {
                        card.style.display = '';
                        card.classList.add('fade-in');
                    } else {
                        card.style.display = 'none';
                        card.classList.remove('fade-in');
                    }
                });
            });
        });
    }

    /**
     * UTILITIES: Throttled MouseMove (rAF throttled for 60+ FPS performance)
     */
    function createThrottledMouseMove(el, updateCallback, resetCallback) {
        var ticking = false;
        var rafId = null;
        var rect = null;

        function handleMouseEnter() {
            rect = el.getBoundingClientRect();
            el.style.transition = 'transform 0.1s ease-out, border-color 0.25s ease, box-shadow 0.25s ease';
        }

        function handleMouseMove(e) {
            if (!ticking && rect) {
                rafId = window.requestAnimationFrame(function () {
                    updateCallback(e, rect);
                    ticking = false;
                });
                ticking = true;
            }
        }

        function handleMouseLeave() {
            if (rafId) {
                window.cancelAnimationFrame(rafId);
                rafId = null;
            }
            ticking = false;
            rect = null;
            if (resetCallback) resetCallback();
        }

        el.addEventListener('mouseenter', handleMouseEnter);
        el.addEventListener('mousemove', handleMouseMove);
        el.addEventListener('mouseleave', handleMouseLeave);
    }

    /**
     * 3D Card and Bezel tilt effects on hover/mouse move
     */
    function initTiltEffects() {
        var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) return;

        // 1. Homepage Bento Cards & Game Items & News Cards
        var tiltCards = document.querySelectorAll('.hub-card, .game-item, .news-card');
        tiltCards.forEach(function (card) {
            // Append glare element if not already present
            var glare = card.querySelector('.card-glare');
            if (!glare) {
                glare = document.createElement('div');
                glare.className = 'card-glare';
                card.appendChild(glare);
            }

            createThrottledMouseMove(
                card,
                function (e, rect) {
                    var x = e.clientX - rect.left;
                    var y = e.clientY - rect.top;
                    var cw = rect.width;
                    var ch = rect.height;
                    var nx = (x / cw - 0.5) * 2;
                    var ny = (y / ch - 0.5) * 2;
                    
                    // Gentle 3D tilt angles
                    var rotateX = -ny * 3;
                    var rotateY = nx * 3;

                    // Combine lift, scale, and tilt
                    card.style.transform = 
                        'perspective(1000px) translateY(-8px) scale(1.02) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg)';
                    
                    // Update glare position and opacity
                    if (glare) {
                        var gx = (x / cw) * 100;
                        var gy = (y / ch) * 100;
                        glare.style.setProperty('--glare-x', gx + '%');
                        glare.style.setProperty('--glare-y', gy + '%');
                        glare.style.opacity = '1';
                    }

                    // Highlight the CTA button (Play Store button) inside game item cards
                    var cta = card.querySelector('.game-item__cta');
                    if (cta && !cta.classList.contains('game-item__cta--disabled')) {
                        cta.style.background = '#4ecdc4';
                        cta.style.color = '#0a0a0f';
                    }
                },
                function () {
                    card.style.transition = 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1), border-color 0.4s ease, box-shadow 0.4s ease';
                    card.style.transform = '';
                    
                    if (glare) {
                        glare.style.opacity = '0';
                    }

                    var cta = card.querySelector('.game-item__cta');
                    if (cta) {
                        cta.style.background = '';
                        cta.style.color = '';
                    }
                }
            );
        });

        // 2. Smartwatch Screenshot Bezels (Game Details Page)
        var bezels = document.querySelectorAll('.smartwatch-bezel');
        bezels.forEach(function (bezel) {
            createThrottledMouseMove(
                bezel,
                function (e, rect) {
                    var x = e.clientX - rect.left;
                    var y = e.clientY - rect.top;
                    var cw = rect.width;
                    var ch = rect.height;
                    var nx = (x / cw - 0.5) * 2;
                    var ny = (y / ch - 0.5) * 2;
                    
                    var rotateX = -ny * 8; // more rotation for smartwatch
                    var rotateY = nx * 8;
                    
                    // Translate glass shimmer based on mouse position
                    var shimmer = bezel.querySelector('.smartwatch-glass-shimmer');
                    if (shimmer) {
                        var sx = nx * 15;
                        var sy = ny * 15;
                        shimmer.style.transform = 'translate(' + sx + '%, ' + sy + '%)';
                    }

                    bezel.style.transform = 
                        'perspective(1000px) scale(1.06) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg)';
                },
                function () {
                    bezel.style.transition = 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1), border-color 0.4s ease, box-shadow 0.4s ease';
                    bezel.style.transform = '';
                    
                    var shimmer = bezel.querySelector('.smartwatch-glass-shimmer');
                    if (shimmer) {
                        shimmer.style.transition = 'transform 0.4s ease';
                        shimmer.style.transform = '';
                    }
                }
            );
        });
    }

    /**
     * Initializes the interactive lightbox gallery for smartwatch screenshots
     */
    function initLightbox() {
        var bezels = document.querySelectorAll('.smartwatch-bezel');
        var lightbox = document.getElementById('game-lightbox');
        var lightboxImg = document.getElementById('lightbox-img');
        var lightboxVideo = document.getElementById('lightbox-video');
        var closeBtn = document.getElementById('lightbox-close');
        var prevBtn = document.getElementById('lightbox-prev');
        var nextBtn = document.getElementById('lightbox-next');
        var dotsContainer = document.getElementById('lightbox-dots');

        if (!bezels.length || !lightbox || !lightboxImg) return;

        // Collect all screenshot image/video sources and types
        var mediaItems = [];
        bezels.forEach(function (bezel) {
            var videoSrc = bezel.getAttribute('data-video-src');
            var fullSrc = bezel.getAttribute('data-full-src');
            
            if (videoSrc) {
                mediaItems.push({ type: 'video', src: videoSrc });
            } else if (fullSrc) {
                mediaItems.push({ type: 'image', src: fullSrc });
            } else {
                var img = bezel.querySelector('.smartwatch-screen');
                if (img) {
                    mediaItems.push({ type: 'image', src: img.src });
                }
            }
        });

        var currentIndex = 0;

        // Open Lightbox
        bezels.forEach(function (bezel, index) {
            bezel.addEventListener('click', function () {
                currentIndex = index;
                openLightbox();
            });
        });

        function openLightbox() {
            lightbox.classList.add('active');
            lightbox.setAttribute('aria-hidden', 'false');
            updateMedia();
            createDots();
            document.body.style.overflow = 'hidden'; // Lock scroll
        }

        function closeLightbox() {
            lightbox.classList.remove('active');
            lightbox.setAttribute('aria-hidden', 'true');
            if (lightboxVideo) {
                lightboxVideo.pause();
                lightboxVideo.src = '';
            }
            document.body.style.overflow = ''; // Unlock scroll
        }

        function updateMedia() {
            var item = mediaItems[currentIndex];
            if (!item) return;

            if (item.type === 'video') {
                lightboxImg.style.display = 'none';
                if (lightboxVideo) {
                    lightboxVideo.style.display = 'block';
                    lightboxVideo.src = item.src;
                    lightboxVideo.load();
                    lightboxVideo.play().catch(function (e) {
                        console.log("Autoplay prevented or failed:", e);
                    });
                }
            } else {
                if (lightboxVideo) {
                    lightboxVideo.style.display = 'none';
                    lightboxVideo.src = '';
                }
                lightboxImg.style.display = 'block';
                lightboxImg.src = item.src;
            }
            updateDots();
        }

        function showNext() {
            currentIndex = (currentIndex + 1) % mediaItems.length;
            updateMedia();
        }

        function showPrev() {
            currentIndex = (currentIndex - 1 + mediaItems.length) % mediaItems.length;
            updateMedia();
        }

        // Dots indicator creation
        function createDots() {
            if (!dotsContainer) return;
            dotsContainer.innerHTML = '';
            mediaItems.forEach(function (_, index) {
                var dot = document.createElement('span');
                dot.className = 'lightbox-dot';
                if (index === currentIndex) dot.classList.add('active');
                
                dot.addEventListener('click', function (e) {
                    e.stopPropagation();
                    currentIndex = index;
                    updateMedia();
                });
                dotsContainer.appendChild(dot);
            });
        }

        function updateDots() {
            if (!dotsContainer) return;
            var dots = dotsContainer.querySelectorAll('.lightbox-dot');
            dots.forEach(function (dot, index) {
                if (index === currentIndex) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        }

        // Event listeners
        if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
        if (prevBtn) {
            prevBtn.addEventListener('click', function (e) {
                e.stopPropagation();
                showPrev();
            });
        }
        if (nextBtn) {
            nextBtn.addEventListener('click', function (e) {
                e.stopPropagation();
                showNext();
            });
        }

        // Close on background click
        lightbox.addEventListener('click', function (e) {
            if (e.target === lightbox || e.target.classList.contains('lightbox-content')) {
                closeLightbox();
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', function (e) {
            if (!lightbox.classList.contains('active')) return;
            if (e.key === 'Escape') {
                closeLightbox();
            } else if (e.key === 'ArrowRight') {
                showNext();
            } else if (e.key === 'ArrowLeft') {
                showPrev();
            }
        });

        // Touch swipe navigation (mobile)
        var touchStartX = 0;
        var touchStartY = 0;
        var swipeThreshold = 50;

        lightbox.addEventListener('touchstart', function (e) {
            touchStartX = e.changedTouches[0].clientX;
            touchStartY = e.changedTouches[0].clientY;
        }, { passive: true });

        lightbox.addEventListener('touchend', function (e) {
            var dx = e.changedTouches[0].clientX - touchStartX;
            var dy = e.changedTouches[0].clientY - touchStartY;

            // Only handle horizontal swipes (avoid conflict with vertical scroll)
            if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > swipeThreshold) {
                if (dx < 0) {
                    showNext();
                } else {
                    showPrev();
                }
            }
        }, { passive: true });
    }
})();
