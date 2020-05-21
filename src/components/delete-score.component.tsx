import * as React from 'react';
import Axios, {AxiosResponse, AxiosError} from 'axios';

interface IProps {
    score: any
}

export default class DeleteScore extends React.Component <IProps> {

    public onDeleteScore(e: any){
      e.preventDefault();
      Axios.delete('http://localhost:4000/scores/delete/' + this.props.score)
        .then(res => console.log(res.data));
      this.props.unmount();
    }

    render() {
        return (
            <span>
              <input type="button" onClick={this.onDeleteScore} value="Delete Score" className="btn btn-danger" />
            </span>
        )
    }
}
