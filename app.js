// Use npx live-server for this to function


// Global Variables accessable using closure
var log
var players = []
var startStacks = {}
var endingStacks = {}
var playerName
var playerStack
 
Papa.parse("../pokersession.csv", {
    header: true,
    download: true,
    complete: function(results){
        log = results.data
        console.log(results.data[0].entry)
        // Since papa.parse is Async use this call to ensure log is fully built
        displayPlayers();
    }
})

// Display Players - Main block
function displayPlayers(){
  for (let i = 0; i < log.length; i++){
    // Loop over entire log
    // Identify players
    if (log[i].entry.includes("The admin approved the player")){
       players.push(log[i].entry)
       playerName = extractPlayers(log[i].entry)
       playerStack = parseInt(extractBuyIn(log[i].entry))
       startStacks[playerName] = playerStack
    }
    if (log[i].entry.includes("quits the game")){
        console.log("player quit", log[i].entry)
        playerName = extractPlayers(log[i].entry)
        playerStack = parseInt(extractBuyIn(log[i].entry))
        endingStacks[playerName] = playerStack
    } 
  }
  console.log(startStacks)
  console.log(endingStacks)
  players = Object.keys(startStacks)
  editDom()
}


// Jquery Dom Manipulation Function
function editDom(){
  const $main = $("#main-block")
  for (index in players){
    let playerName = players[index]
    let startStack = startStacks[playerName]
    let endStack = endingStacks[playerName]
    let profit = endStack - startStack
    $main.append(`
      <p>
        Player ${parseInt(index) + 1}: ${playerName},
        Buy In: ${startStack},
        Final Stack: ${endStack},
        Profit: ${profit}
      </p>
    `)
  }
}

// HELPER FUNCTIONS
// Helper function that extracts the players name from .entry string
function extractPlayers(string){
    let startIndex = string.indexOf('"')
    let fragment = string.slice(startIndex + 1)
    let stopIndex = fragment.indexOf(" ")
    let result = fragment.slice(0, stopIndex)
    return result
}

// Helper function that extracts the players buy in from .entry string
function extractBuyIn(string){
    let startIndex = string.indexOf("stack of")
    startIndex += 9
    let fragment = string.slice(startIndex)
    let stopIndex = fragment.indexOf(".")
    let result = fragment.slice(0, stopIndex)
    return result
}

