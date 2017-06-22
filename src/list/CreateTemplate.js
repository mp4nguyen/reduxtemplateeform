import React, { Component } from 'react';
import {printRequest,postRequest,getRequest} from '../redux/lib/request';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';


export default class CreateTemplate extends Component {

    static contextTypes = {            
      createTemplate: React.PropTypes.func
    }

    static propTypes = {
      // sectionID: React.PropTypes.number,
      // section: React.PropTypes.object,
      // isOpen: React.PropTypes.bool,
      // addSection: React.PropTypes.func,
      // closeDialog: React.PropTypes.func,
    }

    constructor(props) {
        super(props);      

        this.state = {           
            name:''           
        }

    }    

    _handleSubmit(isDelete){

      console.log('this.state _handleSubmit', this.state);

      var self=this;

      if (!isDelete) { 
        swal({
            title: 'Are you sure?',
            text: 'You will remove this eform',
            type: 'warning',
            showCancelButton: true,
            closeOnConfirm: false,
            allowOutsideClick: true,
            showLoaderOnConfirm: true
        }, function() {
            self.context.createTemplate(self.state.name);
        })
            
        
      }
    }

    _handleClose(){
        
        if(this.props.closeDialog){
            this.props.closeDialog()
        }
    }

    _onChange(componentName,event,value){
        // console.log('newOrEditSection._onChange: componentName = ',componentName);
        // console.log('newOrEditSection._onChange: value = ',value);
        
        this.setState({
          name: value
        });
    }
    
    render() {


        console.log('this.props>>> render', this.props);
        console.log('this.state>>> render', this.state);
        // console.log('this.state>>> inputText', this.state);

          const actions = [
                  
            <FlatButton
              label="Cancel"
              primary={true}
              onTouchTap={this._handleClose.bind(this)}
            />,
            <FlatButton
              label="Submit"
              primary={true}
              keyboardFocused={true}
              onTouchTap={this._handleSubmit.bind(this,false)}
            />,
          ];

          var titleName = 'Create New Template';

          var styles = {
            dialogRoot: {
              display: 'right',
              alignItems: 'center',
              justifyContent: 'center',
              paddingTop: 0,
              height: '100%'              
            },
            dialogContent: {
              position: 'relative',
              width: '100%',
              maxWidth: 600
            },
            dialogBody: {
              paddingBottom: 0
            }
          };

          return (
            <div>
                <Dialog                  
                  
                  title={titleName}
                  actions={actions}
                  modal={false}
                  
                  
                  bodyStyle={{overflow: 'auto', position: 'relative'}}
                  repositionOnUpdate={{false}}
                  autoScrollBodyContent={{true}}
                  autoDetectWindowHeight={{false}}

                  open={this.props.isOpen}
                  onRequestClose={this.handleClose}
                >

                  <div className="row">       
                          
                    <div className="col-md-12">
                      <TextField
                        style={{width:'100%'}} 
                        name='name'                   
                        floatingLabelStyle={{'font-size':'19'}}   
                        floatingLabelText="Template name"
                        floatingLabelFixed={true}
                        value={this.state.name}
                        onChange={this._onChange.bind(this,'name')}
                     />
                    </div>
                                                                                                                                            
                  </div>                  
                                     
               </Dialog>
            </div>
          );


    }

}
