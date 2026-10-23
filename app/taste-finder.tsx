"use client";

import { useState } from "react";
import { products, number, type Product } from "./catalog";
import { Icon } from "./icons";
import ProductPhoto from "./product-photo";

export default function TasteFinder({ onChoose, onAdd }: { onChoose: (product: Product) => void; onAdd: (product: Product) => void }) {
  const [texture, setTexture] = useState("نرم");
  const [sweetness, setSweetness] = useState(2);
  const product = texture === "خشک" ? products[3] : texture === "نیمه‌خشک" ? products[1] : sweetness === 3 ? products[2] : products[0];
  const sweetLabels = ["ملایم", "متعادل", "شیرین‌تر"];

  return (
    <section className="taste-finder wrap" id="taste">
      <div className="taste-controls">
        <h2>بیا سلیقه‌ات رو<br/><em>کشف کنیم.</em></h2>
        <p>دو تا انتخاب کوچیک؛ یک پیشنهاد خوش‌طعم.</p>
        <fieldset>
          <legend>چه بافتی دوست داری؟</legend>
          <div className="texture-options">
            {["نرم", "نیمه‌خشک", "خشک"].map((value) => (
              <label className={texture === value ? "selected" : ""} key={value}>
                <input type="radio" name="texture" value={value} checked={texture === value} onChange={() => setTexture(value)} />
                <span>{value}</span>{texture === value && <Icon name="check" />}
              </label>
            ))}
          </div>
        </fieldset>
        <div className="sweetness-control">
          <label htmlFor="sweetness">شیرینیِ دلخواهت <strong>{sweetLabels[sweetness - 1]}</strong></label>
          <input id="sweetness" aria-label="میزان شیرینی دلخواه" aria-valuetext={sweetLabels[sweetness - 1]} type="range" min="1" max="3" step="1" value={sweetness} onChange={(event) => setSweetness(Number(event.target.value))} />
          <div className="range-labels"><span>ملایم</span><span>شیرین‌تر</span></div>
        </div>
      </div>
      <div className="taste-result" key={product.id}>
        <div className="result-caption"><Icon name="spark" /><span>پیشنهاد نخل برای تو</span></div>
        <button className="taste-photo" onClick={() => onChoose(product)} aria-label={`مشاهده ${product.name}`}><ProductPhoto product={product} /></button>
        <div className="result-info">
          <h3 aria-live="polite">{product.name}</h3>
          <p>{product.note}</p>
          <div className="result-actions"><button className="button primary" onClick={() => onAdd(product)}><Icon name="bag" /> امتحانش می‌کنم</button><span>{number(product.price)} <small>تومان / ۵۰۰ گرم</small></span></div>
        </div>
      </div>
    </section>
  );
}
