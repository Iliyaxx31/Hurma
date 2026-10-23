"use client";

import { useState } from "react";
import { Icon } from "./icons";

const questions = [
  {
    question: "تفاوت خرمای نرم و خشک چیست؟",
    answer: "خرمای نرم رطوبت بیشتری دارد و بافت آن لطیف‌تر است. خرمای خشک رطوبت کمتری دارد؛ انتخاب بین آن‌ها بیشتر به سلیقهٔ شما بستگی دارد.",
  },
  {
    question: "خرما را چطور نگهداری کنیم؟",
    answer: "خرما را در ظرف دربسته و دور از نور و گرما نگه دارید. برای خرماهای نرم مانند مضافتی، نگهداری در یخچال مناسب‌تر است. دستور نگهداری روی بسته‌بندی را هم بررسی کنید.",
  },
  {
    question: "آیا می‌توانم از این نسخه خرید کنم؟",
    answer: "این سایت یک نمونهٔ طراحی است. محصولات، عکس‌ها و قیمت‌ها نمایشی هستند. انتخاب محصولات و سبد خرید را می‌توانید امتحان کنید؛ پرداخت و ثبت سفارش واقعی فعال نیست.",
  },
];

export default function Faq() {
  const [open, setOpen] = useState<number | null>(null);

  return <section className="faq wrap" id="faq" aria-labelledby="faq-title">
    <div className="faq-intro">
      <span className="faq-eyebrow"><Icon name="spark" /> قبل از یک انتخاب شیرین</span>
      <h2 id="faq-title">چیزی توی ذهنت مونده؟</h2>
      <p>قبل از انتخاب، این‌ها رو بخون.</p>
    </div>
    <div className="faq-items">
      {questions.map((item, index) => {
        const expanded = open === index;
        return <article className="faq-item" data-open={expanded} key={item.question}>
          <h3>
            <button className="faq-trigger" id={`faq-question-${index}`} aria-expanded={expanded} aria-controls={`faq-answer-${index}`} onClick={() => setOpen(expanded ? null : index)}>
              <span>{item.question}</span>
              <span className="faq-indicator"><Icon name="close" /></span>
            </button>
          </h3>
          <div className="faq-panel" id={`faq-answer-${index}`} role="region" aria-labelledby={`faq-question-${index}`} aria-hidden={!expanded} inert={!expanded}>
            <div className="faq-answer"><p>{item.answer}</p></div>
          </div>
        </article>;
      })}
    </div>
  </section>;
}
