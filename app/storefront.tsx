"use client";

import Image from "next/image";
import heroReference from "../public/images/dates-reference-v5.png";
import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { products, number, priceFor, normalize, type Product, type CartItem } from "./catalog";
import { Icon, Palm } from "./icons";
import ProductPhoto from "./product-photo";
import ThemeToggle from "./theme-toggle";
import TasteFinder from "./taste-finder";
import Faq from "./faq";

export default function Storefront() {
  const [category, setCategory] = useState("همه خرماها");
  const [search, setSearch] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [modal, setModal] = useState<"cart" | Product | null>(null);
  const [weight, setWeight] = useState(500);
  const [notice, setNotice] = useState("");
  const [added, setAdded] = useState<string | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const searchInput = useRef<HTMLInputElement>(null);
  const catalogTransition = useRef<ViewTransition | null>(null);
  const latestCategory = useRef(0);

  useEffect(() => () => catalogTransition.current?.skipTransition(), []);
  useEffect(() => { if (modal) dialog.current?.showModal(); else dialog.current?.close(); }, [modal]);
  useEffect(() => { if (searchOpen) searchInput.current?.focus(); }, [searchOpen]);
  useEffect(() => {
    if (!notice && !added) return;
    const timer = setTimeout(() => { setNotice(""); setAdded(null); }, 2500);
    return () => clearTimeout(timer);
  }, [notice, added]);

  const filtered = products.filter((product) => (
    category === "همه خرماها" || (category === "علاقه‌مندی‌ها" ? favorites.includes(product.id) : product.kind === category)
  ) && normalize(`${product.name} ${product.origin}`).includes(normalize(search)));
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const total = cart.reduce((sum, item) => sum + priceFor(item.product, item.weight) * item.quantity, 0);

  function selectCategory(nextCategory: string, clearSearch = false) {
    const selection = ++latestCategory.current;
    const update = () => {
      if (selection !== latestCategory.current) return;
      setCategory(nextCategory);
      if (clearSearch) setSearch("");
    };
    catalogTransition.current?.skipTransition();
    if (!document.startViewTransition || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      update();
      return;
    }
    const transition = document.startViewTransition(() => flushSync(update));
    catalogTransition.current = transition;
    void transition.ready.catch(() => {});
    void transition.finished.then(() => {
      if (catalogTransition.current === transition) catalogTransition.current = null;
    }).catch(() => {});
  }

  function addToCart(product: Product, selectedWeight = 500) {
    if (cart.some((item) => item.product.id === product.id && item.weight === selectedWeight && item.quantity >= 20)) {
      setNotice("حداکثر ۲۰ بسته از هر محصول قابل انتخاب است.");
      return;
    }
    setCart((items) => items.some((item) => item.product.id === product.id && item.weight === selectedWeight)
      ? items.map((item) => item.product.id === product.id && item.weight === selectedWeight ? { ...item, quantity: Math.min(20, item.quantity + 1) } : item)
      : [...items, { product, weight: selectedWeight, quantity: 1 }]);
    setAdded(product.id);
    setNotice(`${product.name} به سبد اضافه شد`);
  }

  function changeQuantity(index: number, change: number) {
    setCart((items) => items.map((item, i) => i === index ? { ...item, quantity: Math.min(20, item.quantity + change) } : item).filter((item) => item.quantity > 0));
  }
  function openProduct(product: Product) { setWeight(500); setModal(product); }
  return <>
    <a className="skip-link" href="#main">رفتن به محتوای اصلی</a>
    <div className="top-note"><span>شیرینی، به وقت شما.</span><Icon name="spark" /><span>یک دانه خرما، یک حال خوب</span></div>
    <header className="header wrap">
      <a className="brand" href="#" aria-label="نخل، صفحه اصلی"><Palm /><div><strong>نخل</strong><span lang="en" dir="ltr">NAKHL</span></div></a>
      <nav aria-label="منوی اصلی"><a className="active" href="#products">فروشگاه</a><a href="#taste">خرمای من</a><a href="#story">قصهٔ نخل</a><a href="#faq">سؤالات شما</a></nav>
      <div className="header-actions">
        <ThemeToggle />
        <button className="icon-button" onClick={() => setSearchOpen(!searchOpen)} aria-label="جستجوی محصولات" aria-expanded={searchOpen}><Icon name="search" /></button>
        <button className={`cart-button ${added ? "cart-bump" : ""}`} key={count} onClick={() => setModal("cart")} aria-label={`سبد خرید، ${number(count)} محصول`}><Icon name="bag" /><span className="cart-count">{number(count)}</span></button>
      </div>
    </header>
    {searchOpen && <div className="search-bar wrap"><label htmlFor="search">دنبال چه طعمی می‌گردی؟</label><input id="search" ref={searchInput} value={search} onChange={(event) => { latestCategory.current++; catalogTransition.current?.skipTransition(); setSearch(event.target.value); setCategory("همه خرماها"); }} placeholder="نام خرما یا شهر…" type="search" /><a className="text-link" href="#products">دیدن نتایج <Icon name="arrow" /></a></div>}
    <main id="main">
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <div className="hero-eyebrow">طعم آشنای جنوب، در کنار شما</div>
          <h1 id="hero-title">خرمای طبیعی<em>برای لحظه‌های شیرین زندگی</em></h1>
          <p>از خرمای نرم و شیرین تا طعم‌های نیمه‌خشک و کاراملی؛<br/>یک انتخاب خوش‌طعم برای چای، دورهمی و لحظه‌های روزمرهٔ شما.</p>
          <div className="hero-buttons"><a className="button primary" href="#products">مشاهده محصولات <Icon name="arrow" /></a><a className="button hero-secondary" href="#story">دربارهٔ نخل</a></div>
          <div className="hero-details"><span><Icon name="leaf"/>{number(products.length)} طعم متفاوت</span><span><Icon name="box"/>۵۰۰ و ۱۰۰۰ گرم</span><span><Icon name="spark"/>به سلیقهٔ شما</span></div>
        </div>
        <div className="hero-visual">
          <Image src={heroReference} alt="کاسهٔ برنجی پر از خرما کنار فانوس، با نخل‌ها و کوه‌های کویری در پس‌زمینه" fill sizes="100vw" preload placeholder="blur" />
        </div>
      </section>
      <div className="flavor-ribbon wrap"><span>یک مکث شیرین</span><Icon name="spark"/><span>کنارِ چای</span><Icon name="spark"/><span>برای دورهمی</span><Icon name="spark"/><span>به سلیقهٔ تو</span><Icon name="spark"/><span>ساده و دوست‌داشتنی</span></div>

      <section className="products-section wrap" id="products">
        <div className="section-heading"><div><h2>کدوم طعم، <em>طعمِ توئه؟</em></h2><p>هشت خرمای متفاوت؛ برای هر روز و هر حال‌وهوا.</p></div><a className="text-link" href="#taste">کمکم کن انتخاب کنم <Icon name="arrow"/></a></div>
        <div className="catalog-controls"><div className="filters" aria-label="دسته‌بندی خرما">{["همه خرماها", "نرم", "نیمه‌خشک", "خشک", "علاقه‌مندی‌ها"].map((item) => <button key={item} onClick={() => selectCategory(item)} aria-pressed={category === item} className={category === item ? "selected" : ""}>{item === "علاقه‌مندی‌ها" && <Icon name="heart"/>}{item}</button>)}</div><span className="result-count" aria-live="polite">{number(filtered.length)} طعم برای کشف کردن</span></div>
        <div className="product-grid" key={category}>
          {filtered.map((product) => <article className="product-card" key={product.id} style={{viewTransitionName:`product-${product.id}`}}>
            <div className="product-image-area"><button className="photo-button" onClick={() => openProduct(product)} aria-label={`مشاهده ${product.name}`}><ProductPhoto product={product}/><span className="photo-hint">از نزدیک ببین <Icon name="arrow"/></span></button><span className="product-tag">{product.tag}</span><button className={`favorite icon-button ${favorites.includes(product.id) ? "is-favorite" : ""}`} aria-label={`علاقه‌مندی: ${product.name}`} aria-pressed={favorites.includes(product.id)} onClick={() => setFavorites((items) => items.includes(product.id) ? items.filter((id) => id !== product.id) : [...items, product.id])}><Icon name="heart"/></button></div>
            <div className="product-origin"><span>{product.origin}</span><span lang="en" dir="ltr">{product.english}</span></div>
            <button className="product-title" onClick={() => openProduct(product)}><h3>{product.name}</h3></button><p className="product-weight">بستهٔ ۵۰۰ گرمی <span>·</span> {product.kind}</p>
            <div className="product-bottom"><span className="price">{number(product.price)} <small>تومان</small></span><button className={`add-button ${added === product.id ? "just-added" : ""}`} onClick={() => addToCart(product)} aria-label={`افزودن ${product.name} به سبد`}><Icon name={added === product.id ? "check" : "bag"}/><span>{added === product.id ? "اضافه شد" : "افزودن"}</span></button></div>
          </article>)}
        </div>
        {filtered.length === 0 && <div className="empty-state"><Icon name={category === "علاقه‌مندی‌ها" ? "heart" : "search"}/><p>{category === "علاقه‌مندی‌ها" ? "هر طعمی دلت رو برد، قلب کنارش رو بزن." : "این طعم رو پیدا نکردیم؛ یک اسم دیگه امتحان کن."}</p><button className="text-link" onClick={() => selectCategory("همه خرماها", true)}>دیدن همهٔ خرماها <Icon name="arrow"/></button></div>}
      </section>

      <TasteFinder onChoose={openProduct} onAdd={addToCart}/>

      <section className="story-section wrap" id="story">
        <div className="story-image"><Image src="/images/dates-hero-v2.png" alt="خرما و چای در نور گرم صبح" fill sizes="(max-width:760px) 100vw, 45vw"/><span lang="en" dir="ltr">SLOW DOWN.<br/>SWEETEN UP.</span></div>
        <div className="story-copy"><h2>خوشی‌های کوچیک،<br/><em>قصه‌های قشنگ.</em></h2><p>یک فنجان چای، چند دانه خرما و فرصتی برای کنار هم بودن. نخل یادآور همین لحظه‌های کوچک است؛ وقتی یک طعم آشنا، روزمان را کمی شیرین‌تر می‌کند.</p><a className="text-link" href="#products">یک لحظهٔ شیرین انتخاب کن <Icon name="arrow"/></a><div className="story-signature"><Palm/><span>با مهر، نخل</span></div></div>
      </section>

      <Faq />
    </main>
    <footer><div className="footer-main wrap"><a className="brand" href="#"><Palm/><div><strong>نخل</strong><span lang="en" dir="ltr">NAKHL</span></div></a><p>شیرینیِ سادهٔ زندگی.</p><a href="#products">فروشگاه</a><a href="#taste">خرمای من</a><a href="#story">قصهٔ نخل</a><a href="#main" className="back-top">برگردیم بالا <Icon name="arrow"/></a></div><div className="footer-bottom wrap"><span>نمونهٔ طراحی؛ برند، محصولات و قیمت‌ها نمایشی هستند.</span><span lang="en" dir="ltr">SMALL FRUIT. SWEET MOMENTS.</span></div></footer>
    <div className={`toast ${notice ? "visible" : ""}`} role="status" aria-live="polite">{notice && <><Icon name="check"/>{notice}</>}</div>

    <dialog ref={dialog} className={modal === "cart" ? "shop-dialog cart-dialog" : "shop-dialog"} onClose={() => setModal(null)} onClick={(event) => {
      if (event.target !== dialog.current) return;
      const rect = dialog.current.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) setModal(null);
    }} aria-labelledby="dialog-title">
      <button className="dialog-close icon-button" aria-label="بستن" onClick={() => setModal(null)}><Icon name="close"/></button>
      {modal === "cart" ? <>
        <div className="cart-heading"><span className="cart-heading-icon"><Icon name="bag"/></span><div><h2 id="dialog-title">سبدِ شیرین تو <span>{number(count)}</span></h2><p>انتخاب‌های کوچیک، خوشی‌های بزرگ.</p></div></div>
        <div className="cart-body">
          {cart.length === 0 ? <div className="cart-empty"><Image src="/images/dates-bowl-v3.png" alt="کاسهٔ خرما برای شروع انتخاب" width={300} height={200}/><h3>جای یک طعم خوب، اینجا خالیه.</h3><p>از این دو طعم شروع کنیم؟</p><div className="cart-suggestions">{products.slice(0,2).map((product) => <div key={product.id}><ProductPhoto product={product}/><span><strong>{product.name}</strong><small>{number(product.price)} تومان</small></span><button className="icon-button" onClick={() => addToCart(product)} aria-label={`افزودن ${product.name} به سبد`}><Icon name="bag"/></button></div>)}</div></div> : <div className="cart-items">{cart.map((item,index) => <div className="cart-item" key={`${item.product.id}-${item.weight}`}>
            <ProductPhoto product={item.product}/>
            <div className="cart-item-info"><h3>{item.product.name}</h3><p>بستهٔ {number(item.weight)} گرمی</p><div className="quantity"><button aria-label={`کاهش تعداد ${item.product.name}`} onClick={() => changeQuantity(index,-1)}>−</button><span>{number(item.quantity)}</span><button aria-label={`افزایش تعداد ${item.product.name}`} disabled={item.quantity >= 20} onClick={() => changeQuantity(index,1)}>+</button></div></div>
            <div className="cart-item-end"><button className="icon-button" aria-label={`حذف ${item.product.name}`} onClick={() => setCart((items) => items.filter((_,i) => i !== index))}><Icon name="close"/></button><strong>{number(priceFor(item.product,item.weight)*item.quantity)}<small>تومان</small></strong></div>
          </div>)}</div>}
        </div>
        <div className="cart-summary"><div className="cart-total"><span>جمع محصولات <small>{number(count)} بسته</small></span><strong>{number(total)} <small>تومان</small></strong></div><p className="cart-demo-note"><Icon name="leaf"/>نسخهٔ نمایشی؛ پرداخت واقعی هنوز فعال نیست.</p><button className="button primary full-width" onClick={() => setModal(null)}>{cart.length ? "یک طعم دیگه هم ببینم" : "بریم طعم‌ها رو کشف کنیم"}<Icon name="arrow"/></button></div>
      </> : modal && <div className="product-detail"><ProductPhoto product={modal}/><div><h2 id="dialog-title">{modal.name}</h2><p className="detail-origin">{modal.origin}</p><p>{modal.note}</p><fieldset><legend>وزن بسته را انتخاب کنید</legend><div className="weight-options">{[500,1000].map((value) => <button key={value} aria-pressed={weight === value} className={weight === value ? "selected" : ""} onClick={() => setWeight(value)}>{number(value)} گرم</button>)}</div></fieldset><strong className="detail-price">{number(priceFor(modal,weight))} <small>تومان</small></strong><button className="button primary full-width" onClick={() => {addToCart(modal,weight);setModal("cart");}}><Icon name="bag"/> افزودن به سبد خرید</button><p className="detail-disclaimer">تصویر و قیمت، نمونهٔ نمایشی هستند.</p></div></div>}
    </dialog>
  </>;
}
