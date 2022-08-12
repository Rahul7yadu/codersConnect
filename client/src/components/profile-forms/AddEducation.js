import  {useState} from 'react'
import {useDispatch} from 'react-redux'
import {addEducation} from '../../actions/profile'
import {Link,useNavigate} from 'react-router-dom'
const initialState = {

}
const AddEducation = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
    const [formData,setFormData] = useState({school:'',degree:'',fieldofstudy:'',from:'',to:'',description:''})
    const {school,degree,from,to,current,fieldofstudy,description} = formData
    const [toDisabled,setToDisabled] = useState(false)
    const onChange = (e) => {
        setFormData({...formData,[e.target.name]:e.target.value});
    }
    
  return (

    <div>
         <section className="container">
      <h1 className="large text-primary">Add Your Education</h1>
      <p className="lead">
        <i className="fas fa-code-branch" /> Add any school or bootcamp that you
        have attended
      </p>
      <small>* = required field</small>
      <form
        className="form"
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(addEducation(formData))
          navigate('/dashboard')
        }}
      >
        <div className="form-group">
          <input
            type="text"
            placeholder="* School or Bootcamp"
            name="school"
            onChange={(e)=>onChange(e)}
            required
            value ={school}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Degree or Certificate"
            name="degree"
            onChange={(e)=>onChange(e)}
            required
            value ={degree}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Field of Study"
            name="fieldofstudy"
            onChange={(e)=>onChange(e)}
            value ={fieldofstudy}
          />
        </div>
        <div className="form-group">
          <h4>From Date</h4>
          <input type="date" name="from"  onChange={(e)=>onChange(e)} value = {from} />
        </div>
        <div className="form-group">
          <p>
            <input
              type="checkbox"
              name="current"
            value ={current}
            onChange={(e)=>{
            setFormData({...formData,current:!current})
            setToDisabled(!toDisabled) 
            }}
            />{' '}
            Current School
          </p>
        </div>
        <div className="form-group">
          <h4>To Date</h4>
          <input
            type="date"
            name="to"
            value ={to}
            disabled={toDisabled?'disabled':''}
            onChange={(e)=>onChange(e)}
          />
        </div>
        <div className="form-group">
          <textarea
            name="description"
            cols="30"
            rows="5"
            placeholder="Program Description"
            value ={description}
            onChange={(e)=>onChange(e)}
          />
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </section>
    </div>
  )
}

export default AddEducation