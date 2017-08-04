function RosterController() {

    var rosterService = new RosterService(apiUrl, ready)
    var loading = true; //Start the spinner
    var apiUrl = "http://api.cbssports.com/fantasy/players/list?version=3.0&SPORT=football&response_format=json";






    function ready() {
        loading = false; //stop the spinner

        //Now that all of our player data is back we can safely setup our bindings for the rest of the view.
        // draw()
    }

    function drawList() {
        var template = ''
        template += `
                <div class="player-card">
                    <img src="http://s.nflcdn.com/static/content/public/image/fantasy/transparent/200x200/" alt="nfl placeholder imgage">
                    <h3>Name</h3>
                    <h4>Postition</h4>
                    <h4>Team</h4>
                </div>
                `
        document.getElementById('draw-serach-query').innerHTML = template
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