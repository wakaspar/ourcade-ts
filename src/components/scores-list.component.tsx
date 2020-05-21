import * as React from 'react';
import { Link } from 'react-router-dom';
import Axios, {AxiosResponse, AxiosError} from 'axios';
import { Pencil } from 'react-bootstrap-icons';

interface IProps {
    score: { 
        _id: number
        score_value: number;
        score_game: string;
        score_player_num: number;
        score_multiplayer: boolean; 
    }
}

interface IState {
    scores: any[]
}

// 'Score' functional component definition
const Score :React.FC <IProps> = (props: IProps) => (
  <tr>
    <td className={props.score.score_multiplayer ? 'multiplayer' : ''}>{props.score.score_value}</td>
    <td className={props.score.score_multiplayer ? 'multiplayer' : ''}>{props.score.score_game}</td>
    <td className={props.score.score_multiplayer ? 'multiplayer' : ''}>{props.score.score_player_num}</td>
    <td>
      <Link to={"/edit/" + props.score._id}>
        <Pencil color="black" size={25} />
      </Link>
    </td>
  </tr>
)

export default class ScoresList extends React.Component <IProps, IState> {

    // Retrieves list of scores from database
    public componentDidMount(): void {
      Axios.get('http://localhost:4000/scores/')
        .then((respsonse: { data: any; }) => {
          this.setState({ scores: respsonse.data });
        })
        .catch(function(error){
          console.log(error);
        })
    }
    // Re-renders list of scores on create/udpate
    public componentDidUpdate(): void {
      Axios.get('http://localhost:4000/scores/')
        .then((respsonse: { data: any; }) => {
          this.setState({ scores: respsonse.data });
        })
        .catch(function(error: any){
          console.log(error);
        })
    }

    // Maps data from this.state & returns instance of 'Score' functional component
    public scoreList(){
      return this.state.scores.map(function(currentScore, i){
        return <Score score={currentScore} key={i} />
      })
    }

    // renders Scoreboard table
    public render() {
        return (
            <div>
                <h3>Scoreboard</h3>
                <table className="table table-striped" style={{ marginTop: 20 }}>
                  <thead>
                    <tr>
                      <th>Score Value</th>
                      <th>Game</th>
                      <th>P</th>
                      <th>Edit</th>
                    </tr>
                  </thead>
                  <tbody>
                    { this.scoreList() }
                  </tbody>
                </table>
            </div>
        )
    }
}
