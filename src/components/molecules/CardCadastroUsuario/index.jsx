import React from "react";

// Styles
import { Card, PersonImage } from "./defaultStyles";

// image
import IconPerson from "../../../assets/img/IconPerson.svg"

function WhiteCard(props) {

    return (
        <>
            <Card>
                <PersonImage src={IconPerson} alt="icon-person" />
                <p>
                    Cadastrar<br/>Usuário
                </p>
            </Card>
        </>
    )

}

export default WhiteCard;