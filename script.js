document.addEventListener('DOMContentLoaded', () => {
    const username = localStorage.getItem('username') || 'Guest';

    // LOGIN LOGIC
    const userIdMap = { 1: 'nlyt', 2: 'ojfa', 3: 'mkmm', 4: 'mykbs', 5: 'rr' , 6: 'g'};
    const passKeyMap = { 1: 'q356t', 2: '7ghj9', 3: 'lo345d', 4: 'yt657t', 5: 're554r' , 6: 'g'};
    const userMap = { 1: 'Nathen', 2: 'Aiden', 3: 'Muzammil', 4: 'Yazid', 5: 'Rithvik' , 6: 'Guest'};

    const loginButton = document.getElementById('loginb'); // Login button ID
    if (loginButton) {
        loginButton.onclick = () => {
            const id = document.getElementById('userid').value; // User ID input
            const key = document.getElementById('passkey').value; // Passkey input
            let isAuthenticated = false;

            for (let i = 1; i <= 6; i++) {
                if (id === userIdMap[i] && key === passKeyMap[i]) {
                    const username = userMap[i];
                    document.body.style.backgroundColor="green"
                    setTimeout(function() {
                        alert(`UVRAYS welcomes you to the safehouse, ${username}!`);
                    }, 2000)
                    localStorage.setItem('username', username); // Store username in localStorage
                    window.location.href = 'challenge.html'; // Redirect to challenge page
                    isAuthenticated = true;
                    break;
                }
            }

            if (!isAuthenticated) {
                document.body.style.backgroundColor="red"
                setTimeout(function() {
                    alert('User ID or Password is incorrect!');
                }, 2000)
                
            }
        };
    }

    // CHALLENGE 1: Sentence Reveal Logic
if (document.getElementById('sentence-container')) {
    let currentSentence = 1;
    const maxSentences = 6;

    // Handle Enter key to display sentences one by one
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' && currentSentence < maxSentences) {
            const nextSentence = document.getElementById(`sentence-${currentSentence + 1}`);
            if (nextSentence) {
                nextSentence.style.display = 'block';
                currentSentence++;
            }
        }
    });

    // Handle challenge answer submission
    const submitButton = document.getElementById('1cb1');
    if (submitButton) {
        submitButton.onclick = () => {
            const answer = document.getElementById('1ci1').value;
            if (answer === '4') {
                document.body.style.backgroundColor="green"
                setTimeout(function() {
                    alert(`Aha, Smart! But this won't suffice, ${username}!`);
                }, 1000)
                window.location.href = 'challenge2.html';
            } else {
                document.body.style.backgroundColor="red"
                setTimeout(function() {
                    alert(`Aha! Not so smart, eh? ${username}!`);
                }, 1000)
            }
        };
    }
}


    // CHALLENGE 2: Puzzle Logic
    if (document.getElementById('puzzle')) {
        const names = ['JANE', 'MIKE'];
        const puzzleArray = [
            ['X', 'C', 'V', 'M', 'E'],
            ['M', 'I', 'E', 'A', 'N'],
            ['I', 'W', 'F', 'D', 'A'],
            ['K', 'O', 'P', 'W', 'J'],
            ['E', 'Z', 'C', 'V', 'B']
        ];

        let foundNames = new Set();
        let selectedCells = [];

        // Generate puzzle grid
        const puzzleContainer = document.getElementById('puzzle');
        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 5; j++) {
                const cell = document.createElement('div');
                cell.className = 'cell';
                cell.textContent = puzzleArray[i][j];
                cell.dataset.row = i;
                cell.dataset.col = j;
                cell.addEventListener('click', selectCell);
                puzzleContainer.appendChild(cell);
            }
        }

        function selectCell(event) {
            const cell = event.target;
            if (selectedCells.includes(cell)) {
                cell.style.backgroundColor = ''; // Deselect
                selectedCells = selectedCells.filter(c => c !== cell);
            } else {
                cell.style.backgroundColor = 'lightblue'; // Select
                selectedCells.push(cell);
            }
        }

        function checkPuzzle() {
            const selectedLetters = selectedCells.map(cell => cell.textContent).join('');
            
            // Reverse strings to allow for "JANE" (reversed: "ENAJ")
            const reversedJane = "ENAJ";
            const reversedMike = "EKIM";
            
            const foundJane = selectedLetters === "JANE" || selectedLetters === reversedJane;
            const foundMike = selectedLetters === "MIKE" || selectedLetters === reversedMike;
            
            if (foundJane) {
                foundNames.add("JANE");
                document.getElementById('message').textContent = `You found JANE, ${username}!`;
            }
        
            if (foundMike) {
                foundNames.add("MIKE");
                document.getElementById('message').textContent = `You found MIKE, ${username}!`;
            }
        
            // Check if both names are found
            if (foundNames.has("JANE") && foundNames.has("MIKE")) {
                document.getElementById('message').textContent = `You found both names, ${username}! Moving to the next challenge...`;
        
                // Hide puzzle and submit button
                document.getElementById('puzzle').style.display = 'none';
                document.getElementById('2cb1').style.display = 'none';
        
                // Redirect to Challenge 3
                setTimeout(() => {
                    window.location.href = 'challenge3.html';
                }, 3000); // Delay for user to read the message
            } else if (!foundJane && !foundMike) {
                document.getElementById('message').textContent = `Try again, ${username}!`;
                resetSelection();
            }
        }
        
        
        // Helper function to reset selected cells
        function resetSelection() {
            selectedCells.forEach(cell => {
                cell.style.backgroundColor = ''; // Reset cell color
            });
            selectedCells = []; // Clear the selection
        }
        

        function resetSelection() {
            selectedCells.forEach(cell => (cell.style.backgroundColor = ''));
            selectedCells = [];
        }

        const submitButton = document.getElementById('2cb1');
        if (submitButton) {
            submitButton.onclick = () => checkPuzzle();
        }
    }

    // CHALLENGE 3: Cipher Puzzle
    if (document.getElementById('cipherMessage')) {
        document.getElementById('username').textContent = username;

        // Encrypted message
        const encryptedMessage = 'VQR-TKIJV EXWWRQ'; // 'top-right' (shift 2) and 'button' (shift 3)
        document.getElementById('cipherMessage').textContent = `Encrypted Message: ${encryptedMessage}`;

        // Submit button logic
        document.getElementById('solveCipher').onclick = () => {
            const shift2Input = document.getElementById('shift2Input').value;
            const shift3Input = document.getElementById('shift3Input').value;

            if (shift2Input === 'TOP-RIGHT' && shift3Input === 'BUTTON') {
                alert(`Well done, ${username}! but slightly below, yeah?`);
                
            } else {
                alert(`Incorrect decryption, ${username}. Try again!`);
            }
        };

        //nextphase button logic
        document.getElementById('nextphase').onclick = () => {
            alert(`Ok ${username}! The first 3 challenges are done! Shall we get to the next phase? Dont worry! you are 35% completed!`)
            window.location.href='challenge4.html'
        }
    }

    //CHALLENGE 4: 
    //displaying the input boxes
    document.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            document.getElementById('2st').style.display = 'block'
        }
    });
    if((document.getElementById('north').value == 'beijing') && (document.getElementById('south').value == 'taiyuan') && (document.getElementById('east').value == 'shanhaiguan') && (document.getElementById('west').value == 'danhuang')) {
        alert(`That's great ${username}`)
    }else {
        alert('Womp Womp, cant even guess a city...')
    }
});
