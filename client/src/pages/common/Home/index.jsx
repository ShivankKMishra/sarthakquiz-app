import { Col, message, Row } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllExams } from "../../../apicalls/exams";
import { HideLoading, ShowLoading } from "../../../redux/loaderSlice";
import PageTitle from "../../../components/PageTitle";
import { useNavigate } from "react-router-dom";
import { parseISO } from "date-fns";
import dayjs from "dayjs";
function Home() {
  const [exams, setExams] = React.useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);
  const getExams = async () => {
    try {
      dispatch(ShowLoading());
      const response = await getAllExams();
      if (response.success) {
        setExams(response.data);
      } else {
        message.error(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  useEffect(() => {
    getExams();
  }, []);

  useEffect(() => {
    console.log(exams[0]);
  }, [exams]);

  return (
    user && (
      <div>
        <PageTitle title={`Hi ${user.name}, Welcome to QuizCraft`} />
        <div className="divider"></div>
        <Row gutter={[16, 16]}>
          {exams &&
            exams.map((exam) => (
              <Col span={6}>
                <div className="card-lg flex flex-col gap-1 p-2">
                  <h1 className="text-2xl">{exam?.name}</h1>

                  <h1 className="text-md">Topic : {exam.category}</h1>

                  <h1 className="text-md">Total Marks : {exam.totalMarks}</h1>
                  <h1 className="text-md">
                    Passing Marks : {exam.passingMarks}
                  </h1>
                  <h1 className="text-md">Duration : {exam.duration}</h1>
                  <h1 className="text-md">
                    Start Time:{" "}
                    {dayjs(exam.datetime[0]).format("YYYY-MM-DD HH:mm")}
                  </h1>
                  <h1 className="text-md">
                    End Time:{" "}
                    {dayjs(exam.datetime[1]).format("YYYY-MM-DD HH:mm")}
                  </h1>
                  <button
                    className="primary-outlined-btn"
                    onClick={() => navigate(`/user/write-exam/${exam._id}`)}
                  >
                    Start Exam
                  </button>
                </div>
              </Col>
            ))}
        </Row>
      </div>
    )
  );
}

export default Home;
