import React, { Component } from "react";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./mystyle.module.css";
import { Button, Alert } from "react-bootstrap";



    // async function lisaaUusi() {
    //     await fetch("http://localhost:3004/varasto", {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify({ tavara: "tst", hylly: "testi" }),
    //     }).then((response) => {
    //       console.log(response);
    //       this.fetchData();
    //     });
    //   }

  export const Lisaa = () => {

    const [tavara, setuusiTavara] = useState("")
    const [hylly, setuusiHylly] = useState("1")
    // const [saldo, setuusiSaldo] = useState("8")
    const [lisatiedot, setuusiLisatiedot] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault();
        // const tuote = [tavara, hylly, saldo, lisatiedot, puhelinnro]

        fetch("http://localhost:3004/varasto",{
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({tavara: tavara, hylly: hylly, saldo: 1,
                lisatiedot: lisatiedot}),
             }).then(() => {
              console.log("uusi tavara lisätty");
            });
            alert("Uusi tavara lisätty onnistuneesti!")
            setuusiTavara("");
            setuusiLisatiedot("");
            setuusiHylly("1");
        }

        return(
            <div className={styles.lisaa}>
               <Link to="/tavarat">TAVARAT</Link>
              <p></p>
             <Link to="/">KOTI</Link>
             <br/>
             <p></p>
             <h2>Lisää uusi</h2>
            <form onSubmit={handleSubmit}>
                <label>Tavaran nimi</label>
                <input
                  type="text"
                  required
                  value={tavara}
                  onChange={(e) => setuusiTavara(e.target.value)}
                />
                 <label>Lisätiedot</label>
                <input
                  type="text"
                  required
                  value={lisatiedot}
                  onChange={(e) => setuusiLisatiedot(e.target.value)}
                />
                <label>Valitse hyllypaikka</label>
                <select
                required
                value={hylly}
                onChange={(e) => setuusiHylly(e.target.value)}>
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
                <button className={styles.lisaaUusi}>Tallenna uusi</button>
            </form>
            </div>
        
        )
    

        }
export default Lisaa;