import Navigation from "@/components/Navigation";

import '@unocss/reset/tailwind.css'
import 'uno.css'

export default function App({ Component, pageProps }) {
  return <>
    <Navigation />
    <Component {...pageProps} />
  </>;
}