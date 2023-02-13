'use strict';
const domContainer = document.querySelector('#filelist');
const isEmpty = str => !str.trim().length;
const e = React.createElement; 

const test = [];
test.push("help.txt", "strat.txt", "2.txt", "ez.yml", "ichika.meta")

let testdir = "C:/users/alexh/hoi4example/"

function FileButton({name, dir, depth = 0, parents = "", parent}) {
    function handleOpenFile(e) {
        let sentDirectory = dir + parents + name
        if (!name.includes(".")) {
            let sentDepth = depth + 1
            window.api.send("sendDirectory", {sentDirectory, sentDepth})
        } else {
            
            window.api.send("sendFileOpen", sentDirectory)
        }
        
        
    } 
    return (
        <div> 
            <button className="FileButton" onClick={handleOpenFile} >
                {name}
            </button>
        </div>
    )
}



function setUpSpace(readfile) {
    //console.log(docNameMaster)
    //console.log(reference)
    console.log(readfile.directory);
    reference.setDoc(readfile.data);
    
    // BLESS EVERYTHING
    //console.log(event)
    //console.log(data)
    //console.log("needy")
}

class Listings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            directory: props.dir,
            items: props.lister,
            children: new Map(),
            depth: props.depth,
        }
        
        
        this.finishConstruct = this.finishConstruct.bind(this);
        window.api.receive("receiveDirectory", this.finishConstruct)
        let sentDirectory = props.dir
        let sentDepth = props.depth
        window.api.send("sendDirectory", {sentDirectory, sentDepth})
    }

    finishConstruct(folder) {
        //console.log("here")
        //console.log(folder)
        testdir = folder.directory + "/";
        if (folder.depth == 0) {
            document.getElementById("document-title").textContent = folder.directory;
            this.setState((state) => ({items: folder.files1}));
        } else {
            let filepath = folder.directory;
            let finaladdr = folder.directory.slice(this.state.directory.length)
            let verify = folder.directory.slice(0, this.state.directory.length)
            if (verify == this.state.directory) {
                if (Array.from(this.state.children.keys()).includes(finaladdr)) {
                    this.state.children.delete(finaladdr)
                    this.setState((state)=> ({directory: this.state.directory}))
                } else {
                    this.state.children.set(finaladdr, folder.files1)
                    this.setState((state)=> ({directory: this.state.directory}))
                }

                
                
            }

           
        }
        
    }

    render() {
        const entry = []
        //console.log(this.state.children)
        for (let i = 0; i < this.state.items.length; i++) {
            let namer = this.state.items[i]
            let lists = Array.from(this.state.children.keys())
            
            entry.push(<FileButton name={namer} dir={this.state.directory} parent={this}>  </FileButton>)
            if (lists.includes(namer)) {
                //console.log(this.state.children.get(namer))
                entry.push(
                    <div className="column_indent">
                        <div className="column_indent_helper"></div>
                        <div className="column_indent_2"> <Listings dir={this.state.directory + namer +"/"} lister={this.state.children.get(namer)} depth={this.state.depth + 1}></Listings> </div>
                    </div>
                
                )
                //console.log("PUSHED UNDER" + this.state.directory)
            }
            //console.log("pushed under" + this.state.directory)
        }
        return entry
    }  
}


function listing_renderer(currentpage) {
    if (currentpage == 'text_editor') {
        console.log(document.querySelector('#filelist'))
        const root = ReactDOM.createRoot(document.getElementById('filelist'));
        console.log(root)
        root.render(<Listings dir={testdir} lister={test} depth={0}></Listings>)
    } else {
        const root = ReactDOM.createRoot(document.getElementById('bin'));
        console.log(root)
        root.render(<Listings dir={testdir} lister={test} depth={0}></Listings>)
    }
    
}
