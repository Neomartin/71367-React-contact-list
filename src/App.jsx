import { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Icon from 'react-icons-kit';
import { bin, pencil } from 'react-icons-kit/icomoon'

import './App.css'

function App() {
  const URL = `https://6622ed683e17a3ac846e40cc.mockapi.io/api/`;

  const [ users, setUsers ] = useState([]);

  useEffect(() => {
      getContactList();
  }, []);
  
  // Use effect nos permite ejecutar código después de que el componente se renderiza y de manera controlada

  async function getContactList() {
    // Obtener los usuarios desde mockapi y vamos a actualizar el estado users
    try {

      const { data } = await axios.get(`${URL}/contact-list`);

      setUsers(data)

    } 
    catch(error) {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Hubo un error al obtener los contactos',
      })
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

  function handleSubmit(evt) {
    evt.preventDefault();

    // const formDataObj = new FormData(evt.target)
    // const newContact = Object.fromEntries(  formDataObj.entries()   );

    // formatData(newContact)
    // newContact.bornDate = new Date(newContact.bornDate).getTime()

    const el = evt.target.elements;

    const newContact = {
      fullname: el.fullname.value,
      bornDate: new Date(el.bornDate.value).getTime(),
      email: el.email.value,
      phone: el.phone.value,
      image: el.image.value,
    }

    console.log(newContact)

    createNewContact(newContact)

  }

  async function createNewContact(contacto) {
    try {
      const response = await axios.post(`${URL}/contact-list`, contacto);
      setUsers( [ ...users, response.data ]  )
      // getContactList();
    }
    catch(error) {
      console.log(error)
    }
  }

  // Borrar usuario
  function handleDelete(id) {

    try {

      Swal.fire({
        title: "Eliminar usuario",
        text: "Realmente desea eleminar el usuario?",
        icon: "warning",
        showConfirmButton: true,
        confirmButtonText: "Borrar!",
        showCancelButton: true,

      }).then(async(action) => {
        if(action.isConfirmed) {
          
          await axios.delete(`${URL}/contact-list/${id}`);

          getContactList()
        }

      })


    }
    catch(error) {
      console.log(error)
    }

  }







  function handleEdit(id) {}



  return (
    <>
      <div className="contact-list-container">

        <div className="contact-form-wrapper">
          <h1>Añadir Contacto</h1>
          <form className="contact-form" onSubmit={handleSubmit}>

            <div className="input-group">
              <label htmlFor="fullname">Nombre Completo</label>
              <input type="text" id="fullname" name="fullname" />
            </div>
            <div className="input-group">
              <label htmlFor="bornDate">Fecha de Nacimiento</label>
              <input type="date" id="bornDate" name="bornDate" />
            </div>
            <div className="input-group">
              <label htmlFor="email">Correo Electrónico</label>
              <input type="email" id="email" name="email" />
            </div>
            <div className="input-group">
              <label htmlFor="phone">Teléfono</label>
              <input type="text" id="phone" name="phone" />
            </div>
            <div className="input-group">
              <label htmlFor="image">Enlace a la imagen</label>
              <input type="url" id="image" name="image" />
            </div>
            <div className="input-group">
              <button type="submit">Añadir Contacto</button>
            </div>

          </form>
        </div>

        <div className="contact-list">
          <h1>Lista de Contactos</h1>
          <ul>
            {
              users.map(usuario => {
                return (
                  <li key={usuario.id} className="contact">
                    <div className="contact-image-wrapper">
                      <img className="contact-image" src={usuario.image} alt="" />  
                    </div>  
                    <div className="contact-user">
                      <div className="contact-fullname">
                        { usuario.fullname }
                      </div>
                      <span className="contact-date">
                        { usuario.bornDate }
                      </span>
                    </div>
                    <div className="contact-email">
                      { usuario.email }
                    </div>
                    <div className="contact-phone">
                      { usuario.phone }
                    </div>
                    <div className="contact-actions">
                      <button onClick={ () => handleEdit(usuario.id) } >
                        <Icon icon={ pencil } />
                      </button>

                      <button className='danger' onClick={ () => handleDelete(usuario.id) }>
                        <Icon icon={ bin } />
                      </button>

                    </div>
                  </li>
                )
              })
            }
          </ul>
        </div>
        
      </div>

      
    </>
  )
}

export default App
