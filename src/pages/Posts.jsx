import React, {useState, useEffect, useMemo, useRef} from 'react';
import '../styles/App.css';
import PostList from '../components/PostList';
import Loader from '../components/UI/Loader/Loader';
import PostForm from '../components/PostForm';
import PostFilter from '../components/PostFilter';
import MyModal from '../components/myModal/MyModal';
import MyButton from '../components/UI/button/MyButton';
import { usePosts } from '../components/hooks/usePosts';
import PostService from '../API/PostService';
import { useFetching } from '../components/hooks/useFetching';
import {getPageCount, getPagesArray} from '../components/utils/pages';
import Pagination from '../components/myModal/pagination/Pagination';
import { useObserver } from '../components/hooks/useObserver';
import MySelect from '../components/UI/select/MySelect';

function Posts() {
const [posts, setPosts] = useState([]);

const [filter, setFilter] = useState({sort: '', query: ''});
const [modal, setModal] = useState(false);
const sortedAndSearchPosts = usePosts(posts, filter.sort, filter.query)
const [totalPages, setTotalPages] = useState(0);
const [limit, setLimit] = useState(10);
const [page, setPage] = useState(1);
const lastElement = useRef();


const [fetchPosts, isPostsLoading, postError] = useFetching(async (limit, page) => {
  const response = await PostService.getAll(limit, page);
  setPosts([...posts, ...response.data]);
  const totalCount = response.headers['x-total-count'];
  setTotalPages(getPageCount(totalCount, limit))
})
 
useObserver(lastElement, page < totalPages, isPostsLoading, () => {
  setPage(page + 1);
})

useEffect(() => {
  fetchPosts(limit, page);
}, [page, limit]);

 
 const createPost = (newPost) => {
  setPosts([...posts, newPost])
  setModal(false);
 }

 const removePost = (post) => {
  setPosts(posts.filter(p => p.id !== post.id))
 }
 
 const changePage = (page) => {
  setPage(page);
 }
 
  return (
    <div className="App">
      <button onClick={fetchPosts}>Get Posts</button>
      <MyButton style={{marginTop: '30px'}} onClick={() => setModal(true)}>
        Create user
      </MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost}/>
      </MyModal>
      <hr style={{margin: '15px 0'}}></hr>
      <PostFilter filter={filter} setFilter={setFilter}/>
      <MySelect
        value={limit}
        onChange={value => setLimit(value)}
        defaultValue="Count element on page"
        options={[
          {value: 5, name: '5'},
          {value: 10, name: '10'},
          {value: 25, name: '25'},
          {value: -1, name: 'Show all posts'},
        ]}
      />
      {postError && 
        <h3>Occur error ${postError}</h3>
      }
      <PostList remove={removePost} posts={sortedAndSearchPosts} title="Posts about JS"/>
      <div ref={lastElement} style={{height: '20px', background: 'red'}}></div>
      {isPostsLoading &&
        <div style={{display: 'flex', justifyContent: 'center', marginTop: '50px'}}><Loader/></div>
      }
      <Pagination 
        page={page} 
        changePage={changePage}
        totalPages={totalPages}
        />
    </div>
  )
}

export default Posts;
