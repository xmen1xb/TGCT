import React, { Component } from "react";
import { NavLink, Switch, Route, Redirect } from "react-router-dom";
import { getlistproduct, deleteproduct } from "../Requestdata/CallAPI";
import { connect } from "react-redux";
import {
  setlistproduct,
  setallorder,
  setlogin,
  setcart,
  setcartdetail,
  setprofile,
  setlistaccount,
} from "../Actions/index";
import slides from "./Carousel";
import AddProduct from "./AddProduct";
import Addimageslide from "./AddImageSlide";
import ReactModal from "react-modal";

class Productmanager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      prid: 0,
      isopenmodaladd: false,
      isopenmodaladdslide: false,
      isopenid: null,
      isavtiveclass: false,
    };
  }
  format2 = (n) => {
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  Nextproduct = () => {
    if (this.props.totalpageproduct !== this.props.currenpageproduct + 1) {
      getlistproduct(this.props.currenpageproduct + 1 + 1, "", "", "", "").then(
        (data) => {
          this.props.getlistproduct(data.data);
        }
      );
    }
  };
  Previosproduct = () => {
    if (this.props.currenpageproduct !== 0) {
      getlistproduct(this.props.currenpageproduct, "", "", "", "").then(
        (data) => {
          this.props.getlistproduct(data.data);
        }
      );
    }
  };
  DeleteProduct = (id) => {
    deleteproduct(id).then(() => {
      getlistproduct(1, "", "", "", "").then((response) => {
        this.props.getlistproduct(response.data);
      });
    });
  };
  showimageslide = (id) => {
    if (id === this.state.prid) {
      this.setState({
        prid: 0,
      });
    } else {
      this.setState({
        prid: id,
      });
    }
  };
  componentDidMount() {
    getlistproduct(1, "", "", "", "").then((response) => {
      this.props.getlistproduct(response.data);
    });

    this.setState({ isavtiveclass: true });
  }
  render() {
    let rows2;
    if (this.props.listpro) {
      rows2 = this.props.listpro.map((row, index) => {
        let date = new Date(row.enter_date);
        return (
          <tr key={index}>
            <td>{row.id}</td>
            <td>{row.name}</td>
            <td>{row.price}</td>
            <td>{row.discount}%</td>
            <td>{row.brand}</td>
            <td>{row.category}</td>
            <td>
              <p className="description">{row.description}</p>
            </td>
            <td>{row.ram}</td>
            <td>{row.memory}</td>
            <td>{row.camera}</td>
            <td>{row.color}</td>
            <td>{row.screenSize}</td>
            <td>{row.operatingSystem}</td>
            <td>{row.chip}</td>
            <td>{row.battery} mAh</td>
            <td>{row.sim}</td>
            <td>
              <button onClick={() => this.setState({ isopenid: row.id })}>
                Xem
              </button>
              <ReactModal
                style={{
                  overlay: {},
                  content: {
                    width: "600px",
                    margin: "auto",
                  },
                }}
                isOpen={this.state.isopenid === row.id}
                onRequestClose={() => this.setState({ isopenid: null })}
              >
                <img style={{ width: "535px" }} src={row.image} alt="" />
              </ReactModal>
            </td>
            <td>
              <button onClick={() => this.showimageslide(row.id)}>
                {row.listResponse ? row.listResponse.length : 0}
              </button>
              <ReactModal
                style={{
                  overlay: {},
                  content: { width: "650px", margin: "auto", height: "auto" },
                }}
                isOpen={this.state.prid === row.id}
                onRequestClose={() => this.setState({ prid: 0 })}
              >
                <div
                  style={{ width: "600px", float: "left", marginLeft: "2px" }}
                >
                  {slides(row.listResponse, "600px")}
                </div>
              </ReactModal>
              <button
                onClick={() => this.setState({ isopenmodaladdslide: true })}
              >
                <span className="glyphicon glyphicon-plus"></span>
              </button>
              <Addimageslide
                isopenmodaladdslide={this.state.isopenmodaladdslide}
                setisopenmodaladdslide={(data) => {
                  this.setState({ isopenmodaladdslide: data });
                }}
                producID={row.id}
              />
            </td>
            <td>{row.quantity}</td>
            <td>{date.toDateString()}</td>
          </tr>
        );
      });
    }
    let Previosproduct;
    let Nextproduct;
    if (
      this.props.currenpageproduct === 0 ||
      this.props.currenpageproduct === undefined
    ) {
      Previosproduct = "";
    } else {
      Previosproduct = (
        <button className="page-link" onClick={this.Previosproduct}>
          Previous
        </button>
      );
    }
    if (
      this.props.totalpageproduct === this.props.currenpageproduct + 1 ||
      this.props.currenpageproduct === undefined
    ) {
      Nextproduct = "";
    } else {
      Nextproduct = (
        <button className="page-link" onClick={this.Nextproduct}>
          Next
        </button>
      );
    }
    let page = [];
    for (let index = 0; index < this.props.totalpageproduct; index++) {
      let button = (
        <button
          className="page-link"
          id={this.props.currenpageproduct === index ? "buttonpage" : "abc"}
          onClick={() => {
            getlistproduct(index + 1, "", "", "", "").then((data) => {
              this.props.getlistproduct(data.data);
            });
          }}
        >
          {index + 1}
        </button>
      );
      page.push(button);
    }
    let nav = (
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className="page-item" id="show">
            {Previosproduct}
            {page}
            {Nextproduct}
          </li>
        </ul>
        <ul className="pagination" id="pagination"></ul>
      </nav>
    );
    return (
      <div
        className={
          this.state.isavtiveclass === true ? "navactive" : "navnoactive"
        }
      >
        <div style={{ fontSize: "30px" }}>
          <button
            onClick={() => {
              this.setState({ isopenmodaladd: true });
            }}
            style={{ backgroundColor: "aqua" }}
          >
            <span className="glyphicon glyphicon-plus"></span>{" "}
            <span>Th??m S???n Ph???m M???i</span>
          </button>
          <AddProduct
            isopen={this.state.isopenmodaladd}
            setisopenmodaladd={(data) =>
              this.setState({ isopenmodaladd: data })
            }
          />
        </div>
        <table className="table table-bordered table-hover">
          <thead>
            <tr>
              <th>Id</th>
              <th>T??n sp</th>
              <th>Gi??</th>
              <th>KM</th>
              <th>H??ng</th>
              <th>Lo???i</th>
              <th>M?? t???</th>
              <th>Ram</th>
              <th>B??? nh??? trong</th>
              <th>Camera</th>
              <th>M??u</th>
              <th>KT m??n h??nh</th>
              <th>H??H</th>
              <th>Chip</th>
              <th>Pin</th>
              <th>Lo???i sim h??? tr???</th>
              <th>Avatar</th>
              <th>SlideShow</th>
              <th>H??ng trong kho</th>
              <th>Ng??y nh???p h??ng</th>
            </tr>
          </thead>
          <tbody>{rows2}</tbody>
        </table>{" "}
        <div style={{ textAlign: "center" }}>{nav}</div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    totalpageproduct: state.productreducer.totalPage,
    currenpageproduct: state.productreducer.currenPage,
    listpro: state.productreducer.listproduct,
  };
};
const mapDispatchToProps = (dispath) => {
  return {
    getlistproduct: (list) => {
      dispath(setlistproduct(list));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Productmanager);
