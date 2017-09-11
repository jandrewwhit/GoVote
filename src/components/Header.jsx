import React from 'react';
import {
  Col,
  Row,
  FormGroup,
  FormControl,
  ControlLabel,
  Button,
  Image,
} from 'react-bootstrap';

class Header extends React.Component {
    render() {
        return(
            <div className="container my-container">                    
                {/*<h2 className="main-header">Go Vote</h2>
                <Button >search</Button>
                <div className="my-wrapper">
                    <Image src="../static/CfGLogo.png" responsive />
                </div>   */}
                <Col xs={8}>
                    <h2 className="main-header">Go Vote</h2>
                <Button >search</Button>
                </Col>
                <Col xs={4}>
                    <div className="my-wrapper">
                        <Image src="../static/CfGLogo.png" responsive />
                    </div>  
                </Col>

                
                 
            </div>
        );
    };
}

module.exports = Header;