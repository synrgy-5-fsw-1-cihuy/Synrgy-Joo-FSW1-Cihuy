import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useEffect, useState } from "react";
import axios from "axios";

const CARS_ENDPOINT_URL = "http://localhost:8001/api/cars";

const Content = () => {
  const [cars, setCars] = useState([]);
  const [filterCarParams, setFilterCar] = useState({});

  useEffect(() => {
    getAllCars();
  }, []);

  const getAllCars = async () => {
    const cars = await axios.get(CARS_ENDPOINT_URL);
    console.log(cars.data.data);
    setCars(cars.data.data);
  };

  const onFilterCarCapacityParam = async (event) => {
    const capacityParam = event.target.value;

    if (capacityParam === null || capacityParam === "") {
      getAllCars();
    }

    setFilterCar((prevState) => ({
      ...prevState,
      capacity: capacityParam,
    }));
  };

  const onFilterCarBookingDateParam = async (event) => {
    const bookingDateParam = event.target.value;

    if (bookingDateParam === null || bookingDateParam === "") {
      getAllCars();
    }

    setFilterCar((prevState) => ({
      ...prevState,
      booking_date: event.target.value,
    }));
  };

  const onFilterCarBookingTimeParam = async (event) => {
    const bookingTimeParam = event.target.value;

    if (bookingTimeParam === null || bookingTimeParam === "") {
      getAllCars();
    }

    setFilterCar((prevState) => ({
      ...prevState,
      booking_time: event.target.value,
    }));
  };

  const onEventSubmitFilter = (event) => {
    if (filterCarParams.booking_date != null && filterCarParams.booking_time != null) {
      const bookingDateParam = filterCarParams.booking_date + "T" + filterCarParams.booking_time + ":00Z";

      console.log(bookingDateParam);

      setFilterCar((prevState) => ({
        ...prevState,
        booking_date_parsed: bookingDateParam,
      }));
    }

    onShowFilterCars(filterCarParams);
    console.log(filterCarParams);

    event.preventDefault();
  };

  const onShowFilterCars = async (filter) => {
    if (filter.capacity != null) {
      const cars = await axios.get(CARS_ENDPOINT_URL + "?capacity=" + filter.capacity);
      setCars(cars.data.data);
    }

    if (filter.booking_date_parsed != null) {
      const filterCarsBookingDate = await axios.get(CARS_ENDPOINT_URL + "?bookingDate=" + filter.booking_date_parsed);
      setCars(filterCarsBookingDate.data.data);
    }
  };

  return (
    <div>
      <section id="main" className="pt-md-4 mt-5 mb-5 bg-gray">
        <div className="container">
          <div className="row row-cols-md-2 row-cols-1 gy-4">
            <div className="align-self-center px-md-2 p-4">
              <h1 className="fs-1 fw-bold">Sewa &amp; Rental Mobil Terbaik di kawasan Pelaihari</h1>
              <p className="w-75 py-2">Selamat datang di Binar Car Rental. Kami menyediakan mobil kualitas terbaik dengan harga terjangkau. Selalu siap melayani kebutuhanmu untuk sewa mobil selama 24 jam.</p>
            </div>
            <div className="align-self-center">
              <img src="/img/img_car.png" className="w-100" alt="Car" />
            </div>
          </div>
        </div>
      </section>
      <Container>
        <form onSubmit={(event) => onEventSubmitFilter(event)}>
          <div>
            <label>Filter by capacity</label>
            <input type="number" onChange={(event) => onFilterCarCapacityParam(event)} />
          </div>
          <div>
            <label>Filter by Date</label>
            <input type="date" onChange={(event) => onFilterCarBookingDateParam(event)} />
          </div>
          <div>
            <label>Filter by Time</label>
            <select onChange={(event) => onFilterCarBookingTimeParam(event)}>
              <option>Select waktu</option>
              <option value="00:00">00.00</option>
              <option value="01:00">01.00</option>
              <option value="02:00">02.00</option>
              <option value="03:00">03.00</option>
              <option value="04:00">04.00</option>
              <option value="05:00">05.00</option>
              <option value="06:00">06.00</option>
              <option value="07:00">07.00</option>
              <option value="08:00">08.00</option>
              <option value="09:00">09.00</option>
              <option value="10:00">10.00</option>
              <option value="11:00">11.00</option>
              <option value="12:00">12.00</option>
              <option value="13:00">13.00</option>
              <option value="14:00">14.00</option>
              <option value="15:00">15.00</option>
              <option value="16:00">16.00</option>
              <option value="17:00">17.00</option>
              <option value="18:00">18.00</option>
              <option value="19:00">19.00</option>
              <option value="20:00">20.00</option>
              <option value="21:00">21.00</option>
              <option value="22:00">22.00</option>
              <option value="23:00">23.00</option>
            </select>
          </div>
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
        <Row>
          {cars.map((car, index) => {
            return (
              <Col>
                <Card key={index} style={{ width: "18rem" }}>
                  <Card.Img variant="top" src={car.foto} />
                  <Card.Body>
                    <Card.Title>{car.name}</Card.Title>
                    <b>
                      <p>Rp. {car.price}</p> / hari
                    </b>
                    <Card.Text>Capacity {car.capacity}</Card.Text>

                    <Button variant="primary">Go somewhere</Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </div>
  );
};

export default Content;
