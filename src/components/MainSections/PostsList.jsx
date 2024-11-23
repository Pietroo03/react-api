export default function PostsList({ postsData, handleRemove, api_server }) {

    return (
        <section className="posts py-5">
            <div className="container">
                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">

                    {postsData.data ?
                        postsData.data.map((post, index) => (
                            <div className="col" key={index}>

                                <div className="card h-100 d-flex">
                                    <img src={api_server + post.image} className="card-img-top" alt="..." />
                                    <div className="card-body d-flex flex-column">
                                        <h5 className="card-title">{post.title}</h5>
                                        <p className="card-text">{post.content}</p>
                                        <div className="p-2"><strong>Tags: </strong> {post.tags.join(', ')}</div>
                                        <div className="text-center p-4 mt-auto">
                                            <button onClick={handleRemove} data-slug={post.slug} className="btn btn-danger">Rimuovi</button>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        )) :
                        <p>Premi il pulsante per visualizzare i posts</p>
                    }
                </div>
            </div>
        </section>
    )

}