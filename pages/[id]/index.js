import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Confirm, Button, Loader } from 'semantic-ui-react';

const Person = ({ person }) => {
  const [confirm, setConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (isDeleting) {
      deletePerson();
    }
  }, [isDeleting])

  const open = () => setConfirm(true);
  const close = () => setConfirm(false);

  const deletePerson = async () => {
    const personId = router.query.id;
    try {
      await fetch(`/api/people/${personId}`, {
        method: 'Delete'
      })
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  }

  const handleDelete = async () => {
    setIsDeleting(true);
    close();
  }

  return (
    <div className='person-container wrapper'>
      {isDeleting 
        ? <Loader active />
        : 
        <>
          <h2>Detail Person</h2>
          <table className="ui striped table">
            <tbody>
            <tr>
                <td>Id</td>
                <td>:</td>
                <td>{person._id}</td>
              </tr>
              <tr>
                <td>Firstname</td>
                <td>:</td>
                <td>{person.firstname}</td>
              </tr>
              <tr>
                <td>Lastname</td>
                <td>:</td>
                <td>{person.lastname}</td>
              </tr>
              <tr>
                <td>Email</td>
                <td>:</td>
                <td>{person.email}</td>
              </tr>
              <tr>
                <td>Phone</td>
                <td>:</td>
                <td>{person.phone}</td>
              </tr>
              <tr>
                <td>Address</td>
                <td>:</td>
                <td>{person.address}</td>
              </tr>
            </tbody>
          </table>
          <Link href={`/${person._id}/edit`}>
            <Button primary>Edit</Button>
          </Link>
          <Button color='red' onClick={open}> Delete </Button>
        </>
      }
      <Confirm
        open={confirm}
        onCancel={close}
        onConfirm={handleDelete}
      />
    </div>
  )
}

Person.getInitialProps = async ({ query: { id } }) => {
  try {
    const res = await fetch(`/api/people/${id}`);
    const { data } = await res.json();
    return { person: data }
  } catch (error) {
    const res = await fetch(`${process.env.API_URI}/api/people/${id}`);
    const { data } = await res.json();
    return { person: data }
  }
}

export default Person;
