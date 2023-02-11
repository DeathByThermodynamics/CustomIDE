'use strict';


const domContainer = document.querySelector('#content');
const root = ReactDOM.createRoot(domContainer);
const e = React.createElement; 

let interface_reference;

class TextEditor extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            page: props.pager
        }
        
        this.changefunction = this.changefunction.bind(this);
        interface_reference = this;
    }

    changefunction(new_mode) {
        this.setState(()=>({page: new_mode}))
    }
    render() {
        ///numOfLines += 1;
        if (this.state.page == 'text_editor') {
            return ( 
                <div className="text_partition">
                    <div className="listing"> 
                        <div className="fixed_listing">
                            <div className="listing1" id="filelist">
    
                            </div>
                        </div>
                        
                    </div>
                    <div id="text_container" className="main_area"></div>
                </div>
            )
        } else if (this.state.page == 'image_processing') {
            return (
                <div className="image_bg"> 
                    <div className="image_title"> Image Processing </div> 

                        <p></p>
                        
                        
                        <div className="input-div"> <p className="ddphoto">Drag & drop photos here or <strong>Browse</strong></p>
                        <input type="file" class="file_upload" multiple="multiple" accept="image/jpeg, image/png, image/jpg"/>
                         </div>

                         <ImgProcessor></ImgProcessor>
                </div>
            )

        }
        
    }

    componentDidMount() {
        textarea_renderer(this.state.page);
        listing_renderer(this.state.page); 
        
        
    }
    componentDidUpdate() {
        textarea_renderer(this.state.page);
        listing_renderer(this.state.page); 
    }
} 

function switch_to_function(newfunc) {
    console.log(interface_reference)
    interface_reference.changefunction(newfunc);
}
root.render(<TextEditor pager = 'text_editor'></TextEditor>)

/* <div class="text_partition">
<div class="listing"> 
<div class="fixed_listing">
  <div class="listing1" id="filelist">

  </div>
</div>

</div>
<div id="text_container" class="main_area"></div>
</div> */
