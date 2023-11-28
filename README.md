This project tasked me to research and select an external Javascript Library for use in a JS/HTML/CSS project.
I selected a library called Papa Parse (https://www.papaparse.com/) which helps you use CSV files in Javascript. 
My goal with this project was to create a simple webpage that will parse through a CSV log of a poker session from
pokernow.club, a free poker website where you can play with friends. After the session is over, you can download a 
log that contains all the events that took place during the session, including players joining, players leaving, and
the hands that were played. 

Using Papa Parse I was able to get the CSV file into a JSON object that I could mainpulate in my app.js. To find
the players I looped through the log file and searched for any strings containing "The admin approved the player" 
which is present only on lines where a player joins the game and also contains information about how many chips they
bought in for. Then I extracted the player name and stack and updated the DOM accordingly using Jquery.

I plan to improve this project in the future as I gain skills as a developer. I would like to add statistics about each
players tendancies during the session, as well as store the results and keep track of a players results over multiple sessions.
