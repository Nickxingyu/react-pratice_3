import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      PageType: "PostBoardPage",
      post_list: []
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
              {post.img?<img src={post.img} alt="preview"/>:<></>}
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
      content:"Please write your post.",
      img:""
    }
    this.titleWriter = this.titleWriter.bind(this);
    this.contentWriter = this.contentWriter.bind(this);
    this.postAdder = this.postAdder.bind(this);
    this.imgUrlWriter = this.imgUrlWriter.bind(this);
  }

  titleWriter(event){
    this.setState({title: event.target.value});
  }
  contentWriter(event){
    this.setState({content: event.target.value});
  }
  imgUrlWriter(event){
    this.setState({
      img: URL.createObjectURL(event.target.files[0])
    });
  }
  postAdder(){
    const newPost = this.state;
    let post_list = this.props.post_list;
    post_list.push(newPost);
    this.props.post_list_setter(post_list);
    this.props.page_type_setter("PostBoardPage");
  }

  render(){
    return (
      <>
        <Title title={this.state.title} titleWriter={this.titleWriter}/>
        <Content content={this.state.content} contentWriter={this.contentWriter}/>
        <Img imgUrl={this.state.img}/>
        <ControlButtons 
          page_type_setter={this.props.page_type_setter}
          postAdder={this.postAdder}
          imgUrlWriter={this.imgUrlWriter}
        />
      </>
    )
  }
}

class Title extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return (
      <div>
        <span>Title:</span>
        <input 
          value={this.props.title}
          onChange={this.props.titleWriter} 
          type="text" name="title" maxLength="10" 
          style={{width: "20%"}}/>
      </div>
    )
  }
}

class Content extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return (
      <div>
        <span>Content:</span>
        <textarea 
          value={this.props.content} 
          onChange={this.props.contentWriter} 
          cols="50" rows="5" name="content"/>
      </div>
    )
  }
}
class Img extends React.Component{
  render(){
    return (
      <div>
        <span>Image Preview:</span>
        {this.props.imgUrl?<img src={this.props.imgUrl} alt="preview"/>:<></>}
      </div>
    )
  }
}
class ControlButtons extends React.Component{
  constructor(props){
    super(props)
    this.changePage = this.changePage.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
    this.inputFileRef = React.createRef();
  }

  changePage(){
    this.props.page_type_setter("PostBoardPage");
  }

  handleInput(event){
    this.props.imgUrlWriter(event)
  }

  handleUpload(){
    this.inputFileRef.current.click();
  }

  render(){
    return (
      <div>
        <div>
          <input 
            type="file" accept="image/*" 
            onChange={this.handleInput} 
            ref={this.inputFileRef} 
            style={{display: 'none'}} />
        </div>
        <button onClick={this.handleUpload}>upload</button>
        <button onClick={this.props.postAdder}>submit</button>
        <br/>
        <br/>
        <button onClick={this.changePage}>cancel</button>
      </div>
    )
  }
}

export default App;
