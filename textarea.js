'use strict';

const domContainer = document.querySelector('#text_container');

const isEmpty = str => !str.trim().length;
const e = React.createElement; 

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

let docNameMaster;
let reference;

class Lines extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            numLines: 2,
            selectedLine: 0,
            docName: props.textName,
            directory: "",
        }
        this.manageLines = this.manageLines.bind(this);
        this.updateClick = this.updateClick.bind(this);
        this.setAddr = this.setAddr.bind(this);
        this.getAddr = this.getAddr.bind(this);
        docNameMaster = props.textName
        reference = this;
    }

    setAddr(data) {
        //console.log(data)
        this.setState(()=>({directory: data.toString()}))
        this.state.directory = data.toString();
        document.getElementById("document-title").textContent = data.toString();
        //console.log(this.state.directory)
    }

    getDoc() {
        return document.getElementById(this.state.docName).value;
    }

    getAddr() {
        return this.state.directory;
    }

    setDoc(data) {
        let lines = (data.match(/\n/g) || []).length;
        //console.log(lines)
        this.setState(() => ({numLines: lines+3, selectedLine: 0}))
        document.getElementById(this.state.docName).value = data;
        document.getElementById("main_container").scrollTop = 0;
    }

    manageLines(event) {
        let action = false;
        let elem = document.getElementById(this.state.docName)
        if (event.key === 'Enter') {
            //this.state.numLines += 1;
            this.setState((state) => ({numLines: state.numLines + 1, selectedLine: state.selectedLine + 1}));
            //console.log(elem.value.slice(elem.selectionStart-1, elem.selectionEnd))
            if ((elem.value.slice(elem.selectionStart-1, elem.selectionStart) == "{") && (elem.value.slice(elem.selectionStart, elem.selectionStart+1) == "}")) {
                let val = elem.selectionStart
                //elem.value += "\t"
                //ReRender();
                event.preventDefault()
                elem.value = elem.value.slice(0, elem.selectionStart) + "\n\t\n" + elem.value.slice(elem.selectionStart)
                elem.setSelectionRange(val+2, val+2)
                this.setState((state) => ({numLines: state.numLines + 1}));
                
                
            }

        }
        else if (event.key === 'Backspace') {
            elem.selectionStart -= 1;
            //console.log(elem.selectionEnd)
            //console.log(elem.selectionStart)
            //console.log(elem.value.slice(elem.selectionStart, elem.selectionEnd))
            //console.log(elem.value)
            let cutvalue = (elem.value.slice(elem.selectionStart, elem.selectionEnd))
            if (cutvalue == "\n") {
                this.setState((state) => ({numLines: state.numLines - 1,  selectedLine: state.selectedLine - 1}));
                
                //ReRender();
                

                
                 
            } else if (cutvalue.includes("\n") ) { 
                let lines = (cutvalue.match(/\n/g) || []).length;
                this.setState((state) => ({numLines: state.numLines - lines,  selectedLine: Math.min(state.selectedLine-1, state.numLines-lines-3)})); // okay
            }

            
            action = true;
            
        }
        else if (event.key === 'Tab') {
            let val = elem.selectionStart
            event.preventDefault()
            elem.value = elem.value.slice(0, elem.selectionStart) + "\t" + elem.value.slice(elem.selectionStart)
            elem.setSelectionRange(val+1, val+1)
        }
        else if (event.key === 'ArrowDown') {
            //console.log(event.target.selectionStart);
            if (this.state.selectedLine < this.state.numLines - 2) {
                this.setState((state) => ({selectedLine: state.selectedLine + 1}));
            }


        }
        else if (event.key === 'ArrowUp') {
            //console.log(event.target.selectionStart);
            if (this.state.selectedLine > 0) {
                this.setState((state) => ({selectedLine: state.selectedLine - 1}));
            }


        } else if (event.key === '{') {
            
            if (elem.value.length == elem.selectionStart || elem.value.slice(elem.selectionStart, elem.selectionStart+1) == '\n') {
                let val = elem.selectionStart
                event.preventDefault()
                elem.value = elem.value.slice(0, val) + "{}" + elem.value.slice(val)
                elem.setSelectionRange(val+1, val+1)
                
        
            }
        }
        if (action) {
            //let elem = document.getElementById(this.state.docName + this.state.selectedLine.toString())
            //elem.focus()    
            //elem.setSelectionRange(0, 0)
        }
        
    }
    updateClick(event) {
        //console.log(event.target.id);

        let bounds = document.getElementById(this.state.docName).getBoundingClientRect()
        let y = event.clientY - bounds.top
        let line = Math.floor(y/20)

        if (line == this.state.numLines - 1) {
            line -= 1;
        }

        this.setState((state) => ({selectedLine: line}));


        //let length = this.state.docName.length
        //this.state.selectedLine = parseInt(event.target.id.slice(length))
        //let elem = document.getElementById(this.state.docName)
        //let textbox = elem.value;
        //let lines = (textbox.slice(0, elem.selectionStart).match(/\n/g) || []).length;
        //this.setState((state) => ({selectedLine: lines}));

        //console.log(event.target.id.slice(length));
    }
    render() {
        const increments = []
        let height = this.state.numLines * 20
        const specialstyle = {
            height: height.toString() + "px",
        }

        

        for (let i = 0; i < this.state.numLines; i++) {
            //increments.push(<CodeLine number={i} key = {i} ></CodeLine>)
            let stringer = i.toString()

            let idstring = this.state.docName + stringer 
            //console.log(stringer - this.state.selectedLine)
            if (stringer == 0 && stringer == this.state.selectedLine) {
                increments.push (
                    <div>  <div className="numLine" id="firstLine"><center>{stringer}</center>    </div>  <input id = "pretty"></input>  </div>
                )
            }
            else if (stringer == 0) {
                increments.push (
                    <div className="numLine" id="firstLine"><center>{stringer}</center>    </div> 
                )
            }
            else if (stringer == this.state.selectedLine) {
                increments.push (
                    <div> <div className="numLine"><center>{stringer}</center>    </div> 
                        <input id = "pretty"></input> 
                    </div>
                )
            } else {
                increments.push (
                    <div className="numLine"><center>{stringer}</center>    </div> 
                )
            }
            
        }
        
        return (
            <div id="main_container">
                
                <div id="column2">
                    {increments.map((inc) => (
                        <div className='codeline'>
                            {inc}
                        </div>
                    ))}
                </div>
                <div id="column1">
                    <textarea spellCheck="false" style={specialstyle}className="main_textarea" id={this.state.docName} onKeyDown={this.manageLines}  onClick={this.updateClick}> </textarea>
                </div>
            </div>
            
        );
    }
    
}

function CodeLineHelper(event) {
    if (event.key === "Enter") {

    }
}



function ReRender() {
    const root = ReactDOM.createRoot(domContainer);
    root.render(<Lines textName="textLine"></Lines>);
}

window.api.receive("receiveFileOpen", loadIntoFile)

function loadIntoFile(readfile) {
    //console.log(docNameMaster)
    //console.log(reference)
    //console.log(readfile.directory);
    reference.setDoc(readfile.data);

    reference.setAddr(readfile.directory);
    //console.log(reference.getAddr())
    // BLESS EVERYTHING
    //console.log(event)
    //console.log(data)
    //console.log("needy")
}

const textarea = React.createRef();

function sendData() {
    //console.log("ehwf")
    let sentData = reference.getDoc();
    let sentDirectory = reference.getAddr();
    window.api.send('saveFile', {sentDirectory, sentData})
}

function textarea_renderer(currentpage) {
    if (currentpage == 'text_editor') {
        const root = ReactDOM.createRoot(document.getElementById('text_container'));
        root.render(<Lines textName="textLine" ref={textarea}></Lines>);
    }
    
    
}

//export default Lines;Save
