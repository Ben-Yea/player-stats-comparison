function loadGameData(gameName) {
    const gameFileMap = {
        "Call of Duty": "data/callOfDuty.json",
        "League of Legends": "data/leagueOfLegends.json",
        "Valorant": "data/valorant.json",
        "Fortnite": "data/fortnite.json"
    };

    fetch(gameFileMap[gameName])
        .then(response => response.json())
        .then(data => {
            console.log(data);
            populatePlayerSelects(data);
        })
        .catch(error => console.error('Error loading JSON:', error));
}

function populatePlayerSelects(gameData) {
    const player1Select = document.getElementById('player1-select');
    const player2Select = document.getElementById('player2-select');

    player1Select.innerHTML = '';
    player2Select.innerHTML = '';

    Object.keys(gameData).forEach(player => {
        const option1 = document.createElement('option');
        option1.value = player;
        option1.textContent = player;
        player1Select.appendChild(option1);

        const option2 = document.createElement('option');
        option2.value = player;
        option2.textContent = player;
        player2Select.appendChild(option2);
    });
}

function populateGameSelect() {
    const gameSelects = document.querySelectorAll('#game-select');
    const games = ["Call of Duty", "League of Legends", "Valorant", "Fortnite"];

    gameSelects.forEach(select => {
        select.innerHTML = '<option value="" disabled selected>Select a game</option>';
        games.forEach(game => {
            const option = document.createElement('option');
            option.value = game;
            option.textContent = game;
            select.appendChild(option);
        });
    });
}

function compareStats() {
    const gameName = document.getElementById('game-select').value;
    const player1 = document.getElementById('player1-select').value;
    const player2 = document.getElementById('player2-select').value;

    if (gameName && player1 && player2) {
        fetch(`data/${gameName.toLowerCase().replace(/ /g, '')}.json`)
            .then(response => response.json())
            .then(gameData => {
                const player1Stats = gameData[player1];
                const player2Stats = gameData[player2];

                const resultDiv = document.getElementById('comparison-result');
                resultDiv.innerHTML = `<h2>${player1} vs ${player2} in ${gameName}</h2>`;

                const comparisonContainer = document.createElement('div');
                comparisonContainer.className = 'comparison-container';

                const player1Container = document.createElement('div');
                player1Container.className = 'player-stats';
                player1Container.innerHTML = `<h3>${player1}</h3>`;

                const player2Container = document.createElement('div');
                player2Container.className = 'player-stats';
                player2Container.innerHTML = `<h3>${player2}</h3>`;

                Object.keys(player1Stats).forEach(stat => {
                    const statRow = document.createElement('div');
                    statRow.className = 'stat-row';
                    statRow.innerHTML = `<span>${stat}: ${player1Stats[stat]}</span>`;
                    player1Container.appendChild(statRow);
                });

                Object.keys(player2Stats).forEach(stat => {
                    const statRow = document.createElement('div');
                    statRow.className = 'stat-row';
                    statRow.innerHTML = `<span>${stat}: ${player2Stats[stat]}</span>`;
                    player2Container.appendChild(statRow);
                });

                comparisonContainer.appendChild(player1Container);
                comparisonContainer.appendChild(player2Container);

                resultDiv.appendChild(comparisonContainer);
            })
            .catch(error => console.error('Error loading JSON:', error));
    }
}

document.addEventListener('DOMContentLoaded', () => {
    populateGameSelect();
    document.getElementById('game-select').addEventListener('change', () => {
        const gameName = document.getElementById('game-select').value;
        loadGameData(gameName);
    });
});
