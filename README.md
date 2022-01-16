# Memory Game - MATCH

I created this game for my Front End Development course with The Learning People. The project brief was to create the game using HTML, CSS and JavaScript, along with another other libraries I felt necessary as the project developed, with a focus on the functional logic created JavaScript. A 'How To' page/area with clear instructions for the player was also required and that I regularly commit my work to GitHub. Optionally, background audio and sound effects could be included, as well as difficulty levels, both of which I have added, to a degree, as to challenge myself, as this is my first project involving JavaScript in a major capacity.

## UX/UI

As a personal choice, I have designed the application inspired by the movie franchise 'The Matrix', taking care to choose fonts that are in align with this but are also readable to the player, and a simple colour scheme that put emphasis on box and text shadows to create a glow effect. An animated background reminiscent of 'The Matrix' is visible from every area of the application, but  care has been taken to make sure that the text of the application is not overwhelmed and is still easily readable.

The application has three mains areas and another four overlays:

- Welcome Area, which contains an enter button and an input for players to enter a username.
- Rules Area, which explains to the player the rules and displays the username entered previously.
- Game Area, which displays the game container, countdown timer, flip counter, info icon and reset button.
- Info overlay, which is accessed from the Game area, that displays to the player the rules, should they need reminding.
- Reset overlay, which is accessed from the Game Area, that displays two buttons and can reset or continue the current game.
- Victory overlay, which is displayed once the player matches all the cards.
- Game Over overlay, which is displayed if the countdown timer reaches '0'.

## Wireframes

To plan my game I used Balsamiq to create initial wireframes and to take down draft notes. I created two wireframes, one for mobile and another for desktop viewing. The mobile wireframe was the first to be made and has notes taken for the project, whereas the desktop wireframe was created solely as a guide for styling.  The links to the files are below:

- **[mobile wireframe](https://github.com/natasha-crain/memory-game/blob/master/static/wireframes/Card%20Game%20(mobile).pdf)**
- **[desktop wireframe](https://github.com/natasha-crain/memory-game/blob/master/static/wireframes/Card%20Game%20(desktop).pdf)**

## Features

### All Areas

- **Animated background** - An animated background using HTML, CSS and JavaScript, inspired by The Matrix.
- **Background Music** - Background music that can be controlled by an icon. Initially this is mute due to current browsers security features.

### Welcome  Area

- **Username input** - Allows players to input a username, but is not required.
- **Enter button** - When clicked takes the player to a new area, explaining the rules of the game. If the player entered a username, clicking on the enter button stores it. It also starts playing the background music, if it has not already been set to mute.

### Rules Area

- **Username output** - If the player entered a username in the **Welcome Area**, then it is displayed at the top of this area.
- **Rules** - a set of rules explaining to the player how to win, and what conditions they need to meet in order to win 5, 3 or 1 stars.
- **Start Game button** - a button that when clicked takes the player to the Game Area of the application.

### Game Area

- **Cards** - cards set out in a grid. Initially, the back of the cards are facing forwards, that when hovered over has an animation. When clicked on, a sound effect occurs and the card is flipped over to reveal an image and the player than has to click on another card to match it. If the images do match, another animation and sound effect occur, otherwise both cards flip back over and the player continues.
- **Countdown timer** - a timer, starting from 100, that counts down. When it reaches 0, an **Game Over** overlay appears.
- **Flip counter** - a counter, starting from 0, that counts the amount of flips the player has made. There is no limit but to receive 5, 3 or 1 stars the flips must be under certain counts.
- **Information button** - a question mark icon in the top left, that when clicked, pauses the timer and an information overlay is shown that explains to the player the rules. The remove the overlay, the icon is clicked again.
- **Reset button** - a reset arrow button under the **Information button**, that when clicked reveals an overlay, with two buttons and a paragraph, asking the player if they want to reset their current game or continue. The countdown timer is also paused.
- **Victory overlay** - if the player matches all the cards under 100 seconds, a Victory overlay appears congratulating the player. If the player entered a username in the **Welcome Area**, then it is displayed here, along with the player's stats of the game: the time it took to win and the amount of flips they made. If the player managed to beat the game within the conditions set for 5, 3 and 1 stars, then they also receive stars. A button is on the overlay, that when clicked resets the game for the player to try again.
  - 5 star conditions - the player has to match all the cards in under 30 seconds (before the countdown displays 70) and under 30 flips.
  - 3 star conditions - the player has to match all the cards in under 40 seconds (before the countdown displays 60) and under 40 flips.
  - 1 star conditions - the player has to match all the cards in under 50 seconds and 50 flips.
  - General conditions - the player has to match all the cards before the countdown reaches 0.
- **Game Over overlay** - if the player does not match all the cards in under 100 seconds, then a Game Over overlay appears. No username of stats appear on this overlay, just a button that when clicked, resets the game for the player to try again.

## Features to implement

- **Levels** - Initially they was to be individual levels for the player to select in the Rules Area, but time and lack of knowledge to have individual working levels meant this idea was altered instead to `if else if statements` for the **Victory overlay**. Once I have more time, experience and knowledge, I will convert this back to the original idea of separate levels the player can choose from the offset.

## Technologies/Resources

This project was created with:

- **[Balsamiq](https://balsamiq.com/)** - I used Balsamiq to create wireframes.
- **[HTML5](https://developer.mozilla.org/en-US/docs/Glossary/HTML5)** - I used HTML5 to create the content and structure of my application.
- **[CSS3](https://developer.mozilla.org/en-US/docs/Web/CSS)** -  I used CSS3 to add styles to the content of my application.
- **[JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)** - I used JavaScript to add functionality to my application.
- **[FontAwesome](https://fontawesome.com/v4.7/icons/)**  - I used FontAwesome for the music toggle button, info icon and reset icon.
- **[Google Fonts](https://www.w3schools.com/howto/howto_google_fonts.asp)** - I used Google Fonts to stylise the text in keeping with the theme of the application.
- **[VS Code](https://code.visualstudio.com/)** - I used VS Code as the software to develop and write the code for my application.

Royalty free music from the following websites was also used:

- [**background music**](https://www.dl-sounds.com/?s=sci+fi+pulse) - [DL Sounds](https://www.dl-sounds.com/)
- [**card flip sound effect**](https://elements.envato.com/card-flip-48003-STJE23H?utm_source=mixkit&utm_medium=referral&utm_campaign=elements_mixkit_cs_sfx_search_no_results) - [envatoelements](https://elements.envato.com/)
- [**card match sound effect**](https://elements.envato.com/arcade-game-notification-GVECZA8) - [envatoelements](https://elements.envato.com/)
- [**game victory sound effect**](https://elements.envato.com/video-game-win-JKL83NH)** - [envatoelements](https://elements.envato.com/)
- [**game over sound effect**](https://elements.envato.com/arcade-game-over-VXTKMQ3) - [envatoelements](https://elements.envato.com/)

## **Version Control**

- **[Git Bash](https://git-scm.com/downloads)** - I used Git Bash to connect my remote desktop to my repository and to add and commit changes made from VS Code.
- **[GitHub](https://github.com/)** - I used GitHub as a remote repository to push and then store any committed changes to my website from Git, and then to eventual deploy my application live.

## Testing

### Responsive/Mobile testing

I used Firefox development tools when testing each stage of my project, adjusting and correcting its responsive design where needed and using the console log for debugging.

### HTML , CSS  and JS Validation

To validate my code I used:

- **[WSC HTML Validator Tool](https://validator.w3.org/)**
- **[WSC CSS Validator Tool](https://jigsaw.w3.org/css-validator/)**
- **[JSHint Validator Tool](https://jshint.com/)**

## Bugs/Problems

Mostly fixed the issue with the background Javascript animation, in that it had trouble resizing itself when switching from portrait to landscape, and switching from desktop to mobile and vice versa. It currently works as expected for these queries but when manually resizing the desktop in the browser dev tools and then switching it back to full screen desktop, the animation cuts off on the side.

## Deployment

The hosting platform that I've used for my project is GitHub Pages. To deploy my website to GitHub pages, I used the following steps:

1. Create a new repository on GitHub.
2. Open Git Bash.
3. Initialise the local directory as a Git repository. `$ git init`
4. Add files to the new local repository, that stages them for the first commit. `$ git add .`
5. Commit the files that have been staged in the local repository. `$ git commit -m "First commit"`
6. In the GitHub remote repository, copied the HTTPS or SSH key.
7. In the Git Bash terminal, added the remote repository `$ git remote add origin main` and pasted the key. `$ git remote add origin ''https://github.com/natasha-crain/memory-game.git"`
8. Push the changes from the local repository to the remote repository `$ git push origin master`
9. Entered my GitHub username and password.
10. Pushed many commits through the project `$ git commit`
11. This brings up another window in which to add a more detailed commit, with the first line being the header of the commit
12. Once the commit is written, `esc` button is pressed and then `:wq` to exit the window and back to the main terminal.

### Repository Link

Repository **[here](https://github.com/natasha-crain/memory-game)**.

### Published Site

Live site **[here](https://natasha-crain.github.io/memory-game/)**.

Running Code Locally

To run my code locally, users can follow these steps:

- Go to my [***GitHub repository***](https://github.com/ncrain-boop/ncrain-boop.github.io)
- Click on '***code***'
- Click on ***Download ZIP***, or ***Open with GitHub Desktop*** if installed.
- If *download via ZI*P, extract the ZIP files content and the website can be run locally.
- If *Open with GitHub Desktop* has been used, click Open GitHubDesktop.exe on the pop-up window
- Choose the local path with which to clone the repository and click **'Clone'**
- Once the repository has been cloned, the website can be run locally.

## Credits

### Other sources

- Inspiration for my background animation and learning how to achieve an animation primarily using JavaScript can be found from CodePen here: https://codepen.io/AchrafBoujjou/pen/RxjWXB
- The online tutorial for the project's initial HTML and CSS can be found from YouTube here: https://www.youtube.com/watch?v=28VfzEiJgy4
- The online tutorial for the project's initial JavaScript can be found from YouTube here: https://www.youtube.com/watch?v=3uuQ3g92oPQ

### Acknowledgements

A massive, huge thank you to my mentor, [Sunny Hebbar](https://github.com/hebs87). His guidance and assistance were invaluable and saved me from going (completely) insane, as well as my friends for playing the game and revealing some logical errors. Oops.
