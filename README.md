# 📝 Draft Management System

A feature-rich React-based draft management application that allows users to create, view, edit, and delete post drafts. All data is persisted in the browser's localStorage, ensuring drafts survive page refreshes.

## 🚀 Live Demo
[Add your deployed link here if available]

## ✨ Features

- ✅ **Create Drafts** – Save post content as drafts with title and body
- ✅ **Read Drafts** – View all saved drafts in a clean card layout
- ✅ **Update Drafts** – Edit existing drafts with a smooth inline form experience
- ✅ **Delete Drafts** – Remove drafts with confirmation dialog
- ✅ **Local Storage Persistence** – Drafts remain available after page reload
- ✅ **Real-time Search** – Filter drafts by title or content using memoized selectors (`useMemo`)
- ✅ **Bilingual Support** – Toggle between Bangla (বাংলা) and English instantly
- ✅ **Mock API Simulation** – Asynchronous operations with loading states (simulated network delay)
- ✅ **Glassmorphism UI** – Modern, visually appealing design with animated gradient background
- ✅ **Responsive Layout** – Works seamlessly on desktop, tablet, and mobile devices

## 🛠 Tech Stack

| Technology | Purpose |
|------------|---------|
| **React.js** | UI library with hooks (`useState`, `useEffect`, `useMemo`) |
| **CSS3** | Glassmorphism effects, animations, responsive design |
| **localStorage** | Client-side data persistence |
| **Vite** | Fast build tool and development server |
| **Poppins Font** | Clean, modern typography (Google Fonts) |

## 📦 Installation & Setup

Follow these steps to run the project locally:

```bash
# 1. Clone the repository
git clone https://github.com/rudrajit01/Draft-app.git

# 2. Navigate to the project directory
cd Draft-app

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
The app will open at http://localhost:5173 (or the port shown in your terminal).

🧑‍💻 Usage Guide
Creating a Draft
Enter a Title and Content in the form.

Click the Save button.

The new draft appears instantly in the list below.

Editing a Draft
Click the Edit button on any draft card.

The form auto-fills with the draft's existing data.

Modify the title or content and click Update.

The draft updates in real-time.

Deleting a Draft
Click the Delete button on any draft card.

Confirm the deletion in the pop-up dialog.

The draft is removed from the list and localStorage.

Searching Drafts
Type any keyword in the search box above the draft list.

The list filters dynamically to show only matching drafts (by title or content).

Switching Language
Click the 🇬🇧 English / 🇧🇩 বাংলা button in the top-right corner.

The entire UI (labels, placeholders, buttons, alerts) switches language instantly.

🎨 UI Preview
(Add screenshots here to showcase your app)

Example:

Main dashboard with draft list

Form with edit mode

Search functionality in action

Language toggle demo

⚙️ Technical Highlights
Memoized Selectors: The useMemo hook optimizes search filtering, preventing unnecessary re-renders and improving performance with large datasets.

Asynchronous Workflow: All CRUD operations simulate network delays (800ms for save, 500ms for delete) with loading indicators for better UX.

State Management: Clean separation of concerns using React hooks; ready to scale to useReducer or Redux.

Local Storage Sync: Drafts are automatically saved to localStorage on every change and restored on app load.

🔮 Future Enhancements
Add useReducer for more structured state management

Integrate real backend API (JSON Server / Firebase)

Implement dark mode toggle

Export drafts as JSON/TXT files

Add draft categories or tags

Pagination / infinite scroll for large lists

📄 License
This project is licensed under the MIT License – see the LICENSE file for details.

👨‍💻 Author
Rudrajit Pramanik
GitHub: @rudrajit01
