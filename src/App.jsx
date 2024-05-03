import { useEffect, useState } from 'react';
import axios from 'axios';

import './App.css'

function App() {
  const URL = `https://6622ed683e17a3ac846e40cc.mockapi.io/api/`;

  const [ users, setUsers ] = useState([]);

  useEffect(() => {

      getContactList();

  }, [])
    // Use effect nos permite ejecutar código después de que el componente se renderiza y de manera controlada

  async function getContactList() {
    // Obtener los usuarios desde mockapi y vamos a actualizar el estado users
    try {
      console.log(`Antes del await`)
      const usuarios = await axios.get(`${URL}/contact-list`).data;
      setUsers(usuarios)
      
      const primerUser = usuarios[0];
      const user = await axios.get(`${URL}/contact-list/${primerUser.id}`).data;

      const update = await axios.put(`${URL}/contact-list/${user.id}`, user).data;
    } 
    catch(error) {
      console.log(error)
    } 
    




    // axios.get(`${URL}/contact-list`)
    //         .then(response => {
    //           console.log(`Termino el await`)
    //           const usuarios = response.data;
    //           setUsers(usuarios)

    //           // console.log(response.data)
    //           // const primerUser = usuarios[0];

    //           // axios.get(`${URL}/contact-list/${primerUser.id}`)
    //           //             .then(response => {
    //           //                 const user = response.data;
    //           //                 user.new = "Nuevo dato"
    //           //                 // Actualizar los datos de ese usuario
    //           //                 axios.put(`${URL}/contact-list/${user.id}`, user)
    //           //                           .then(response => {
    //           //                             console.log(response.data)
    //           //                             // Algunas líneas de código ma's
    //           //                             // Algunas líneas de código ma's
    //           //                             // Algunas líneas de código ma's
    //           //                           })
    //           //                           .catch(error => console.log(error))
    //           //             }).catch(error => {
    //           //               console.log(`Error al obtener el primer usuario`, error)
    //           //             })

    //         })
    //         .catch(error => {
    //           console.log(error)
    //         })
  }

  // !getContactList();

  return (
    <>
      <h1>Lista de Contactos</h1>
      <ul>
        {
          users.map(usuario => {
            return (
              <li key={usuario.id}>{ usuario.fullname }</li>
            )
          })
        }
      </ul>
    </>
  )
}

export default App
