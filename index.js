const app = new Vue({
  el: '#app',
  data: {
    firstName: '',
    lastName: '',
    playersList: [],
    displayFirstName: '',
    displayLastName: '',
    position: '',
    teamCity: '',
    teamName: '',
    jerseyNumber: ''
  },
  methods: {
    getPlayers: function() {
      axios.get('https://www.mysportsfeeds.com/api/feed/pull/nfl/2016-2017-regular/active_players.json',{auth: {
        username: 'canoc62',
        password: 'Tkdls215'
      }}).then((response) => {
        this.playersList = this.playersList.concat(response.data['activeplayers']['playerentry']);
        console.log(this.playersList);
      });
    },
    searchForPlayer: function() {
      copyFirstName = this.firstName.toLowerCase();
      copyLastName = this.lastName.toLowerCase();

      const list = this.playersList;
      let len = this.playersList.length;
      for (let i = 0; i < len; i += 1) {
        if (list[i].player.FirstName.toLowerCase() === copyFirstName && list[i].player.LastName.toLowerCase() === copyLastName) {
          console.log('HEELLLOOO');
          this.displayFirstName = list[i].player.FirstName;
          this.displayLastName = list[i].player.LastName;
          this.position = list[i].player.position;
          this.teamCity = list[i].team.City;
          this.teamName = list[i].team.Name;
          this.jerseyNumber = list[i].player.JerseyNumber;
        }
      }
    }
  }
});

app.getPlayers();