import axios from 'axios'
import React from 'react'

function Todo({id, todo, setRefresh, isdone}) {
  function getTokens(){
    const user =  localStorage.getItem('user')
    if(!user){
        return null;
    }
    const token = JSON.parse(user).token
    return token
  } 

  const handleDelete = async () => {
    try {
      const token = getTokens();
      await axios.post('http://localhost:5000/api/delete', {_id: id}, {
        headers: {
          auth: token,
        },
      });
      setRefresh(new Date());
    } catch (error) {
      console.error(error);
    }
  }

  const handleDone = async () => {
    try {
      const token = getTokens();
      await axios.post('http://localhost:5000/api/done', { _id: id }, {
        headers: {
          auth: token,
        },
      });
      setRefresh(new Date());
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className='col-sm-3 mx-3 my-2 alert bg-light' style={{border:"1px solid black"}}>
      <div className='card-header'>
        {isdone ? "Completed" : "Not Completed"}
      </div>
      <hr />
      <div className='card-body'>
        <h4 className='card-title'>Title</h4>
        <p className='card-text'>{todo}</p>
      </div>
      <div className='actionButton' style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:"1rem"}}>
        <button type="button" className="btn btn-danger" onClick={handleDelete}>Delete</button>
        <button type="button" className="btn btn-outline-success" onClick={handleDone}>
          {isdone ? "Mark Incomplete" : "Mark Completed"}
        </button>
      </div>
    </div>
  )
}

export default Todo
