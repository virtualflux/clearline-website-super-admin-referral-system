/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        catalineBlue: "#082B82",
        silverChalice: "#A4A4A4",
        shuttleGray: "#5A6371",
        athensGray: "#F3F4F8",
        ebonyClay: "#242E3C",
        mako: "#43464B",
        green: "#04CB00",
        bgGreen: "#D5FDE1",
        bgBlue: "#D2E5FE",
        bgPurple: "#D8D1FB",
        bgPink: "#F1D0FA",
        sugarCane: "#F3FFF2",
        boulder: "#787878",
        zircon: "#F6F7FF",
        solitude: "#E9F4FF",
        pigeonPost: "#BACCDF",
      },
      backgroundImage: {
        productBanner: "url('../../public/assets/images/productbanner.png')",
        resAlcohol: "url('../../public/assets/images/resAlcohol.png')",
        resChildhood: "url('../../public/assets/images/resChildhood.png')",
        resCovid: "url('../../public/assets/images/resCovid.png')",
        resHandWashing: "url('../../public/assets/images/resHandWashing.png')",
        resHepatitis: "url('../../public/assets/images/resHepatitis.png')",
        resImmune: "url('../../public/assets/images/resImmune.png')",
        resSuperFood: "url('../../public/assets/images/resSuperFood.png')",
        resWorkplace: "url('../../public/assets/images/resWorkplace.png')",
        providerBanner: "url('../../public/assets/images/providerBanner.png')",
        hypertension: "url('../../public/assets/images/hypertension.jpg')",
        providerMobileBanner:
          "url('../../public/assets/images/providerMobileBanner.png')",
        quotebanner: "url('../../public/assets/images/quotebanner.png')",
        networkBanner:"url('../../public/assets/images/network.jpg')",
        requestQuoteBanner:"url('../../public/assets/images/requestQuote.jpg')"
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}