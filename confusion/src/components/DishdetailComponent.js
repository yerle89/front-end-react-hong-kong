import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';
import React, { Component } from 'react';
class DishDetail extends Component {

  constructor(props) {
    super(props);
    this.state = {
      
    }
    
  };

  renderDish(dish) {
        
    if (dish != null)
      return(
        <Card>
          <CardImg top src={dish.image} alt={dish.name} />
          <CardBody>
            <CardTitle>{dish.name}</CardTitle>
            <CardText>{dish.description}</CardText>
          </CardBody>
        </Card>
      );
    else
      return(
          <div></div>
      );
  }

  renderComments(comments) {
    if (comments != null) 
    return ( 
      <ul class = "list-unstyled">
          <h4> Comments </h4>
          { comments.map((comment) => {
              return (
                <div>
                  <li>{comment.comment}</li>
                  <li> -- {comment.author}, {comment.date} </li>
                </div>
              );
            })
          }
        </ul>
    );
    else 
      return (
        <div></div>
      );
  }

  render() {

    const dish = this.props.dish;

    if (dish == null) 
      return (
        <div></div>
      )
    else { 
      return (
        <div className="row">
          <div className="col-12 col-md-5 m-1"> {this.renderDish(dish)} </div>
          <div className="col-12 col-md-5 m-1"> 
            
                  {this.renderComments(dish.comments)} 
              
          </div>
        </div>
      );
    }
  }

}

export default DishDetail;