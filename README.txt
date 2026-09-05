CANNAVAPESA — static build
===========================

This is a plain HTML/CSS/JS site. No npm install, no build command.
Upload this whole folder as-is to Netlify (drag the folder onto
Netlify Drop), Vercel, or any static host / cPanel file manager.

BEFORE GOING LIVE — 1 thing you must edit:
-------------------------------------------
Open script.js, line ~8:

  const WHATSAPP_NUMBER = "27000000000";

Replace with the real order-taking WhatsApp number (country code,
no + or spaces), e.g. "27821234567" for 082 123 4567.
That's what checkout uses to hand off completed orders.

What's included:
- index.html   → all page markup (home / menu / ethos + age gate, cart, checkout)
- style.css    → all styling, same gold/green dark theme as before
- script.js    → cart, filtering/search, quick view, checkout → WhatsApp
- icon.svg / apple-icon.png / icon-*-32x32.png → favicons (already wired up)

What changed from the last version:
- Age gate on entry (18+ confirm/decline), remembered for the session
- Checkout now actually does something: validates the form, then opens
  WhatsApp with the order pre-filled (items, subtotal, customer details)
  so an order isn't just a UI animation anymore
- Cart persists on refresh (localStorage)
- Split into real files instead of one dense inline block — easier to
  hand off or edit later
- No Next.js/React/node_modules — this is the "just upload it" version

Still outstanding before this is a fully compliant commercial storefront:
- Confirm the Cannabis for Private Purposes Act regulations have actually
  cleared before taking real orders/payment for a retail sale — that's
  the pending item you flagged, not a code issue
- Pay-on-delivery + WhatsApp hand-off works but isn't a real payment
  gateway — fine for launch, worth upgrading later if volume grows
- Real product photography instead of the current Unsplash placeholders
