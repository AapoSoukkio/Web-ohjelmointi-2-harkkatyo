import React, { Component } from "react";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./mystyle.module.css";

// HUOM JSON SERVUN PORTTINA 3004
// json-servun käynnistys vscoden terminaalista(ctrl+shift+ö): json-server --watch --port 3004 src/db.json --delay 1000

export class Asiakkaat extends Component {
  constructor(props) {
    super();

    this.lisaaTesti = this.lisaaTesti.bind(this);
    this.delete = this.delete.bind(this);

    this.state = {
      data: null,
      nimi: "",
      osoite: "",
      isLoaded: false,
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  //haetaan kaikki data
  async fetchData() {
    let response = await fetch("http://localhost:3004/asiakas");
    let data = await response.json();
    console.log(data);
    this.setState({ data: data, isLoaded: true });
  }

  //testi asiakkaan lisäys
  async lisaaTesti() {
    await fetch("http://localhost:3004/asiakas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nimi: "tst", osoite: "testi" }),
    }).then((response) => {
      console.log(response);
      this.fetchData();
    });
  }

  //asiakkaan poisto
  async delete(event) {
    console.log(event.target.id);
    await fetch("http://localhost:3004/asiakas/" + event.target.id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      console.log(response);
      this.fetchData();
    });
  }

  //nimi inputin valuen päivitys state muuttujaan
  updateInputValue(evt) {
    const val = evt.target.value;

    this.setState({
      nimi: val,
    });
  }

  //osoite inputin valuen päivitys state muuttujaan
  updateOsoite(evt) {
    const val = evt.target.value;

    this.setState({
      osoite: val,
    });
  }

  render() {
    //haku funktio
    const Search = async () => {
      this.setState({ isLoaded: false });
      this.setState({ data: null });
      console.log("DATA " + this.state.data);

      let qry = [];

      if (this.state.nimi !== "") {
        qry.push("nimi_like=" + this.state.nimi);
      }
      if (this.state.osoite !== "") {
        qry.push("osoite_like=" + this.state.osoite); //queryn teko
      }
      qry = qry.join("&"); //.join metodilla palauttaa stringin ja alkioiden väliin "&" merkin
      console.log("QUERY " + qry);
      let response = await fetch("http://localhost:3004/asiakas?" + qry); // tehdään haku queryn kanssa ja viedään data state muuttujaan
      let res2 = await response.json();
      this.setState({
        data: res2,
        isLoaded: true,
      });
      console.log("data" + this.state.data);
    };

    if (!this.state.isLoaded) {
      return <h1 className={styles.loading}>Loading...</h1>; //loading teksti haun välissä
    } else {
      let asiakasTaulu = this.state.data.map(
        (
          i // mapataan data taulukko valmiiksi table elementtiin sopivaksi
        ) => (
          <tr key={i.id}>
            <td> {i.id} </td>
            <td> {i.nimi} </td>
            <td> {i.osoite} </td>
            <td> {i.postinumero} </td>
            <td> {i.postitoimipaikka} </td>
            <td> {i.puhelinnro} </td>
            <td>
              <button className={styles.bouncy} onClick={this.delete} id={i.id}>
                Poista
              </button>
            </td>
            <td>
              {" "}
              <Link to="/yhteystiedot" state={i.id}>
                {" "}
                {/* Yhteystiedot linkki, viedään propsina asiakkaan id */}
                Yhteystiedot
              </Link>
            </td>
          </tr>
        )
      );

      return (
        <div>
          <Link to="/">KOTI</Link>
          <br />
          <br />
          <Link to="/yhteystiedot">YHTEYSTIEDOT</Link>
          <br></br>
          <br></br>
          <button className={styles.bouncy} onClick={this.lisaaTesti}>
            Lisää testi
          </button>
          <br></br>
          <br></br>
          <div>
            <label>Nimi</label>
            <input
              className={styles.tinputs}
              value={this.state.nimi}
              onChange={(evt) => this.updateInputValue(evt)}
            />
          </div>
          <div>
            <label>Osoite</label>
            <input
              className={styles.tinputs}
              value={this.state.osoite}
              onChange={(evt) => this.updateOsoite(evt)}
            />{" "}
            <br></br>
            <br></br>
            <button
              className={styles.bouncy}
              onClick={() => Search(this.state)}
            >
              Hae
            </button>
            <br></br>
            <br></br>
          </div>
          <div>
            {this.state.data == "" ? ( //conditional renderingilla näytetäänkö error msg / table
              <div>
                <h1 className={styles.error}>
                  Annetuilla hakuehdoilla ei löytynyt dataa
                </h1>
              </div>
            ) : (
              <table>
                <thead>
                  <tr>
                    <td>Id</td>
                    <td>Nimi</td>
                    <td>Osoite</td>
                    <td>Postinumero</td>
                    <td>Postitoimipaikka</td>
                    <td>Puhelinnro</td>
                    <td>Poistelu</td>
                    <td>Yhteystiedot</td>
                  </tr>
                </thead>
                <tbody className={styles.customers} id="customers">
                  {asiakasTaulu}
                </tbody>
              </table>
            )}
          </div>
        </div>
      );
    }
  }
}

export const Yhteystiedot = (props) => {
  console.log("yhteystiedot");
  const [asiakas, setAsiakas] = useState([]); // hookkeja sai käyttää näissä tehtävissä
  const [load, setLoad] = useState(false); // -''-

  const location = useLocation();
  const state = location.state;
  console.log("STATE = " + state);

  useEffect(() => {
    const fetchAsiakas = async () => {
      const r = await fetch("http://localhost:3004/asiakas/" + state); //haetaan asiakas propsina tulleen id:n avulla
      const data = await r.json();
      setAsiakas(data);
      setLoad(true);
      console.log("Data useeffetist" + data.nimi);
    };
    fetchAsiakas();
  }, []); // kun jättää [] tyhjäksi, useEffect ajaa läpi vain kerran

  return (
    <div>
      {!load ? (
        <h1 className={styles.loading}>Loading...</h1>
      ) : (
        <div>
          <h1>Tää on yhteystiedot sivu</h1>
          <h2>ID: {asiakas.id}</h2>
          <h2>Nimi: {asiakas.nimi}</h2>
          <h2>Osoite: {asiakas.osoite}</h2>
          <h2>Postinumero: {asiakas.postinumero}</h2>
          <h2>Postitoimipaikka: {asiakas.postitoimipaikka}</h2>
          <h2>Puhelinnumero: {asiakas.puhelinnro}</h2>
          <br />
          <Link to="/">KOTI</Link>
          <p></p>
          <Link to="/asiakkaat">ASIAKKAAT</Link>
        </div>
      )}
    </div>
  );
};

export function Koti() {
  return (
    <div>
      <h1>Tää on koti_______sivu</h1>
      <Link to="/yhteystiedot">YHTEYSTIEDOT</Link>
      <p></p>
      <Link to="/asiakkaat">ASIAKKAAT</Link>
    </div>
  );
}
