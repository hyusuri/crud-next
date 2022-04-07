import { useState, useEffect } from 'react';
import fetch from 'isomorphic-unfetch';
import { Button, Form, Loader } from 'semantic-ui-react';
import { useRouter } from 'next/router';

const NewPerson = () => {
  const [form, setForm] = useState({
    firstname:'', lastname:'', email:'',
    phone:'', address:''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const router = useRouter();

  useEffect(() => {
    if (isSubmitting) {
      if (Object.keys(errors).length === 0) {
        createPerson();
      }
      else {
        setIsSubmitting(false);
      }
    }
  }, [errors])

  const createPerson = async () => {
      const res = await fetch(`/api/people`, {
        method: 'POST',
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const { success, message } = await res.json();
      
      if(success){
        alert("Added Success");
        router.push("/");
      } else {
        let err ={};
        err.email = message;
        setErrors(err);
        setIsSubmitting(false);
      }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let errs = validate();
    setErrors(errs);
    setIsSubmitting(true);
  };
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  };

  const validate = () => {
    let err ={};
    if (!form.firstname) {
      err.firstname = 'firstname is required';
    }
    if (!form.lastname) {
      err.lastname = 'lastname is required';
    }
    if (!form.email) {
      err.email = 'email is required';
    } else {
      if(!validateEmail(form.email)){
        err.email = 'Please enter valid email'
      }
    }
    if (!form.phone) {
      err.phone = 'phone is required';
    } else {
      if(!validatePhone(form.phone)){
        err.phone = 'Please enter valid number'
      }
    }
    if (!form.address) {
      err.address = 'address is required';
    }
    return err;
  }

  const validateEmail = (v) => {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
  }

  const validatePhone = (v) => {
    return /^(^\+62|62|^08)(\d{3,4}-?){2}\d{3,4}$/.test(v);
  }

  return (
    <div className="form-container">
      <h1>Add Person</h1>
      <div>
        {
          isSubmitting
            ? <Loader active inline='centered' />
            : <Form onSubmit={handleSubmit}>
              <Form.Input
                fluid
                error={errors.firstname ? {
                  content: errors.firstname, pointing: 'below'}
                  : null}
                label='Firstname'
                placeholder='Firstname'
                name='firstname'
                value= {form.firstname}
                onChange={handleChange}
              />
              <Form.Input
                fluid
                error={errors.lastname ? {
                  content: errors.lastname, pointing: 'below'}
                  : null}
                label='Lastname'
                placeholder='Lastname'
                name='lastname'
                value= {form.lastname}
                onChange={handleChange}
              />
              <Form.Input
                fluid
                error={errors.email ? {
                  content: errors.email, pointing: 'below'}
                  : null}
                label='Email'
                placeholder='example@example.com'
                name='email'
                value= {form.email}
                onChange={handleChange}
              />
              <Form.Input
                fluid
                error={errors.phone ? {
                  content: errors.phone, pointing: 'below'}
                  : null}
                label='Phone'
                placeholder='Phone'
                name='phone'
                value= {form.phone}
                onChange={handleChange}
              />
              <Form.Input
                fluid
                error={errors.address ? {
                  content: errors.address, pointing: 'below'}
                  : null}
                label='Address'
                placeholder='Address'
                name='address'
                value= {form.address}
                onChange={handleChange}
              />
              <Button type='submit'>Create</Button>
            </Form>
        }
      </div>
    </div>
  )
}

export default NewPerson;