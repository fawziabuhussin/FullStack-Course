# Introduction
This task uses MongoDB to manage data instead of storing it locally on your PC.

## What does this task include?

1. **Separation of Frontend and Backend**:
   - The frontend and backend are separated to ensure modular development and maintenance.

2. **Backend Independence**:
   - The backend operates independently of the frontend, allowing for easier updates and maintenance without affecting the user interface.

3. **Frontend**:
   - The frontend handles the user interface, interacting with the browser to present data and capture user inputs.

4. **Backend**:
   - The backend manages the actual data processing and interactions with the MongoDB database, ensuring that all CRUD operations (Create, Read, Update, Delete) are handled properly.

## What should you know?

1. **React**:
   - Understanding of React for building the frontend components and managing state.

2. **MongoDB**:
   - Familiarity with MongoDB for managing the database, including creating schemas and handling queries.

3. **Backend Concepts**:
   - Knowledge of backend principles, such as routing, middleware, and RESTful APIs.

4. **Postman** (Advantage):
   - Experience with Postman for testing API endpoints during development.

5. **Express**:
   - Understanding of Express.js for building the backend server and handling HTTP requests.

6. **CORS**:
   - Knowledge of Cross-Origin Resource Sharing (CORS) to allow communication between the frontend and backend running on different domains or ports.

7. **Dotenv**:
   - Familiarity with dotenv for managing environment variables securely.

## Workflow:

1. **Setting Up the Environment**:
   - Ensure you have Node.js installed.
   - Clone the repository and navigate to the project directory.

2. **Frontend Setup**:
   - Navigate to the `frontend` directory.
   - Install dependencies using `npm install`.
   - Start the frontend server using `npm start`.

3. **Backend Setup**:
   - Navigate to the `backend` directory.
   - Create a `.env` file with the following content:
     ```
     MONGODB_CONNECTION_URL=<your_mongodb_connection_url>
     PORT=3001
     ```
   - Install dependencies using `npm install`.
   - Start the backend server using `node index.js`.

4. **Testing**:
   - Use Postman or `curl` commands to test the API endpoints:
     - **Fetch all notes**: `GET http://localhost:3001/notes`
     - **Fetch a single note**: `GET http://localhost:3001/notes/:id`
     - **Create a note**: `POST http://localhost:3001/notes`
     - **Update a note**: `PUT http://localhost:3001/notes/:id`
     - **Delete a note**: `DELETE http://localhost:3001/notes/:id`

5. **Development**:
   - Modify frontend components in the `frontend/src` directory.
   - Update backend routes and models in the `backend` directory.
   - Ensure both servers are running during development to see changes live.

## Running the Project:

1. **Frontend**:
   ```
   cd frontend
   npm install
   npm start
    ```

2. **Backend**

    ```
    cd backend
    npm install
    node index.js
    ```

With these steps, you should have both the frontend and backend servers running, and you can interact with your application through the browser and Postman. The backend will handle all data interactions with MongoDB, while the frontend will provide a user-friendly interface.

## Using GitHub

### Basic Git Commands

To perform common tasks using Git, you can use the following commands:

1. **Cloning the Repository:**
   To clone the repository to your local machine:

   `git clone <your_repository_url>`
2. **Creating a New Branch:**
    To create and switch to a new branch:

    `git checkout -b <new_branch_name>`

3. **Committing Changes:**
    After making changes, you can stage and commit them:

    `git add .`

    `git commit -m "Describe your changes"`
4. **Pushing Changes:**
    To push your changes to the remote repository:

    `git push origin <branch_name>`
5. **Creating and Pushing Tags:**
    To create a new tag and push it to the remote repository:

    `git tag -a <tag_name> -m "Tag message"`

    git push origin <tag_name>
6. **Pulling Changes:**
    To pull the latest changes from the remote repository:

    `git pull origin <branch_name>`
7. **Deleting a Tag:**
    To delete a tag locally and remotely:

    `git tag -d <tag_name>`
    
    `git push origin :refs/tags/<tag-name>`

    `git push origin a2_appeal`

8. **Re-creating a Tag:**

    To remove an existing tag and re-create it:
    
    `git tag -d <tag_name>`

    `git push origin :refs/tags/<tag-name>`

    `git push origin a2_appeal`

    `git tag -a <tag_name> -m "Tag message"`

    `git push origin <tag_name>`



# Useful for killing process(running-server):
Using these two commands you can find the port you are running your server at, and kill it.
1) `netstat -a -n -o | findstr :<port>`
2) `taskkill /PID  <process-id> /F`
# Tips for Development:

    Frontend Development:
        Use React DevTools for debugging React components.
        Ensure proper state management and prop drilling to pass data between components.

    Backend Development:
        Use console logs and error handling to debug issues.
        Test each endpoint thoroughly using Postman or equivalent tools.

    Database Management:
        Keep your MongoDB schema updated and ensure data integrity.
        Use MongoDB Atlas for easy cloud-based database management.

By following this workflow, you can effectively develop and maintain a full-stack application with a React frontend and an Express backend connected to a MongoDB database.





## Author
Fawzi Abu Hussin

[LinkedIn Profile](https://www.linkedin.com/in/fawzi-abu-hussin-7874a3233/)

[Github](https://www.github.com/fawziabuhussin)
