function RosterService(endpointUri, callback) {

    var playersData = [];

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

        var url = "http://bcw-getter.herokuapp.com/?url=";
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
    loadPlayersData(); //call the function above every time we create a new service

    this.search = function (searchQuery, cb) {
        var target
        for (var i = 0; i < playersData.length; i++) {
            var obj = Object.keys(playersData[i])
            for (var j = 0; j < obj.length; j++) {
                // console.log(playersData[i][obj[j]])
                if (playersData[i][obj[j]] == searchQuery) {
                    target = playersData[i][obj[j]]
                    cb()
                }
            }
        }
        console.log(target)
    }

}