# Eat For Your Blood Type

A comprehensive application for meal planning and tracking based on blood type diet principles.

## Features

- Blood type specific food recommendations
- Meal planning calendar
- Food and herb database
- Progress tracking
- Community sharing
- Weight tracking

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/eat-for-your-blood-type.git
cd eat-for-your-blood-type
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

## Building for Production

To create a production build:

```bash
npm run build
```

This will create a `build` folder with optimized production files.

## Deployment

The application can be deployed to various platforms:

### Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`

### Netlify
1. Create a new site on Netlify
2. Connect your repository
3. Set build command: `npm run build`
4. Set publish directory: `build`

### Firebase
1. Install Firebase tools: `npm install -g firebase-tools`
2. Login to Firebase: `firebase login`
3. Initialize project: `firebase init`
4. Deploy: `firebase deploy`

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```
REACT_APP_API_URL=your_api_url
```

## Tech Stack

- React
- TypeScript
- Material-UI
- Recharts
- React Router

## License

MIT 