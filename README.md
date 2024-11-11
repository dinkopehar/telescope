# Portfolio Management Portal

This project is a Portfolio Management Portal that helps users manage various real estate properties. Each user can register, log in, and set their prefered theme. Within their account, users can create multiple portfolios, each containing properties (such as flats or houses) with relevant details and organization features.


![](./.github/assets/2.png)


React UI availableat: https://telescope-8fx.pages.dev/
Django Backend: https://telescope-sg6jx.ondigitalocean.app/

Both are connected, please visit first link.

## Requirements  (Prerequisites)
Tools and packages required to successfully install this project:
* Linux [Install](https://link-for-setup-guide)
* Python 3.12 and up [Install](https://link-for-setup-guide)
* PostgreSQL [Install](https://link-for-setup-guide)
* Docker [Install](https://link-for-setup-guide)
* Docker Compose [Install](https://link-for-setup-guide)
* Node.js [Install](https://link-for-setup-guide)

## Installation
To install this project, follow these steps(assuming Linux):

- `$ git clone https://github.com/dinkopehar/telescope.git`
- `$ cd telescope/ui`
- `$ pnpm i`
- Create `.env` file with `VITE_API_URL=http://127.0.0.1:8000/`
- `cd ..`
- Create virtual environment and install dependencies (depends on how you create it)
- Create `.env` file in `api` directory with `SECRET_KEY`, `DEBUG` and `DATABASE_URL`.
- With PostgreSQL(PostGIS enabled) running, run `python api/manage.py migrate`
- Run both projects

## Screenshots

TODO: Add screenshots of the app

![](./.github/assets/1.png)
![](./.github/assets/3.png)
![](./.github/assets/4.png)
![](./.github/assets/5.png)

## Features

* Used Django and DRF to create API
* Stateless auth using JWTs
* Daisy UI and TailwindCSS
* Backend deployed on Digital Ocean as Docker container
* Static site is served from CloudFlare Pages
* Database platform is Supabase (PostgreSQL hosting with PostGIS enabled)
* Formating and linting using Ruff, ESLint
* Github Actions for CI/CD (enforcing rules and formatting)
* Redux Toolkit for state management

## Running the tests

Tests are implemented for backend side. To run tests, simply run:

`python api/manage.py test api`

As for frontend side, they are missing but could be added in the future.

## Deployment Notes

The following steps are required to deploy the project:

- Create a new Digital Ocean project for hosting backend app of "App Platform"
- Create PostgreSQL database with PostGIS enabled (hosted on Supabase)
- Deploy frontend app. The easiest way to deploy is by far CloudFlare Pages. Frontend app could also be serve from S3 bucket.
- Add the following environment variables to the project:
  - For Frontend app, create .env file in the `ui` directory and add `VITE_API_URL=https://<your-project-name>.ondigitalocean.app/`. On other platforms, expose this variable as an environment variable.
  - For Backend app, create .env file in the `api` directory and add `SECRET_KEY`, `DEBUG` and `DATABASE_URL`. On other platforms, expose this variable as an environment variable. NOTE: `DATABASE_URL` when PostGIS is disabled goes like `postgis://USER:PASS@DATABASEURL:PORT/DATABASE_NAME`.

## What could be improved ?

- Add more tests to backend side
- Add tests to frontend side
- Restructure components in UI folder
- Use single Cloud provider for frontend, backend and database. The reason for multi cloud deployment is primarly because some services are better on other Cloud providers and company uses multi cloud stuff (open to discussion)
- Create "development" instance on PR so that frontend and backend can be tested before merging
- Upload static assets to S3 using `django-storages` and CloudFront
- Parts of UI are mocked. Can be improved.

## How to Contribute

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change. Please make sure to update tests as appropriate. If you'd like to contribute, please fork the repository and make changes as you'd like. Pull requests are warmly welcome.

Steps to contribute:
1. Fork this repository (link to your repository)
2. Create your feature branch (git checkout -b feature/fooBar)
3. Commit your changes (git commit -am 'Add some fooBar')
4. Push to the branch (git push origin feature/fooBar)
5. Create a new Pull Request

## Authors

Dinko Pehar  – dinko@pehar.dev
