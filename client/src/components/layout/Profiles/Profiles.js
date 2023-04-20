import {useEffect} from 'react'
import {getAllProfiles} from '../../../actions/profile'
import {useSelector,useDispatch} from 'react-redux'
import ProfileItems from './ProfileItems'
import Spinner from '../Spinner'
const Profiles = () => {
    const dispatch = useDispatch()
    const profiles = useSelector((state)=>state.profile.profiles)
    const loading = useSelector((state) => state.profile.loading)
    useEffect(()=>{
        dispatch(getAllProfiles())
    },[])
  return (
    <div className='container'>
        {profiles.length<=0&&loading?<Spinner/>:(<>
        <h1 className = 'large text-primary'>Developers</h1>
        <p className = 'lead'>
            <i className = 'fab fa-connectdevelo'></i>Browse and connect with developers
        </p>
        <div className = 'profiles'>
            {loading&&<Spinner/>}
            {profiles.length>0? profiles.map((profile)=><ProfileItems key={profile._id} profile = {profile}/>) :(<Spinner/>)}
        </div>
        </>)}
    </div>
  )
}

export default Profiles