# 🌟 Drishti Jain - Personal Portfolio Website

An elegant, modern, responsive, and fully functional portfolio website designed and developed for **Drishti Jain**, a first-year B.Tech Computer Science student at **Newton School of Technology**.

---

## ✨ Features & Highlights

- **Aesthetic & Modern UI**: Built with a luxury glassmorphism theme, smooth ambient gradient glows, and refined typography (`Plus Jakarta Sans` & `Space Grotesk`).
- **Dark & Light Mode Switcher**: Seamless toggle between deep midnight dark theme and a crisp light theme with state persistence in `localStorage`.
- **Dynamic Typewriter Header**: Real-time animated typing effect cycling through roles (*B.Tech CSE Student, Tech Explorer, Creative Builder, Problem Solver*).
- **Interactive Skills Filtering**: Instant category-based filtering between *All Skills*, *Frontend & Web*, *Programming*, and *Tools & Design*.
- **Interactive Project Modals**: Deep-dive popup modals detailing features, architecture, and technology stacks for projects.
- **Fully Working Contact Form**:
  - Live client-side input validation (name, email, subject, min message length).
  - Animated submission states with toast notification feedback.
  - Optional instant `mailto:` link bridge to automatically draft an email in the user's native email client.
- **One-Click Email Copying**: Quick copy button for the email address with clipboard API integration and toast alert.
- **Resume / Print Ready**: Integrated resume button that triggers an elegant print/PDF view formatted cleanly for recruiters.
- **Responsive Across All Screens**: Tailored layouts for smartphones, tablets, laptops, and ultra-wide desktops with a sleek mobile drawer navigation menu.
- **Zero Heavy Dependencies**: Pure HTML5, CSS3 variables, and Vanilla JavaScript—blazing fast load times and no build step required.

---

## 📁 File Structure

```
my-project/
├── index.html        # Main HTML5 semantic structure & content
├── style.css         # Modern CSS styles, variables, dark/light themes & animations
├── script.js         # JavaScript interactivity, typewriter, validation & modal logic
├── myself.txt        # Original biography & notes
└── README.md         # Documentation & guide
```

---

## 🚀 How to Run the Portfolio

### Option 1: Open Directly in Your Browser
Double-click `index.html` or right-click and choose **Open With > Google Chrome** (or Safari / Firefox / Edge).

### Option 2: Live Server via Python
Run this command in the terminal inside the project directory:
```bash
python3 -m http.server 8000
```
Then visit [http://localhost:8000](http://localhost:8000) in your browser.

---

## 🛠️ How to Customize Your Details

### 1. Update Personal Links & Contact Info
Open `index.html` and search for:
- **Email**: Replace `drishti.jain@example.com` with your real email.
- **LinkedIn / GitHub / Twitter**: Update the `href="https://..."` links in the Contact and Footer sections with your actual profile URLs.

### 2. Replace the Avatar with Your Own Photo (Optional)
If you'd like to use a real photograph instead of the custom illustrated SVG avatar:
1. Place your photo (e.g. `drishti.jpg`) in the project directory.
2. In `index.html`, find `<div class="avatar-inner">` (around line 125).
3. Replace the `<svg>` tag with:
   ```html
   <img src="drishti.jpg" alt="Drishti Jain" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;" />
   ```

### 3. Add or Modify Projects
In `index.html`, duplicate any `<article class="project-card card-glass">` block in the `#projects` section and customize the title, description, and tags.

---

## 🌐 Free 1-Click Hosting / Deployment

You can host this website online for free using any of these platforms:

1. **GitHub Pages**:
   - Push this repo to your GitHub account (`username.github.io` or repository settings).
   - Go to **Settings > Pages** and select `main` branch.
2. **Vercel / Netlify**:
   - Drag and drop this folder onto [Netlify Drop](https://app.netlify.com/drop) or import from GitHub on Vercel.

