Use Case: Create a new quiz

Scope: Quiz Application

Level: User Goal

Primary Actor: Quiz Conductor
   
Preconditions:
    1. Actor should be logged in.
    2. Actor should be connected to the Internet.
    
Postconditions
    1. Actor's quiz is uploaded to the database and saved along with the correct responses.
    2. System generates a unique code for the quiz, and is intimated to the actor.
    3. Actor is returned to the main menu.
    
Main Scenario
    1. Actor chooses quiz preferences, including duration, deadline, number of questions, shuffle, question pooling etc.
    2. System stores the preferences for the quiz and proceeds to show the quiz form for the actor to fill out.
    3. Actor fills the form for one question and confirms the action.
    4. System stores the question along with its options, and clears the form for the next question to be filled.
        <i>Actor repeats steps 3-4 until all the questions are set and stored.</i>
    5. Actor confirms the publication of the quiz.
    6. System uploads all the quiz related content to the online database.
                
Alternative Scenario - 1
    1. Actor cancels the creation of the quiz in between.
    2. System flushes the existing content related to the quiz.
    3. Actor is intimated that the action has been canceled.
    4. System reverts actor to the main menu.
        
Alternative Scenario - 2
    1. Actor experiences network connectivity issues/other system issues.
    2. System attempts recovery procedures and does error logging.
    2. System flushes the existing content related to the quiz.
    3. System reverts actor to the main menu.



