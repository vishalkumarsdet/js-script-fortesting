const prompt = require("prompt-sync")();

// Function to perform actions based on user input
function performAction(input) {
    let gbp;
    switch (input) {
        case '1':
            // USD and CAD conversion ratio are the same.
            const usd = parseFloat(prompt('Enter the USD or CAD value '));
            gbp = usd/1.5;
            console.log(gbp);
            break;
        case '2':
            const MXD = parseFloat(prompt('Enter the MXD value '));
             gbp = MXD/20;
            console.log(gbp);
            break;
        case '3':
            const SEK = parseFloat(prompt('Enter the SEK value '));
             gbp = SEK/10;
            console.log(gbp);
            break;
        default:
            console.log("Invalid input, please enter a number between 1 and 3");
    }
}
 
// Example of taking user input (in a browser environment, you might use prompt)
let userInput = prompt("Enter a number (1, 2, or 3):");
 
// Call the function with user input
performAction(userInput);