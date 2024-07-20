# Integration Engineer Test

We appreciate your interest in the Integration Engineer role at our company. This test helps us understand your skills in creating a Node.js backend API and a ReactJS frontend. You should finish the test within a few hours. Please read the instructions carefully.

## Task Overview:

Your task is to build a simple task management application. This template offers a basic setup for a React frontend using Vite, which connects to a Node/Express backend. Users should be able to view, create, update, and delete tasks.

There are different parts to this exercise:

1. Set up the backend and frontend, resolving any issues that may arise (some issues might not have been noticed by the original developer since 'it works locally').
2. Complete the endpoints for task creation and deletion.
3. Implement missing functions in the React frontend to interact with the new endpoints for task creation and deletion.
4. Develop a new endpoint in the Express app for updating tasks. Create a UI allowing users to update tasks and communicate with this new endpoint.
5. Update the CSS to improve the usability of the solution.

*Additional Information*

* Tasks should be stored temporarily in memory; permanent storage is not necessary.
* Prevent creating or updating tasks with empty titles or descriptions. Display an error if users attempt to submit an invalid task. (Your backend should handle this check and return an error.)
* No guidance is available from the previous developer on setting up the project on a new machine. You'll need to use the existing files to figure it out, considering possible mistakes.
* The backend is in JavaScript, while the frontend React code is in a .tsx file. Make sure your work is valid TypeScript.
* Enable CORS support in the API to permit cross-origin requests.
* The app's rudimentary styling by the previous developer can be improved for better user experience.
* BONUS: If you can optimize the React app's rendering for efficiency, feel free to make changes.

*Submission Guidelines*

* Fork this GitHub repository to your own GitHub account.
* Develop the backend and frontend using the provided directory structure.
* Edit this README below to explain how to run both the backend and frontend.
* Once done, share the link to your forked repository via email.

*Evaluation Criteria*

* Functionality: Does the app meet the requirements and work error-free?
* Code Quality: Is the code well-structured, modular, and easy to understand?
* API Design: Did you design the API in a RESTful way? Is error handling and validation effective?
* Frontend Design: Is the frontend user-friendly, responsive, and visually appealing?
* Git Usage: Are your commits meaningful and code changes well-tracked?
* Documentation: Are instructions provided for setting up the app on a new machine?

Use this opportunity to showcase your skills. If you see fit, add extra features or improvements.

Please note that this test aims to be completed in a few hours. However, quality work is more important than speed. If you have questions, feel free to email us.

Best wishes, and we're excited to review your submission!

Regards,
The Duda Solutions Engineering Team

## Add any instructions to get your submission running below this line.

# Task Management App

## Overview

This task management application allows users to create, update, and delete tasks with an urgency level. The app features a responsive design to ensure usability on both desktop and mobile devices.

## Front-End

The front-end is built with React and styled using CSS.

### Running the Front-End

1. **Clone the Repository**

   ```bash
   git clone <repository-url>
   cd <repository-directory>

2.  **Install Dependencies and Run**

   ```bash
    npm install
    npm run dev

### Key Features

* Task Management: Create, edit, and delete tasks.
* Responsive Design: Adapts to different screen sizes with improved mobile UI.
* Urgency Levels: Assign and display urgency levels (1-5) with corresponding icons.
* Sorting: Added buttons to sort tasks by urgency level in ascending and descending order.
* Error Display: Replaced alerts with inline error messages below the input fields.

## Back-End

The back-end is built with Express.js.

### Running the Back-End
Navigate to the Back-End Directory
   
   cd <repository-directory>
    npm install
    npm start
    The server will be available at http://localhost:8000.

## API Endpoints

* GET /tasks: Retrieve all tasks.
* POST /tasks: Create a new task with title, description, and urgency level.
* DELETE /tasks/:id: Delete a task by its ID.
* PUT /tasks/:id: Update a task by its ID.

## Conclusion
The application provides a simple interface for managing tasks with urgency levels and is designed to be responsive and user-friendly across different devices.

Thanks for the opportunity!