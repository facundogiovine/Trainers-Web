import React, { useState, useEffect } from "react";

let socket;
let persona1Id = "511";
let persona2Id = "2";

const TestWS = () => {
    const [persona1Message, setPersona1Message] = useState("");
    const [persona2Message, setPersona2Message] = useState("");
    const [persona1MessageReceived, setPersona1MessageReceived] = useState("");
    const [persona2MessageReceived, setPersona2MessageReceived] = useState("");

    socket = new WebSocket(`ws://localhost:80/chat?senderId=${persona1Id}?recipientId=${persona2Id}`);

    const handlePersona1Message = e => {
        setPersona1Message(e.target.value);
    };

    const handlePersona2Message = e => {
        setPersona2Message(e.target.value);
    };

    const handleSendPersona1 = () => {
        const message = {
            senderId: "1",
            recipientId: "2",
            tipo: "TEXT",
            contenido: persona1Message,
            fecha: "2023-01-24T22:22:30+01:00"
        };

        socket.send(JSON.stringify(message));
        console.log("Message sent by Persona 1:", message);
    };

    const handleSendPersona2 = () => {
        const message = {
            senderId: "2",
            recipientId: "1",
            tipo: "TEXT",
            contenido: persona2Message,
            fecha: "2023-01-24T22:22:30+01:00"
        };

        socket.send(JSON.stringify(message));
        console.log("Message sent by Persona 2:", message);
    };

    socket.onmessage = e => {
        const receivedMessage = JSON.parse(e.data);
        console.log("Message received:", receivedMessage);
        if (receivedMessage.senderId === "1") {
            setPersona1MessageReceived(receivedMessage.content);
        } else if (receivedMessage.senderId === "2") {
            setPersona2MessageReceived(receivedMessage.content);
        }
    };

    socket.onerror = e => {
        console.error("WebSocket error:", e);
    };

    return (
        <div className="testws">
            <div className="container">
                <input
                    type="text"
                    name="persona1message"
                    placeholder="persona1message"
                    onChange={handlePersona1Message}
                />
                <input
                    type="text"
                    name="persona2message"
                    placeholder="persona2message"
                    onChange={handlePersona2Message}
                />
                <br />
                <button onClick={handleSendPersona1}>Enviar Persona1</button>
                <button onClick={handleSendPersona2}>Enviar Persona2</button>
                <br />
                <span name="persona1MessageReceived">
                    Mensaje from Persona2 received: {persona1MessageReceived}
                </span>
                <br />
                <span name="persona2MessageReceived">
                    Mensaje from Persona1 received: {persona2MessageReceived}
                </span>
                <br />
            </div>
        </div>
    );
};

export default TestWS;
