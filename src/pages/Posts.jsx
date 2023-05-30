import React, { useEffect, useState } from 'react';

const Posts = () => {
  useEffect(() => {
    fetch('https://codebuddy.review/posts', {
      method: 'GET',
    })
      .then(async res => {
        console.log(res);
        setposts(await res.json());
      })
      .catch(err => console.log(err));
  }, []);

  const [posts, setposts] = useState([]);

  return (
    <>
      <div className="text-center mb-5">
        <h1 className="mb-0">Posts</h1>
      </div>

      <div className="card mt-md-4 mt-3">
        <div className="card-body pb-lg-0 pb-0 p-lg-5 p-3">
          <div className="row gx-5">
            {/* Card */}
            {posts?.data?.posts?.map(post => {
              return (
                <div className="col-md-4 col-sm-6 col-12 p-2">
                  <div key={post?.id} className="card gy-3">
                    <img className="card-img-top" src={post?.image} />
                    <div className="card-body">
                      <div className="d-flex align-items-center justify-content-between flex-wrap mb-3">
                        <div>
                          <h5 className="card-title">{post?.firstName + ' ' + post?.lastName}</h5>
                        </div>
                        <div>
                          <img src={post?.avatar} className="img-fluid" alt={post?.firstName} />
                        </div>
                      </div>
                      <p className="card-text">{post?.writeup}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Posts;
