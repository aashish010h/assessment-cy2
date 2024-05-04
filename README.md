# Laravel Project

Please procced with the following step to setup this project

## Setup Instructions

Follow these steps to set up the project:

### 1. Clone the Repository

```
git clone <repository-url>
```

### 2. Install Dependencies

```
cd assessment-cy2
composer install
npm install
```

### 3. Configure Environment

Duplicate the `.env.example` file and rename it to `.env`. Then, generate an application key:

```
cp .env.example .env
php artisan key:generate
```

Make sure to configure your database settings in the `.env` file. And put the API URL in VITE_API_URL.

### 4. Run Migrations

```
php artisan migrate
```

### 5. Serve the Application

```
npm run dev
php artisan serve
```

Visit `http://localhost:8000` in your browser to see your Laravel + React application.

## Additional Information

- Laravel documentation: [https://laravel.com/docs](https://laravel.com/docs)
- Laravel Forge: [https://forge.laravel.com](https://forge.laravel.com) (for deployment)
- Laravel GitHub Repository: [https://github.com/laravel/laravel](https://github.com/laravel/laravel)
