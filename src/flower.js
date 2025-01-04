import { useEffect } from "react";
import "./style.css";

export default function FlowerAnimation() {
  useEffect(() => {
    const timer = setTimeout(() => {
      document.body.classList.remove("not-loaded");
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flowers">
      <div className="night"></div>
      <div className="flower flower--1">
        <div className="flower__leafs flower__leafs--1">
          <div className="flower__leaf flower__leaf--1"></div>
          <div className="flower__leaf flower__leaf--2"></div>
          <div className="flower__leaf flower__leaf--3"></div>
          <div className="flower__leaf flower__leaf--4"></div>
          <div className="flower__white-circle"></div>

          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className={`flower__light flower__light--${i + 1}`}
            ></div>
          ))}
        </div>
        <div className="flower__line">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className={`flower__line__leaf flower__line__leaf--${i + 1}`}
            ></div>
          ))}
        </div>
      </div>

      {[2, 3].map((flowerNum) => (
        <div key={flowerNum} className={`flower flower--${flowerNum}`}>
          <div className={`flower__leafs flower__leafs--${flowerNum}`}>
            <div className="flower__leaf flower__leaf--1"></div>
            <div className="flower__leaf flower__leaf--2"></div>
            <div className="flower__leaf flower__leaf--3"></div>
            <div className="flower__leaf flower__leaf--4"></div>
            <div className="flower__white-circle"></div>

            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className={`flower__light flower__light--${i + 1}`}
              ></div>
            ))}
          </div>
          <div className="flower__line">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className={`flower__line__leaf flower__line__leaf--${i + 1}`}
              ></div>
            ))}
          </div>
        </div>
      ))}

      <div className="grow-ans" style={{ "--d": "1.2s" }}>
        <div className="flower__g-long">
          <div className="flower__g-long__top"></div>
          <div className="flower__g-long__bottom"></div>
        </div>
      </div>

      {[1, 2].map((grassNum) => (
        <div key={grassNum} className="growing-grass">
          <div className={`flower__grass flower__grass--${grassNum}`}>
            <div className="flower__grass--top"></div>
            <div className="flower__grass--bottom"></div>
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className={`flower__grass__leaf flower__grass__leaf--${i + 1}`}
              ></div>
            ))}
            <div className="flower__grass__overlay"></div>
          </div>
        </div>
      ))}

      <div className="grow-ans" style={{ "--d": "2.4s" }}>
        <div className="flower__g-right flower__g-right--1">
          <div className="leaf"></div>
        </div>
      </div>

      <div className="grow-ans" style={{ "--d": "2.8s" }}>
        <div className="flower__g-right flower__g-right--2">
          <div className="leaf"></div>
        </div>
      </div>

      <div className="grow-ans" style={{ "--d": "2.8s" }}>
        <div className="flower__g-front">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className={`flower__g-front__leaf-wrapper flower__g-front__leaf-wrapper--${
                i + 1
              }`}
            >
              <div className="flower__g-front__leaf"></div>
            </div>
          ))}
          <div className="flower__g-front__line"></div>
        </div>
      </div>

      <div className="grow-ans" style={{ "--d": "3.2s" }}>
        <div className="flower__g-fr">
          <div className="leaf"></div>
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className={`flower__g-fr__leaf flower__g-fr__leaf--${i + 1}`}
            ></div>
          ))}
        </div>
      </div>

      {[...Array(8)].map((_, i) => (
        <div key={i} className={`long-g long-g--${i}`}>
          {[...Array(4)].map((_, j) => (
            <div
              key={j}
              className="grow-ans"
              style={{ "--d": `${3 + j * 0.2}s` }}
            >
              <div className={`leaf leaf--${j}`}></div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
