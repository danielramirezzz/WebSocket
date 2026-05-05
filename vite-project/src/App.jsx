import { useState } from "react"


function App(){
  const[socket, setSocket] = useState()
  return (
    <div>
      <form>
        <input type="text" placeholder="Escribe el mensaje"/>


        <button>Enviar</button>

      </form>
      
    </div>
  )
}

export default App