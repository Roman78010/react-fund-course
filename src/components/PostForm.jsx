import React, {useState} from 'react';
import MyButton from './UI/button/MyButton'
import MyInput from './UI/input/MyInput';

const PostForm = ({create}) => {
  const [post, setPost] = useState({
    title: '',
    body: '',
   });

  const addNewPost = (e) => {
    e.preventDefault();
    const newPost = {
      ...post, id: Date.now()
    }
    create(newPost);
    setPost({title: '', body: ''});
  }
   
  
  return (
      <form>
      {/* Управляемый компонент.Начало */}
        <MyInput
          type="text"
          value={post.title}
          onChange={e => setPost({... post, title: e.target.value})}
          placeholder="Post name"
        >
        </MyInput>
      {/* Управляемый компонент. Конец*/}

      {/* Неуправляемый/Некотролируемый компонент. Начало (Видео: React JS фундаментальный курс от А до Я - 50:49)*/}
        {/* <MyInput
          ref={bodyInputRef}
          type="text"
          placeholder="Post description"
        >
        </MyInput> */}
      {/* Неуправляемый/Некотролируемый компонент. Конец */}
        <MyInput
          value={post.body}
          onChange={e => setPost({... post, body: e.target.value})}
          type="text"
          placeholder="Post description"
        >
        </MyInput>
        <MyButton onClick={addNewPost}>Create post</MyButton>
      </form>
  );
};

export default PostForm;