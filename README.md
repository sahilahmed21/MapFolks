# MapFolks - Profile Directory Application

MapFolks is a professional profile directory application that allows users to browse, view, and manage profiles. It integrates Google Maps to display location data and provides a responsive, user-friendly interface.

## Features

- **Profile Management**: View detailed professional profiles, including contact information, experience, education, and interests.
- **Google Maps Integration**: Display user locations on an interactive map.
- **Responsive Design**: Optimized for both desktop and mobile devices.
- **Sidebar Navigation**: Toggleable sidebar for easy navigation.
- **Notifications and User Menu**: Access notifications and account settings from the navbar.

## How It Works

1. **Profile Data**: Profiles are fetched from an API (`getProfileById`) and displayed in a detailed view.
2. **Google Maps Integration**: The `MapComponent` dynamically loads the Google Maps API and geocodes the provided address to display the location on the map.
3. **Sidebar and Navbar**: The sidebar and navbar provide intuitive navigation and quick access to features like notifications and account settings.
4. **Dynamic Loading**: Skeleton loaders and error handling ensure a smooth user experience during data fetching or API errors.

## Setup Instructions

### Prerequisites

- Node.js (v16 or later)
- A Google Maps API Key

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/mapfolks.git
   cd mapfolks
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your Google Maps API key:
   ```env
   NEXT_PUBLIC_Maps_API_KEY=your-google-maps-api-key
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open the application in your browser at `http://localhost:3000`.

### Build for Production

To build the application for production:
```bash
npm run build
```

To start the production server:
```bash
npm start
```

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout with Navbar and Sidebar
│   ├── profiles/[id]/      # Profile details page
│   └── ...                 # Other pages
├── components/
│   ├── navbar.tsx          # Navbar component
│   ├── sidebar.tsx         # Sidebar component
│   ├── map-component.tsx   # Google Maps integration
│   └── ...                 # Other reusable components
├── lib/
│   ├── googleMapsLoader.ts # Utility for loading Google Maps API
│   └── ...                 # Other utilities
├── public/                 # Static assets
├── styles/                 # Global styles
└── README.md               # Project documentation
```

## Key Components

### `Navbar`

- Provides navigation and quick access to notifications and user settings.
- Includes the "MapFolks" title prominently displayed.

### `Sidebar`

- Toggleable sidebar for navigation.
- Displays links to Home, Admin Dashboard, Profiles, and Settings.

### `MapComponent`

- Dynamically loads the Google Maps API.
- Geocodes addresses and displays them on an interactive map.
- Handles errors gracefully with alerts and fallback behavior.

### `ProfilePage`

- Displays detailed information about a profile, including:
  - Avatar, name, title, and contact information.
  - Experience, education, and interests.
  - Location displayed on a map.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your changes.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

## Contact

For questions or feedback, please contact [sahilahmedpbuh@gmail.com].
