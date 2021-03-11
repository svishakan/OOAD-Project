Use Case: Take up a quiz

Scope: Quiz Application

Level: User Goal

Primary Actor: Quiz Taker
   
Preconditions:
    1. Actor should be logged in.
    2. The quiz must be available.
    3. Actor must have the quiz's unique code.
    4. Actor must be connected to the Internet.
    
Postconditions
    1. Actor is intimated with his score.
    2. Actor's score and details are updated to the database.
    3. Actor is returned to the main menu.
    
Main Scenario
    1. Actor enters the quiz code and confirms the start of his/her attempt. The quiz timer starts on confirmation.
    2. Actor is displayed a question with its choices. The actor picks his/her response.
    3. Actor moves to the next/previous question.
        <i>Actor repeats steps 2-3 until all questions are attempted, or until the timer expires and the attempt is auto-submitted.</i>
    4. Actor's latest answers are saved and considered for evaluation on submission.
                
Alternative Scenario - 1
    1. Actor enters an invalid/expired quiz code.
    2. Actor is intimated with a relevant error message.
    3. System reverts actor to the main menu.
        
Alternative Scenario - 2
    1. Actor experiences network connectivity issues/other system issues.
    2. System attempts recovery procedures and does error logging.
    3. Actor's attempt is not considered.
    4. System reverts actor to the main menu.



