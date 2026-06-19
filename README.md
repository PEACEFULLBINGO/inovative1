**Welcome to your Base44 project** 

**About**

View and Edit  your app on [Base44.com][def] 

This project contains everything you need to run your app locally.

**Edit the code in your local development environment**

Any change pushed to the repo will also be reflected in the Base44 Builder.

**Prerequisites:** 

1. Clone the repository using the project's Git URL 
2. Navigate to the project directory
3. Install dependencies: `npm install`
4. Create an `.env.local` file and set the right environment variables

```
VITE_BASE44_APP_ID=your_app_id
VITE_BASE44_APP_BASE_URL=your_backend_url

e.g.
VITE_BASE44_APP_ID=cbef744a8545c389ef439ea6
VITE_BASE44_APP_BASE_URL=https://my-to-do-list-81bfaad7.base44.app
```

Run the app: `npm run dev`

**Publish your changes**

Open [Base44.com][def] and click on Publish.

**Step 4 — Get Discovered**
> Once verified, customers can find you via AI search or manual browsing.

---

## 📁 Project Structure

```
src/
├── pages/
│   ├── Landing.jsx           # Home / marketing page
│   ├── CustomerPortal.jsx    # Customer search portal
│   └── EmployeeRegister.jsx  # Worker registration
│
├── components/
│   ├── landing/
│   │   ├── HeroSection.jsx
│   │   ├── FeaturesSection.jsx
│   │   └── Footer.jsx
│   ├── customer/
│   │   ├── ChatBot.jsx       # AI assistant
│   │   ├── WorkerCard.jsx
│   │   ├── WorkerFilters.jsx
│   │   └── ContactDialog.jsx
│   └── employee/
│       ├── RegistrationForm.jsx
│       └── SuccessScreen.jsx
│
├── entities/
│   ├── Worker.json           # Worker data schema
│   └── ContactRequest.json   # Contact request schema
│
├── index.css                 # Design tokens & theme
└── App.jsx                   # Router & app entry
```

---

## 🎨 Theme

LinguaLink supports **Light**, **Dark**, and **System** modes via the theme toggle in the top navigation. The design uses a teal/emerald primary palette with warm neutral backgrounds.

---

## 📄 License

MIT © 2026 LinguaLink

[def]: http://Base44.com