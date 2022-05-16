import { fireEvent, render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from "react";
import Muokkaa from './muokkaa';

it("Renderöi oikein", () => {
    const {queryByPlaceholderText} = render(<Muokkaa/>)
    
    expect(queryByPlaceholderText('')).toBeTruthy();
})

describe("Inputin arvo", () => {
    it("Päivittyy on changella", () => {
        const {queryByPlaceholderText} = render(<Muokkaa/>) 

        const lisatiedot = queryByPlaceholderText('');

        fireEvent.change(getLisatiedot, {target: {value: "testi"}})

        expect(getLisatiedot.value.toBe("test"))
    })
})