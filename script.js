$(document).ready(function(){
    var words = ['slimes','plorts','market','largos', 'gadget', 'puddle', 'glitch', 'lagoon', 'bouncy']
    
    // Choosing random words using index
    var chosenWord = words[Math.floor(Math.random()*words.length)]
    var guessedLetters = []
    var remainingGuesses = 6

    var snd = new Audio("./assets/glitch.mp4");
    var dnd = new Audio("./assets/tv-glitch-6245.mp3");
    var hi = new Audio("./assets/Ranch Theme.mp3");
    var coin = new Audio("./assets/coin.mp4");
    var spill = new Audio("./assets/spill.mp3");
    // Display underscores for each letter of the chosen word
    hi.play();
    for(var i=0; i < chosenWord.length; i++){
        $('#word-container').append('<div class="hidden-letter">_</div>')
    }

    $('body').hover(function(){
        hi.play()
        hi.volume = 0.03
    })

    function blink(time, interval){
        var timer = window.setInterval(function(){
            $("img").css("opacity", "0.1");
            window.setTimeout(function(){
                $("img").css("opacity", "1");
            }, 100);
        }, interval);
        window.setTimeout(function(){clearInterval(timer);document.getElementById("wrong").style.display = "none";}, time);
    }

    // Function to update the display of the guessed letters
    function updateGuesses(){
        $('#guess-container').empty()
        $('#guess-container').text('Guessed Letters: ' + guessedLetters.join(', '))
    }

    // Function to check if the guess letter is in the chosen word
    function checkGuess(letter){
        if(chosenWord.indexOf(letter) === -1){
            remainingGuesses--
            $('#remaining-guesses').text("Remaining Guesses: "+ remainingGuesses)
            if (remainingGuesses === 6) {
                document.getElementById("background").style.backgroundImage = "url(./images/HANGMAN.png)";
            }else if (remainingGuesses === 5) {
                document.getElementById("background").style.backgroundImage = "url('./images/HANGMAN (1).png')";
                document.getElementById("wrong").style.display = "block"
                snd.play();
                blink(3000, Math.random*1000)
            }else if (remainingGuesses === 4) {
                document.getElementById("background").style.backgroundImage = "url('./images/HANGMAN (2).png')";
                document.getElementById("wrong").src='./images/HANGMAN (8).png';
                document.getElementById("wrong").style.display = "block"
                snd.play();
                blink(3000, Math.random*1000)
            }else if (remainingGuesses === 3) {
                document.getElementById("background").style.backgroundImage = "url('./images/HANGMAN (3).png')";
                document.getElementById("wrong").src='./images/HANGMAN (10).png';
                document.getElementById("wrong").style.display = "block"
                snd.play();
                blink(3000, Math.random*1000)
            }else if (remainingGuesses === 2) {
                document.getElementById("background").style.backgroundImage = "url('./images/HANGMAN (4).png')";
                document.getElementById("wrong").src='./images/HANGMAN (11).png';
                document.getElementById("wrong").style.display = "block"
                snd.play();
                blink(3000, Math.random*1000)
            }
            else if (remainingGuesses === 1) {
                document.getElementById("background").style.backgroundImage = "url('./images/HANGMAN (5).png')";
                document.getElementById("wrong").src='./images/HANGMAN (12).png';
                document.getElementById("wrong").style.display = "block"
                snd.play();
                blink(3000, Math.random*1000)
            }else if (remainingGuesses === 0) {
                document.getElementById("background").style.backgroundImage = "url('./images/HANGMAN (6).png')";
                document.getElementById("reset-button").classList.add('shake')
                document.getElementById("background").style.fontFamily = "BlueScreen";
            }
        }else{
            // Reveal the guessed letter
            $('.hidden-letter').each(function(index){
                if(chosenWord[index] === letter){
                    $(this).text(letter)
                    coin.play()
                }
            })
        }
        updateGuesses()
        checkGameStatus()
    }

    // function to check if the game has been won or lost
    function checkGameStatus(){
        if($(".hidden-letter:contains('_')").length === 0){
            spill.play()
            coin.play()
            document.getElementById("reset-button").src='./images/winbutto.png';
            document.getElementById("background").style.backgroundImage = "url('./images/HANGMAN (15).png')";
            document.getElementById("wrong").src='./images/HANGMAN (13).png';
            document.getElementById("wrong").style.display = "block"
            $('#wrong').fadeOut(5000).getElementById("wrong").style.display = "none"
        }else if(remainingGuesses === 0){
            alert('The slimes were eaten... the word was: '+ chosenWord)
            document.getElementById("background").style.backgroundImage = "url('./images/HANGMAN (19).png')";
            document.getElementById("background").style.backgroundSize = "cover";
            dnd.play();
        }
    }

    // Reset Game
    function resetGame(){
        guessedLetters = []
        remainingGuesses = 6
        $('#remaining-guesses').text('Remaining Guesses: '+ remainingGuesses)
        $('#word-container').empty()
        chosenWord = words[Math.floor(Math.random()* words.length)];
        for(var i=0;i<chosenWord.length;i++){
            $('#word-container').append('<div class="hidden-letter">_<div>')
        }
        updateGuesses()
        document.getElementById("background").style.fontFamily = "Mokoto";
        document.getElementById("reset-button").classList.remove('shake')
        document.getElementById("background").style.backgroundImage = "url(./images/HANGMAN.png)";
        document.getElementById("reset-button").src='./images/resetGlitch.png';
        document.getElementById("wrong").src='./images/HANGMAN (7).png';
        document.getElementById("background").style.backgroundSize = "86vw 100vh";
    }

    // Event handler for key presses
    $(document).keypress(function(event){
        var letter = String.fromCharCode(event.which).toLowerCase()
        if(letter.match(/[a-z]/) && guessedLetters.indexOf(letter) === -1){
            guessedLetters.push(letter)
            checkGuess(letter)
        }
    })

    // Event handler for reset button
    $("#reset-button").on("click", function(){
        resetGame();
    });


    $('#remaining-guesses').text('Remaining Guesses: '+ remainingGuesses)
})