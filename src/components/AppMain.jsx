import { useState, useEffect } from "react"

const api_server = 'http://127.0.0.1:3000'
const api_endpoint = '/posts'

export default function AppMain() {

    const [articles, setArticle] = useState([])
    const [formData, setFormData] = useState({
        title: '',
        image: '',
        content: '',
        category: '',
        published: false,
        tags: []
    })
    const [postsData, setPostsData] = useState({})
    const tagList = ['Educativo', 'Divertente', 'Noioso', 'Complicato', 'Esaurito']

    function handleTag(tag) {
        setFormData((prevData) => ({
            ...prevData,
            tags: prevData.tags.includes(tag)
                ? prevData.tags.filter((t) => t !== tag)
                : [...prevData, tag]
        }))
    }

    function addArticle(e) {
        e.preventDefault()

        const newArticleData = {
            title: formData.title,
            image: formData.image,
            content: formData.content,
            slug: formData.category,
            published: formData.published,
            tags: formData.tags
        }

        console.log(newArticleData);

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
            .then(() => {
                console.log('Articolo aggiunto', data);

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


    useEffect(() => {
        fetchData()
    }, [])

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
        console.log('elimino il post con slug:', deletePost);


        fetch(`${api_server}${api_endpoint}/${deletePost}`, {
            method: 'DELETE',
        })
            .then(resp => resp.json())
            .then((data) => {
                console.log('Post eliminato', data);

                setPostsData(prevData => ({
                    ...prevData,
                    data: prevData.data.filter(post => post.slug !== deletePost)
                }))

                fetchData()
            })
            .catch(error => {
                console.error('errore nell eliminare il post: ', error);
            })

    }

    return (

        <main>

            <div className="container">
                <h2>Articles</h2>

                <form onSubmit={addArticle}>
                    <div className="mb-3 input-titolo">
                        <label htmlFor="title" className="form-label">Titolo</label>

                        <div className="input-group mb-3">
                            <input type="text"
                                className="form-control"
                                placeholder="Aggiungi Titolo"
                                aria-label="Recipient's title"
                                aria-describedby="button-addon2"
                                value={formData.title}
                                onChange={e => setFormData({ ...formData, title: e.target.value })} />
                        </div>

                    </div>

                    <div className="mb-3 input-immagine">
                        <label htmlFor="image" className="form-label">Immagine</label>

                        <div className="input-group mb-3">
                            <input type="text"
                                className="form-control"
                                placeholder="Aggiungi link Immagine"
                                aria-label="Recipient's image"
                                aria-describedby="button-addon2"
                                value={formData.image}
                                onChange={e => setFormData({ ...formData, image: e.target.value })} />
                        </div>

                    </div>

                    <div className="mb-3 input-contenuto">
                        <label htmlFor="content" className="form-label">Aggiungi Contenuto</label>

                        <div className="input-group mb-3">
                            <input type="text"
                                className="form-control"
                                placeholder="Aggiungi Contenuto"
                                aria-label="Recipient's content"
                                aria-describedby="button-addon2"
                                value={formData.content}
                                onChange={e => setFormData({ ...formData, content: e.target.value })} />
                        </div>

                    </div>

                    <div className="mb-3 input-categoria">
                        <label htmlFor="category" className="form-label">Categoria</label>
                        <select id="inputState"
                            className="form-select"
                            value={formData.category}
                            onChange={e => setFormData({ ...formData, category: e.target.value })}>
                            <option>Seleziona una categoria</option>
                            <option>Antipasto</option>
                            <option>Primo Piatto</option>
                            <option>Secondo</option>
                            <option>Dolce</option>
                            <option>LETSGOSKI</option>
                        </select>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="tags" className="form-label">Tags</label>
                        <div>
                            {tagList.map((tag, index) => (
                                <div key={index} className="form-check form-check-inline">
                                    <input className="form-check-input"
                                        type="checkbox"
                                        checked={formData.tags.includes(tag)}
                                        onChange={() => handleTag(tag)} />
                                    <label htmlFor="tags" className="form-check-label">{tag}</label>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mb-3">
                        <label className="form-check-label" htmlFor="published">Da Pubblicare</label>
                        <input className="form-check-input ms-2 "
                            type="checkbox"
                            id="published"
                            checked={formData.published}
                            onChange={e => setFormData({ ...formData, published: e.target.checked })} />
                    </div>

                    <div className="text-center">
                        <button className="btn btn-primary" type="submit">Aggiungi Post</button>
                    </div>


                </form>

                <h2 className="mt-4">Articles List</h2>

                <section className="posts py-5">
                    <div className="container">
                        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">

                            {postsData.data ?
                                postsData.data.map(post => (
                                    <div className="col" key={post.id}>
                                        <div className="card">
                                            <h4 className="p-2 ">
                                                {post.title}
                                            </h4>
                                            <img src={api_server + post.image} alt="Immagine ricetta" max-width={300} max-height={300} />
                                            <p className="p-2">{post.content}</p>
                                            <div className="p-2"><strong>Tags: </strong> {post.tags.join(', ')}</div>
                                            <div className="text-center pb-4">
                                                <button onClick={handleRemove} data-index={post.slug} className="btn btn-danger">Rimuovi</button>
                                            </div>
                                        </div>
                                    </div>
                                )) :
                                <p>Premi il pulsante per visualizzare i posts</p>
                            }
                        </div>
                    </div>
                </section>

            </div>

        </main>

    )

}

