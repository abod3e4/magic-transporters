# Magic Transporters API - README

Welcome to the **Magic Transporters API**! Dive into the future of logistics with our cutting-edge transporters that utilize virtual magic to move things easily and efficiently.

## Task Overview
- In the world of Magic Transporters, there are special people known as Magic
Movers. They use nifty gadgets to move important things. Fueled by virtual magic,
these Movers go on quick missions to carry items around.

1. A Magic Mover has:
- Weight limit (the most they can carry);
- Energy (their total magic power);
- Quest state (what they’re currently doing: resting, loading, on a mission, or
done).

2. Each Magic Item they carry has:
- Name (what it’s called);
- Weight (how much magic power it needs);

3. Develop a REST API to:
- add a Magic Mover;
- add a Magic Item;
- Load a Magic Mover with items, creating a log of this activitiy (loading state);
- Start a Mission — update the Magic Mover’s state to on a mission and stop loading more, creating a log of this activitiy (on a mission);
- End a Mission — unload everything from the Magic Mover, creating a log of this activitiy (mission complete / done);
-Check who completed the most missions with a simple list.

## Requirements
Follow these simple rules:
1. Functional requirements:
- Don’t give Magic Movers too much to carry for efficiency;
- Make a simple list showing who completed the most missions.

2. Non-functional requirements:
- Make sure the project is easy to build and run;
- Set up any needed data before starting (like starting a video game);
- Use express in Node.js or nestjs framework.
- Use Typescript

## Postman Collection
To test the API, you can download the Postman collection by:

[Download Magic Transporters API POSTMAN Collection](https://github.com/abod3e4/magic-transporters/blob/main/Magic%20Transporters.postman_collection.json)


## Let's Begin

Welcome to the setup guide for the Magic Transporters API. Follow these steps to quickly get it up and running on your local machine for development and testing.

### Prerequisites

Make sure your system has the following prerequisites installed:
- Node.js (v20.9.0)
- npm (Node Package Manager)
- MongoDB 

### Installation  Steps

1. **Extract The files**

2. **Go to the project directory**

   Change into the project directory:
   ```
   cd magic-transporters
   ```

3. **Install Dependencies**

   Install all the required dependencies by executing the following command:
   ```
   npm install
   ```

4. **Configure Environment Variables**

   Create a file named .env in the root directory. Define the necessary environment variables based on your setup:
   ```
   DB_URI=mongodb://127.0.0.1:27017/magic-transporters
   ```

### Running the Project
    Run the app:
    # development
    ```
    $ npm run start
    ```
    # watch mode
    ```
    $ npm run start:dev
    ```
