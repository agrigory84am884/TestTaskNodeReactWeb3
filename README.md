# Test Task - Armen Grigoryan

## Description

This is a Node.js and React application developed with Express and TypeScript, connected to a MySQL database. The application uses TypeScript for its codebase and is containerized with Docker for easy deployment.  All parts are created custom from scratch  I didn't use any ready auth system or some ready codes, and docker-compose.yml was created specifically for this task and from scratch, so for this kind of task I think the time was very short I couldn't follow up code quality, the target was to create a task on time, I don't like the front side and it is the first time that I am building react application from scratch, I always worked from the backend side, and I am full stack on the backend side as I can work on Nodejs, c++, PHP, C#, but have experience on the front side as web applications as well mobile and desktop applications, have experience working on the Windows application of TeamViewer
 I want to say that it is not a measurement of  code quality  I can more  better, just need a bit more time 

## Prerequisites

- Docker
- Docker Compose

## Environment Configuration

Two environment files are provided for different environments:

- `.env.example`: environment configuration

## Running the Application

1. **Clone the repository**

   ```bash
   git clone git@github.com:agrigory84am884/TestTaskNodeReactWeb3.git

## Create the Environment File

Copy the appropriate environment example file to `.env` based on the environment you want to use:

Before building:
```bash
cp .env.example .env
```

## Build and Start the Application

Use Docker Compose to build and start the application and database containers:

```bash
docker-compose up --build
```

[Enjoy](http://localhost:3000)
