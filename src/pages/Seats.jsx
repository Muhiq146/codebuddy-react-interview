import React, { useState } from 'react';

const Seats = () => {
  const [rowCount, setRowCount] = useState(0);
  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [totalCost, setTotalCost] = useState(0);

  const fetchSeats = () => {
    if (rowCount < 3 || rowCount > 10) {
      alert('Rows should be between 3 and 10');
      return false;
    }
    setSelectedSeats([]);
    setTotalCost(0);
    fetch(`https://codebuddy.review/seats?count=${rowCount}`)
      .then(response => response.json())
      .then(seatsData => {
        setSeats(seatsData.data?.seats);
      })
      .catch(error => console.error(error));
  };

  const handleSeatClick = (seatId, row) => {
    const seatIndex = selectedSeats.indexOf(seatId);
    let bookedseats = [];
    let cost = (row + 1) * 10 + 20;
    if (seatIndex > -1) {
      bookedseats = selectedSeats.filter(id => id !== seatId);
      setTotalCost(prev => prev - cost);
    } else {
      bookedseats = [...selectedSeats, seatId];
      setTotalCost(prev => prev + cost);
    }
    bookedseats.sort((a, b) => {
      return a - b;
    });
    setSelectedSeats(bookedseats);
  };

  const renderSeats = () => {
    let allColumns = [...seats].reverse();
    return allColumns.map((column, index) => (
      <div key={column.id}>
        <div className="float-start ms-5">Row {index + 1}</div>
        <div className="d-flex flex-wrap justify-content-center">
          {column?.seats.map(seat => {
            return (
              <div key={seat.id}>
                <div className="form-check">
                  <input
                    className={`form-check-input${seat?.isReserved ? ' bg-dark' : ''}`}
                    type="checkbox"
                    disabled={seat?.isReserved}
                    id={seat?.id}
                    checked={selectedSeats.indexOf(seat?.seatNumber) != -1}
                    onChange={() => handleSeatClick(seat.seatNumber, seat.row)}
                  />
                </div>
                <div className='ps-1'>{seat.seatNumber}</div>
              </div>
            );
          })}
        </div>
      </div>
    ));
  };

  return (
    <div>
      <div className="text-center mb-5">
        <h2>Movie Theater Seat Booking</h2>
      </div>

      <div className="text-center">
        <label htmlFor="row-count">Number of Rows:</label>
        <input
          type="text"
          maxLength="2"
          value={rowCount}
          onKeyPress={event => {
            if (!/[0-9]/.test(event.key)) event.preventDefault();
          }}
          onChange={event => setRowCount(event.target.value)}
        />
        <button onClick={fetchSeats}>Fetch Seats</button>
      </div>
      <div className="my-4">{renderSeats()}</div>

      {seats?.length ? (
        <>
          <div className="text-end me-5 selected-seats">
            Selected Seats: {selectedSeats.join(', ')}
          </div>
          <div className="text-end me-5 total-cost">Total Cost: ${totalCost}</div>
        </>
      ) : null}
    </div>
  );
};

export default Seats;
