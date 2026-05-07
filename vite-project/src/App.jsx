import { useEffect } from "react"
import { useState } from "react"
import {io} from "socket.io-client"


function App(){
  const[socket, setSocket] = useState()
  const[inputMessage, setInputMessage] = useState()
  const [menesajesRecibidos, setMensajeRecibido] = useState([])

  useEffect( () => {
    const newSocket = io("localhost:3000")
    setSocket(newSocket)

    newSocket.on("message", (msg) =>{
      setMensajeRecibido(msg)
    })


    return () => {
      newSocket.disconnect()
    }

  }, [])

  const hadleSubmit = (e) => {
    e.preventDefault()
    if(socket){
      socket.emit("message", inputMessage)
    }

  }
  return (
    <div>
      <form onSubmit={hadleSubmit}>
        <input type="text" placeholder="Escribe el mensaje"
          onChange={(e) => setInputMessage(e.target.value)}
        />
        <button type="submit">Enviar</button>
      </form>
      <ul>
        {menesajesRecibidos.map( mensaje => <li>{mensaje}</li>)}
      </ul> 
    </div>
  )
}

export default App