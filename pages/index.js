import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import { useState, useEffect } from 'react';
import { Pagination } from 'semantic-ui-react';
import { useRouter } from 'next/dist/client/router';

const Index = () => {

  const router = useRouter();
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(10);
  const [activePage, setActivePage] = useState(1);
  const [apiUrl, setApiUrl] = useState('/api/people?page=1');

  useEffect(() => {
    getData();
  }, [apiUrl]);

  const getData = async () => {
    const res = await fetch(apiUrl);
    const { data, totalPages } = await res.json();
    setTotalPages(totalPages)
    setData(data);
    router.push(`?page=${activePage}`, undefined, { shallow: true });
  }
  
  const onChange = (e, pageInfo) => {
  	setActivePage(pageInfo.activePage);
    setApiUrl('/api/people/?page=' + pageInfo.activePage.toString());
  };

  return (
    <div className='people-container'>
      <h1>People</h1>
      <div className='wrapper'>
        <table className="ui single line table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map( person=> {
              return (
                <tr key={person._id}>
                  <td>{person.firstname} {person.lastname}</td>
                  <td>{person.email}</td>
                  <td>
                    <Link href={`/${person._id}`}>
                      <a>View</a>
                    </Link>
                    <a>  |  </a>
                    <Link href={`/${person._id}/edit`}>
                      <a>Edit</a>
                    </Link>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <Pagination
        activePage={activePage}
        onPageChange={onChange}
        totalPages={totalPages}
        ellipsisItem={null} />
      </div>
    </div>
  )
}

export default Index;
