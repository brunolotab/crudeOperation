import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'

function EditApi() {
    const [data, setData] = useState([])
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [nameedit, setNameedit] = useState('')
    const [emailedit, setEmailedit] = useState('')
    const [edit, setEdit] = useState(-1)
    // const [message, setMessage] = useState('')
    console.log(data);
    // console.log(data.id[1]);
    console.log(data[1]);
    // console.log(data[1].id);
    // console.log(data[4].id);
    // console.log(data.id[1]);
    
   const log = data.map((item)=>(item.id));
   console.log(log.length);
   
   
    
    useEffect(()=> {
        axios.get('http://localhost:3030/users')
        .then(res => setData(res.data))
        .catch(er => console.log(er));

    }, [])


    const handleSubmit = (e) =>{
        event.preventDefault();
 
        //  const id = Math.floor(Math.random() *10 +1);
        //  const id = data.length +1;
        // const log = data.map((item)=>(item.id));
        //  console.log(log);

         function Callid () {
        const log = data.map((item)=>(item.id));

            const Id = data.length +1
       for(var i = 0, len = log.length; i < len; i++) {
         if(Id === log[i]){
            return data.length +1
        }else {data.length * 2}
       }
       
    }
    

        axios.post('http://localhost:3030/users', {id: Callid(), name: name, email: email})
        .then(res => {setData(res)
           location.reload()

        })
        .catch(er => console.log(er)
        )
    }

    const handleEdit = (id) => {
        axios.get('http://localhost:3030/users/'+id)
        .then(res => {
            console.log(res.data.name);
            setNameedit(res.data.name)
            setEmailedit(res.data.email)
           setEdit(id)
        })
        .catch(er => console.log(er));

    }

    const handleUpdate = () => {
        axios.put('http://localhost:3030/users/' + edit, {id: edit, name: nameedit, email: emailedit})
        .then(res => {console.log(res);
           
           setEdit(-1);

        }).catch(err => console.log(err))
    }

    const handleDelete = (id) => {
        axios.delete('http://localhost:3030/users/' + id)
        .then((res => {setData(res); location.reload();
        })).catch(err => {console.log(err); alert('somthing is wrong ...')}
        ) 
    }
  return (
    <Div>
        <div className="action">
        <form onSubmit={handleSubmit} >
            <input type='text' placeholder='Enter name' onChange={e => setName(e.target.value)}/>
            <input type='text' placeholder='Enter Email' onChange={e =>setEmail(e.target.value)}/>
            <button>Add</button>
        </form>
        {/* {message} */}
        </div>
        <table>
            <tr>
                <th>1D</th>
                <th>Name</th>
                <th>Email</th>
                <th>Action</th>
            </tr>
            
                {
                    data.map((user, index) =>(
                        user.id === edit ?
                        <tr>
                            <td>{user.id}</td>
                            <td><input type = 'text' placeholder={user.name} value={user.nameedit} onChange={e => setNameedit(e.target.value)}/></td>
                            <td><input type = 'text' placeholder={user.email} value={user.emailedit} onChange={e => setEmailedit(e.target.value)}/></td>
                            <td><button onClick={handleUpdate}>Update</button></td>
                        </tr>
                        :
                        <tr key={index}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>
                                <button onClick={() => handleEdit(user.id)}>edit</button>
                                <button onClick={() => handleDelete(user.id)}>delete</button>
                            </td>
                        </tr>
                    ))
                }
        
        </table>
    </Div>
  )
}

export default EditApi

const Div = styled.div `
    padding: 50px 20px;

    .action {
     /* width: 100%; */
     padding: 12px;
    }
    input {
        width: 43.5%;
        padding: 4px;
        /* margin-left: 10px; */
    }
    .action button {
        width: 10%;
        padding: 4px;
        cursor: pointer;
        background-color: green;
        color: white;

    }

    table {
        border: 2px solid #dddd;
        text-align: center;
        padding: 15px;
        width: 100%;

    }
  
    tr:nth-child(odd) {
    background-color: #eeee;
    
  }
  th, td {
    height: 2rem;
  }
  th {
    color: blue;
  }
`

