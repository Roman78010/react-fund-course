import React from 'react';

const PostNav = () => {
  return (
    <div style={{display: 'flex', justifyContent: 'center', marginTop: '30px', marginBottom: '30px', gap: '20px'}}>
      <button>Prev</button>
      <button>Next</button>
    </div>
  );
};

export default PostNav;