# Weatherly

Weatherly is a modern weather forecasting app built with Next.js and styled with Tailwind CSS. It provides detailed weather updates using OpenWeatherMap API, supports GeoLocation-based forecasts, and allows users to save favorite locations for quick access. 

## Guide

1. **Landing Page**:
![image](https://github.com/user-attachments/assets/996326ff-8569-4a96-ba20-5da52899a013)
![image](https://github.com/user-attachments/assets/c7a3d70f-377f-4f03-851c-a5593439281a)
   - This is the Weather tab, which displays the current weather conditions (Fetched using the OpenWeatherMap API) for the user's current GeoLocation.
   - If the GeoLocation API is not working, it displays a default location (Coimbatore).
   - It also includes a search bar for users to search for a location by city name or ZIP code.
   - It displays the current day's weather conditions, followed by Air Condition (which when clicked, opens up an explainer), followed by the forecast for the next 5 days.
   - This page includes a map of the searched location/ Current Location being displayed.

2. **Cities Tab**:
![image](https://github.com/user-attachments/assets/703a343c-c5df-47ef-aca2-568b6403fa96)
![image](https://github.com/user-attachments/assets/a3ac2691-be90-40be-b006-2377979c050d)
   - This tab allows users to save up to 5favorite locations for quick access.
   - It includes a search bar for users to search for a location by city name or ZIP code.
   - when clicked on a specific item, the section expands to show the details of the selected item. 
   - It includes graceful error handling for invalid input, rate limits, and server errors.

3. **Settings Tab**:
![image](https://github.com/user-attachments/assets/13e3bbe0-14a8-48dc-b55d-8ff83fc5c9b0)
   - This tab allows users to configure their settings, such as changing the unit of measurement (Celcius/ Fahrenheit). 
   - It also includes notifications and general settings button. 


## Features

### Search Weather by Location
- Search for weather details by city name or ZIP code.
- Displays:
  - Current Weather conditions: Temperature, Real Feel, Wind Speed, etc.
  - A 5-day Weather Forecast with High/Low temperatures and description.

### GeoLocation Integration
- Automatically detects the user’s current location using the browser’s GeoLocation API.
- Displays weather data for the detected location.
- If GeoLocation is not available, a default location (Coimbatore) is used.

### SSR and CSR
- **Server-Side Rendering (SSR)**: Fetches initial weather data for a default location (Coimbatore).
- **Client-Side Rendering (CSR)**: Handles dynamic updates for user searches and GeoLocation data.

### State Management
- Utilizes React Context API for efficient state management across the application, especially to store favourite locations and settings.

### Error Handling
- Handles:
  - Invalid city/ZIP code inputs.
  - API rate limits or server errors.
  - No internet connection, with a fallback UI.

### Multi-location Dashboard
- Users can save up to five favorite locations under the 'Cities' tab and switch between their weather forecasts.

## Technology Stack
- **Next.js** for front-end development.
- **TypeScript** for type safety.
- **Tailwind CSS** for styling.
- **OpenWeatherMap API** for weather data.

## Deployment
- Hosted on Vercel for easy deployment.

---

## Getting Started

### Steps to Set Up and Run the Project Locally
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/yourusername/weatherly.git
   cd weatherly
2. **Install Dependencies**:
   ```bash
   npm install 
   or
   yarn install
3. **Set Up Environment Variables**:
    Create a .env.local file in the project root and add the following variables:
    ```bash
    API_KEY = <openweathermap_api_key>
    BASE_URL = https://api.openweathermap.org/data/2.5/
4. **Start the Development Server**:
   ```bash
   npm run dev

## Key Decisions and Thought Process

### State Management
The React Context API was chosen for its simplicity and ability to handle the scale of this application. Redux was deemed unnecessary for the current scope.
### Tailwind CSS for Styling
Tailwind CSS offers an elegant, utility-first styling, which makes it easier for debugging and speeding up development, while ensuring a clean and consistent look for the website.
### SSR and CSR
Server-Side Rendering (SSR) was used for the initial data fetching - when GeoLocation is not available or the API fails, while Client-Side Rendering (CSR) was used for dynamic updates.
### Error Handling
Proactively addressed potential issues like invalid input, server errors, and offline states to ensure a smooth user experience.

## Author

### Sri Kailaash Kumar
    - GitHub - https://github.com/maximistic
    - LinkedIn - https://www.linkedin.com/in/srikailaashkumar-s/