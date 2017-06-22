import React, { Component } from 'react';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

export default class OrderPosition extends Component {   

    static propTypes = {
      sectionID: React.PropTypes.number,      
      originID: React.PropTypes.number,      
      isOpen: React.PropTypes.bool,      
      closeDialog: React.PropTypes.func,
    }

    constructor(props) {
        super(props);
        this.state = {
            originID:'',
            valueOrder : null
        }

    }

    componentWillMount(){

        if(this.props.originID){
            // console.log(' componentWillMount >>> this.props.originID',this.props.originID);
            this.setState({
                              originID : this.props.originID,                              
                              valueOrder : null                              
                            });
        }
    }

    componentWillReceiveProps(nextProps){
        // console.log(' componentWillReceiveProps >>> this.props.originID',this.props.originID);
          
        if(this.props.originID){
            this.setState({
                              originID : this.props.originID,
                              valueOrder : null
                            });
        }
    }
    

    _handleSubmit(){
      
      if (this.state.valueOrder) {
        this._handleClose(true);
      }else{
        this._handleClose(false);
      }

      
    }


    _handleClose(isSubmit){        
        if(this.props.closeDialog){
            this.props.closeDialog(this.state.valueOrder, isSubmit)
        }
    };

    _onChange(componentName,event,value){       
        var object = {};
        object[componentName] = value;
        this.setState(object);
    }

    render() {

          const actions = [
            <FlatButton
              label="Cancel"
              primary={true}
              onTouchTap={this._handleClose.bind(this, false)} // false is select Cancel
            />,
            <FlatButton
              label="Submit"
              primary={true}
              keyboardFocused={true}
              onTouchTap={this._handleSubmit.bind(this)}
            />,
          ];

          var titleName = 'Order Position';

          return (
            <div>
                <Dialog
                  title={titleName}
                  actions={actions}
                  modal={false}
                  open={this.props.isOpen}
                  onRequestClose={this.handleClose}
                >
                    <div className="row">
                      <div className="col-md-6">
                        <TextField         
                         // disabled={true}
                         floatingLabelText="Origin Position"
                         floatingLabelFixed={true}
                         value={this.state.originID}
                       />
                      </div>
                      <div className="col-md-6">
                        <TextField
                          name='valueOrder'                      
                          floatingLabelText="Order Position"
                          floatingLabelFixed={true}
                          value={this.state.valueOrder}
                          onChange={this._onChange.bind(this,'valueOrder')}
                       />
                      </div>
                    </div>
                </Dialog>
            </div>
          );


    }

}
