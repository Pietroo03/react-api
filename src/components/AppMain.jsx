import { useState, useEffect } from "react"
import AddPost from "./MainSections/AddPostForm"
import PostsList from "./MainSections/PostsList"

const api_server = 'http://127.0.0.1:3000'
const api_endpoint = '/posts'

export default function AppMain() {

    const [formData, setFormData] = useState({
        title: '',
        image: '',
        content: '',
        category: '',
        published: false,
        tags: []
    })
    const [postsData, setPostsData] = useState({})
    const tagList = ['Buono', 'Facile', 'Veloce', 'Complicato', 'Avanzato']

    function handleTag(tag) {
        setFormData((prevData) => {
            const updatedTags = prevData.tags.includes(tag)
                ? prevData.tags.filter((t) => t !== tag)
                : [...prevData.tags, tag]

            return {
                ...prevData,
                tags: updatedTags
            }
        })
    }

    function addNewPost(e) {
        e.preventDefault()

        const newArticleData = {
            title: formData.title,
            image: formData.image,
            content: formData.content,
            slug: formData.category,
            published: formData.published,
            tags: formData.tags
        }

        setPostsData(prevData => ({
            ...prevData,
            data: [...prevData.data, newArticleData]
        }))

        fetch(api_server + api_endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newArticleData),
        })
            .then(resp => resp.json())
            .then((data) => {
                console.log('Articolo aggiunto', data);
                setPostsData(data)
                fetchData()

            })
            .catch(error => {
                console.error(error);
            })

        setFormData({
            title: '',
            image: '',
            content: '',
            category: '',
            published: false,
            tags: []
        })

    }

    function fetchData(url = api_server + api_endpoint) {
        fetch(url)
            .then(resp => resp.json())
            .then(data => {
                console.log(data);
                setPostsData(data)
            })
            .catch(error => {
                console.error('errore nel recuper dati', error);

            })
    }

    function handleRemove(e) {

        const deletePost = e.target.getAttribute("data-index")

        setPostsData(prevData => ({
            ...prevData,
            data: prevData.data.filter(post => post.slug !== deletePost)
        }))

        fetch(`${api_server}${api_endpoint}/${deletePost}`, {
            method: 'DELETE',
        })
            .then(resp => resp.json())
            .then((data) => {
                console.log('Post eliminato', data);

            })
            .catch(error => {
                console.error('errore nell eliminare il post: ', error);
                fetchData()
            })
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (

        <main>

            <div className="container">
                <h2>Add Post</h2>

                <AddPost addNewPost={addNewPost} formData={formData} setFormData={setFormData} tagList={tagList} handleTag={handleTag} />

                <h2 className="mt-4">Posts List</h2>

                <PostsList postsData={postsData} handleRemove={handleRemove} api_server={api_server} />

            </div >

        </main >

    )

}
