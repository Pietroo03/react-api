import { useState, useEffect } from "react"

const api_server = 'http://127.0.0.1:3000'
const api_endpoint = '/posts'
const articlesList = []

export default function AppMain() {

    const [articles, setArticle] = useState(articlesList)
    const [newTitle, setNewTitle] = useState('')
    const [newImage, setNewImage] = useState('')
    const [newContent, setNewContent] = useState('')
    const [newCategory, setNewCategory] = useState('')
    const [isPublished, setIsPublished] = useState(false)
    const [newTag, setNewTag] = useState([])
    const [postsData, setPostsData] = useState({})

    const tagList = ['Educativo', 'Divertente', 'Noioso', 'Complicato', 'Esaurito']

    function handleTag(tag) {
        setNewTag((prevTags) =>
            prevTags.includes(tag) ? prevTags.filter((t) => t !== tag) : [...prevTags, tag]
        )
    }

    function addArticle(e) {
        e.preventDefault()

        const newArticleData = {
            title: newTitle,
            image: newImage,
            content: newContent,
            category: newCategory,
            published: isPublished,
            tags: newTag
        }

        fetch(api_server + api_endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newArticleData),
        })
            .then(resp => resp.json())
            .then(data => {
                console.log('Articolo aggiunto', data);

                setArticle([
                    ...articles,
                    newArticleData
                ])

                setNewTitle('')
                setNewImage('')
                setNewContent('')
                setNewCategory('')
                setIsPublished(false)
            })
            .catch(error => {
                console.error(error);

            })

    }

    function handleRemove(e) {
        const removeArticle = Number(e.target.getAttribute('data-index'))
        console.log(removeArticle);

        const articlesListUpdate = articles.filter((article, index) => index != removeArticle)

        setArticle(articlesListUpdate)

    }

    function handleClick(e) {
        fetchData()
    }

    function fetchData(url = api_server + api_endpoint) {
        fetch(url)
            .then(resp => resp.json())
            .then(data => {
                console.log(data);
                setPostsData(data)
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
                                value={newTitle}
                                onChange={e => setNewTitle(e.target.value)} />
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
                                value={newImage}
                                onChange={e => setNewImage(e.target.value)} />
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
                                value={newContent}
                                onChange={e => setNewContent(e.target.value)} />
                        </div>

                    </div>

                    <div className="mb-3 input-categoria">
                        <label htmlFor="category" className="form-label">Categoria</label>
                        <select id="inputState"
                            className="form-select"
                            value={newCategory}
                            onChange={e => setNewCategory(e.target.value)}>
                            <option>Formativo</option>
                            <option>Dibattito</option>
                            <option>Ludico</option>
                            <option>Q&A</option>
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
                                        id={index}
                                        checked={newTag.includes(tag)}
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
                            checked={isPublished}
                            onChange={e => setIsPublished(e.target.checked)} />
                    </div>

                    <div className="text-center">
                        <button className="btn btn-primary" type="submit" id="button-addon2">Aggiungi Post</button>
                    </div>


                </form>

                <h2 className="mt-4">Articles List</h2>
                <div className="text-center pt-4">
                    <button type="button" className="btn btn-primary" onClick={handleClick}>Mostra Posts</button>
                </div>

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











{/* <ul className="list-group">
    {articles.map((article, index) =>
        <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
                <div>Titolo: <strong>{article.title}</strong></div>
                <img src={article.image} alt="" />
                <div>{article.content}</div>
                <div><strong>Categoria: </strong>{article.category}</div>
                <div><strong>Tags: </strong>{article.tags.join(', ')}</div>
                <div><strong>Stato: </strong>{article.published ? 'Da Pubblicare' : 'Da non Pubblicare'}</div>
            </div>

            <div>
                <button onClick={handleRemove} data-index={index} className="btn btn-danger">Rimuovi</button>
            </div>
        </li>

    )}
</ul> */}