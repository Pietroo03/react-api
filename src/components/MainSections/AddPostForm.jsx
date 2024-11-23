export default function addPost({ addNewPost, formData, setFormData, tagList, handleTag }) {

    return (
        <form onSubmit={addNewPost}>

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
    )

}