import axios from 'axios';
import { Suspense } from 'react';
import { Link, useLoaderData, useSearchParams, defer, Await } from 'react-router-dom';


const PostsPage = () => {

    // const [posts, setPosts] = useState([]);
    const {posts} = useLoaderData()
    const [searchPosts, setSearchPosts] = useSearchParams();

    const postQuery = searchPosts.get('post') || '';
    const latest = searchPosts.has('latest');

    const startsFrom = latest ? 80 : 1;

    const handleSubmit = e => {
        e.preventDefault();
        const form = e.target;
        const query = form.search.value;
        const isLatest = form.latest.checked;
        const params = {}
        if(query.length) params.post = query;
        if(isLatest) params.latest = true;
        setSearchPosts(params)
    }
    
    // useEffect(() => {
    //    (async () => {
    //       const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
    //       setPosts(response.data);
    //     })();
    // }, []);

    return (
        <div>
            <form autoComplete='off' onSubmit={handleSubmit}>
                <input type="search" name="search" />
                <label style={{padding: "20px"}}>
                    New only <input type="checkbox" name="latest" />
                </label>
                <input type="submit" value="Search" />
            </form>
            <Link to="/posts/new">Create post</Link>
            <Suspense fallback={<h2>Loading...</h2>}>
                <Await resolve={posts}>
                    {
                        resolvedPosts => (
                            <>
                                {resolvedPosts
                                .filter(post => post.title.includes(postQuery) && post.id >= startsFrom) 
                                .map( post => (
                                    <Link to={`/posts/${post.id}`} key={post.id}>
                                        <div style={{border: "1px solid red", margin: "10px"}}>
                                            <h1>{post.userId}</h1>
                                            <h2>{post.title}</h2>
                                            <p>{post.body}</p>
                                        </div>
                                    </Link>
                                ))}
                            </>
                        )
                    }
                </Await>
            </Suspense>
        </div>
    );
};

async function getPosts() {
    const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
    return response.data;
}

export const postsLoader = async () => {
    return defer({
        posts: getPosts()
    })
}

export default PostsPage;