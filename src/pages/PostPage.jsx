import axios from 'axios';
import { Suspense } from 'react';
import { useLoaderData, useNavigate, Link, Await, useAsyncValue, defer } from 'react-router-dom';

const Post = () => {
    const post = useAsyncValue()
    return (
        <>
            <h1>{post.userId}</h1>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
        </>
    )
}

const Comments = () => {
    const comments = useAsyncValue()
    return (
        <div>   
            <h2>Comments</h2>
            {comments.map( comment => (
                <>
                    <h3>{comment.email}</h3>
                    <h3>{comment.name}</h3>
                    <h3>{comment.body}</h3>
                </>
            ))}
        </div>
    )
}

const PostPage = () => {
    const {post, id, comments} = useLoaderData();
    console.log(id)
    // const [post, setPost] = useState({});
    // const { id } = useParams();
    const navigate = useNavigate();
    
    // useEffect(() => {
    //    (async () => {
    //       const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
    //       setPost(response.data);
    //     })();
    // }, []);

    return (
        <>
        <button onClick={() => navigate(-1)}>Go back</button>
        <div>
            <Suspense fallback={<h2>Post's loading...</h2>}>
                <Await resolve={post}>
                    <Post />
                </Await>
            </Suspense>
            <Suspense fallback={<h2>Comments are loading...</h2>}>
                <Await resolve={comments}>
                    <Comments />
                </Await>
            </Suspense>
            <Link to={`/posts/${id}/edit`}>Edit post</Link>
        </div>
        </>
    );
};

async function getPost(id) {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
    return response.data;
}

async function getPostComments(id) {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}/comments`);
    return response.data;
}

export const postLoader = async ({params}) => {
    const id = params.id
    return defer({post: await getPost(id) , id, comments: getPostComments(id)})
}

export default PostPage;