import React, {useState, useEffect } from 'react'
import Header from './Header'
import Todo from './Todo'
import Addmodel from './Addmodel'
import axios from 'axios'

function Home() {
  const [allTodos, setAllTodos] = useState([])
  const [refresh ,setRefresh]= useState()

  function getTokens(){
    const user =  localStorage.getItem('user')
    if(!user){
        return null;
    }
    const token = JSON.parse(user).token
    return token
  }

  useEffect(() => {  
    const token = getTokens()
    if(!token){
      window.location.href = '/'
    } else {
      getTodos(token)
    }
  },[refresh])

  async function getTodos(token) {
    try {
      const response = await axios.get('http://localhost:5000/api/todo', {
        headers: {
          auth: token,
        },
      });
      setAllTodos(response.data.user.todos);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <Header />
      <div className="container" style={{position:"relative"}}>
        <div className="row justify-content-md-center mt-4">
          {allTodos.map((todo)=>(
            <Todo key={todo._id} id={todo._id} todo={todo.desc} isdone={todo.isDone} setRefresh={setRefresh}/>
          ))}
        </div>
        <Addmodel setRefresh={setRefresh }/>
      </div>
    </>
  )
}

export default Home
