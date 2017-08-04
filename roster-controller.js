function RosterController() {

    var rosterService = new RosterService(apiUrl, ready)
    var loading = true; //Start the spinner
    var apiUrl = "http://api.cbssports.com/fantasy/players/list?version=3.0&SPORT=football&response_format=json";






    function ready() {
        loading = false; //stop the spinner

        //Now that all of our player data is back we can safely setup our bindings for the rest of the view.
        // draw()
    }

    function drawList(results) {
        var template = ''

        for (var i = 0; i < results.length; i++) {
            var player = results[i]
            template += `
                <tr>
                    <td>${player.fullname}<button onclick="app.controllers.rosterController.addPlayer(${player.id})" type="button" class="btn btn-primary">Add Player</button></td>
                </tr>
                `
        }
        document.getElementById('search-results').innerHTML = template
    }

    function drawRoster(roster) {
        var template = ''
        for (var i = 0; i < roster.length; i++) {
            var obj = roster[i]
            template += `
                <div class="player-roster">
                    <div class="player-card">
                        <img src="${obj[0].photo}" alt="picture of ${obj[0].fullname}">
                        <h3>${obj[0].fullname}</h3>
                        <h4>${obj[0].position}</h4>
                        <h4>${obj[0]['pro_team']}</h4>
                    </div>
                </div>
            
            `
        }
        document.getElementById('draw-search-query').innerHTML = template
    }

    this.addPlayer = function (id) {
        rosterService.addPlayer(id, drawRoster)
    }




    // $('some-button').on('click', function () {
    //     var teamSF = rosterService.getPlayersByTeam("SF");
    // })

    this.search = function (e) {
        console.log(e.target.name.value)
        e.preventDefault()
        var searchQuery = e.target.name.value
        rosterService.search(searchQuery, drawList)
    }
}