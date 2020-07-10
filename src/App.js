import React from 'react';
import './App.css';
import PostBoardPage from './PostBoardPage';
import AddPostPage from './AddPostPage';

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

export default App;
