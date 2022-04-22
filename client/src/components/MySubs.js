import React,{useState , useEffect} from 'react';
import axios from 'axios';
import CollegeCard from './CollegeCard';
import { Container, Col, Row } from "react-bootstrap";
import NavBar from './NavBar';

function MySubs() {
    const [collegeDets, setCollegeDets] = useState();
    const [loadingCollege, setloadingCollege] = useState(true)
    const getMySubs = async () => {
        try {
          const res = await axios.get("http://localhost:5000/getsubs" , {
            headers: {
              "auth-token": localStorage.getItem("auth-token"),
            },
          });
          if (res.data.success) {
            console.log(res.data.data);
            setCollegeDets(res.data.data);
          } else {
            console.log("Error fetching!");
          }
        } catch (err) {
          console.log(err);
        }
        setloadingCollege(false)
        //console.log(category)
      };
    
      useEffect(() => {
        getMySubs();
      }, []);
      if(loadingCollege){
          <>
          <h1>Loading..</h1>
          </>

      }
  return (
      <>
      <section  id="back">
          <NavBar />
        </section>
      <div style={{textAlign: 'center' , fontSize : "40px",margin : "10px", color : "white"}}>My Subscriptions</div>
      <Container>
        <Row>
        {collegeDets && collegeDets.subscribedTo.map((college ) => {
              return(
                  <>
                  <Col xs="4">
              <CollegeCard  college={college} />
            </Col>
                  </>
              );
          })}
        
        </Row>
      </Container>
      <div>
      
      </div>
      </>
    
  )
}

export default MySubs