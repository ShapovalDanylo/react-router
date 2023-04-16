import './App.css';
import { Route, Navigate, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import AboutPage from './pages/AboutPage';
import HomePage from './pages/HomePage';
import PostsPage, { postsLoader } from './pages/PostsPage';
import PostPage, { postLoader } from './pages/PostPage';
import NotFoundPage from './pages/NotFountPage';
import Layout from './Layout';
import CreatePost from './pages/CreatePost';
import EditPost from './pages/EditPost';
import LoginPage from './pages/LoginPage';
import RequireAuth from './hoc/RequireAuth';
import { AuthProvider } from './hoc/AuthProvider';

function App() {

  const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<Layout/> }>
    <Route index element={<HomePage />}/>
    <Route path="about/*" element={<AboutPage />}>
      <Route path="contacts" element={<p>Contacts</p>} />
      <Route path="team" element={<p>Team</p>} />
    </Route>
    <Route path="about-us" element={<Navigate to="/about" replace />}/>
    <Route path="posts" element={<PostsPage />} loader={postsLoader} />
    <Route path="posts/:id" element={<PostPage />} loader={postLoader}/>
    <Route path="posts/new" element={
      <RequireAuth>
        <CreatePost />
      </RequireAuth>
    }/>
    <Route path="posts/:id/edit" element={
      <RequireAuth>
        <EditPost />
      </RequireAuth>
    }/>
    <Route path="login" element={<LoginPage />}/>
    <Route path="*" element={<NotFoundPage />} />
    </Route>
  ))

  return (
    <div className="App">
      <AuthProvider>
        <RouterProvider router={router}/>
      </AuthProvider>
    </div>
  )
}

export default App
