const PRIVAT_PAYMENT_URL =
  "https://next.privat24.ua/payments/form/%7B%22token%22%3A%2294edc806-4a1e-4688-90e7-69770cc62c05%22%7D";

const PaymentGif = () => {
  return (
    <div
      className="w-full h-full pt-32 pb-4 overflow-y-auto text-white lg:pt-40"
      style={{ direction: "rtl" }}
    >
      <div
        className="flex flex-col items-center lg:items-start lg:pl-4 w-full"
        style={{ direction: "ltr" }}
      >
        <p className="mb-2 text-2xl font-bold">Сплатити</p>
        <a
          href={PRIVAT_PAYMENT_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="w-[60%] max-w-[600px]"
        >
          <img
            src={`${import.meta.env.VITE_BASE_URL}/privat_ua.gif`}
            alt="Оплата через ПриватБанк"
            className="w-full cursor-pointer"
          />
        </a>

        <div className="mt-4 text-center lg:text-left max-w-[700px] space-y-2 px-4 text-sm">
          <p className="text-base font-bold">
            Реквізити для оплати наших послуг у будь-якому банку України:
          </p>

          <p>
            КОМУНАЛЬНЕ ПІДПРИЄМТСВО &quot;ТЕПЛОВІ МЕРЕЖІ
            ІЗМАЇЛТЕПЛОКОМУНЕНЕРГО&quot;
          </p>
          <p>Код згідно з ЄДРПОУ 05514413</p>

          <p className="font-bold">Послуга з постачання теплової енергії</p>
          <p>
            Розрахунковий рахунок:{" "}
            <span className="font-bold">UA843288450000026008301170168</span>
          </p>
          <p>у Філія Одеське ОУ АТ &quot;Ощадбанк&quot;, МФО 328845</p>

          <p className="font-bold">Плата за абонентське обслуговування</p>
          <p>
            Розрахунковий рахунок:{" "}
            <span className="font-bold">UA743288450000026006303170168</span>
          </p>
          <p>у Філія Одеське ОУ АТ &quot;Ощадбанк&quot;, МФО 328845</p>

          <p className="font-bold">
            Послуга з обслуговування внутрішньобудинкових мереж системи опалення
            (ОВБМ)
          </p>
          <p>
            Розрахунковий рахунок:{" "}
            <span className="font-bold">UA793288450000026007302170168</span>
          </p>
          <p>у Філія Одеське ОУ АТ &quot;Ощадбанк&quot;, МФО 328845</p>
        </div>
      </div>
    </div>
  );
};

export default PaymentGif;
