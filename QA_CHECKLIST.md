# QA Checklist

Manual scenarios (desktop + mobile viewport)

Forms: Login
- Open pages/login.html
- Leave both fields empty, click Login → first invalid field is focused, inline red error shown
- Enter invalid phone/email (e.g., 03123) → blur → inline error shows; border turns red
- Enter valid email or phone and a valid password → blur → subtle success state (green border)
- Submit valid form → redirects to pages/dashboard.html; no console errors
- Toggle “Remember me”, submit, reload login page → saved credentials appear (existing behavior preserved)

Forms: Signup (Farm Owner)
- Open pages/signup-farm-owner.html
- Verify labels do NOT show condition text for Full Name and Password
- Blur each empty field → inline errors appear
- Full Name with numbers → error; letters/spaces ≤25 → success
- Phone not starting with 03 or not 11 digits → error
- Password without number or too short → error
- Mismatched Confirm Password → error
- Submit with multiple invalid fields → first invalid focused, all errors inline
- Submit valid → redirects to dashboard.html

Forms: Signup (Cattle Company)
- Same checks as above; additionally: Company Name and Contact Person Name rules

Server error handling (simulated)
- In DevTools console, run:
  displayServerErrors(document.querySelector('.auth-form'), { email: 'Email already in use' });
- Verify inline error under Email with red border and aria-live update

Dashboard theme (user and admin)
- User: pages/dashboard.html renders with midnight background, dark nav, white cards, primary buttons/links in accent-star
- Admin: pages/admin-dashboard.html uses the same palette; cards remain white; nav is dark
- All controls behave as before (tab switching, filters, downloads)

Accessibility
- Inline error containers exist for each field and include aria-live="polite"
- First invalid field focused on submit
- Contrast: dark background with white text; white cards with dark text (meets WCAG AA)

Regression checks
- No console errors in both dashboards and forms
- PDF generation and chart placeholders still work

Artifacts to attach in PR
- Screenshots in docs/screenshots/:
  - login_before.png, login_after.png
  - signup_farm_before.png, signup_farm_after.png
  - signup_company_before.png, signup_company_after.png
  - dashboard_user_before.png, dashboard_user_after.png
  - dashboard_admin_before.png, dashboard_admin_after.png
  - Take both desktop and mobile (375x812) variants

