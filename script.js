$(document).ready(function(){
    var words = ['python','minecraft','miata','painting', 'leveling', 'pufferfish']

    // Choosing random words using index
    var chosenWord = words[Math.floor(Math.random()*words.length)]
    var guessedLetters = []
    var remainingGuesses = 6

    // Display underscores for each letter of the chosen word
    for(var i=0; i < chosenWord.length; i++){
        $('#word-container').append('<div class="hidden-letter">_</div>')
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
        }else{
            // Reveal the guessed letter
            $('.hidden-letter').each(function(index){
                if(chosenWord[index] === letter){
                    $(this).text(letter)
                }
            })
        }
        updateGuesses()
        checkGameStatus()
    }

    // function to check if the game has been won or lost
    function checkGameStatus(){
        if($('.hidden-letter:contains("_")').length === 0){
            alert('Congrats You Won')
            resetGame()
        }else if(remainingGuesses === 0){
            alert('Sorry you lost, the word was: '+ chosenWord)
            resetGame()
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
    $('#reset-button').click(function(){
        resetGame()
    })


    $('#remaining-guesses').text('Remaining Guesses: '+ remainingGuesses)
})