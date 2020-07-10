import React from 'react';

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

export default PostBoardPage;
