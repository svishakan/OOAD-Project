# QuizHut v1.0
[![alt QuizHutLogo](./images/logo.png)](http://quizhut.herokuapp.com/)

🔗 You can check out our project live here : http://quizhut.herokuapp.com/

<br>


[![License: GPL v3](https://img.shields.io/github/license/svishakan/OOAD-Project)](https://github.com/svishakan/OOAD-Project/blob/main/LICENSE)

[![Issues](https://img.shields.io/github/issues/svishakan/OOAD-Project)](https://github.com/svishakan/OOAD-Project/issues)

[![Stars](https://img.shields.io/github/stars/svishakan/OOAD-Project)](https://github.com/svishakan/OOAD-Project/stargazers)

[![Forks](https://img.shields.io/github/forks/svishakan/OOAD-Project)](https://github.com/svishakan/OOAD-Project/)

[![Repo Size](https://img.shields.io/github/repo-size/svishakan/OOAD-Project)](https://github.com/svishakan/OOAD-Project/)

[![Forks](https://img.shields.io/website?down_message=OFFLINE&up_message=ONLINE&url=https%3A%2F%2Fquiz-hut.herokuapp.com%2F)](https://quiz-hut.herokuapp.com/)


<br>

## About

The website was built using ReactJS & Bootstrap 4.0, and it uses Google Firebase's Firestore as a back-end to store and serve data dynamically.

## Short Description
- Users can sign up and create an acount by providing the required credentials.
- Upon signing in, the users can create a quiz, or take a quiz created by others by using a unique quiz ID generated from the creation of another quiz.
- Users can also view & export reports for the quizzes they have set.
- Users can check their past quiz scores in their profile.

## Running in Localhost
### Installation - Windows, Linux and Mac
#### Clone the repository
```bash
git clone https://github.com/svishakan/OOAD-Project.git
```
#### Move to the app directory
```bash
cd OOAD-Project/quiz-app/
```
#### Add ```.env``` file in quiz-app/
1. Fill the empty ENV.txt with the API keys obtained from the following:
1. Create a Project in https://console.firebase.google.com/
1. Obtain the enviroinment varibles for your project - [Reference Here](https://youtu.be/3ZEz-iposj8)
1. Create an account in [EmailJS.com](https://dashboard.emailjs.com/sign-in) 
1. Obtain the enviroinment Variables for EmailJS  - [Reference Here](https://youtu.be/NgWGllOjkbs)
1. Add a HMAC key to your file.
1. Store the the now filled ENV.text as a .env file in the same directory.

#### Install the dependencies required for running this project
```zsh
npm install
```
#### Start the project
```
npm start
```

![alt Instruction](./images/Instruction.gif)

The App should be open in your browser now. If not, then paste this in your browser
```
localhost:<PORT>/
``` 

The port for React-App is generally 3000, if not, check your terminal and use the port number specified there.

## Documentation
The [Software Documentation](./Documentation/) of the project consists of different UML diagrams that explain and illustrate the design and thought process that went behind the implementation of this project.

## Features

### Basic Authentication 

#### Login To An Existing Account 🔑

![alt Take up a Quiz GIF](./images/Login.gif)

#### Create An Account 🔐

![alt Take up a Quiz GIF](./images/Registration.gif)

#### Take Up A Quiz 📚

![alt Take up a Quiz GIF](./images/TakeQuiz.gif)


#### Create A New Quiz 📝


![alt Take up a Quiz GIF](./images/CreateQuiz.gif)


#### View Quiz Reports ✅

![alt Take up a Quiz GIF](./images/ViewReports.gif)


### Other Features ✨

![alt Take up a Quiz GIF](./images/OtherFeatures.gif)

## Author Notes 👓

Kindly show us some ❤️ by ⭐ing this repository! Thanks! 
The project is also open to contributions from others, so if you're interested, 
you can get in touch with us! 😃


## Icon Credits 📎

<div>
<img src="./quiz-app/public/logo30.png">
</div>

QuizHut Logo made by [Freepik](https://www.flaticon.com/authors/freepik) from [Flaticon.com.](https://www.flaticon.com/)

