import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import fetch from "isomorphic-unfetch";

const Home = () => {
  const [resultNoCors, setResultNoCors] = useState("");
  const [resultCors, setResultCors] = useState("");

  const handleNoCors = async () => {
    if (resultNoCors) {
      setResultNoCors("");
    } else {
      try {
        const res = await fetch("https://example.com/");
        const data = await res.text();
        setResultNoCors(data);
      } catch (error) {
        setResultNoCors(error.toString());
      }
    }
  };

  const handleCors = async () => {
    if (resultCors) {
      setResultCors("");
    } else {
      try {
        const res = await fetch("/api/callback?url=https://reqres.in/api/users/2"
        , {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'GOFACT-API-TOKEN' :'hello'
          },
          body: JSON.stringify({
            "name": "wesley",
            "job": "zion resident"
          })
        }
        );
        const data = await res.text();
        setResultCors(data);
      } catch (error) {
        setResultCors(error.toString());
      }
    }
  };

  const callback = async () => {
    if (resultCors) {
      setResultCors("");
    } else {
      try {
        const res = await fetch("/api/callback"
        , {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'GOFACT-API-TOKEN' :'hello'
          },
          body: JSON.stringify({
            "name": "wesley",
            "job": "zion resident"
          })
        }
        );
        const data = await res.text();
        setResultCors(data);
      } catch (error) {
        setResultCors(error.toString());
      }
    }
  };

  return (
    <div>
      <Head>
        <title>Home</title>
      </Head>

      <div className=" w-screen text-white">
        <h1 className="title ">Welcome to Cors NextJS!</h1>
        <p className="description">
          To try the demo, please click on the boxs below.
        </p>
        <button className="btn" onClick={callback}>callback</button>
        <p className="description">
          If you like this project, you can support me by this{" "}
          <Link href="https://www.paypal.me/chitly/5">
            <a>link</a>
          </Link>
          .
        </p>

        <div className="row">
          <a className="card" onClick={handleNoCors}>
            <h3>No Cors Example &rarr;</h3>
            <p>Fetch data from example.com</p>
          </a>
          {/* <Link href="https://www.paypal.me/chitly/5">
            <a className="card" onClick={handleNoCors}>
              <h3>Support The Project &rarr;</h3>
              <p>https://www.paypal.me/chitly/5</p>
            </a>
          </Link> */}
          <a className="card" onClick={handleCors}>
            <h3>Cors Example &rarr;</h3>
            <p>Fetch data from example.com</p>
          </a>
        </div>

        <div className="row">
          <div className="card">
            <h3>Result No Cors</h3>
            <p>{resultNoCors}</p>
          </div>
          <div className="card">
            <h3>Result Cors</h3>
            <p>{resultCors}</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .hero {
          width: 100%;
          color: #333;
        }
        .title {
          margin: 0;
          width: 100%;
          padding-top: 80px;
          line-height: 1.15;
          font-size: 48px;
        }
        .title,
        .description {
          text-align: center;
        }
        .row {
          max-width: 880px;
          margin: 80px auto 40px;
          display: flex;
          flex-direction: row;
          justify-content: space-around;
        }
        .card {
          padding: 18px 18px 24px;
          width: 220px;
          text-align: left;
          text-decoration: none;
          border: 1px solid #9b9b9b;
        }
        .card:hover {
          border-color: #067df7;
        }
        .card h3 {
          margin: 0;
          color: #067df7;
          font-size: 18px;
        }
        .card p {
          margin: 0;
          padding: 12px 0 0;
          font-size: 13px;
        }
      `}</style>
    </div>
  );
};

export default Home;

// export default function SearchBar() {
//   const [query, setQuery] = useState("");
//   const [address, setAddress] = useState("");
//   const fetcher = async (url) => await axios.get(url, { params: {q: query } }).then((res) => res.data);
//   const { data, error } = useSWR(address, fetcher);

//   const handleSubmit = (e) => {
//     setAddress(`/api/tryswr`);
//     e.preventDefault();
//   };

//   return (
//     <>
//       <Form onSubmit={handleSubmit}>
//         <Input
//           onChange={(e) => setQuery(e.target.value)}
//         />
//         <SearchButton type="submit">Search</SearchButton>
//       </Form>
//     </>
//   );
// }

