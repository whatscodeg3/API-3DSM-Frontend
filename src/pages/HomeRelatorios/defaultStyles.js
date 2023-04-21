import styled from "styled-components"

export const Container = styled.form`
    width: 100vw;
    height: 100vh;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    gap: 100px;

    .p-button {
        background-color: #F18524;
        border: 1px solid #F18524;
        outline-color: none;
        :hover {
            background-color: #E79345;
            border: 1px solid #E79345;
        }
    }
`;

export const Title = styled.p`
    color: #F18524;
    font-size: 35px;
    font-family: 'Ubuntu', sans-serif;
`;

export const ImageBack = styled.img`
    position: fixed;
    top: 90%;
    left: 95%;

    :hover {
        transform: scale(1.1);
        transition: all 0.5s;
    }
`;

export const ButtonSubmit = styled.button`
    width: 180px;
    height: 50px;

    color: #FFFFFF;
    background: #F1841F;
    box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    border: none;

    font-size: 20px;
    font-family: 'Ubuntu', sans-serif;
    cursor: pointer;
    :hover {
        transform: scale(1.1);
        transition: all 0.5s;
    }
`;

export const Calendar = styled.input`
    display: flex;
    width: 200px;
    font-size: 17px;
    justify-content: center;
    align-items: center;

    appearance: none;
    -webkit-appearance: none;
    background-size: 20px;
    background-repeat: no-repeat;
    background-position: right center;
    border: 1px solid #ccc;
    background-color: #f8f8f8;
    color: #333;
    transition: border-color 0.3s ease-in-out;
    outline: none;
    border-radius: 10px;
    :focus {
    border-color: #F18524;
    }
    :hover {
    border-color: #F18524;
    }
`;

export const Select = styled.select`
    width: 200px;
    height: 50px;
    border-radius: 10px;
    outline: none;
    text-align: center;
    font-size: 15px;
    border: 1px solid #ccc;
    background-color: #f8f8f8;
    color: #333;
    :focus {
    border-color: #F18524;
    }
    :hover {
    border-color: #F18524;
    }
`;