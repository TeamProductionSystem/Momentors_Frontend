# [Momentum Mentors](https://momentum-mentors.netlify.app)

### Site Link

https://momentum-mentors.netlify.app

### Description

Momentum Mentors is an app used to connect students in the Momentum Learning program with alums to setup mentorship sessions. It allows an alum to set their availability and for students to schedule a session based on that availability.

## Features

- Users can setup profiles as a mentor or mentee.
- Mentors can set their skills and availability.
- Mentees can schedule sessions with the mentors, filtered by skills and availability.
- Menotrs can confirm sessions
- Both mentor and mentee can cancel a session prior to session start time.

## Contributing

Contributions are always welcome!

See [contributing.md](https://github.com/TeamProductionSystem/Team_Production_System/blob/main/CONTRIBUTING.md) for ways to get started.

Please adhere to this project's [code of conduct](https://github.com/TeamProductionSystem/Team_Production_System/blob/main/CODE_OF_CONDUCT.md).

[![Apache2 License](https://img.shields.io/badge/License-Apache2.0-green.svg)](https://choosealicense.com/licenses/apache-2.0/)

## Run Locally

Clone the project

```bash
  git clone https://github.com/TeamProductionSystem/Team_Production_System.git
```

Go to the project directory

```bash
  cd Team_Production_System
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`REACT_APP_BE_URL='https://team-production-system.onrender.com'`

## Endpoints

Link to [Endpoints](https://github.com/TeamProductionSystem/Team_Production_System_BE/blob/main/README.md)

## Styling

Currently using MUI for styling.

Link to [MUI](https://mui.com/material-ui/getting-started/overview/) documentation

# Submitting Code

We use a pre-commit to check branch names and commit messages. Please follow the the following schema for branch names and commit messages:

## Branch Names

Branch names should be in the following format:

`<type>/<issue-number>/<description>`

**Type:** The type of branch. This should be one of the following:

- feat - Adding a new feature
- bugfix - Fixing bugs in the code
- hotfix - For emergency fixes
- test - Experimental changes for testing purposes
- chore - Changes to the build process or auxiliary tools and libraries such as documentation generation

**Issue Number:** The issue number associated with the branch. This should be the number of the issue in the GitHub repository or the trello board.

**Description:** A short description of the branch. This should be in lowercase and use dashes instead of spaces.

## Commit Messages

Commit messages should be in the following format:

`<type>(<scope>): <description>`

**Type:** Represents the type of change that was made. This should be one of the following:

- feat - Adding a new feature
- fix - Fixing bugs in the code
- docs - Changes to documentation
- style - Changes to code style
- refactor - Changes to code that neither fixes a bug nor adds a feature
- perf - Changes to code that improves performance
- test - Adding or updating tests
- build - Changes to the build process or dependencies
- ci - Changes to CI configuration files and scripts
- chore - Miscellaneous changes, such as updating packages or bumping a version number
- revert - Reverting a previous commit

**Scope:** This is optional but can provide additional contextual information. It describes the section or aspect of the codebase affected by the change. For example, auth for authentication-related changes or header for changes to a website's header component.

**Description:** A concise description of the changes. Start with a lowercase verb indicating what was done (e.g., add, update, remove, fix).
