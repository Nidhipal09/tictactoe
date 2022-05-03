import ReactDOM from 'react-dom'
import React from 'react'
import './index.css'

function getGameStatus(squares){   // global function
    let winCombs = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ]

    for(let i=0; i<winCombs.length; i++){
        let winComb = winCombs[i]
        let s1 = winComb[0]
        let s2 = winComb[1]
        let s3 = winComb[2]

        if(squares[s1]!=null && squares[s1]==squares[s2] && squares[s2]==squares[s3]){
            return squares[s1]
        }
    }

    return null
}

class Board extends React.Component{
    renderSquares(i){
        return(
            <button onClick={()=> this.handleSquareClick(i)}>{this.props.boxes[i] == null ? "" : this.props.boxes[i]}</button>
        )
    }

    handleSquareClick(i){
        this.props.handleForBoxClick(i)
    }

    render(){
        return(
            <div className='board'>
                <div className='title'>Tic Tac Toe</div>
                <div className='content'>
                    <div className='ttt'>
                        <div className='row'>
                            {this.renderSquares(0)}
                            {this.renderSquares(1)}
                            {this.renderSquares(2)}
                        </div>
                        <div className='row'>
                            {this.renderSquares(3)}
                            {this.renderSquares(4)}
                            {this.renderSquares(5)}
                        </div>
                        <div className='row'>
                            {this.renderSquares(6)}
                            {this.renderSquares(7)}
                            {this.renderSquares(8)}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

class Display extends React.Component{
    moveHistory(i){
          this.props.handlerForHistory(i)
    }

    render(){
        let gameTitle = "Game status: "

        if(this.props.gameStatus == null){
            gameTitle += "Next move for "+(this.props.stepNumber % 2 == 0 ? "X" : "O")
        } 
        else if(this.props.gameStatus == "Draw") gameTitle += "Draw"
        else gameTitle += this.props.gameStatus + " wins"

        let buttons = []
        for(let i=0; i<= this.props.stepNumber; i++){
            let button 

            if(i==0){
                button = (<button key={i} onClick={() => this.moveHistory(i)}>Go to start</button>)
            }
            else{
                button = (<button key={i} onClick={() => this.moveHistory(i)}>Go to step  #{i}</button>)
            }

            buttons.push(button)
        }

        return(
            <div className='display'>
                <div className='title'>{gameTitle}</div>
                <div className='content'>
                    <div className='historyTitle'>History</div>
                    <div className='history'>{buttons}</div>
                </div>
            </div>
        )
    }
}

class TTT extends React.Component{
    constructor(props){
        super(props)
        this.state={
            history : [[null,null,null,null,null,null,null,null,null]],
            stepNumber : 0,
            gameStatus : null // x wins, y wins, draw
        }
    }

    handleBoxClick(i){
      let oldHistory = this.state.history.slice()  
      let lastStateOfBoxes = oldHistory[oldHistory.length-1].slice()

      
      if(this.state.gameStatus != null){
        alert(this.state.gameStatus+" wins")
        return
      }
      if(lastStateOfBoxes[i] != null){
          alert("Box already marked.")
          return
      }

      lastStateOfBoxes[i] = this.state.stepNumber % 2 == 0 ? "X" : "O"

      oldHistory.push(lastStateOfBoxes)

      let currenGameStatus = getGameStatus(lastStateOfBoxes)

      if(currenGameStatus == null && this.state.stepNumber == 8){
          currenGameStatus = "Draw"
      }

      this.setState({
          history: oldHistory,
          stepNumber: this.state.stepNumber+1,
          gameStatus: currenGameStatus
      })
    }

    moveToStep(i){
        let ithHistory = this.state.history.slice(0,i+1)
        let currSquares = ithHistory[ithHistory.length-1]
        let newGameStatus = getGameStatus(currSquares)
        console.log(i)
        this.setState({
            history: ithHistory,
            stepNumber: i,
            gameStatus: newGameStatus
        })
        console.log(this.state.stepNumber)
    }

    render(){
        let boxes = this.state.history[this.state.history.length-1]
        return(
            <>
                <Board handleForBoxClick={(i) => this.handleBoxClick(i)} boxes={boxes}/>
                <Display stepNumber={this.state.stepNumber} gameStatus={this.state.gameStatus} handlerForHistory={(i) => this.moveToStep(i)}/>
            </>
        )
    }
}

ReactDOM.render(<TTT />, document.getElementById("root"))