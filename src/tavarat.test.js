import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from "react";
import Tavarat from './tavarat';


afterEach(() => {
    jest.restoreAllMocks();
})


describe("Testit hae napille", () => {
    test("Haetaan REST-APISTA tiedot ja tarkistetaan, että ne näkyvät oikein", async () => {
        render(<Tavarat />);
        await userEvent.click(screen.getByTestId("haeNappi"));
        const items = await screen.findAllByTestId("haeNappi");
        console.log("Tulee tähän", items)
        expect(items).toHaveLength(1);
    
    })
})

it("Renderöi oikein", () => {
    const {gueryByTestId} = render(<Tavarat/>)
    
    expect(gueryByTestId("haenappi")).toBeTruthy();
})