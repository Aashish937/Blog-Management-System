import React, { useState, useEffect } from 'react';
import service from '../appwrite/config';
import {Container, PostCard} from '../components/index'

function AllPost(){
    const [posts,setPosts] = useState([]);
    useEffect(() => {
        service.getPosts([]).then((allPosts) =>{
            if(allPosts){
                setPosts(allPosts.documents);
            }
        })
    },[]);
    return (
        <div className = 'py-8 w-full'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key = {post.$id} className = 'p-2 w-1/4'>
                            <PostCard {...post}/>
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default AllPost;