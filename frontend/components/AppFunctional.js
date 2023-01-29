import axios from "axios";
import React from "react";
import { useState } from "react";

// önerilen başlangıç stateleri
const initialMessage = "";
const initialEmail = "";
const initialSteps = 0;
const initialIndex = 4; //  "B" nin bulunduğu indexi

export default function AppFunctional(props) {
  // AŞAĞIDAKİ HELPERLAR SADECE ÖNERİDİR.
  // Bunları silip kendi mantığınızla sıfırdan geliştirebilirsiniz.
  const grid = [
    [1, 1],
    [2, 1],
    [3, 1],
    [1, 2],
    [2, 2],
    [3, 2],
    [1, 3],
    [2, 3],
    [3, 3],
  ];
  const [ikili, setIkili] = useState(grid[initialIndex]);
  const [coordStep, setCoordStep] = useState(initialSteps);
  const [coordIndex, setCoordIntex] = useState(initialIndex);
  const [err, setErr] = useState("");
  const [email, setEmail] = useState(initialEmail);
  const [message, setMessage] = useState(initialMessage);

  function getXY() {
    // Koordinatları izlemek için bir state e sahip olmak gerekli değildir.
    // Bunları hesaplayabilmek için "B" nin hangi indexte olduğunu bilmek yeterlidir.
  }

  function getXYMesaj() {
    // Kullanıcı için "Koordinatlar (2, 2)" mesajını izlemek için bir state'in olması gerekli değildir.
    // Koordinatları almak için yukarıdaki "getXY" helperını ve ardından "getXYMesaj"ı kullanabilirsiniz.
    // tamamen oluşturulmuş stringi döndürür.
  }

  function reset() {
    setIkili(grid[initialIndex]);
    setCoordIntex(initialIndex);
    setCoordStep(0);
    setErr("");
  }

  function sonrakiIndex(yon) {
    // Bu helper bir yön ("sol", "yukarı", vb.) alır ve "B" nin bir sonraki indeksinin ne olduğunu hesaplar.
    // Gridin kenarına ulaşıldığında başka gidecek yer olmadığı için,
    // şu anki indeksi değiştirmemeli.
  }

  function ilerle(evt) {
    // Bu event handler, "B" için yeni bir dizin elde etmek üzere yukarıdaki yardımcıyı kullanabilir,
    // ve buna göre state i değiştirir.
    const indexofx = ikili[0];
    const indexofy = ikili[1];
    setErr("");
    if (evt.target.id === "left") {
      if (indexofx > 1) {
        setIkili([indexofx - 1, indexofy]);
        setCoordIntex(coordIndex - 1);
        setCoordStep(coordStep + 1);
      } else {
        setErr("Sola Gidemezsin");
      }
    }
    if (evt.target.id === "up") {
      if (indexofy < 3) {
        setIkili([indexofx, indexofy + 1]);
        setCoordIntex(coordIndex - 3);
        setCoordStep(coordStep + 1);
      } else {
        setErr("Yukarı gidemezsin");
      }
    }
    if (evt.target.id === "right") {
      if (indexofx < 3) {
        setIkili([indexofx + 1, indexofy]);
        setCoordIntex(coordIndex + 1);
        setCoordStep(coordStep + 1);
      } else {
        setErr("Sağa gidemezsiniz");
      }
    }
    if (evt.target.id === "down") {
      if (indexofy > 1) {
        setIkili([indexofx, indexofy - 1]);
        setCoordIntex(coordIndex + 3);
        setCoordStep(coordStep + 1);
      } else {
        setErr("Aşağı gidemezsiniz");
      }
    }
  }

  function onChange(evt) {
    // inputun değerini güncellemek için bunu kullanabilirsiniz
    setEmail(evt.target.value);
  }

  function onSubmit(evt) {
    // payloadu POST etmek için bir submit handlera da ihtiyacınız var.
    evt.preventDefault();
    axios
      .post("http://localhost:9000/api/result", {
        x: ikili[0],
        y: ikili[1],
        steps: coordStep,
        email: email,
      })
      .then((response) => setMessage(response.data.message))
      .catch((err) => console.log(err));

    setIkili(grid[initialIndex]);
    setCoordIntex(initialIndex);
    setCoordStep(0);
    setErr("");
    setEmail(initialEmail);
  }

  console.log(initialIndex);
  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">
          Koordinatlar ({ikili[0]},{ikili[1]})
        </h3>
        <h3 id="steps">{coordStep} kere ilerlediniz</h3>
      </div>
      <div id="grid">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((idx) => (
          <div
            key={idx}
            className={`square${idx === coordIndex ? " active" : ""}`}
          >
            {idx === coordIndex ? "B" : null}
          </div>
        ))}
      </div>
      <div className="info">
        <h3 id="message">
          {err !== "" ? err : null}
          {message}
        </h3>
      </div>
      <div id="keypad">
        <button id="left" onClick={ilerle}>
          SOL
        </button>
        <button id="up" onClick={ilerle}>
          YUKARI
        </button>
        <button id="right" onClick={ilerle}>
          SAĞ
        </button>
        <button id="down" onClick={ilerle}>
          AŞAĞI
        </button>
        <button id="reset" onClick={reset}>
          reset
        </button>
      </div>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          id="email"
          type="email"
          placeholder="email girin"
        ></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  );
}
