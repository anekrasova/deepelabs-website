(function () {
  "use strict";

  var STYLE_ID = "deepe-frog-style";
  var ACCENT = "#7c8cff";
  var GLOW = "#5eead4";
  var FUN = "var(--accent-fun, #ff90ac)";

  var frogSvgInstances = 0;

  function frogSvg() {
    frogSvgInstances += 1;
    var gid = "dfSkinLive-" + frogSvgInstances;
    return (
      '<svg viewBox="0 0 200 200" width="100%" height="100%" fill="none" aria-hidden="true" focusable="false">' +
      '<defs><linearGradient id="' + gid + '" x1="20" y1="20" x2="180" y2="180" gradientUnits="userSpaceOnUse">' +
      '<stop offset="0" stop-color="' + GLOW + '"/><stop offset="1" stop-color="#2fa88f"/>' +
      "</linearGradient></defs>" +
      '<ellipse cx="100" cy="178" rx="44" ry="12" fill="#141822"/>' +
      '<ellipse cx="100" cy="178" rx="30" ry="7" fill="#1d212b"/>' +
      '<ellipse cx="100" cy="134" rx="52" ry="40" fill="url(#' + gid + ')"/>' +
      '<circle cx="100" cy="96" r="56" fill="url(#' + gid + ')"/>' +
      '<circle cx="70" cy="58" r="23" fill="url(#' + gid + ')"/>' +
      '<circle cx="130" cy="58" r="23" fill="url(#' + gid + ')"/>' +
      '<circle cx="70" cy="56" r="15" fill="#f7f8fb"/>' +
      '<circle cx="130" cy="56" r="15" fill="#f7f8fb"/>' +
      '<circle cx="73" cy="52" r="7.5" fill="#0a0c12"/>' +
      '<circle cx="133" cy="52" r="7.5" fill="#0a0c12"/>' +
      '<circle cx="76" cy="49" r="2.2" fill="#ffffff"/>' +
      '<circle cx="136" cy="49" r="2.2" fill="#ffffff"/>' +
      '<ellipse cx="52" cy="96" rx="9" ry="5.5" fill="' + ACCENT + '" opacity="0.35"/>' +
      '<ellipse cx="148" cy="96" rx="9" ry="5.5" fill="' + ACCENT + '" opacity="0.35"/>' +
      '<path d="M64 104C64 118 80 128 100 128C120 128 136 118 136 104" stroke="#0a0c12" stroke-width="5" stroke-linecap="round" fill="none"/>' +
      '<path d="M100 122C104 132 112 140 122 142" stroke="' + FUN + '" stroke-width="7" stroke-linecap="round" fill="none"/>' +
      '<path d="M64 40C58 26 60 14 68 6" stroke="url(#' + gid + ')" stroke-width="4" stroke-linecap="round"/>' +
      '<circle cx="69" cy="5" r="4.5" fill="' + GLOW + '"/>' +
      '<path d="M40 118C26 112 16 116 12 128" stroke="url(#' + gid + ')" stroke-width="12" stroke-linecap="round"/>' +
      '<circle cx="10" cy="130" r="8" fill="url(#' + gid + ')"/>' +
      '<path d="M128 142L132 128L142 122L140 136Z" fill="#f7f8fb"/>' +
      '<path d="M132 128L134 116L144 112L142 124Z" fill="#f7f8fb" opacity="0.85"/>' +
      '<path d="M120 148L124 138L130 136L127 146Z" fill="#f7f8fb" opacity="0.7"/>' +
      "</svg>"
    );
  }

  var JOKES = [
    "Why did the satellite break up with the moon? It needed space.",
    "I tried orbital mechanics once. Now everything just goes in circles.",
    "Light beats sound in a race every time — that is why some status updates look bright long before they sound good.",
    "Deepe Frog does not do black holes. Bad energy, worse compression ratio.",
    "My pre-trip inspection covers the whole vehicle except the flux capacitor. That one is still pending FMCSA guidance.",
    "Space is completely silent. Somehow the group chat is still louder.",
    "I asked a black hole for feedback on my report. It just absorbed the whole conversation.",
    "Astronauts never get cold. They have a lot of space heaters.",
    "A comet walked into a bar. The bartender said we do not serve tails here.",
    "My favorite unit of distance is the light year, because it sounds fast but is mostly just waiting.",
    "Why did the rocket lose its job? It kept getting fired.",
    "I would tell a joke about the asteroid belt, but it is a bit too spaced out.",
    "The DVIR checklist has no item for warp core integrity. I checked twice.",
    "Gravity is hard to escape. Deadlines are worse.",
    "Why do planets never get invited to parties? They already have too many rings to keep track of.",
    "I am not saying my inbox is a black hole, but nothing that goes in ever comes back out.",
    "The best thing about space travel is the legroom. Terrible thing too, actually.",
    "Why did the frog become an astronaut? Turns out lily pads and space stations both float.",
    "Every star eventually runs out of fuel. Please, unlike them, fill up your tank before the trip.",
    "I skipped the astronaut training simulator. Too much pressure."
  ];

  var lastJokeIndex = -1;

  function pickJoke() {
    if (JOKES.length <= 1) return JOKES[0];
    var index;
    do {
      index = Math.floor(Math.random() * JOKES.length);
    } while (index === lastJokeIndex);
    lastJokeIndex = index;
    return JOKES[index];
  }

  function css() {
    return "" +
      "#deepe-frog-root{position:fixed;right:24px;bottom:24px;z-index:2147483000;font-family:var(--font-body,'Space Grotesk',sans-serif);}" +
      "@keyframes dfBob{0%,100%{transform:translateY(0) rotate(-2deg);}50%{transform:translateY(-5px) rotate(2deg);}}" +
      "@keyframes dfPulse{0%{transform:scale(1);opacity:.5;}70%{transform:scale(1.7);opacity:0;}100%{transform:scale(1.7);opacity:0;}}" +
      "#deepe-frog-launcher{position:relative;width:64px;height:64px;border-radius:50%;border:1px solid rgba(94,234,212,.4);cursor:pointer;padding:0;display:flex;align-items:center;justify-content:center;background:linear-gradient(160deg,rgba(94,234,212,.22),rgba(124,140,255,.10)),rgba(8,10,16,.7);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);box-shadow:0 8px 28px rgba(94,234,212,.18),inset 0 1px 0 rgba(255,255,255,.14);}" +
      "#deepe-frog-launcher:focus-visible{outline:2px solid " + GLOW + ";outline-offset:3px;}" +
      "#deepe-frog-launcher .df-pulse-ring{position:absolute;inset:0;border-radius:50%;background:" + GLOW + ";opacity:.5;animation:dfPulse 2.4s ease-out infinite;pointer-events:none;}" +
      "#deepe-frog-launcher .df-icon{display:block;width:44px;height:44px;animation:dfBob 3.6s ease-in-out infinite;}" +
      "#deepe-frog-launcher .df-icon svg{display:block;width:100%;height:100%;}" +
      "#deepe-frog-launcher .df-badge{position:absolute;top:-3px;right:-3px;width:13px;height:13px;border-radius:50%;background:" + ACCENT + ";border:2px solid #05060a;}" +
      "#deepe-frog-tooltip{position:absolute;right:76px;bottom:16px;padding:9px 15px;border-radius:999px;background:linear-gradient(160deg,rgba(255,255,255,.07),rgba(255,255,255,.015)),rgba(8,10,16,.8);border:1px solid rgba(255,255,255,.1);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);font-size:13px;color:#f2f3f6;white-space:nowrap;box-shadow:0 8px 24px rgba(0,0,0,.35);opacity:0;pointer-events:none;transition:opacity .15s ease;}" +
      "#deepe-frog-launcher:hover + #deepe-frog-tooltip,#deepe-frog-launcher:focus-visible + #deepe-frog-tooltip{opacity:1;}" +
      "#deepe-frog-root.is-open #deepe-frog-launcher,#deepe-frog-root.is-open #deepe-frog-tooltip{display:none;}" +
      "#deepe-frog-panel{position:absolute;right:0;bottom:0;width:min(360px,calc(100vw - 32px));height:min(560px,calc(100vh - 120px));display:none;flex-direction:column;overflow:hidden;background:linear-gradient(160deg,rgba(255,255,255,.05),rgba(255,255,255,.01)),#05060a;border:1px solid #1d212b;border-radius:20px;box-shadow:0 24px 60px rgba(0,0,0,.5);}" +
      "#deepe-frog-root.is-open #deepe-frog-panel{display:flex;}" +
      "#deepe-frog-panel .df-head{flex-shrink:0;display:flex;align-items:center;gap:12px;padding:16px 16px;border-bottom:1px solid rgba(255,255,255,.08);background:radial-gradient(ellipse 90% 120% at 25% 0%,rgba(94,234,212,.14),transparent 70%);}" +
      "#deepe-frog-panel .df-avatar{display:block;width:44px;height:44px;flex-shrink:0;}" +
      "#deepe-frog-panel .df-avatar svg{display:block;width:100%;height:100%;}" +
      "#deepe-frog-panel .df-title{font-family:var(--font-display,'Orbitron',sans-serif);font-weight:700;font-size:13px;letter-spacing:.07em;text-transform:uppercase;color:#f2f3f6;}" +
      "#deepe-frog-panel .df-subtitle{margin-top:2px;font-size:12px;color:#9199a8;}" +
      "#deepe-frog-panel .df-close{margin-left:auto;flex-shrink:0;width:30px;height:30px;border-radius:50%;border:1px solid rgba(255,255,255,.1);background:rgba(255,255,255,.04);color:#9199a8;cursor:pointer;display:flex;align-items:center;justify-content:center;padding:0;}" +
      "#deepe-frog-panel .df-close:focus-visible{outline:2px solid " + GLOW + ";outline-offset:2px;}" +
      "#deepe-frog-panel .df-messages{flex-grow:1;overflow-y:auto;padding:14px 16px;display:flex;flex-direction:column;gap:10px;}" +
      "#deepe-frog-panel .df-msg{max-width:84%;padding:11px 13px;border-radius:14px;font-size:13px;line-height:1.5;}" +
      "#deepe-frog-panel .df-msg.bot{align-self:flex-start;border-radius:14px 14px 14px 4px;background:linear-gradient(160deg,rgba(255,255,255,.06),rgba(255,255,255,.015)),rgba(8,10,16,.6);border:1px solid rgba(94,234,212,.22);color:#f2f3f6;}" +
      "#deepe-frog-panel .df-msg.user{align-self:flex-end;border-radius:14px 14px 4px 14px;background:" + ACCENT + ";color:#05060a;font-weight:500;}" +
      "#deepe-frog-panel .df-chips{display:flex;flex-wrap:wrap;gap:8px;padding:0 16px 12px;flex-shrink:0;}" +
      "#deepe-frog-panel .df-chip{font-family:var(--font-display,'Orbitron',sans-serif);font-size:10px;font-weight:700;letter-spacing:.05em;text-transform:uppercase;padding:8px 13px;border-radius:999px;border:1px solid rgba(124,140,255,.35);background:rgba(124,140,255,.08);color:#f2f3f6;cursor:pointer;}" +
      "#deepe-frog-panel .df-chip.df-chip-fun{border-color:color-mix(in srgb, " + FUN + " 35%, transparent);background:color-mix(in srgb, " + FUN + " 8%, transparent);}" +
      "#deepe-frog-panel .df-chip:focus-visible,#deepe-frog-panel .df-send:focus-visible,#deepe-frog-panel .df-input:focus-visible{outline:2px solid " + GLOW + ";outline-offset:2px;}" +
      "#deepe-frog-panel .df-inputrow{flex-shrink:0;padding:12px 14px 12px;border-top:1px solid rgba(255,255,255,.08);}" +
      "#deepe-frog-panel .df-inputwrap{display:flex;align-items:center;gap:10px;padding:6px 6px 6px 15px;border-radius:999px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.1);}" +
      "#deepe-frog-panel .df-input{flex-grow:1;min-width:0;border:none;outline:none;background:transparent;font-family:var(--font-body,'Space Grotesk',sans-serif);font-size:13px;color:#f2f3f6;padding:8px 0;}" +
      "#deepe-frog-panel .df-input::placeholder{color:#9199a8;}" +
      "#deepe-frog-panel .df-send{flex-shrink:0;width:32px;height:32px;border-radius:50%;border:none;background:" + GLOW + ";color:#05060a;cursor:pointer;display:flex;align-items:center;justify-content:center;}" +
      "#deepe-frog-panel .df-foot{margin-top:8px;text-align:center;font-size:10px;letter-spacing:.04em;color:#565c6b;}" +
      "@media (prefers-reduced-motion: reduce){#deepe-frog-launcher .df-icon,.df-pulse-ring{animation:none;}}" +
      "@media (max-width:480px){#deepe-frog-root{right:16px;bottom:16px;}#deepe-frog-panel{right:-8px;}}";
  }

  function injectStyle() {
    if (document.getElementById(STYLE_ID)) return;
    var style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = css();
    document.head.appendChild(style);
  }

  function el(tag, attrs, html) {
    var node = document.createElement(tag);
    for (var key in attrs) {
      if (Object.prototype.hasOwnProperty.call(attrs, key)) {
        node.setAttribute(key, attrs[key]);
      }
    }
    if (html !== undefined) node.innerHTML = html;
    return node;
  }

  function canned(text) {
    var t = text.toLowerCase();
    if (t.indexOf("joke") !== -1) {
      return pickJoke();
    }
    if (t.indexOf("deepe") !== -1 || t.indexOf("dvir") !== -1 || t.indexOf("product") !== -1) {
      return "Deepe turns a driver's walkaround video into a signed, FMCSA-compliant DVIR. Full details at deepe.com.";
    }
    if (t.indexOf("demo") !== -1 || t.indexOf("call") !== -1 || t.indexOf("price") !== -1 || t.indexOf("sale") !== -1) {
      return "Best way to set that up is through the contact form — want me to open it for you?";
    }
    if (t.indexOf("job") !== -1 || t.indexOf("hire") !== -1 || t.indexOf("career") !== -1) {
      return "No open roles posted yet — send a note to hello@deepelabs.com and the team will follow up.";
    }
    return "Noted! For anything I can't cover yet, reach the team directly at hello@deepelabs.com.";
  }

  function init() {
    injectStyle();

    var root = el("div", { id: "deepe-frog-root" });

    var launcher = el(
      "button",
      { id: "deepe-frog-launcher", type: "button", "aria-label": "Open Deepe Frog chat", "aria-expanded": "false" },
      '<span class="df-pulse-ring" aria-hidden="true"></span>' +
        '<span class="df-icon">' + frogSvg() + "</span>" +
        '<span class="df-badge" aria-hidden="true"></span>'
    );

    var tooltip = el("div", { id: "deepe-frog-tooltip" }, "Say hi to Deepe Frog");

    var panel = el("div", { id: "deepe-frog-panel", role: "dialog", "aria-modal": "false", "aria-label": "Deepe Frog chat" });

    var head = el(
      "div",
      { class: "df-head" },
      '<span class="df-avatar">' + frogSvg() + "</span>" +
        '<span><span class="df-title">Deepe Frog</span><br><span class="df-subtitle">Catching stars &amp; DVIRs since 2026</span></span>'
    );
    var closeBtn = el("button", { class: "df-close", type: "button", "aria-label": "Close chat" },
      '<svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M1 1L13 13M13 1L1 13" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>'
    );
    head.appendChild(closeBtn);

    var messages = el("div", { class: "df-messages", "aria-live": "polite" });

    function addMessage(text, from) {
      var bubble = el("div", { class: "df-msg " + from }, "");
      bubble.textContent = text;
      messages.appendChild(bubble);
      messages.scrollTop = messages.scrollHeight;
    }

    addMessage(
      "Ribbit! Deepe Frog here, beamed down from orbit. Ask about the DVIR product, a custom build, or just say hi — I don't bite, I just catch stars.",
      "bot"
    );

    var chips = el("div", { class: "df-chips" });
    var chipSeeDeepe = el("button", { class: "df-chip", type: "button" }, "See Deepe");
    var chipDemo = el("button", { class: "df-chip", type: "button" }, "Book a demo");
    var chipJoke = el("button", { class: "df-chip df-chip-fun", type: "button" }, "Tell me a space joke");
    chips.appendChild(chipSeeDeepe);
    chips.appendChild(chipDemo);
    chips.appendChild(chipJoke);

    chipSeeDeepe.addEventListener("click", function () {
      addMessage("See Deepe", "user");
      window.open("https://deepe.com", "_blank", "noopener");
      setTimeout(function () {
        addMessage("Opened deepe.com in a new tab.", "bot");
      }, 300);
    });
    chipDemo.addEventListener("click", function () {
      addMessage("Book a demo", "user");
      setTimeout(function () {
        addMessage("Best way to set that up is through the contact form — want me to open it for you?", "bot");
        var link = el("div", { class: "df-msg bot" }, '<a href="contact.html#contact-form" style="color:' + GLOW + ';">Open the contact form</a>');
        messages.appendChild(link);
        messages.scrollTop = messages.scrollHeight;
      }, 400);
    });
    chipJoke.addEventListener("click", function () {
      addMessage("Tell me a space joke", "user");
      setTimeout(function () {
        addMessage(pickJoke(), "bot");
      }, 400);
    });

    var inputRow = el("div", { class: "df-inputrow" });
    var inputWrap = el("div", { class: "df-inputwrap" });
    var label = el("label", { for: "deepe-frog-input", style: "position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);" }, "Message Deepe Frog");
    var input = el("input", { id: "deepe-frog-input", class: "df-input", type: "text", placeholder: "Message Deepe Frog…", autocomplete: "off" });
    var sendBtn = el(
      "button",
      { class: "df-send", type: "button", "aria-label": "Send message" },
      '<svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M2 8L14 8M14 8L8.5 2.5M14 8L8.5 13.5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>'
    );
    inputWrap.appendChild(label);
    inputWrap.appendChild(input);
    inputWrap.appendChild(sendBtn);
    inputRow.appendChild(inputWrap);
    inputRow.appendChild(el("div", { class: "df-foot" }, "Powered by Deepe Labs · deepelabs.com"));

    function sendCurrentInput() {
      var text = input.value.trim();
      if (!text) return;
      addMessage(text, "user");
      input.value = "";
      var reply = canned(text);
      setTimeout(function () {
        addMessage(reply, "bot");
      }, 500);
    }

    sendBtn.addEventListener("click", sendCurrentInput);
    input.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        e.preventDefault();
        sendCurrentInput();
      }
    });

    panel.appendChild(head);
    panel.appendChild(messages);
    panel.appendChild(chips);
    panel.appendChild(inputRow);

    root.appendChild(launcher);
    root.appendChild(tooltip);
    root.appendChild(panel);
    document.body.appendChild(root);

    function openPanel() {
      root.classList.add("is-open");
      launcher.setAttribute("aria-expanded", "true");
      setTimeout(function () {
        input.focus();
      }, 50);
    }
    function closePanel() {
      root.classList.remove("is-open");
      launcher.setAttribute("aria-expanded", "false");
      launcher.focus();
    }

    launcher.addEventListener("click", openPanel);
    closeBtn.addEventListener("click", closePanel);
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && root.classList.contains("is-open")) closePanel();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
