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
    }

    ManageDrops(e) {
        e.preventDefault()
        console.log(e)
        let file = e.target.value
        if (file.type.match("image")) {
            this.setState(() => ({inputfile: file, haspicture: 'yes'}))
        }
        console.log("ano")
        
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
            <input type="file" id="uploader" className="file_upload" accept="image/jpeg, image/png, image/jpg" onChange={this.ManageUpload}/>
        </div>)
        }
        // Options 
        accumulator.push(
            <div>
                
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