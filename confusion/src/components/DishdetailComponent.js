import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, Label, Col, Row  } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';

  /*
  componentDidMount() {
    console.log('Dishdetail Comnponent componentDidMount invoked');
  }

  componentDidUpdate() {
    console.log('Dishdetail Comnponent componentDidUpdate invoked');
  }
  */

  const required = (val) => val && val.length;
  const maxLength = (len) => (val) => !(val) || (val.length <= len);
  const minLength = (len) => (val) => val && (val.length >= len);

  class CommentForm extends Component {

    constructor(props) {
      super(props);

      this.state = {
        isModalOpen: false
      };

      this.toggleModal = this.toggleModal.bind(this);
      this.handleSubmintComment = this.handleSubmintComment.bind(this);
    }

    toggleModal() {
      this.setState({
        isModalOpen: !this.state.isModalOpen
      });
    }

    handleSubmintComment(values) {
      //console.log('Current State is: ' + JSON.stringify(values));
      //alert('Current State is: ' + JSON.stringify(values));
      this.toggleModal();
      this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
      // event.preventDefault();
  }
    render() {
      return(
        <div>
          <div className="container">
            <Button outline onClick={this.toggleModal}><span className="fa fa-sign-in fa-lg"></span> Submit Comment </Button>
          </div>
          <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
            <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
            <ModalBody>
            <LocalForm onSubmit={(values) => this.handleSubmintComment(values)}>
              <Label htmlFor="rating"> Rating </Label>
              <Control.select model=".rating" name="rating"
                className="form-control"
                validators={{ required }}>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </Control.select>
              <Errors
                className="text-danger"
                model=".rating"
                show="touched"
                messages={{
                  required: 'Required'
                }}
              />
              <br/>
              <Label htmlFor="author">Your Name</Label>
              <Row className="form-group">
                <Col>
                  <Control.text model=".author" id="author" name="firstname"
                    placeholder="Your Name"
                    className="form-control"
                    validators={{
                        required, minLength: minLength(3), maxLength: maxLength(15)
                    }}
                  />
                  <Errors
                    className="text-danger"
                    model=".author"
                    show="touched"
                    messages={{
                      required: 'Required',
                      minLength: 'Must be greater than 2 characters',
                      maxLength: 'Must be 15 characters or less'
                    }}
                  />
                </Col>
              </Row>
              <br/>
              <Label htmlFor="comment"> Comment </Label>
              <Row className="form-group">
                <Col>
                    <Control.textarea model=".comment" id="comment" name="comment"
                        rows="12"
                        className="form-control" 
                        validators={{
                          required
                      }}
                    />
                    <Errors
                      className="text-danger"
                      model=".comment"
                      show="touched"
                      messages={{
                        required: 'Required'
                      }}
                    />
                </Col>
              </Row>
                <Button type="submit" value="submit" color="primary"> Submit </Button>
              </LocalForm>
            </ModalBody>
          </Modal>
        </div>
      );
    }
  }

  function RenderDish({ dish }) {
    if (dish != null)
      return(
        <div className="col-12 col-md-5 m-1">
          <Card>
          <CardImg top src={baseUrl + dish.image} alt={dish.name} />
            <CardBody>
              <CardTitle>{dish.name}</CardTitle>
              <CardText>{dish.description}</CardText>
            </CardBody>
          </Card>
        </div>
      );
    else
      return(
          <div></div>
      );
  }

  function RenderComments({comments, postComment, dishId}) {
    if (comments != null) 
    return ( 
      <div className="col-12 col-md-5 m-1">
        <h4> Comments </h4>
          <ul className= "list-unstyled">
            { comments.map((comment) => {
                return (
                    <li key={comment.id}>
                    <p>{comment.comment}</p>
                    <p> -- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))} </p>
                    </li>
                );
              })
            }
          </ul>
          <CommentForm dishId={dishId} postComment={postComment} />
        </div>
    );
    else 
      return (
        <div></div>
      );
  }

  const DishDetail = (props) => {
    if (props.isLoading) {
      return(
          <div className="container">
              <div className="row">            
                  <Loading />
              </div>
          </div>
      );
    }
    else if (props.errMess) {
        return(
            <div className="container">
                <div className="row">            
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    }
    else if (props.dish != null) 
      return (
        <div className="container">
          <div className="row">
              <Breadcrumb>

                  <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                  <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
              </Breadcrumb>
              <div className="col-12">
                  <h3>{props.dish.name}</h3>
                  <hr />
              </div>                
          </div>
          <div className="row">
            <RenderDish dish={props.dish} />
            <RenderComments comments={props.comments}
                            postComment={props.postComment}
                            dishId={props.dish.id} />
          </div>
          </div>
      );
    }

  
export default DishDetail;