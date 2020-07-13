import React from 'react';

// Use Function Component with Hook

function AddPostPage(props){
    const [title, setTitle] = React.useState("");
    const [content, setContent] = React.useState("Please write your post.");
    const [imgs, setImgs] = React.useState([]);
    const titleWriter = event=>{
        setTitle(event.target.value);
    }
    const contentWriter = event =>{
        setContent(event.target.value);
    }
    const postAdder = () => {
        const newPost = {
            title,content,imgs
        };
        let post_list = props.post_list.slice();
        post_list.push(newPost);
        props.post_list_setter(post_list);
        props.page_type_setter("PostBoardPage");
    }
    const imgUrlWriter = event => {
        const imgsUrl=[];
        for(let index = 0; index < event.target.files.length; index++){
            imgsUrl.push(URL.createObjectURL(event.target.files[index]));
        }
        setImgs(imgsUrl);
    }
    return (
        <>
          <Title title={title} titleWriter={titleWriter}/>
          <Content content={content} contentWriter={contentWriter}/>
          <Img imgUrls={imgs}/>
          <ControlButtons 
            page_type_setter={props.page_type_setter}
            postAdder={postAdder}
            imgUrlWriter={imgUrlWriter}
          />
        </>
    );
}

function Title(props){
    return (
        <div>
          <span>Title:</span>
          <input 
            value={props.title}
            onChange={props.titleWriter} 
            type="text" name="title" maxLength="10" 
            style={{width: "20%"}}/>
        </div>
    )
}

function Content(props){
    return(
        <div>
          <span>Content:</span>
          <textarea 
            value={props.content} 
            onChange={props.contentWriter} 
            cols="50" rows="5" name="content"/>
        </div>
    );
}

function Img(props){
    let view =(
        <div>
        <span>Image Preview:</span>
        {/* <img src={props.imgUrls} alt="preview"/> */}
        {props.imgUrls.map((imgUrl,index) => <img key={index} src={imgUrl} alt="preview"/>)}
        </div>
    );
    return (
        <div>
          {(props.imgUrls&&props.imgUrls.length)?view:<></>}
        </div>
    );
}

function ControlButtons(props){
    const inputFileRef = React.useRef(null);
    const changePage = () => {
        props.page_type_setter("PostBoardPage");
    }
    
    const handleInput = event => {
        props.imgUrlWriter(event)
    }
    
    const handleUpload = () => {
        inputFileRef.current.click();
    }
    return (
        <div>
          <div>
            <input 
              type="file" accept="image/*" 
              onChange={handleInput} 
              ref={inputFileRef} 
              style={{display: 'none'}} 
              multiple/>
          </div>
          <button onClick={handleUpload}>upload</button>
          <button onClick={props.postAdder}>submit</button>
          <br/>
          <br/>
          <button onClick={changePage}>cancel</button>
        </div>
    );
}

// Use Class Component

// class AddPostPage extends React.Component{
//     constructor(props){
//       super(props);
//       this.state = {
//         title:"",
//         content:"Please write your post.",
//         img:""
//       }
//       this.titleWriter = this.titleWriter.bind(this);
//       this.contentWriter = this.contentWriter.bind(this);
//       this.postAdder = this.postAdder.bind(this);
//       this.imgUrlWriter = this.imgUrlWriter.bind(this);
//     }
  
//     titleWriter(event){
//       this.setState({title: event.target.value});
//     }
//     contentWriter(event){
//       this.setState({content: event.target.value});
//     }
//     imgUrlWriter(event){
//         console.log(event.target.files);
//       this.setState({
//         img: URL.createObjectURL(event.target.files[0])
//       });
//     }
//     postAdder(){
//       const newPost = this.state;
//       let post_list = this.props.post_list;
//       post_list.push(newPost);
//       this.props.post_list_setter(post_list);
//       this.props.page_type_setter("PostBoardPage");
//     }
  
//     render(){
//       return (
//         <>
//           <Title title={this.state.title} titleWriter={this.titleWriter}/>
//           <Content content={this.state.content} contentWriter={this.contentWriter}/>
//           <Img imgUrl={this.state.img}/>
//           <ControlButtons 
//             page_type_setter={this.props.page_type_setter}
//             postAdder={this.postAdder}
//             imgUrlWriter={this.imgUrlWriter}
//           />
//         </>
//       )
//     }
//   }
  
//   class Title extends React.Component{
//     render(){
//       return (
//         <div>
//           <span>Title:</span>
//           <input 
//             value={this.props.title}
//             onChange={this.props.titleWriter} 
//             type="text" name="title" maxLength="10" 
//             style={{width: "20%"}}/>
//         </div>
//       )
//     }
//   }
  
//   class Content extends React.Component{
//     render(){
//       return (
//         <div>
//           <span>Content:</span>
//           <textarea 
//             value={this.props.content} 
//             onChange={this.props.contentWriter} 
//             cols="50" rows="5" name="content"/>
//         </div>
//       )
//     }
//   }
//   class Img extends React.Component{
//     render(){
//         let view =(
//             <div>
//             <span>Image Preview:</span>
//             <img src={this.props.imgUrl} alt="preview"/>
//             </div>
//         );
//       return (
//         <div>
//           {this.props.imgUrl?view:<></>}
//         </div>
//       )
//     }
//   }
//   class ControlButtons extends React.Component{
//     constructor(props){
//       super(props)
//       this.changePage = this.changePage.bind(this);
//       this.handleInput = this.handleInput.bind(this);
//       this.handleUpload = this.handleUpload.bind(this);
//       this.inputFileRef = React.createRef();
//     }
  
//     changePage(){
//       this.props.page_type_setter("PostBoardPage");
//     }
  
//     handleInput(event){
//       this.props.imgUrlWriter(event)
//     }
  
//     handleUpload(){
//       this.inputFileRef.current.click();
//     }
  
//     render(){
//       return (
//         <div>
//           <div>
//             <input 
//               type="file" accept="image/*" 
//               onChange={this.handleInput} 
//               ref={this.inputFileRef} 
//               style={{display: 'none'}} 
//               multiple/>
//           </div>
//           <button onClick={this.handleUpload}>upload</button>
//           <button onClick={this.props.postAdder}>submit</button>
//           <br/>
//           <br/>
//           <button onClick={this.changePage}>cancel</button>
//         </div>
//       )
//     }
// }

export default AddPostPage;