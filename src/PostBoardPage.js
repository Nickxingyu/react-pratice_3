import React from 'react';

// Use Function Component with Hook

function PostBoardPage(props){
  const changePage = () => {
    props.page_type_setter("AddPostPage");
  }
  const removePost = () => {
    const posts = props.post_list.slice();
    posts.pop();
    props.post_list_setter(
      posts
    );
  }
  return(
    <>
      <button onClick={changePage}>Add Post</button>
      <button onClick={removePost}>Remove Post</button>
      {props.post_list.map((post,index)=> {
        return(
          <div key={index} className="postItem">
            <div>{post.title}</div>
            <div>{post.content}</div>
            {(post.imgs&&post.imgs.length)?post.imgs.map((img,index) => <img key={index} src={img} alt="preview"/>):<></>}
          </div>
        )
      })}
         </>
  );
}

export default PostBoardPage;
