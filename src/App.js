import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      PageType: "PostBoardPage",
      post_list: [
        {
          title: "Hello",
          content: "World"
        },
        {
          title: "Hero",
          content: "is Hero"
        }
      ]
    }
    this.page_type_setter = this.page_type_setter.bind(this);
    this.post_list_setter = this.post_list_setter.bind(this);

    this.components = {
      PostBoardPage: PostBoardPage,
      AddPostPage: AddPostPage
    }
  }

  page_type_setter(type){
    this.setState({PageType: type});
  }

  post_list_setter(list){
    this.setState({post_list: list});
  }

  render(){
    let {PageType, post_list} = this.state;
    let components = this.components;
    let Page = components[PageType];
        return (
          <div className="App">
            <header className="App-header">
              <Page 
               post_list = {post_list}
               page_type_setter = {this.page_type_setter}
               post_list_setter = {this.post_list_setter}
              />
            </header>
          </div>
        );
  }
}

class PostBoardPage extends React.Component{
  constructor(props){
    super(props);
    this.changePage = this.changePage.bind(this);
    this.removePost = this.removePost.bind(this);
  }

  changePage(){
    this.props.page_type_setter("AddPostPage");
  }

  removePost(){
    this.props.post_list.pop();
    this.props.post_list_setter(
      this.props.post_list
    );
  }

  render(){
    const {post_list} = this.props;
    return(
      <>
        <button onClick={this.changePage}>Add Post</button>
        <button onClick={this.removePost}>Remove Post</button>
        {post_list.map((post,index)=> {
          return(
            <div key={index} className="postItem">
              <div>{post.title}</div>
              <div>{post.content}</div>
              <div>{post.image}</div>
            </div>
          )
        })}
      </>
    )
  }
}

class AddPostPage extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      title:"",
      content:"",
      img:""
    }

  }

  render(){
    return (
      <>
        <Title />
        <Content />
        <Img />
        <ControlBottons />
      </>
    )
  }
}

class Title extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return <></>
  }
}

class Content extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return <></>
  }
}
class Img extends React.Component{
  render(){
    return <></>
  }
}
class ControlBottons extends React.Component{
  constructor(props){
    super(props)
  }
  render(){
    return <></>
  }
}

export default App;
