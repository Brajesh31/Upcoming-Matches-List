document.addEventListener('DOMContentLoaded', () => {
    const matchesContainer = document.getElementById('matches-container');
    const loadingElement = document.getElementById('loading');
    const errorElement = document.getElementById('error');


    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-host': 'free-api-live-football-data.p.rapidapi.com',
            'x-rapidapi-key': 'd6ecb42211msh6c8f9f47a25003dp17ae76jsn7fb3935d35a3'
        }
    };

    fetchUpcomingMatches();

    async function fetchUpcomingMatches() {
        try {
            const mockMatches = generateMockMatches();
            displayMatches(mockMatches);
        } catch (error) {
            showError('Failed to fetch upcoming matches. Please try again later.');
            console.error('Error fetching matches:', error);
        } finally {
            loadingElement.style.display = 'none';
        }
    }

    function displayMatches(matches) {
        if (!matches || matches.length === 0) {
            showError('No upcoming matches found.');
            return;
        }

        matches.forEach(match => {
            const matchCard = document.createElement('div');
            matchCard.className = 'match-card';

            const dateOptions = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
            const matchDate = new Date(match.date);
            const formattedDate = matchDate.toLocaleDateString('en-US', dateOptions);
            const formattedTime = matchDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

            matchCard.innerHTML = `
                <div class="match-header">
                    <div class="match-date">${formattedDate}</div>
                    <div class="match-time">${formattedTime}</div>
                </div>
                <div class="match-teams">
                    <div class="team">
                        <img src="${match.homeTeam.logo}" alt="${match.homeTeam.name}" class="team-logo">
                        <div class="team-name">${match.homeTeam.name}</div>
                    </div>
                    <div class="team">
                        <img src="${match.awayTeam.logo}" alt="${match.awayTeam.name}" class="team-logo">
                        <div class="team-name">${match.awayTeam.name}</div>
                    </div>
                </div>
                <div class="match-venue">${match.venue}</div>
            `;

            matchesContainer.appendChild(matchCard);
        });
    }

    function showError(message) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }

    function generateMockMatches() {
        const teams = [
            { name: 'Manchester United', logo: 'https://upload.wikimedia.org/wikipedia/en/7/7a/Manchester_United_FC_crest.svg' },
            { name: 'Liverpool', logo: 'https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg' },
            { name: 'Chelsea', logo: 'https://upload.wikimedia.org/wikipedia/en/c/cc/Chelsea_FC.svg' },
            { name: 'Arsenal', logo: 'https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg' },
            { name: 'Manchester City', logo: 'https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg' },
            { name: 'Tottenham Hotspur', logo: 'https://upload.wikimedia.org/wikipedia/en/b/b4/Tottenham_Hotspur.svg' },
            { name: 'Leicester City', logo: 'https://upload.wikimedia.org/wikipedia/en/2/2d/Leicester_City_crest.svg' },
            { name: 'Everton', logo: 'https://upload.wikimedia.org/wikipedia/en/7/7c/Everton_FC_logo.svg' },
            { name: 'West Ham United', logo: 'https://upload.wikimedia.org/wikipedia/en/c/c2/West_Ham_United_FC_logo.svg' },
            { name: 'Newcastle United', logo: 'https://upload.wikimedia.org/wikipedia/en/5/56/Newcastle_United_Logo.svg' },
            { name: 'Aston Villa', logo: 'https://upload.wikimedia.org/wikipedia/en/f/f9/Aston_Villa_FC_crest_%282016%29.svg' },
            { name: 'Southampton', logo: 'https://upload.wikimedia.org/wikipedia/en/c/c9/FC_Southampton.svg' },
            { name: 'Crystal Palace', logo: 'https://upload.wikimedia.org/wikipedia/en/0/0c/Crystal_Palace_FC_logo.svg' },
            { name: 'Brighton', logo: 'https://upload.wikimedia.org/wikipedia/en/f/fd/Brighton_%26_Hove_Albion_logo.svg' },
        ];

        const venues = [
            'Old Trafford, Manchester',
            'Anfield, Liverpool',
            'Stamford Bridge, London',
            'Emirates Stadium, London',
            'Etihad Stadium, Manchester',
            'Tottenham Hotspur Stadium, London',
            'King Power Stadium, Leicester',
            'Goodison Park, Liverpool',
            'London Stadium, London',
            'St James\' Park, Newcastle',
            'Villa Park, Birmingham',
            'St Mary\'s Stadium, Southampton',
            'Selhurst Park, London',
            'Amex Stadium, Brighton',
        ];

        const matches = [];
        const today = new Date();

        for (let i = 0; i < 10; i++) {
            
            const matchDate = new Date(today);
            matchDate.setDate(today.getDate() + Math.floor(Math.random() * 14) + 1);
            
          
            matchDate.setHours(12 + Math.floor(Math.random() * 9), Math.floor(Math.random() * 6) * 10, 0);

           
            let homeTeamIndex = Math.floor(Math.random() * teams.length);
            let awayTeamIndex;
            do {
                awayTeamIndex = Math.floor(Math.random() * teams.length);
            } while (awayTeamIndex === homeTeamIndex);

            const match = {
                id: i + 1,
                date: matchDate.toISOString(),
                homeTeam: teams[homeTeamIndex],
                awayTeam: teams[awayTeamIndex],
                venue: venues[homeTeamIndex],
                competition: 'Premier League'
            };

            matches.push(match);
        }

        return matches;
    }
}); 