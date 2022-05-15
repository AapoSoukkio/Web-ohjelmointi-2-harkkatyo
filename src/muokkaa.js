import React, { Component } from "react";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./mystyle.module.css";
import { render } from "@testing-library/react";
import { Button, Alert } from "react-bootstrap";



export function Muokkaa (props) {

  console.log("Muokkaa");
  const [tavara, setTavara] = useState(""); 
  const [load, setLoad] = useState(false); 
  const [muokatutLisatiedot, setLisatidot]=useState(null)
  const [muokattuHyllyPaikka, setHyllyPaikka]=useState("1")
  const [muokattuTavara, setMuokattuTavara]=useState("")

  //inputista lisätiedot tavaralle
  function getLisatiedot(event){
    setLisatidot(event.target.value)
  }

  //inputista hyllypaikka tavaralle
  function getHyllyPaikka(event){
    setHyllyPaikka(event.target.value)
  }

  function getMuokattuTavara(event){
    setMuokattuTavara(event.target.value)
    setLisatidot("");
  }

  //Tallennetaan tehdyt muutokset
  async function tallennaMuutokset() {
    await fetch("http://localhost:3004/varasto/" + state,{
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({tavara: tavara.tavara, hylly: muokattuHyllyPaikka, saldo: tavara.saldo,
      lisatiedot: muokatutLisatiedot, puhelinnro: tavara.puhelinnro, id: state}),
    }).then((response) => {
      console.log(response);
      muutoksetTallennettu();
      this.fetchData();
    });
  }

  function muutoksetTallennettu(){
    alert("Muutokset tallennettu onnistuneesti!")
  }

  const location = useLocation();
  const state = location.state;
  console.log("STATE = " + state);

  useEffect(() => {
    const fetchTavara = async () => {
      const r = await fetch("http://localhost:3004/varasto/" + state); //haetaan tavara propsina tulleen id:n avulla
      const data = await r.json();
      setTavara(data);
      setLoad(true);
      console.log("Data useeffetist" + data.tavara);
    };
    fetchTavara();
  }, []);
  // kun jättää [] tyhjäksi, useEffect ajaa läpi vain kerran

  return (
    <div>
      {!load ? (
        <h1 className={styles.loading}>Loading...</h1>
      ) : (
        <div className={styles.muokkaa}>
          <h2>Tämä on muokkaa sivu</h2>
          <h3>(Voit muokata tavaran lisätietoja tai hyllypaikkaa)</h3>
          <label>ID: {tavara.id}</label>
          <p></p>
          <label>Saldo: {tavara.saldo}</label>
          <p></p>
          <label className={styles.muokaaLabel}>Puhelinnumero: {tavara.puhelinnro}</label>
          <p></p>
          <label>Tavara: {tavara.tavara}</label>
          <p></p>
          <label>Hylly: {tavara.hylly}</label>
          <p></p>
          <select
                required
                placeholder={tavara.hylly}
                onChange={getHyllyPaikka}>
                    <option value={"1"}>Hylly 1</option>
                    <option value={"2"}>Hylly 2</option>
                    <option value={"3"}>Hylly 3</option>
                    <option value={"4"}>Hylly 4</option>
                    <option value={"5"}>Hylly 5</option>
                    <option value={"6"}>Hylly 6</option>
                    <option value={"7"}>Hylly 7</option>
                    <option value={"8"}>Hylly 8</option>
                    <option value={"9"}>Hylly 9</option>
                    <option value={"10"}>Hylly 10</option>
                    <option value={"11"}>Hylly 11</option>
                    <option value={"12"}>Hylly 12</option>
                    <option value={"13"}>Hylly 13</option>
                    <option value={"14"}>Hylly 14</option>
                    <option value={"15"}>Hylly 15</option>
                    <option value={"16"}>Hylly 16</option>
                    <option value={"17"}>Hylly 17</option>
                </select>
                <p></p>
          <label>Lisätiedot:</label>
          <p></p>
          <input type="tex" onChange={getLisatiedot} placeholder={tavara.lisatiedot}/>
          <p></p>
          <button 
            className={styles.bouncy}
            onClick={tallennaMuutokset}
             >Tallenna muutokset
          </button> 
         
          <br />
          <Link to="/">KOTI</Link>
          <p></p>
          <Link to="/tavarat">TAVARAT</Link>
        </div>
      )}
    </div>
  );
   
};



