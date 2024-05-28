import { useState } from "react";
import Axios from "axios";
import { Item, Input } from "./BookingInforElement";
import { useNavigate } from "react-router-dom";



const BookingInfor = () => {
  const [ticketId, setTicketId] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [fullName, setFullName] = useState("");
  const [cccd, setCCCD] = useState("");
  const [showTicketInfor, setShowTicketInfor] = useState(false);
  const [tickets, setTickets] = useState([]);
  const navigate = useNavigate();

  const pressedVerify = async () => {
    try {
      const response = await Axios.get("http://localhost:8080/tickets", {
        params: {
          email: email,
          phone: mobileNo,
          fullName:fullName,
          cccd:cccd
        },
      });
      console.log("hihi",response.data);
      setTickets(response.data);
      setShowTicketInfor(true);
    } catch (error) {
      console.log(error);
      alert("Error verifying ticket");
    }
  };


  console.log("Hih", tickets)

  return (
    <div
      style={{
        display: "flex",
        width: "80%",
        position: "relative",
        zIndex: 1,
        top: "80px",
        padding: "20px",
        border: "1px solid black",
        margin: "0 auto",
        flexDirection: "column",
        borderTop: "none",
      }}
    >
      <div>
        <div className="flex flex-row gap-0">
          <h2 className="text-white font-bold bg-customBlue rounded-tr-none rounded-br-none rounded">
            LOOK UP BOOKING INFORMATION
          </h2>
          <img
            src="label_bg.png"
            alt="Description of image"
            className="rounded-tl-none rounded-bl-none rounded"
          />
        </div>
      </div>

      <span className="font-medium my-3">
        To look up information, please enter the 3 information below correctly.
      </span>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "42px",
            marginLeft: "130px",
          }}
        >
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "85px",
            marginLeft: "130px",
          }}
        >
          <div>
            <span>Email </span>
            <span className="text-red-500">*</span>
          </div>

          <Input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              marginLeft: "22px",
            }}
          />
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "10px",
            marginLeft: "130px",
          }}
        >
          <div>
            <span>Phone number </span>
            <span className="text-red-500">*</span>
          </div>

          <Input
            type="text"
            value={mobileNo}
            onChange={(e) => setMobileNo(e.target.value)}
            style={{
              marginLeft: "23px",
            }}
          />
        </div>
      </div>

      <div
        style={{
          marginTop: "20px",
          marginLeft: "160px",
        }}
      >
        <button
          style={{
            backgroundColor: "#0082c4",
            color: "white",
            padding: "10px",
            borderRadius: "5px",
            border: "none",
            marginLeft: "130px",
          }}
          onClick={pressedVerify}
        >
          Search
        </button>
      </div>

      {showTicketInfor && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            marginTop: "20px",
          }}
        >
          <span
            style={{
              color: "#dd5227",
              fontSize: "15px",
              fontWeight: "bold",
            }}
          >
            Successful transactions
          </span>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "0.1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr",
            }}
          >
            <Item style={{ backgroundColor: "#eeeeee", textAlign: "center" }}>
              ID
            </Item>
            <Item style={{ backgroundColor: "#eeeeee", textAlign: "center" }}>
              From{" "}
            </Item>
            <Item style={{ backgroundColor: "#eeeeee", textAlign: "center" }}>
              To{" "}
            </Item>
            <Item style={{ backgroundColor: "#eeeeee", textAlign: "center" }}>
              Train carriage{" "}
            </Item>
            <Item style={{ backgroundColor: "#eeeeee", textAlign: "center" }}>
              Seat
            </Item>
            <Item style={{ backgroundColor: "#eeeeee", textAlign: "center" }}>
              Time Start{" "}
            </Item>
            <Item style={{ backgroundColor: "#eeeeee", textAlign: "center" }}>
              Amount (VND){" "}
            </Item>
            <Item style={{ backgroundColor: "#eeeeee", textAlign: "center" }}>
              Status
            </Item>
            {tickets.map((ticket) => (
              <>
                <Item>{ticket.id}</Item>
                <Item>{ticket.fromStation}</Item>
                <Item>{ticket.toStation}</Item>
                <Item>{ticket.nameCar}</Item>
                <Item>{ticket.seatName}-{ticket.seatIndex}</Item>
                <Item>{ticket.timeStart}</Item>
                <Item>{ticket.price}</Item>
                <Item>{ticket.status}</Item>
              </>
            ))}
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "5px",
              color: "#0082c4",
              marginTop: "20px",
            }}
          >
            <span>
              Quý khách có thể liên hệ với trung tâm hỗ trợ khách hàng 19006469
              để được trợ giúp.
            </span>
            <span>
              Chúng tôi phục vụ quý khách 24 giờ trong ngày và 7 ngày trong
              tuần.
            </span>
          </div>

          <span
            style={{
              color: "#dd5227",
              fontSize: "15px",
              fontWeight: "bold",
            }}
          >
            Thông tin người đặt vé
          </span>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              marginLeft: "130px",
              marginTop: "10px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "10px",
              }}
            >
              <div
                style={{
                  width: "50%",
                }}
              >
                <span>Full name </span>
                <Input
                  type="text"
                  disabled={true}
                  value={tickets[0].customer.fullName}
                  style={{
                    marginLeft: "76px",
                  }}
                />
              </div>

              <div
                style={{
                  width: "50%",
                }}
              >
                <span>Email </span>
                <Input
                  type="email"
                  disabled={true}
                  value={email}
                  style={{
                    marginLeft: "88px",
                  }}
                />
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "10px",
              }}
            >
              <div
                style={{
                  width: "50%",
                }}
              >
                <span>ID card </span>
                <Input
                  type="text"
                  disabled={true}
                  value={tickets[0].customer.cccd}
                  style={{
                    marginLeft: "97px",
                  }}
                />
              </div>

              <div
                style={{
                  width: "50%",
                }}
              >
                <span>Phone number</span>
                <Input
                  type="phone"
                  disabled={true}
                  value={mobileNo}
                  style={{
                    marginLeft: "18px",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default BookingInfor;
