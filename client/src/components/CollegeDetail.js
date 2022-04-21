import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Carousel from "react-elastic-carousel";
import NavBar from "./NavBar";
import { useParams } from "react-router-dom";
import axios from "axios";
const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2, itemsToScroll: 2, pagination: false },
  { width: 850, itemsToShow: 3 },
  { width: 1150, itemsToShow: 4, itemsToScroll: 2 },
  { width: 1450, itemsToShow: 5 },
  { width: 1750, itemsToShow: 6 },
];



const facilities = [
  {
    name: "Library",
    image:
      "https://www.nmimsnavimumbai.org/images/Reading%20room%20with%20students.JPG",
  },
  {
    name: "Court",
    image: "https://www.nmims.edu/images/gallery/shirur-campus/8.jpg",
  },
  {
    name: "Gymnasium",
    image: "https://www.nmims.edu/images/gallery/shirur-campus/9.jpg",
  },
  {
    name: "Cafeteria",
    image: "https://sbm.nmims.edu/images/infrastructure/5.jpg",
  },
  {
    name: "Lab",
    image:
      "https://images.shiksha.com/mediadata/images/1564040315phpOCZpFI.jpeg",
  },
  {
    name: "Lecture Hall",
    image: "https://sbm.nmims.edu/images/aol.JPG",
  },
];

function CollegeDetail() {
  const courses = [
    {
      name: "Commerce",
      desc: "Explore and lead the exciting world of business. Begin with laying the right foundation with exemplary commerce education.",
    },
    {
      name: "Economics",
      desc: "Economic reforms seek dynamic thinkers and problem solvers like you.Make an impact in eminent organizations, government bodies.",
    },
    {
      name: "Law",
      desc: "Explore the highly sought after, revered and immense opportunities in the field of law, from corporate sector to litigation. ",
    },
    {
      name: "Liberal Arts",
      desc: "Inculcates intellectual ability in students to understand ideas and beliefs and pursue a career in the field of their choice.",
    },
    {
      name: "Design",
      desc: "Explore and lead the exciting world of business. Begin with laying the right foundation with exemplary commerce education.",
    },
  ];

   const [reviews, setreviews] = useState([
    {
      name: "Ishan Kumar",
      comment:
        "Spent the best days of learning at this place. World class facilities and amazing teachers!",
      likes: 19,
      rating: 4,
    },
    {
      name: "Simran Saluja",
      comment:
        "Very well maintained and excellent discipline and conduct in the college. All teaching faculty is highly qualified and experienced",
      likes: 31,
      rating: 5,
    },
  ])
  const [commentName, setcommentName] = useState();
  const [commentRating, setcommentRating] = useState();
  const [commnetComment, setcommnetComment] = useState();
  const [collegeDets, setCollegeDets] = useState();
  const [loadingCollege, setloadingCollege] = useState(true)
  const getCollegeDets = async () => {
    let collegeidFinal
    if (collegeid == 26) {
      collegeidFinal= 5;
    } else {
      collegeidFinal= collegeid;
    }
    const data = {
      collegeid: collegeidFinal,
    };
    try {
      const res = await axios.get("http://localhost:5000/getCollegeById", data);
      if (res.data.success) {
        console.log(res.data.data);
        setCollegeDets(res.data.data);
        setloadingCollege(false)
        document.getElementById('back').style.backgroundImage=`url(${res.data.data.image})`;
        //document.getElementById('back').style.opacity="0.6"; // specify the image path here
      } else {
        console.log("Error fetching!");
      }
    } catch (err) {
      console.log(err);
    }
    setloadingCollege(false)
    //console.log(category)
  };

  const { collegeid } = useParams();
  useEffect(() => {
    getCollegeDets();
  }, []);

  if(loadingCollege){
    return <>
    <h1>Loading</h1>
    </>
  }
  return (
    <>
      <div className="college-detail">
        <section className={`sub-header ${collegeDets.image}`} id="back">
          <NavBar />
        </section>
        <h1 onClick={() => getCollegeDets()} style={{color: "black" , textAlign: "center"}}>{collegeDets.name}</h1>
        <div className="course-row">
          <h3>Our Facilities</h3>
          <Carousel breakPoints={breakPoints}>
            {facilities.map((i, ind) => {
              return (
                <div class="facilities-col">
                  <img src={i.image} />

                  <h3>{i.name}</h3>
                </div>
              );
            })}
          </Carousel>
          <h3>Courses we offer</h3>
          <Carousel breakPoints={breakPoints}>
            {courses.map((i, ind) => {
              return (
                <div class="course-col">
                  <h3>{i.name}</h3>
                  <p>{i.desc}</p>
                </div>
              );
            })}
          </Carousel>
          <h3>Hear out from Alumni!</h3>
          {reviews.map((rev, ind) => {
            return (
              <div class="card">
                <div class="card-body">
                  <div class="row">
                    <div class="col-md-1">
                      <img
                        src="https://image.ibb.co/jw55Ex/def_face.jpg"
                        class="img img-rounded img-fluid"
                      />
                    </div>
                    <div class="col-md-11">
                      <p>
                        <strong>{rev.name}</strong>

                        {Array.apply(null, Array(rev.rating)).map((star) => {
                          return (
                            <span class="float-end">
                              <i class="text-warning fa fa-star"></i>
                            </span>
                          );
                        })}
                      </p>
                      <div class="clearfix"></div>
                      <p>{rev.comment}</p>
                      <p>
                        <a class="float-end btn text-white btn-danger">
                          {" "}
                          <i class="fa fa-heart"></i> {rev.likes}
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          <h3>FAQs</h3>
          <h5>
            <strong>Q.Is it worth?</strong>
          </h5>
          <p>This college has mnay things to offer. World class exposure!</p>
          <h5>
            <strong>Q.Does it have tie-ups with foreign universities?</strong>
          </h5>
          <p>
            Yes, it does. More than 97 MOUs have signed with European and
            American Universities
          </p>
          <h3>Leave a Feedback</h3>

          <div class="comment-box">
            <form class="comment-form">
              <input type="text" placeholder="Enter Name" value={commentName} onChange={(e)=>setcommentName(e.target.value)}/>
              <input type="email" placeholder="Enter Rating" value={commentRating} onChange={(e)=>setcommentRating(e.target.value)}/>
              <textarea rows="5" placeholder="Your Comment" value={commnetComment} onChange={(e)=>setcommnetComment(e.target.value)} ></textarea>
              <button type="submit" class="btn text-white btn-danger" onClick={(e)=> {
                e.preventDefault();
                let newvalue ={
                  name : commentName,
                  comment : commnetComment,
                  likes  :1,
                  rating : parseInt(commentRating)
                }
        setreviews([...reviews, newvalue])
              }}>
                Post Comment
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default CollegeDetail;
