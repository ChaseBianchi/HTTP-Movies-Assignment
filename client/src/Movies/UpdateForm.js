import React, {useState} from 'react'
import axios from 'axios'
import { useParams, useHistory } from "react-router-dom";

const initalState = {title: '', director: '', metascore: '', stars: []}

function UpdateForm(props) {
    const [form, setForm] = useState(initalState)

    const {id} = useParams()
    const {push} = useHistory()

    const changeHandler = (e) => {
        setForm({...form,[e.target.name]: e.target.value})
    }
    
    const submitHandler = (e) => {
      e.preventDefault()
      const newForm = {...form, id}
      console.log(form)
      axios.put(`http://localhost:5000/api/movies/${id}`, newForm)
        .then((res) => {
            console.log(res);
        //   props.setMovieList()
        }).catch((err) => {
          console.log(err);
        })
    }

    return (
        <div>
            <form onSubmit={submitHandler}>
                <input 
                type='text'
                name='title'
                placeholder='Movie Title'
                onChange={changeHandler}
                value={form.title}
                />
                <input
                type='text'
                name='director'
                onChange={changeHandler}
                placeholder='Director'
                value={form.director}
                />
                <input
                type='text'
                name='metascore'
                onChange={changeHandler}
                placeholder='Metascore'
                value={form.metascore}
                />
                <button>Save Changes</button>
            </form>
        </div>
    )
}

export default UpdateForm
