import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useParams, useHistory } from "react-router-dom";

const initalState = {title: '', director: '', metascore: '', stars: []}

function UpdateForm(props) {
    const [form, setForm] = useState(initalState)

    const id = parseInt(useParams().id)
    const {push} = useHistory()
    // console.log('id ',id)
    // console.log('movie list props ',props.movieList[id])
    // useEffect(() => {
    //   setForm(props.movieList[id])
    // },[])

    const changeHandler = (e) => {
        setForm({...form,[e.target.name]: e.target.value})
    }
    
    const submitHandler = (e) => {
      e.preventDefault()
      const newForm = {...form, id: id}
      console.log('new form ',newForm)
      axios.put(`http://localhost:5000/api/movies/${id}`, newForm)
        .then((res) => {
            console.log('res ',res)
          const newMovieList = props.movieList
            .map(item => {
                if(item.id !== res.data.id){return item}
            })
          newMovieList.push(res.data);
          console.log('new movie list complete: ',newMovieList)
          props.setMovieList(newMovieList)
          console.log('updated movielist state ',props.movieList)
          push(`/movies/${id}`)
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
