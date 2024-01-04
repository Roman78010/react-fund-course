import React from 'react';
import PostItem from './PostItem';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
// import PostNav from './PostNav';

const PostList = ({posts, title, remove}) => {

  if (!posts.length) {
    return (
      <h3 style={{textAlign: 'center'}}>Posts not finding!</h3>
    )
  }
  
  return (
    <div>
      <h1 className="post__header">{title}</h1>
      <TransitionGroup>
        {posts.map((item, index) =>
          <CSSTransition
              key={item.id}
              timeout={500}
              classNames="item"
            >
            <PostItem remove={remove} number={index + 1} post={item}></PostItem>
          </CSSTransition>
          
        )}
      </TransitionGroup>
      {/* <PostNav></PostNav> */}
    </div>
  );
};

export default PostList;