import React, { Component } from "react";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./mystyle.module.css";

// HUOM JSON SERVUN PORTTINA 3004
// json-servun käynnistys vscoden terminaalista(ctrl+shift+ö): json-server --watch --port 3004 src/db.json --delay 1000

function HyllyTaynna(saldo, hyllyMax) {
  console.log("######### saldo",saldo);
  console.log("######### hyllyMax",hyllyMax);
  return saldo >= hyllyMax; 
}

function HyllyTyhja(saldo){
  return saldo <= 0;
}

export class Tavarat extends Component {
  constructor(props) {
    super();

    this.delete = this.delete.bind(this);
    this.saldoLisaa = this.saldoLisaa.bind(this);
    this.saldoVahenna = this.saldoVahenna.bind(this);

    this.state = {
      data: null,
      tavara: "",
      hylly: "",
      isLoaded: false,
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  //haetaan kaikki data
  async fetchData() {
    let response = await fetch("http://localhost:3004/varasto/");
    let data = await response.json();
    console.log(data);
    this.setState({ data: data, isLoaded: true });
  }

  //tavaran poisto
  async delete(event) {
    console.log(event.target.id);
    await fetch("http://localhost:3004/varasto/" + event.target.id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      console.log(response);
      this.fetchData();
    });
  }

  //tavara inputin valuen päivitys state muuttujaan
  updateInputValue(evt) {
    const val = evt.target.value;

    this.setState({
      tavara: val,
    });
  }

  //hylly inputin valuen päivitys state muuttujaan
  updateHylly(evt) {
    const val = evt.target.value;

    this.setState({
      hylly: val,
    });
  }

    //saldon lisäys
    async saldoLisaa(event) {
      console.log(event.target.id);
      let response = await fetch("http://localhost:3004/varasto/" + event.target.id);
      let data = await response.json();

      const hyllyTaynna = HyllyTaynna(data.saldo, data.hyllyMax);
      console.log("#########hylly täynnä", hyllyTaynna);
      if(hyllyTaynna){
        alert("Hylly täynnä!")
        return;
      }

      await fetch("http://localhost:3004/varasto/" + event.target.id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({tavara: data.tavara, hylly: data.hylly, hyllyMax: data.hyllyMax,
         saldo: data.saldo +1 , lisatiedot: data.lisatiedot, id: event.target.id})
      }).then((response) => {
        console.log(response);
        this.fetchData();
      });
    }

       //saldon vähennys
       async saldoVahenna(event) {
        console.log(event.target.id);
        let response = await fetch("http://localhost:3004/varasto/" + event.target.id);
        let data = await response.json();

        const hyllyTyhja = HyllyTyhja(data.saldo)
        if(hyllyTyhja){
          return;
        }

        await fetch("http://localhost:3004/varasto/" + event.target.id, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({tavara: data.tavara, hylly: data.hylly, hyllyMax: data.hyllyMax,
           saldo: data.saldo -1 , lisatiedot: data.lisatiedot, id: event.target.id})
        }).then((response) => {
          console.log(response);
          this.fetchData();
        });
      }

  render() {
    //haku funktio
    const Search = async () => {
      this.setState({ isLoaded: false });
      this.setState({ data: null });
      console.log("DATA " + this.state.data);

      let qry = [];

      if (this.state.tavara !== "") {
        qry.push("tavara_like=" + this.state.tavara);
      }
      if (this.state.hylly !== "") {
        qry.push("hylly_like=" + this.state.hylly); //queryn teko
      }
      qry = qry.join("&"); //.join metodilla palauttaa stringin ja alkioiden väliin "&" merkin
      console.log("QUERY " + qry);
      let response = await fetch("http://localhost:3004/varasto?" + qry); // tehdään haku queryn kanssa ja viedään data state muuttujaan
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
      let varastoTaulu = this.state.data.map(
        (
          i // mapataan data taulukko valmiiksi table elementtiin sopivaksi
        ) => (
          <tr key={i.id}>
            <td> {i.id} </td>
            <td> {i.tavara} </td>
            <td> {i.hylly} </td>
            <td> {i.saldo} </td>
            <td> {i.lisatiedot} </td>
            <td> 
            <button onClick={this.saldoVahenna} id={i.id}>
              -
            </button> 
            <button onClick={this.saldoLisaa} id={i.id}>
            +
            </button> 
            </td>
            <td>
              <button className={styles.bouncy} onClick={this.delete} id={i.id}>
                Poista
              </button>
            </td>
            <td>
              {" "}
              <Link to="/muokkaa" MuokkaaTavaraa={this.state.id} state={i.id}>
                {" "}
                {/* muokkaa linkki, viedään propsina tavaran id */}
                Muokkaa
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
          <Link to="/lisaa">LISÄÄ UUSI</Link>
          <br></br>
          <br></br>
          <div>
            <label>Hae tavaraa nimellä </label> <br></br>
            <input
              className={styles.tinputs}
              value={this.state.tavara}
              onChange={(evt) => this.updateInputValue(evt)}
            />
          </div>
          <div>
            <label>Hae hyllyn numerolla </label><br></br>
            <input
              className={styles.tinputs}
              value={this.state.hylly}
              onChange={(evt) => this.updateHylly(evt)}
            />{" "}
            <br></br>
            <br></br>
            <button
              data-testid="haeNappi"
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
                    <td>Tavara</td>
                    <td>Hylly</td>
                    <td>Saldo</td>
                    <td>Lisätiedot</td>
                    <td>Saldo hallinta</td>
                    <td>Poista tavara</td>
                    <td>Muokkaa</td>
                  </tr>
                </thead>
                <tbody className={styles.customers} id="customers">
                  {varastoTaulu}
                </tbody>
              </table>
            )}
          </div>
        </div>
      );
    }
  }
}

export function Koti() {
  return (
    <div>
      <h1>Tervetuloa varasto sovellukseen</h1>
      <p></p>
      <Link to="/tavarat">TAVARAT</Link>
      <p></p>
      <Link to="/lisaa">LISÄÄ UUSI</Link>
    </div>
  );
}
