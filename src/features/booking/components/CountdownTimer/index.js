import { Alert, Modal } from "antd";
import { useCountdown } from "common/hooks/useCountdown";
import React, { useState } from "react";
import Swal from "sweetalert2";
import { history } from "app/App";
import DateTimeDisplay from "../DateTimeDisplay";

const CountdownTimer = ({ targetDate }) => {
  const [minutes, seconds] = useCountdown(targetDate);
  const ExpiredNotice = () => {
    return Swal.fire({
      title: "Quá thời gian giữ ghế, vui lòng đặt lại!",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#fb4226",
      cancelButtonColor: "rgb(167 167 167)",
      confirmButtonText: "OK",
    }).then((res) => {
      window.location.reload();
    });
  };
  const ShowCounter = ({ minutes, seconds }) => {
    return (
      <div className="show-counter">
        <a
          href="https://tapasadhikary.com"
          target="_blank"
          rel="noopener noreferrer"
          className="countdown-link"
        >
          <DateTimeDisplay
            value={minutes}
            type={"Phút"}
            isDanger={minutes <= 6}
          />
          <p>:</p>
          <DateTimeDisplay value={seconds} type={"Giây"} isDanger={false} />
        </a>
      </div>
    );
  };

  if (minutes + seconds <= 0) {
    return <ExpiredNotice />;
  } else {
    return <ShowCounter minutes={minutes} seconds={seconds} />;
  }
};
export default CountdownTimer;
