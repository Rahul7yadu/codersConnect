import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { loadUsers, } from '../../actions/admin'
export const AdminDashboard = () => {
    const dispatch = useDispatch()
const getUsers = ()=>{
dispatch(loadUsers())
}

useEffect(()=>{

})
  return (
    <div style={{marginTop:200}}>
        this is admin dashboard
        <button onClick={()=>getUsers()}>
            getUsers
        </button>
    </div>
  )
}
