Rent-a-Car  Application 

This project is a modern and high-performance Car Rental Management System built with React following the MVC (Model-View-Controller) architecture pattern. It features a custom calendar component, debounced search, and comprehensive testing for production-ready code quality.

🌟 Key Features
Advanced Search & Filtering: Real-time search with debounce optimization, multi-criteria filtering (brand, type, transmission, price, seats, luggage), and smart validation for dates and locations.

Custom Calendar Component: Built from scratch with zero dependencies, fully localized (TR/EN), keyboard accessible, and optimized with React.memo for 60 FPS performance.

Vehicle Management: 24 premium vehicles (Mercedes-Benz, BMW, Audi, Porsche) with detailed specifications, real-time availability tracking, and dynamic pricing calculation.

Bilingual Support: Complete Turkish and English translations with persistent language preference stored in localStorage.

Responsive Design: Mobile-first approach optimized for all screen sizes  with smooth animations.

Toast Notifications: User-friendly feedback system for all actions (booking, errors, success messages).

Test Coverage: 52 passing tests across 4 test suites with 94% code coverage, ensuring production-ready reliability.

🛠 Technologies Used
The project is built with modern tools and libraries from the JavaScript ecosystem:

React 19: Core library with Hooks, Context API, and performance optimization features (useMemo, useCallback).

Vite 6.0: Lightning-fast build tool with Hot Module Replacement (HMR) under 50ms for instant development feedback.

Vitest: Modern test framework 10x faster than Jest, with React Testing Library integration for user-centric testing.

MVC Architecture: Clean separation of concerns with Model (CarModel), View (components), and Controller (useCarController).

Custom Hooks: Reusable logic patterns including useCarController, useDebounce (300ms delay), useDropdown, and useToast.

Zero UI Dependencies: Custom CSS with modern features (CSS Grid, Flexbox, Custom Properties) - no bloated UI frameworks.

Lucide React: Lightweight icon library for modern, consistent iconography



![rent](https://github.com/user-attachments/assets/66673882-2ff3-42b2-918a-33df8bc4ea52)


🤝 Contributing

Contributions are welcome! Please check the issues tab for open tasks.



# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh




