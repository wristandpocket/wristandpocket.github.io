/* Post media: glossary tooltips (_includes/term.html) and bento gallery
   viewer (_includes/gallery.html). Loaded only on posts that use them.
   Without this script terms are plain underlined words and gallery tiles
   open the photo itself. */
(function () {
  "use strict";
  var doc = document;
  var root = doc.documentElement;
  var lang = (root.lang || "en").slice(0, 2);
  root.classList.add("pm-js");

  /* ---------- Glossary terms ---------- */
  var open = null;
  var seq = 0;

  function place(wrap) {
    var tip = wrap.querySelector(".term__tip");
    if (!tip) return;
    wrap.style.removeProperty("--tip-shift");
    wrap.classList.remove("term-wrap--below");
    var r = tip.getBoundingClientRect();
    var vw = root.clientWidth;
    var pad = 12;
    var shift = 0;
    if (r.left < pad) shift = pad - r.left;
    else if (r.right > vw - pad) shift = vw - pad - r.right;
    if (shift) wrap.style.setProperty("--tip-shift", Math.round(shift) + "px");
    if (r.top < 72) wrap.classList.add("term-wrap--below"); /* keep clear of the sticky header */
  }

  function setOpen(wrap, state) {
    if (!wrap) return;
    wrap.classList.toggle("is-open", state);
    wrap.querySelector(".term").setAttribute("aria-expanded", state ? "true" : "false");
    if (state) {
      wrap.classList.remove("term-wrap--dismissed");
      if (open && open !== wrap) setOpen(open, false);
      open = wrap;
      place(wrap);
    } else if (open === wrap) {
      open = null;
    }
  }

  var wraps = doc.querySelectorAll(".term-wrap");
  Array.prototype.forEach.call(wraps, function (wrap) {
    var btn = wrap.querySelector(".term");
    if (!btn || !btn.getAttribute("data-def")) return;
    var tip = doc.createElement("span");
    tip.className = "term__tip";
    tip.setAttribute("role", "tooltip");
    tip.id = "term-tip-" + (++seq);
    var name = doc.createElement("b");
    name.className = "term__name";
    name.textContent = btn.getAttribute("data-term") || btn.textContent;
    tip.appendChild(name);
    tip.appendChild(doc.createTextNode(" " + btn.getAttribute("data-def")));
    wrap.appendChild(tip);
    btn.setAttribute("aria-describedby", tip.id);

    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      setOpen(wrap, !wrap.classList.contains("is-open"));
    });
    wrap.addEventListener("mouseenter", function () { place(wrap); });
    wrap.addEventListener("mouseleave", function () { wrap.classList.remove("term-wrap--dismissed"); });
    btn.addEventListener("focus", function () { place(wrap); });
    wrap.addEventListener("focusout", function (e) {
      if (!wrap.contains(e.relatedTarget)) {
        setOpen(wrap, false);
        wrap.classList.remove("term-wrap--dismissed");
      }
    });
  });

  if (wraps.length) {
    doc.addEventListener("click", function (e) {
      if (open && !open.contains(e.target)) setOpen(open, false);
    });
    doc.addEventListener("keydown", function (e) {
      if (e.key !== "Escape") return;
      if (open) setOpen(open, false);
      /* WCAG 1.4.13: Escape also hides tips shown by hover or keyboard focus */
      Array.prototype.forEach.call(wraps, function (w) {
        if (w.matches(":hover") || w.contains(doc.activeElement)) w.classList.add("term-wrap--dismissed");
      });
    });
    window.addEventListener("resize", function () { if (open) place(open); });
  }

  /* ---------- Gallery viewer ---------- */
  var galleries = doc.querySelectorAll("[data-gallery]");
  if (!galleries.length || typeof HTMLDialogElement !== "function") return;

  var L = {
    uk: ["Перегляд фото", "Закрити", "Попереднє фото", "Наступне фото"],
    ru: ["Просмотр фото", "Закрыть", "Предыдущее фото", "Следующее фото"],
    ko: ["사진 보기", "닫기", "이전 사진", "다음 사진"],
    en: ["Photo viewer", "Close", "Previous photo", "Next photo"]
  };
  var t = L[lang] || L.en;

  var dlg = doc.createElement("dialog");
  dlg.className = "pm-lb";
  dlg.setAttribute("aria-label", t[0]);
  dlg.innerHTML =
    '<figure class="pm-lb__stage"><img class="pm-lb__img" alt=""><figcaption class="pm-lb__cap" aria-hidden="true"></figcaption></figure>' +
    '<span class="pm-lb__count" aria-live="polite"></span>' +
    '<button type="button" class="pm-lb__btn pm-lb__close" aria-label="' + t[1] + '">&times;</button>' +
    '<button type="button" class="pm-lb__btn pm-lb__prev" aria-label="' + t[2] + '">&#8249;</button>' +
    '<button type="button" class="pm-lb__btn pm-lb__next" aria-label="' + t[3] + '">&#8250;</button>';
  doc.body.appendChild(dlg);

  var img = dlg.querySelector(".pm-lb__img");
  var cap = dlg.querySelector(".pm-lb__cap");
  var count = dlg.querySelector(".pm-lb__count");
  var items = [];
  var index = 0;

  function show(i) {
    index = (i + items.length) % items.length;
    var a = items[index];
    var alt = a.getAttribute("data-alt") || "";
    img.src = a.getAttribute("href");
    img.alt = alt;
    cap.textContent = alt;
    count.textContent = items.length > 1 ? (index + 1) + " / " + items.length : "";
    dlg.classList.toggle("pm-lb--single", items.length < 2);
    [index + 1, index - 1].forEach(function (n) {
      var next = items[(n + items.length) % items.length];
      if (next) (new Image()).src = next.getAttribute("href");
    });
  }

  Array.prototype.forEach.call(galleries, function (g) {
    var links = Array.prototype.slice.call(g.querySelectorAll(".pm-gallery__item"));
    links.forEach(function (a, i) {
      a.addEventListener("click", function (e) {
        e.preventDefault();
        items = links;
        show(i);
        root.classList.add("pm-lb-open");
        dlg.showModal();
      });
    });
  });

  var swiped = false;
  dlg.querySelector(".pm-lb__close").addEventListener("click", function () { dlg.close(); });
  dlg.querySelector(".pm-lb__prev").addEventListener("click", function () { show(index - 1); });
  dlg.querySelector(".pm-lb__next").addEventListener("click", function () { show(index + 1); });
  dlg.addEventListener("click", function (e) {
    if (swiped) { swiped = false; return; }
    if (e.target === dlg || e.target.classList.contains("pm-lb__stage")) dlg.close();
  });
  dlg.addEventListener("keydown", function (e) {
    if (e.key === "ArrowRight") show(index + 1);
    else if (e.key === "ArrowLeft") show(index - 1);
  });
  dlg.addEventListener("close", function () {
    img.removeAttribute("src");
    root.classList.remove("pm-lb-open");
  });

  var startX = null;
  dlg.addEventListener("pointerdown", function (e) { startX = e.clientX; });
  dlg.addEventListener("pointercancel", function () { startX = null; });
  dlg.addEventListener("pointerup", function (e) {
    if (startX === null) return;
    var dx = e.clientX - startX;
    startX = null;
    if (Math.abs(dx) > 45 && items.length > 1) {
      swiped = true;
      setTimeout(function () { swiped = false; }, 400);
      show(index + (dx < 0 ? 1 : -1));
    }
  });
})();
