const e = React.createElement; 

class ImgInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            haspicture: 'no',
            inputfile: 'none'
        }
        this.ManageUpload = this.ManageUpload.bind(this);
        this.ManageDrops = this.ManageDrops.bind(this);
        this.ManageSubmit = this.ManageSubmit.bind(this);
    }

    ManageSubmit() {
        let width = document.getElementById("ImgWidth").value
        let height = document.getElementById("ImgHeight").value
        let addrlist = this.state.inputfile.path;
        console.log(addrlist)
        let ext = document.getElementById("ImgType").value
        let saveaddr = document.getElementById("ImgSave").value;
        window.api.send("processImages", {width, height, addrlist, ext, saveaddr})
    }
    ManageDrops(e) {
        e.preventDefault()
        console.log(e)
        let file = e.target.files[0]
        console.log(e.target)
        if (file.type.match("image")) {
            this.setState(() => ({inputfile: file, haspicture: 'yes'}))
        }
        
    }

    ManageUpload(e) {
        let file = e.target.files[0]
        console.log(file)
        if (file.type.match("image")) {
            this.setState(() => ({inputfile: file, haspicture: 'yes'}))
        }
    }
    render() {
        let accumulator = []
        accumulator.push(<div>
            <div className="image_title"> Image Processing </div> 
            <p></p></div>)
        if (this.state.haspicture == 'yes') {
            accumulator.push( <div className='input-div'>
            <div className="image">
            <img className="bordered_image" src={URL.createObjectURL(this.state.inputfile)} alt="image"/> </div> </div>)
        } else {
            accumulator.push(<div className="input-div" onDrop={this.ManageDrops}> 
            <p className="ddphoto">Drag & drop photos here or <strong>Browse</strong></p>
            <input type="file" id="uploader" className="file_upload" multiple accept="image/jpeg, image/png, image/jpg" onChange={this.ManageUpload}/>
        </div>)
        }
        // Options 
        accumulator.push(
            <div className="InputSpecs">
                
                Width
                <input id="ImgWidth" className="ImgInput"/>
                Height
                <input id="ImgHeight"className="ImgInput"/>
                Extension 
                <input id="ImgType" className="ImgInput"/>
                Save Folder
                <input id="ImgSave" className="ImgInput"/>

                <p></p>
                <button onClick={this.ManageSubmit} className="saveButton">Convert and Save</button>
            </div>

        )

        return(
            
                accumulator
            
            
        )
    }
    
}

function ImgProcessor() {
    return(
        <div>
            <ImgInput> </ImgInput>


        </div>
    )
}