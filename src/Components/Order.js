import React, { Component } from "react";
import ReactModal from "react-modal";
import { Link } from "react-router-dom";
import { createorder } from "../Requestdata/CallAPI";
class Order extends Component {
  user_login_infor1 = JSON.parse(localStorage.getItem("user_login_infor"));
  constructor(props) {
    super(props);
    this.state = {
      province: "",
      district: "",
      villgage: "",
      home: "",
      phone: "",
      fullname: this.user_login_infor1
        ? this.user_login_infor1.fullname
        : "no person",
      isopenmodalalert: false,
    };
  }
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  buy = (quantity, totalprice) => {
    let body = {
      description: "",
      fullname: this.state.fullname,
      quantity: quantity,
      totalPrice: totalprice,
      address:
        this.state.home +
        "," +
        this.state.villgage +
        "," +
        this.state.district +
        "," +
        this.state.province,
      phone: this.state.phone,
    };
    if (
      this.state.fullname === "" ||
      this.state.phone === "" ||
      this.state.home === "" ||
      this.state.villgage === "" ||
      this.state.district === "" ||
      this.state.province === ""
    ) {
      this.setState({ isopenmodalalert: "true" });
      return;
    }
    createorder(body).then((response) => {
      alert(response.data);
    });
  };
  format2 = (n) => {
    if (n === undefined) {
      return null;
    }
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  render() {
    let list = this.props.location.state
      ? this.props.location.state.listcart
      : [];
    let totalprice = 0;
    let quantity = 0;
    for (let index = 0; index < list.length; index++) {
      if (list[index].status === "Order") {
        quantity = quantity + list[index].quantity;
        totalprice =
          totalprice +
          (Number(list[index].product.price) -
            (Number(list[index].product.price) *
              Number(list[index].product.discount)) /
              100) *
            Number(list[index].quantity);
      }
    }
    let rows = list.map((row, index) => {
      if (row.status === "Order") {
        return (
          <tr key={index}>
            <td>
              <Link
                to={{
                  pathname: "/dienthoai/" + row.id,
                  state: {
                    id: row.id,
                  },
                }}
              >
                <img
                  src={row.product.image}
                  alt=""
                  style={{ width: "70px", height: "auto" }}
                />
              </Link>
              <span>
                {row.product.name}({row.product.ram}/{row.product.memory})
              </span>
            </td>
            <td>
              {this.format2(
                Number(row.product.price) -
                  (Number(row.product.price) * Number(row.product.discount)) /
                    100
              )}
              ??
            </td>
            <td>{row.quantity}</td>
            <td>
              {this.format2(
                (Number(row.price) -
                  (Number(row.price) * Number(row.product.discount)) / 100) *
                  Number(row.quantity)
              )}
              ??
            </td>
          </tr>
        );
      }
    });

    return (
      <div style={{ marginLeft: "5px", fontSize: "1.5rem" }}>
        <h2>Vui l??ng nh???p th??ng tin</h2>
        <hr class="mt-1" />
        <div style={{ display: "table" }}>
          <tr key="">
            <td>
              <label>H??? v?? T??n ng?????i nh???n h??ng :</label>{" "}
            </td>
            <td>
              <span style={{}}>
                <input
                  class="order-form-input"
                  name="fullname"
                  value={this.state.fullname}
                  onChange={this.handleChange}
                />
                <span
                  style={{
                    position: "relative",
                    bottom: "5px",
                    color: "red",
                  }}
                >
                  {" "}
                  *
                </span>
              </span>
            </td>
          </tr>
          <tr key="">
            <td>
              <label>S??? ??i???n tho???i nh???n h??ng :</label>{" "}
            </td>

            <td>
              <span style={{}}>
                <input
                  class="order-form-input"
                  placeholder="0123456789"
                  name="phone"
                  value={this.state.phone}
                  onChange={this.handleChange}
                />
                <span
                  style={{
                    position: "relative",
                    bottom: "5px",
                    color: "red",
                  }}
                >
                  {" "}
                  *
                </span>
              </span>
            </td>
          </tr>
          <tr key="">
            <td>
              <label>?????a ch??? nh???n h??ng :</label>{" "}
            </td>
            <td>
              <span style={{}}>
                <span>
                  <input
                    class="order-form-input"
                    placeholder="T???nh / Th??nh ph???"
                    name="province"
                    value={this.state.province}
                    onChange={this.handleChange}
                  />
                  <span
                    style={{
                      position: "relative",
                      bottom: "5px",
                      color: "red",
                    }}
                  >
                    {" "}
                    *
                  </span>
                </span>
                <span>
                  {" "}
                  <input
                    class="order-form-input"
                    placeholder="Huy???n"
                    name="district"
                    value={this.state.district}
                    style={{}}
                    onChange={this.handleChange}
                  />
                  <span
                    style={{
                      position: "relative",
                      bottom: "5px",
                      color: "red",
                    }}
                  >
                    {" "}
                    *
                  </span>
                </span>
                <span>
                  {" "}
                  <input
                    class="order-form-input"
                    placeholder="X??"
                    name="villgage"
                    value={this.state.villgage}
                    style={{}}
                    onChange={this.handleChange}
                  />
                  <span
                    style={{
                      position: "relative",
                      bottom: "5px",
                      color: "red",
                    }}
                  >
                    {" "}
                    *
                  </span>
                </span>
                <span>
                  {" "}
                  <input
                    class="order-form-input"
                    placeholder="T??n ???????ng / Th??n / X??m"
                    name="home"
                    value={this.state.home}
                    style={{}}
                    onChange={this.handleChange}
                  />
                  <span
                    style={{
                      position: "relative",
                      bottom: "5px",
                      color: "red",
                    }}
                  >
                    {" "}
                    *
                  </span>
                </span>
              </span>
            </td>
            <td></td>
          </tr>
        </div>
        <hr />
        <div>
          <h2>S???n ph???m ({quantity} s???n ph???m)</h2>

          <div class="table-responsive">
            <table class="table table-hover">
              <thead>
                <tr style={{ fontSize: "2rem" }}>
                  <th>Th??ng tin s???n ph???m</th>
                  <th>????n gi??</th>
                  <th>S??? l?????ng</th>
                  <th>Th??nh ti???n</th>
                </tr>
              </thead>
              <tbody>{rows}</tbody>
            </table>
          </div>
        </div>

        <hr style={{ clear: "both" }} />
        <div style={{ display: "table-row" }}>
          <ReactModal
            isOpen={this.state.isopenmodalalert}
            onRequestClose={() => this.setState({ isopenmodalalert: false })}
            style={{
              overlay: { background: "none" },
              content: {
                display: "inline-block",
                margin: "auto",
                height: "80px",
                backgroundColor: "red",
                color: "white",
                fontSize: "17px",
              },
            }}
          >
            B???n vui l??ng ki???m tra l???i th??ng tin nh???n h??ng !
          </ReactModal>
          <tr key="">
            <td>
              <label>Ph????ng th???c thanh to??n :</label>
            </td>
            <td>Thanh to??n khi nh???n h??ng</td>
          </tr>
          <tr key="">
            <td>
              <label>T???ng ti???n :</label>
            </td>
            <td>{this.format2(totalprice)} ??</td>
          </tr>
          <tr key="">
            <td>
              <label>Ph?? v???n chuy???n :</label>
            </td>
            <td>30,000 ??</td>
          </tr>
          <tr key="">
            <td></td>
            <td>
              <button
                style={{
                  width: "230px",
                  paddingBlock: "5px",
                  backgroundColor: "aquamarine",
                  border: "none",
                  boxShadow: "-2px 1px 9px 0px  red",
                }}
                onClick={() => this.buy(quantity, totalprice)}
              >
                ?????t h??ng
              </button>
            </td>
          </tr>
        </div>
      </div>
    );
  }
}

export default Order;
