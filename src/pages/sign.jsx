import { supabase } from '../supabaseClient'
import { useState } from 'react'

function Signup() {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSignup = async () => {
    const { data, error } = await supabase
      .from('profiless')
      .insert([
        {
          full_name: name,
          email: email,
          password_hash: password
        }
      ])

    if (error) {
      alert("Error: " + error.message)
    } else {
      alert("Signup successful!")
    }
  }

  return (
    <div>
      <input placeholder="Name" onChange={(e)=>setName(e.target.value)} />
      <input placeholder="Email" onChange={(e)=>setEmail(e.target.value)} />
      <input placeholder="Password" onChange={(e)=>setPassword(e.target.value)} />
      <button onClick={handleSignup}>Sign Up</button>
    </div>
  )
}

export default Signup