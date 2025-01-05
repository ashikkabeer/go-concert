# GoConcert - Concert Booking Platform

GoConcert is a modern, user-friendly online platform for discovering and booking concert tickets. It allows users to explore upcoming concerts, check availability, make bookings, and process payments securely. The platform is designed for both concert-goers and event organizers to manage concert bookings seamlessly.

## Features

- **User Authentication**: Secure login and registration for users, including JWT-based authentication for protected routes.
- **Concert Listings**: View available concerts with details such as venue, date, time, and price.
- **Booking System**: Customers can select seats, book tickets, and manage their bookings.
- **Payment Integration**: Supports payment processing using popular gateways like Stripe and PayPal.
- **Admin Dashboard**: Admins can manage concerts, view bookings, and analyze performance data.
- **Notifications**: Users receive email notifications for booking confirmations, reminders, and cancellations.

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MySQL
- **Authentication**: JWT (JSON Web Tokens)

## Setup

### Prerequisites

- **Node.js** (v14.x or higher)
- **MySQL** (v5.7 or higher)

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/ashikkabeer/Go-Concert.git
    cd GoConcert
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Create a `.env` file in the root directory and add your environment variables:

    ```env
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=password
    DB_NAME=go_concert
    JWT_SECRET=your-jwt-secret
    STRIPE_SECRET_KEY=your-stripe-secret-key
    PAYPAL_CLIENT_ID=your-paypal-client-id
    PAYPAL_SECRET=your-paypal-secret
    ```

4. Set up MySQL and create the database:

    ```bash
    mysql -u root -p
    CREATE DATABASE go_concert;
    ```

5. Run the server:

    ```bash
    npm start
    ```

6. The app should now be running on `http://localhost:3000`.

## License

MIT License. See the LICENSE file for more details.
