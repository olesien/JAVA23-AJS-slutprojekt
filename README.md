# Scrum Board

### Powered by React, Firebase, React Router, React D&D, React Toastify and more!

## Features
- Allows users to login or sign up using Firebase Authentication
- A scrum board where a user can add tasks, delete them and drag them to another column such as Done.
- If an assignee has not been set, this needs to be done as a step when dragging a task to another column
- Error management
- Compatability with GitHub Pages

## Technical
- useAuth is used to keep track of all auth changes, with React Router rerouting basic on the state of the user
- useTasks is used as the interface for Firebase RTD, where the user state is used to determine to route to the tasks to give unique boards for all
- react-toastify is used for success and error messages
- Main pages are in pages folder, and the smaller components in components folder
- Firebase details are in .env. This was initially hidden but shared as a mandatory requirement for GitHub pages


Link: https://olesien.github.io/JAVA23-AJS-slutprojekt-linus-lindberg/#/
