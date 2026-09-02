/* ============================================================
   CURIO MAKER — shared interactions for every page
   Every block is guarded, so this one file is safe to load
   on pages that do not contain that block.
   ============================================================ */
(function () {
  "use strict";

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var $  = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* ── 1. sticky nav + scroll progress ────────────────────── */
  var nav      = $("#nav");
  var progress = $("#progressBar");

  function onScrollChrome() {
    var y = window.scrollY;
    if (nav) nav.classList.toggle("is-stuck", y > 30);
    if (progress) {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.width = (max > 0 ? (y / max) * 100 : 0) + "%";
    }
  }

  /* ── 2. mobile menu ─────────────────────────────────────── */
  var burger = $("#burger");
  var links  = $("#navLinks");

  if (burger && links) {
    burger.addEventListener("click", function () {
      var open = links.classList.toggle("is-open");
      burger.classList.toggle("is-open", open);
      burger.setAttribute("aria-expanded", String(open));
    });

    $$("a", links).forEach(function (a) {
      a.addEventListener("click", function () {
        links.classList.remove("is-open");
        burger.classList.remove("is-open");
        burger.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ── 3. parallax (scroll + pointer), rAF driven ─────────── */
  var layers = $$("[data-speed]").map(function (el) {
    return { el: el, speed: parseFloat(el.dataset.speed) || 0 };
  });

  var hero      = $("#hero");
  var heroInner = $(".hero__inner");
  var pointer   = { x: 0, y: 0 };   // target  -1..1
  var smooth    = { x: 0, y: 0 };   // eased
  var ticking   = false;

  if (!reduced && layers.length) {
    window.addEventListener("pointermove", function (e) {
      pointer.x = (e.clientX / window.innerWidth  - 0.5) * 2;
      pointer.y = (e.clientY / window.innerHeight - 0.5) * 2;
      requestTick();
    }, { passive: true });
  }

  function paint() {
    ticking = false;
    var y = window.scrollY;

    // ease pointer toward target so motion feels springy, not twitchy
    smooth.x += (pointer.x - smooth.x) * 0.08;
    smooth.y += (pointer.y - smooth.y) * 0.08;

    if (!reduced) {
      layers.forEach(function (l) {
        // `translate` (not `transform`) so CSS float/spin animations keep running
        var dy = y * l.speed + smooth.y * l.speed * 26;
        var dx = smooth.x * l.speed * 26;
        l.el.style.translate = dx.toFixed(2) + "px " + dy.toFixed(2) + "px";
      });

      // home hero: copy lifts away and fades as you leave the section
      if (hero && heroInner) {
        var p = Math.min(y / (hero.offsetHeight * 0.85), 1);
        heroInner.style.opacity = String(1 - p);
        heroInner.style.translate = "0 " + (-p * 60).toFixed(1) + "px";
      }
    }

    // keep the eased pointer loop alive until it settles
    if (Math.abs(pointer.x - smooth.x) > 0.001 || Math.abs(pointer.y - smooth.y) > 0.001) {
      requestTick();
    }
  }

  function requestTick() {
    if (!ticking) { ticking = true; requestAnimationFrame(paint); }
  }

  window.addEventListener("scroll", function () {
    onScrollChrome();
    requestTick();
  }, { passive: true });

  window.addEventListener("resize", requestTick, { passive: true });

  /* ── 4. reveal on scroll ────────────────────────────────── */
  var revealEls = $$(".reveal");
  revealEls.forEach(function (el) {
    el.style.setProperty("--d", el.dataset.reveal || 1);
  });

  if (reduced || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) { el.classList.add("is-in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add("is-in");
        io.unobserve(e.target);
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -8% 0px" });

    revealEls.forEach(function (el) { io.observe(el); });
  }

  /* ── 5. counting numbers ────────────────────────────────── */
  function runCount(el) {
    var target = parseInt(el.dataset.count, 10) || 0;
    var suffix = el.dataset.suffix || "";
    var dur    = 1600;
    var t0     = performance.now();

    (function step(now) {
      var p = Math.min((now - t0) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);          // easeOutCubic
      el.textContent = Math.round(target * eased).toLocaleString() + suffix;
      if (p < 1) requestAnimationFrame(step);
    })(t0);
  }

  var counters = $$(".count");
  if (counters.length) {
    if (reduced || !("IntersectionObserver" in window)) {
      counters.forEach(function (el) {
        el.textContent = (parseInt(el.dataset.count, 10) || 0).toLocaleString() + (el.dataset.suffix || "");
      });
    } else {
      var cio = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (!e.isIntersecting) return;
          runCount(e.target);
          cio.unobserve(e.target);
        });
      }, { threshold: 0.6 });
      counters.forEach(function (el) { cio.observe(el); });
    }
  }

  /* ── 6. robot eyes follow the cursor (home + about) ─────── */
  var bot    = $("#bot");
  var pupils = $("#pupils");

  if (bot && pupils && !reduced) {
    window.addEventListener("pointermove", function (e) {
      var r = bot.getBoundingClientRect();
      if (r.bottom < 0 || r.top > window.innerHeight) return;   // off-screen, skip

      var cx = r.left + r.width  / 2;
      var cy = r.top  + r.height * 0.32;                        // eye height
      var dx = (e.clientX - cx) / (window.innerWidth  / 2);
      var dy = (e.clientY - cy) / (window.innerHeight / 2);
      var max = 9;                                              // SVG user units

      var ox = Math.max(-1, Math.min(1, dx)) * max;
      var oy = Math.max(-1, Math.min(1, dy)) * max * 0.7;
      pupils.style.transform = "translate(" + ox.toFixed(1) + "px," + oy.toFixed(1) + "px)";
    }, { passive: true });
  }

  /* ── 7. home page quick trial form ──────────────────────── */
  var form = $("#trialForm");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var card = form.closest(".cta__card");
      var msg  = document.createElement("p");
      msg.className = "cta__thanks";
      msg.textContent = "Seat reserved! 🎉 We will email you the trial-class details.";
      card.insertBefore(msg, form);
      card.classList.add("is-sent");
    });
  }

  /* ── 8. filter chips (products + gallery) ───────────────── */
  $$("[data-filter-target]").forEach(function (bar) {
    var grid = $(bar.dataset.filterTarget);
    if (!grid) return;
    var items   = $$("[data-cat]", grid);
    var empty   = $(".grid-empty", grid.parentNode);

    bar.addEventListener("click", function (e) {
      var btn = e.target.closest("[data-filter]");
      if (!btn) return;

      $$("[data-filter]", bar).forEach(function (b) {
        var on = b === btn;
        b.classList.toggle("is-on", on);
        b.setAttribute("aria-pressed", String(on));
      });

      var f = btn.dataset.filter;
      var shown = 0;
      items.forEach(function (it) {
        var show = f === "all" || it.dataset.cat === f;
        it.classList.toggle("is-hidden", !show);
        it.classList.add("is-in");           // never leave a filtered-in card invisible
        if (show) shown++;
      });
      if (empty) empty.hidden = shown > 0;
    });
  });

  /* ── 9. gallery lightbox ────────────────────────────────── */
  var box = $("#lightbox");
  if (box) {
    var boxArt   = $(".lightbox__art", box);
    var boxTitle = $(".lightbox__title", box);
    var boxMaker = $(".lightbox__maker", box);
    var boxTech  = $(".lightbox__tech", box);
    var boxStory = $(".lightbox__story", box);
    var lastOpener = null;

    function openBox(tile) {
      lastOpener = tile;
      var art = $(".gal__art", tile);
      boxArt.className = "lightbox__art " + (art ? art.className.replace("gal__art", "").trim() : "");
      boxArt.textContent = art ? art.textContent.trim() : "";
      boxTitle.textContent = tile.dataset.title || "";
      boxMaker.textContent = tile.dataset.maker || "";
      boxTech.textContent  = tile.dataset.tech  || "";
      boxStory.textContent = tile.dataset.story || "";
      box.hidden = false;
      document.body.style.overflow = "hidden";
      $(".lightbox__close", box).focus();
    }

    function closeBox() {
      box.hidden = true;
      document.body.style.overflow = "";
      if (lastOpener) lastOpener.focus();
    }

    $$(".gal__tile").forEach(function (tile) {
      tile.addEventListener("click", function () { openBox(tile); });
      tile.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openBox(tile); }
      });
    });

    box.addEventListener("click", function (e) {
      if (e.target === box || e.target.closest(".lightbox__close")) closeBox();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !box.hidden) closeBox();
    });
  }

  /* ── 10. contact form ───────────────────────────────────── */
  var cForm = $("#contactForm");
  if (cForm) {
    // a product / course link can pre-select what the parent is asking about
    var wanted = new URLSearchParams(location.search).get("item");
    var interest = $("#interest", cForm);
    if (wanted && interest) {
      var match = $$("option", interest).filter(function (o) { return o.value === wanted; })[0];
      if (match) {
        interest.value = wanted;
      } else {
        var extra = document.createElement("option");
        extra.value = extra.textContent = wanted;
        interest.appendChild(extra);
        interest.value = wanted;
      }
    }

    var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    function setError(field, message) {
      var wrap = field.closest(".field");
      var note = $(".field__err", wrap);
      wrap.classList.toggle("has-err", !!message);
      if (note) note.textContent = message || "";
      return !message;
    }

    function validate() {
      var ok = true;
      var name  = $("#pname", cForm);
      var mail  = $("#pmail", cForm);
      var child = $("#cage", cForm);

      ok = setError(name,  name.value.trim() ? "" : "Please tell us your name.") && ok;
      ok = setError(mail,  emailRe.test(mail.value.trim()) ? "" : "That email does not look right.") && ok;
      ok = setError(child, child.value ? "" : "Pick your child's age group.") && ok;
      return ok;
    }

    $$("input, select, textarea", cForm).forEach(function (f) {
      f.addEventListener("input", function () {
        if (f.closest(".field").classList.contains("has-err")) validate();
      });
    });

    cForm.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!validate()) {
        var first = $(".field.has-err input, .field.has-err select", cForm);
        if (first) first.focus();
        return;
      }
      cForm.hidden = true;
      var done = $("#contactDone");
      if (done) {
        done.hidden = false;
        done.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "center" });
      }
    });
  }

  /* ── 10b. pricing: monthly / termly toggle ──────────────── */
  var billing = $("#billingSwitch");
  if (billing) {
    var optMonthly = $("#optMonthly");
    var optTermly  = $("#optTermly");
    var prices     = $$(".price");
    var pers       = $$(".per");
    var bills      = $$(".plan__bill");

    billing.addEventListener("click", function () {
      var termly = billing.getAttribute("aria-checked") !== "true";
      billing.setAttribute("aria-checked", String(termly));

      optMonthly.classList.toggle("is-on", !termly);
      optTermly.classList.toggle("is-on", termly);

      prices.forEach(function (el) {
        el.textContent = "$" + (termly ? el.dataset.term : el.dataset.month);
      });
      pers.forEach(function (el) { el.textContent = termly ? "/ term" : "/ month"; });
      bills.forEach(function (el) {
        el.textContent = termly
          ? "Billed each term · 15% cheaper"
          : "Billed monthly · cancel any time";
      });
    });
  }

  /* ── 11. theme switcher ─────────────────────────────────── */
  /* the chosen theme is already applied by the inline <head> script,
     so this only has to wire up the panel and remember the choice */
  var themer = $("#themer");
  if (themer) {
    var themeBtn   = $("#themerBtn", themer);
    var themePanel = $("#themerPanel", themer);
    var swatches   = $$(".swatch", themer);

    var markActive = function (name) {
      swatches.forEach(function (s) {
        s.setAttribute("aria-pressed", String(s.dataset.theme === name));
      });
    };

    var stored = "pop";
    try { stored = localStorage.getItem("curio-theme") || "pop"; } catch (e) {}
    markActive(stored);

    var closePanel = function () {
      themePanel.classList.remove("is-open");
      themeBtn.setAttribute("aria-expanded", "false");
    };

    themeBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      var open = themePanel.classList.toggle("is-open");
      themeBtn.setAttribute("aria-expanded", String(open));
    });

    swatches.forEach(function (s) {
      s.addEventListener("click", function () {
        var name = s.dataset.theme;
        document.documentElement.setAttribute("data-theme", name);
        try { localStorage.setItem("curio-theme", name); } catch (e) {}
        markActive(name);
      });
    });

    document.addEventListener("click", function (e) {
      if (!themer.contains(e.target)) closePanel();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closePanel();
    });
  }

  /* ── 12. re-apply the #hash after load ──────────────────── */
  /* web fonts land after the browser has already jumped, which leaves deep
     links like contact.html#book sitting at the top of the page */
  if (location.hash.length > 1) {
    var target = document.getElementById(location.hash.slice(1));
    if (target) {
      var land = function () {
        // sidestep the smooth scroll-behavior so this is an instant correction
        var prev = document.documentElement.style.scrollBehavior;
        document.documentElement.style.scrollBehavior = "auto";
        target.scrollIntoView({ block: "start" });
        document.documentElement.style.scrollBehavior = prev;
      };
      window.addEventListener("load", function () {
        land();
        requestAnimationFrame(land);   // after the post-load layout pass
        setTimeout(land, 140);         // and after late webfont reflow
      });
    }
  }

  /* ── 13. small bits ─────────────────────────────────────── */
  $$(".yr").forEach(function (el) { el.textContent = new Date().getFullYear(); });

  onScrollChrome();
  requestTick();
})();
