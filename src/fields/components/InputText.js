import React, { Component } from 'react'

import * as util from '../../redux/lib/utilities';

import EditField from './EditField.component';


export default class InputText extends Component {

    static contextTypes = {
      arrViewRoleCode:React.PropTypes.array,
      arrEditRoleCode:React.PropTypes.array  
    }

    static propTypes = {
      name: React.PropTypes.string,
      refName: React.PropTypes.string,      
      labelPrefix: React.PropTypes.string,
      labelSuffix: React.PropTypes.string,
      size: React.PropTypes.string,
      roles: React.PropTypes.object,
      userRole: React.PropTypes.object,
      value: React.PropTypes.string,
      sectionID: React.PropTypes.number,
      rowID: React.PropTypes.number,
      fieldID: React.PropTypes.number,
      colTableId: React.PropTypes.number,
      rowTableId: React.PropTypes.number,
      required: React.PropTypes.bool,
      rowAxisID:React.PropTypes.number,
      colAxisID:React.PropTypes.number
    }

    constructor(props) {
        super(props);
        this.state = {           
            open: false
        }       
    }


    componentDidMount() {

    }

    
   
    // updateField(event){
    //     console.log('onchange ..........');
    //     if(this.props.rowTableId >= 0 && this.props.colTableId >= 0){
    //         //console.log('InputText: update value = ',event.target.value);
    //         //console.log('v1');
    //         this.context.updateTableField(this.props.sectionID,this.props.rowID,this.props.fieldID,this.props.rowTableId,this.props.colTableId,event.target.value);
    //     }else{
    //         if(this.props.rowAxisID >= 0 && this.props.colAxisID >= 0){
    //             //console.log('v3', this.props.sectionID,this.props.rowID,this.props.fieldID,this.props.rowAxisID,this.props.colAxisID,event.target.value);
    //             //console.log('InputText: update value = ',event.target.value);
    //             this.context.updateAxisXField(this.props.sectionID,this.props.rowID,this.props.fieldID,this.props.rowAxisID,this.props.colAxisID,event.target.value);
    //         }else{
    //             //console.log('v2');
    //             this.context.updateField(this.props.sectionID,this.props.rowID,this.props.fieldID,event.target.value);
    //         }
    //     }
    // }

    handleClick(e){
        e.preventDefault();
        if (e.button==2) { 
          this._handleOpen();        
        }
    }

    _handleOpen(){
      this.setState({open: true});
    }

    _handleClose(){
      this.setState({open: false});
    }

    render() {

        console.log('this.context>>> inputText', this.context);
        

        var labelPrefixStyle = {
            border: 'none',
            color: '#666',
            paddingLeft: '1px',
            paddingRight:'5px'
        }
        var labelSuffixStyle = {
            border: 'none',
            color: '#666',
            paddingLeft: '5px',
            paddingRight:'1px'
        }
        var inputStyle = {
            paddingLeft: '1px',
            paddingRight:'1px'
        }

        var disabledStyle={
            paddingLeft: '1px',
            paddingRight:'1px',
            border : '1px solid #b6b6b6'
        }

        var requiredStyle={
            paddingLeft: '1px',
            paddingRight:'1px',
            border : '2px solid red'
        }

        var hidden = {
            display:'none'
        }

        var classNameInputText = "form-control";

        var styleInputText={};

        var isRequired = this.props.required;

        var isDisabled = true;
        var isVisible = true;        
       
        var display_name = null;
        display_name = (
            <div style={{position: 'absolute', top: -30, left: 0, backgroundColor: 'green', color: 'white', padding: 5}}>
                {this.props.name + ' ' + this.props.refName}
            </div>
        )

        return (

              <div  className={isVisible ? hidden : ''}>              
                <div className={"dragField col-xs-"+this.props.size} ref="group">
                <EditField  isOpen={this.state.open} closeDialog={this._handleClose.bind(this)} sectionID={this.props.sectionID} rowID={this.props.rowID} 
                            fieldID={this.props.fieldID} field={this.props.field} roles = {this.props.roles}
                            arrViewRoleCode = {this.context.arrViewRoleCode} arrEditRoleCode={this.context.arrEditRoleCode}/>
                    {display_name}
                    <div className="form-group" id={this.props.groupId}>
                        <div className="col-xs-12">
                            {
                                this.props.labelPrefix || this.props.labelSuffix?
                                <div className="input-group">
                                    {this.props.labelPrefix?
                                        <span className="input-group-addon" style={labelPrefixStyle}>{this.props.labelPrefix}</span>
                                        :null
                                    }
                                    <input type="text" name={this.props.name} className="form-control has-danger" style={styleInputText}                                                                             
                                           onMouseDown={this.handleClick.bind(this)} 
                                           readOnly
                                           />
                                    {this.props.labelSuffix?
                                        <span className="input-group-addon" style={labelSuffixStyle}>{this.props.labelSuffix}</span>
                                        :null
                                    }

                                </div>
                                :<input type="text" name={this.props.name} className="form-control has-danger" style={styleInputText} 
                                        onMouseDown={this.handleClick.bind(this)}                                                                           
                                        readOnly
                                        />
                            }

                        </div>
                    </div>
                </div>
              </div>
                )
    }
}
