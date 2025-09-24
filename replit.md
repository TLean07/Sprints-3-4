# Passa-Bola Project

## Overview
A React + TypeScript + Vite web application for a sports platform focused on women's football ("Passa a Bola" means "Pass the Ball" in Portuguese). The application uses Firebase for authentication and database services.

## Project Architecture
- **Frontend**: React 19 with TypeScript
- **Build Tool**: Vite 7.1.2
- **Styling**: Tailwind CSS 3.4.17
- **Authentication**: Firebase Auth with Google provider
- **Database**: Firebase Realtime Database
- **Storage**: Firebase Storage
- **Router**: React Router DOM 7.8.2
- **UI Libraries**: Framer Motion, Lucide React, React Hot Toast

## Current State
- ✅ Project successfully imported and configured for Replit environment
- ✅ All dependencies installed (600 packages)
- ✅ Vite configured to work with Replit proxy (host: 0.0.0.0, port: 5000)
- ✅ Development workflow configured and running
- ✅ Production deployment configured (autoscale with build step)
- ⚠️ Firebase environment variables need to be configured by user

## Environment Variables Required
The application requires the following Firebase configuration variables:
- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`
- `VITE_FIREBASE_MEASUREMENT_ID`
- `VITE_FIREBASE_DATABASE_URL`

## Recent Changes (September 24, 2025)
- Imported project from GitHub
- Installed Node.js 20 and project dependencies
- Configured Vite for Replit environment with proper host settings
- Set up Frontend Server workflow on port 5000
- Configured deployment for production with autoscale target
- Created development environment ready for use

## User Preferences
- Portuguese language interface
- Sports/football theme
- Mobile-responsive design with Tailwind CSS
- Firebase-based authentication system

## Development
- Run `npm run dev` to start development server
- Server runs on port 5000 with hot module replacement
- Uses React Strict Mode for development
- ESLint configured for code quality

## Deployment
- Configured for Replit autoscale deployment
- Build command: `sh -c "cd Passa-Bola && npm run build"` (fixed to run from correct directory)
- Preview command: `sh -c "cd Passa-Bola && npm run preview"` (fixed to run from correct directory)
- Optimized for static site deployment
- **Fixed**: Deployment commands now correctly navigate to project subdirectory
- ✅ Build tested successfully - generates optimized production files in dist/

## Notes
- The application is ready to run but will need Firebase configuration to be fully functional
- All routing and components are properly structured
- Authentication system is implemented but requires Firebase project setup