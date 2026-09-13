// Progressive enhancement; no analytics transport is installed.
(function () {
    'use strict';
    document.querySelectorAll('.lang-switch[data-lang]').forEach(function (link) {
        link.addEventListener('click', function () {
            try { localStorage.setItem('preferred_lang', link.dataset.lang); } catch (_) { /* Optional storage. */ }
        });
    });
    var filters = document.querySelectorAll('.btn-filter');
    filters.forEach(function (button) {
        button.setAttribute('aria-pressed', button.classList.contains('active') ? 'true' : 'false');
        button.addEventListener('click', function () {
            filters.forEach(function (other) {
                other.classList.toggle('active', other === button);
                other.setAttribute('aria-pressed', other === button ? 'true' : 'false');
            });
            document.querySelectorAll('.news-card[data-tags]').forEach(function (card) {
                card.hidden = button.dataset.tag !== 'all' && JSON.parse(card.dataset.tags).indexOf(button.dataset.tag) < 0;
            });
        });
    });
    var dialog = document.getElementById('media-dialog');
    if (dialog && typeof dialog.showModal === 'function') {
        var items = Array.from(document.querySelectorAll('.gallery-image'));
        var picture = document.getElementById('media-image');
        var current = 0, opener;
        function show(index) {
            current = (index + items.length) % items.length;
            picture.src = items[current].href;
            picture.alt = items[current].querySelector('img').alt;
        }
        items.forEach(function (link, index) {
            link.addEventListener('click', function (event) {
                event.preventDefault(); opener = link; show(index); dialog.showModal();
                document.body.style.overflow = 'hidden'; document.getElementById('media-close').focus();
            });
        });
        document.getElementById('media-close').addEventListener('click', function () { dialog.close(); });
        document.getElementById('media-prev').addEventListener('click', function () { show(current - 1); });
        document.getElementById('media-next').addEventListener('click', function () { show(current + 1); });
        dialog.addEventListener('keydown', function (event) {
            if (event.key === 'ArrowLeft') { event.preventDefault(); show(current - 1); }
            if (event.key === 'ArrowRight') { event.preventDefault(); show(current + 1); }
        });
        dialog.addEventListener('click', function (event) { if (event.target === dialog) dialog.close(); });
        dialog.addEventListener('close', function () { document.body.style.overflow = ''; if (opener) opener.focus(); });
    }
    // Update existing registrations to the retirement worker, without enrolling new visitors.
    if ('serviceWorker' in navigator && location.hostname === 'wristandpocket.dev') {
        navigator.serviceWorker.getRegistration('/').then(function (registration) {
            if (registration) return navigator.serviceWorker.register('/sw.js', { updateViaCache: 'none' });
        }).catch(function () { /* Network navigation remains usable. */ });
    }
})();
