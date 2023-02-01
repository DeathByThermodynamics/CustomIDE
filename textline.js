
'use strict';
const domContainer = document.querySelector('#textline_container');
const root = ReactDOM.createRoot(domContainer);
const isEmpty = str => !str.trim().length;
const e = React.createElement; 

let numOfLines = 0;
  
class LikeButton extends React.Component {
    constructor(props) {
      super(props);
      this.state = { liked: false };
    }
  
    render() {
      if (this.state.liked) {
        return 'You liked this.';
      }
  
      return e(
        'button',
        { onClick: () => this.setState({ liked: true }) },
        'Like'
      );
    }

  }

class CodeLine extends React.Component {
    constructor(props) {
        super(props);
        this.state = {num: props.number}
    }

    render() {
        ///numOfLines += 1;
        let string = this.state.num.toString()
        if (this.state.num.toString().trim() == "0".trim()) {
            string = "'"
        }
        let idstring = "textArea" + string
        return ( 
            <div className="codeline"> 
               <div className="numLine"><center>{string}</center></div> <input id={idstring} onKeyDown={Lines.addLine}></input>
            </div>
        )
    }

    
} 

class Lines extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            numLines: 5,
            selectedLine: 1,
            docName: props.textName
        }
        this.manageLines = this.manageLines.bind(this);
        this.updateClick = this.updateClick.bind(this);
        this.shiftLinesUp = this.shiftLinesUp.bind(this);
    }
    shiftLinesUp(lineNum) {
        let currentLine = document.getElementById(this.state.docName + (lineNum).toString())
        let linevalue = currentLine.value
        currentLine.value = linevalue.slice(0, currentLine.selectionStart)
        let origvalue = linevalue.slice(currentLine.selectionStart)
        
        for (let i = lineNum; i < this.state.numLines-2; i++) {
            let nextvalue = "";
            //console.log(document.getElementById(this.state.docName + (i+1).toString()));
            if (!(document.getElementById(this.state.docName + (i+1).toString()).value === null)) {
                nextvalue = document.getElementById(this.state.docName + (i+1).toString()).value  
            }
            document.getElementById(this.state.docName + (i+1).toString()).value = origvalue
            origvalue = nextvalue;


        }
    }
    shiftLinesDown(lineNum) {
        let returnvalue = -1
        if (lineNum != 0) {
            let val = document.getElementById(this.state.docName + (lineNum+1).toString()).value
            returnvalue = document.getElementById(this.state.docName + (lineNum).toString()).value.length;
            document.getElementById(this.state.docName + (lineNum).toString()).value += val
            
        }
        
        for (let i = lineNum+1; i < this.state.numLines-1; i++) {
            //console.log(document.getElementById(this.state.docName + (i).toString()));
            if (!(document.getElementById(this.state.docName + (i+1).toString()).value === null)) {
                document.getElementById(this.state.docName + (i).toString()).value = document.getElementById(this.state.docName + (i+1).toString()).value
            }


        }

        return returnvalue
    }
    manageLines(event) {
        let action = false;
        if (event.key === 'Enter') {
            //this.state.numLines += 1;
            this.setState((state) => ({numLines: state.numLines + 1}));
            this.state.selectedLine += 1
            //ReRender();
            this.shiftLinesUp(this.state.selectedLine-1);

            action = true;
            let elem = document.getElementById(this.state.docName + this.state.selectedLine.toString())
            elem.focus()    
            elem.setSelectionRange(0, 0)
        }
        else if (event.key === 'Backspace') {
            
            if (event.target.selectionStart == 0 && this.state.numLines != 2) {
                event.preventDefault()
                if (this.state.selectedLine != 0) {
                    this.state.selectedLine -= 1
                }
                let selection = this.shiftLinesDown(this.state.selectedLine)
                this.setState((state) => ({numLines: state.numLines - 1}));
                
                //ReRender();
                

                let elem = document.getElementById(this.state.docName + this.state.selectedLine.toString())
                elem.focus()   
                elem.setSelectionRange(selection, selection);
            }

            
            action = true;
            
        }
        else if (event.key === 'Tab') {
            event.preventDefault()
            let elem = document.getElementById(this.state.docName + this.state.selectedLine.toString())
            elem.value += "\t"
        }
        else if (event.key === 'ArrowDown') {
            console.log(event.target.selectionStart);
            if (this.state.selectedLine < this.state.numLines) {
                this.state.selectedLine += 1;
            }
            let elem = document.getElementById(this.state.docName + this.state.selectedLine.toString())
            elem.focus()    
            elem.setSelectionRange(0, 0)
            action = true;
        }
        else if (event.key === 'ArrowUp') {
            console.log(event.target.selectionStart);
            if (this.state.selectedLine > 0) {
                this.state.selectedLine -= 1;
            }
            let elem = document.getElementById(this.state.docName + this.state.selectedLine.toString())
            elem.focus()    
            elem.setSelectionRange(0, 0)
            action = true;
        } else if (event.key === '{') {
            event.preventDefault()
            let elem = document.getElementById(this.state.docName + this.state.selectedLine.toString())
            elem.value += "{}"
            elem.setSelectionRange(document.getElementById(this.state.docName + this.state.selectedLine.toString()).value.length-1, document.getElementById(this.state.docName + this.state.selectedLine.toString()).value.length-1)
        }
        if (action) {
            //let elem = document.getElementById(this.state.docName + this.state.selectedLine.toString())
            //elem.focus()    
            //elem.setSelectionRange(0, 0)
        }
        
    }
    updateClick(event) {
        console.log(event.target.id);
        let length = this.state.docName.length
        this.state.selectedLine = parseInt(event.target.id.slice(length))
        //console.log(event.target.id.slice(length));
    }
    render() {
        const increments = []
        for (let i = 0; i < this.state.numLines; i++) {
            //increments.push(<CodeLine number={i} key = {i} ></CodeLine>)
            let stringer = i.toString()

            let idstring = this.state.docName + stringer // placeholder, use the name of the text file in the future
            increments.push ( 
                <div className="codeline"> 
                    <div className="numLine"><center>{stringer}</center></div> <input id={idstring} onKeyDown={this.manageLines}  onClick={this.updateClick} defaultValue=""></input>
                </div>
            )
        }
        return increments;
    }
    
}

function CodeLineHelper(event) {
    if (event.key === "Enter") {

    }
}

function ReRender() {
    root.render(<Lines textName="textLine"></Lines>);
}

root.render(<Lines textName="textLine"></Lines>);
//export default Lines;









  
  