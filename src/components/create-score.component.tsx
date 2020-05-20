import * as React from 'react';
import Axios, {AxiosResponse, AxiosError} from 'axios';

interface IProps {}

interface IState {
    score_value :number
    score_game :string
    score_player_num :number
    score_multiplayer :boolean
}


export default class CreateScore extends React.Component <IState, IProps> {

    public state :IState = {
        score_value : 0,
        score_game : '',
        score_player_num: 1,
        score_multiplayer: false
    }

    // onChange methods
    public onChangeScoreValue(e :any) {
        this.setState({
            score_value: e.target.value
        });
    }
    public onChangeScoreGame(e :any) {
        this.setState({
            score_game: e.target.value
        });
    }
    public onChangeScorePlayerNum(e :any) {
        this.setState({
            score_player_num: e.target.value
        });
    }
    public onChangeScoreMultiplayer(e :any) {
        this.setState({
            score_multiplayer: e.target.value
        });
    }
    // form onSubmit method
    public onSubmit(e :any) {
          e.preventDefault();
          console.log('this.state : ', this.state);

          const newScore = {
            score_value: this.state.score_value,
            score_game: this.state.score_game,
            score_multiplayer: this.state.score_multiplayer,
            score_player_num: this.state.score_player_num
          };
          
          Axios.post('http://localhost:4000/scores/add', newScore)
            .then((response: { data: any; }) => console.log(response.data));

          this.setState({
              score_value: 0,
              score_game: '',
              score_multiplayer: false,
              score_player_num: 1
          })

        //   this.props.history.push('/');
    }
    // CreateScore render statement
    render() {
      return (
        <div style={{marginTop: 10}}>
          <h3>Create New Score</h3>
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
                <label>Score value: </label>
                <input  type="text"
                        className="form-control"
                        value={this.state.score_value}
                        onChange={this.onChangeScoreValue}
                        />
            </div>
            <div className="form-group">
                <label>Game played: </label>
                <input  type="text"
                        className="form-control"
                        value={this.state.score_game}
                        onChange={this.onChangeScoreGame}
                        />
            </div>
            <div className="form-group">
                <div className="form-check form-check-inline">
                    <input  className="form-check-input"
                            type="radio"
                            name="multiplayerOptionsTrue"
                            id="multiplayerTrue"
                            value="true"
                            checked={this.state.score_multiplayer === false}
                            onChange={this.onChangeScoreMultiplayer}
                            />
                    <label className="form-check-label">Multiplayer</label>
                </div>
                <div className="form-check form-check-inline">
                    <input  className="form-check-input"
                            type="radio"
                            name="multiplayerOptionsFalse"
                            id="multiplayerFalse"
                            value="false"
                            checked={this.state.score_multiplayer === false}
                            onChange={this.onChangeScoreMultiplayer}
                            />
                    <label className="form-check-label">Single player</label>
                </div>
             </div>
             <div className="form-group">
               <label>Player number: </label>
               <br/>
               <div className="form-check form-check-inline">
                   <input  className="form-check-input"
                           type="radio"
                           name="playerNumberOptions"
                           id="playerOne"
                           value="1"
                           checked={this.state.score_player_num === 1}
                           onChange={this.onChangeScorePlayerNum}
                           />
                   <label className="form-check-label">1</label>
               </div>
               <div className="form-check form-check-inline">
                   <input  className="form-check-input"
                           type="radio"
                           name="playerNumberOptions"
                           id="playerTwo"
                           value="2"
                           checked={this.state.score_player_num === 2}
                           onChange={this.onChangeScorePlayerNum}
                           />
                   <label className="form-check-label">2</label>
               </div>
               <div className="form-check form-check-inline">
                   <input  className="form-check-input"
                           type="radio"
                           name="playerNumberOptions"
                           id="playerThree"
                           value="3"
                           checked={this.state.score_player_num === 3}
                           onChange={this.onChangeScorePlayerNum}
                           />
                   <label className="form-check-label">3</label>
               </div>
               <div className="form-check form-check-inline">
                   <input  className="form-check-input"
                           type="radio"
                           name="playerNumberOptions"
                           id="playerFour"
                           value="4"
                           checked={this.state.score_player_num === 4}
                           onChange={this.onChangeScorePlayerNum}
                           />
                   <label className="form-check-label">4</label>
               </div>
            </div>

            <div className="form-group">
                <input type="submit" value="Create Score" className="btn btn-primary" />
            </div>
          </form>
        </div>
      )
    }
}
