function RosterService(endpointUri, callback) {

    var rosterService = this
    var playersData = []
    var playerRoster = JSON.parse(localStorage.getItem('my-roster')) || []

    this.getPlayersByTeam = function (teamName) {
        playersData.filter(function (player) {
            if (player.team == teamName) {
                return true;
            }
        });
    }

    this.getPlayersByPosition = function (position) {
        playersData.filter(function (player) {
            if (player.position == position) {
                return true;
            }
        });
    }

    function loadPlayersData() {

        //Lets check the localstorage for the data before making the call.
        //Ideally if a user has already used your site 
        //we can cut down on the load time by saving and pulling from localstorage 

        var localData = localStorage.getItem('playersData');
        if (localData) {
            playersData = JSON.parse(localData);
            return callback();
            //return will short-circuit the loadPlayersData function
            //this will prevent the code below from ever executing
        }

        var url = "//bcw-getter.herokuapp.com/?url=";
        var endpointUri = "http://api.cbssports.com/fantasy/players/list?version=3.0&SPORT=football&response_format=json";
        var apiUrl = url + encodeURIComponent(endpointUri);

        $.getJSON(apiUrl, function (data) {
            playersData = data.body.players;
            console.log('Player Data Ready')
            console.log('Writing Player Data to localStorage')
            localStorage.setItem('playersData', JSON.stringify(playersData))
            console.log('Finished Writing Player Data to localStorage')
            callback()
        });
    }

    function saveRoster(){
        localStorage.setItem('my-roster', JSON.stringify(playerRoster))
    }

    this.search = function (searchQuery, cb) {
        var results = []
        for (var i = 0; i < playersData.length; i++) {
            var obj = Object.keys(playersData[i])
            for (var j = 0; j < obj.length; j++) {
                if (playersData[i][obj[j]] == searchQuery) {
                    results.push(playersData[i])

                }
            }
        }
        cb(results)
        return results
    }

    this.addPlayer = function (id, cb) {
        var player = rosterService.search(id, addToRoster)
        var roster = JSON.parse(JSON.stringify(playerRoster))
        cb(roster)
    }

    this.remove = function (id, cb) {
        for (var i = 0; i < playerRoster.length; i++) {
            if (playerRoster[i][0].id == id) {
                playerRoster.splice(i, 1)
            }
        }
        saveRoster()
        var roster = JSON.parse(JSON.stringify(playerRoster))
        cb(roster)
    }

    function addToRoster(results) {
        for (var i = 0; i < playerRoster.length; i++) {
            if ((playerRoster[i][0].id == results[0].id) || playerRoster.length > 12 || (playerRoster[i][0].position == results[0].position)) {
                return
            }
        }
        playerRoster.push(results)
        saveRoster()
    }

    this.getRoster = function() {
        var roster = JSON.parse(JSON.stringify(playerRoster))
        return roster
    }


    var filterdByTeam = playersData.filter(function (player) {
        // console.log(player)
        if (player['pro_team'] == "SF") {
            return true
        }
    })


    loadPlayersData(); //call the function above every time we create a new service
}